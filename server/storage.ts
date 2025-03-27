import { 
  images, type Image, type InsertImage,
  messages, type Message, type InsertMessage
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface with CRUD methods for storage
export interface IStorage {
  // Image methods
  getImages(): Promise<Image[]>;
  addImage(image: InsertImage): Promise<Image>;
  deleteImage(id: number): Promise<boolean>;
  
  // Message methods
  getMessages(): Promise<Message[]>;
  addMessage(message: InsertMessage): Promise<Message>;
  deleteMessage(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // Image methods
  async getImages(): Promise<Image[]> {
    return await db.select().from(images);
  }
  
  async addImage(insertImage: InsertImage): Promise<Image> {
    const [image] = await db
      .insert(images)
      .values(insertImage)
      .returning();
    return image;
  }
  
  async deleteImage(id: number): Promise<boolean> {
    const [deletedImage] = await db
      .delete(images)
      .where(eq(images.id, id))
      .returning();
    return !!deletedImage;
  }
  
  // Message methods
  async getMessages(): Promise<Message[]> {
    return await db.select().from(messages);
  }
  
  async addMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values(insertMessage)
      .returning();
    return message;
  }
  
  async deleteMessage(id: number): Promise<boolean> {
    const [deletedMessage] = await db
      .delete(messages)
      .where(eq(messages.id, id))
      .returning();
    return !!deletedMessage;
  }
}

export const storage = new DatabaseStorage();
