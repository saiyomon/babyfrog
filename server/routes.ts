import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertImageSchema, insertMessageSchema } from "@shared/schema";
import multer, { FileFilterCallback } from "multer";
import { z } from "zod";
import { log } from "./vite";
import path from "path";
import fs from "fs";

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  log(`Creating uploads directory: ${uploadsDir}`);
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Get file size limit from environment or default to 10MB
const MAX_FILE_SIZE = parseInt(process.env.UPLOAD_MAX_FILE_SIZE || "10485760", 10); // 10MB default
log(`Maximum file upload size: ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(2)}MB`);

// Get max number of files limit from environment or default to 200
const MAX_FILES = parseInt(process.env.UPLOAD_MAX_FILES || "200", 10);
log(`Maximum storage capacity: ${MAX_FILES} files`);

// Set up multer for memory storage (no file system writes)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    // Accept only image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Route to get images with pagination
  app.get("/api/images", async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '10', 10);
      const count = await storage.getImagesCount();
      const images = await storage.getImages(page, limit);
      
      // Add storage stats to the response
      const usagePercentage = (count / MAX_FILES) * 100;
      
      res.json({
        images,
        pagination: {
          total: count,
          page,
          limit,
          pages: Math.ceil(count / limit)
        },
        storageStats: {
          used: count,
          total: MAX_FILES,
          percentUsed: usagePercentage.toFixed(1),
          remaining: MAX_FILES - count
        }
      });
    } catch (error) {
      log(`Error fetching images: ${error instanceof Error ? error.message : String(error)}`, "api-error");
      res.status(500).json({ message: "Failed to fetch images" });
    }
  });

  // Route to upload an image
  app.post("/api/images", upload.single("image"), async (req: Request, res: Response) => {
    try {
      log("Upload request received", "upload");
      
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      // Check if we're approaching storage limits
      const currentCount = await storage.getImagesCount();
      
      if (currentCount >= MAX_FILES) {
        log(`Storage limit reached (${currentCount}/${MAX_FILES} files). Rejecting upload.`, "storage-limit");
        return res.status(507).json({ 
          message: "Storage capacity reached", 
          details: `Maximum storage capacity of ${MAX_FILES} files has been reached. Please delete some existing images before uploading new ones.`
        });
      }

      // Check if file is within size limits
      if (req.file.size > MAX_FILE_SIZE) {
        log(`File size too large: ${req.file.size} bytes. Limit is ${MAX_FILE_SIZE} bytes.`, "file-size");
        return res.status(413).json({ 
          message: "File too large", 
          details: `Maximum file size is ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(2)}MB`
        });
      }

      // Convert the image to base64
      const base64Image = req.file.buffer.toString("base64");
      const filename = req.file.originalname;
      
      log(`Processing image: ${filename} (${req.file.size} bytes)`, "upload");

      // Validate and insert the image
      const validatedData = insertImageSchema.parse({
        filename,
        data: base64Image,
      });

      const image = await storage.addImage(validatedData);
      log(`Image added successfully with ID: ${image.id}`, "upload-success");
      
      // Return storage stats with the response
      const newCount = await storage.getImagesCount();
      const usagePercentage = (newCount / MAX_FILES) * 100;
      
      res.status(201).json({
        ...image,
        storageStats: {
          used: newCount,
          total: MAX_FILES,
          percentUsed: usagePercentage.toFixed(1),
          remaining: MAX_FILES - newCount
        }
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data format", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to upload image" });
    }
  });

  // Route to delete an image
  app.delete("/api/images/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid image ID" });
      }

      const success = await storage.deleteImage(id);
      if (success) {
        // Get updated storage stats after deletion
        const count = await storage.getImagesCount();
        const usagePercentage = (count / MAX_FILES) * 100;
        
        res.status(200).json({ 
          message: "Image deleted successfully",
          storageStats: {
            used: count,
            total: MAX_FILES,
            percentUsed: usagePercentage.toFixed(1),
            remaining: MAX_FILES - count
          }
        });
      } else {
        res.status(404).json({ message: "Image not found" });
      }
    } catch (error) {
      log(`Error deleting image: ${error instanceof Error ? error.message : String(error)}`, "api-error");
      res.status(500).json({ message: "Failed to delete image" });
    }
  });

  // Route to get all messages
  app.get("/api/messages", async (_req: Request, res: Response) => {
    try {
      const messages = await storage.getMessages();
      const count = messages.length;
      
      res.json({
        messages,
        count
      });
    } catch (error) {
      log(`Error fetching messages: ${error instanceof Error ? error.message : String(error)}`, "api-error");
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Route to add a new message
  app.post("/api/messages", async (req: Request, res: Response) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      
      // Sanitize the message text to prevent malicious content
      if (validatedData.text) {
        validatedData.text = validatedData.text.trim();
      }
      
      const message = await storage.addMessage(validatedData);
      
      // Get total message count after addition
      const messages = await storage.getMessages();
      
      res.status(201).json({
        ...message,
        count: messages.length
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data format", errors: error.errors });
      }
      log(`Error adding message: ${error instanceof Error ? error.message : String(error)}`, "api-error");
      res.status(500).json({ message: "Failed to add message" });
    }
  });

  // Route to delete a message
  app.delete("/api/messages/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid message ID" });
      }

      const success = await storage.deleteMessage(id);
      if (success) {
        // Get updated message count after deletion
        const messages = await storage.getMessages();
        
        res.status(200).json({
          message: "Message deleted successfully",
          count: messages.length
        });
      } else {
        res.status(404).json({ message: "Message not found" });
      }
    } catch (error) {
      log(`Error deleting message: ${error instanceof Error ? error.message : String(error)}`, "api-error");
      res.status(500).json({ message: "Failed to delete message" });
    }
  });

  // Route to get storage statistics
  app.get("/api/stats", async (_req: Request, res: Response) => {
    try {
      // Get image stats
      const imageCount = await storage.getImagesCount();
      const imageUsagePercentage = (imageCount / MAX_FILES) * 100;
      
      // Get message stats
      const messages = await storage.getMessages();
      const messageCount = messages.length;
      
      // Total DB size (approx calculation based on average sizes)
      const avgImageSizeKB = 100; // Rough estimate for base64 encoded images
      const avgMessageSizeBytes = 200; // Rough estimate for a message entry
      
      const estimatedImageStorageKB = imageCount * avgImageSizeKB;
      const estimatedMessageStorageKB = (messageCount * avgMessageSizeBytes) / 1024;
      const totalStorageKB = estimatedImageStorageKB + estimatedMessageStorageKB;
      
      res.json({
        images: {
          count: imageCount,
          max: MAX_FILES,
          percentUsed: imageUsagePercentage.toFixed(1),
          remaining: MAX_FILES - imageCount
        },
        messages: {
          count: messageCount
        },
        storage: {
          estimatedKB: totalStorageKB.toFixed(2),
          estimatedMB: (totalStorageKB / 1024).toFixed(2)
        },
        limits: {
          maxFileSize: MAX_FILE_SIZE,
          maxFileSizeMB: (MAX_FILE_SIZE / 1024 / 1024).toFixed(2),
          maxFiles: MAX_FILES
        },
        serverTime: new Date().toISOString()
      });
    } catch (error) {
      log(`Error fetching stats: ${error instanceof Error ? error.message : String(error)}`, "api-error");
      res.status(500).json({ message: "Failed to fetch storage statistics" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ 
      status: "ok", 
      version: "1.0.0",
      timestamp: new Date().toISOString() 
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
