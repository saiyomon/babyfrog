import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertImageSchema, insertMessageSchema } from "@shared/schema";
import multer from "multer";
import { z } from "zod";

// Set up multer for memory storage (no file system writes)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (_req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Route to get all images
  app.get("/api/images", async (_req, res) => {
    try {
      const images = await storage.getImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch images" });
    }
  });

  // Route to upload an image
  app.post("/api/images", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      // Convert the image to base64
      const base64Image = req.file.buffer.toString("base64");
      const filename = req.file.originalname;

      // Validate and insert the image
      const validatedData = insertImageSchema.parse({
        filename,
        data: base64Image,
      });

      const image = await storage.addImage(validatedData);
      res.status(201).json(image);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data format", error });
      }
      res.status(500).json({ message: "Failed to upload image" });
    }
  });

  // Route to delete an image
  app.delete("/api/images/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid image ID" });
      }

      const success = await storage.deleteImage(id);
      if (success) {
        res.status(200).json({ message: "Image deleted successfully" });
      } else {
        res.status(404).json({ message: "Image not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete image" });
    }
  });

  // Route to get all messages
  app.get("/api/messages", async (_req, res) => {
    try {
      const messages = await storage.getMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Route to add a new message
  app.post("/api/messages", async (req, res) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      const message = await storage.addMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data format", error });
      }
      res.status(500).json({ message: "Failed to add message" });
    }
  });

  // Route to delete a message
  app.delete("/api/messages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid message ID" });
      }

      const success = await storage.deleteMessage(id);
      if (success) {
        res.status(200).json({ message: "Message deleted successfully" });
      } else {
        res.status(404).json({ message: "Message not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
