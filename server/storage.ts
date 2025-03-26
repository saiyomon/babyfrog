import { 
  images, type Image, type InsertImage,
  messages, type Message, type InsertMessage
} from "@shared/schema";

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

export class MemStorage implements IStorage {
  private images: Map<number, Image>;
  private messages: Map<number, Message>;
  private imageId: number;
  private messageId: number;
  
  constructor() {
    this.images = new Map();
    this.messages = new Map();
    this.imageId = 1;
    this.messageId = 1;
    
    // Add default motivational messages
    const defaultMessages = [
      "I love how your smile lights up my world! ❤️",
      "You make my heart hop with joy! 🐸",
      "Being with you is my favorite place to be 💕",
      "You're toad-ally amazing! I ribbit you! 🐸",
      "Every day with you feels like a sunny day! ☀️",
      "Your laugh is my favorite sound in the world 🎵",
      "You're my sunshine on cloudy days ☁️",
      "Just thinking about you makes me smile 😊",
      "You make ordinary moments extraordinary ✨",
      "I'm so lucky to have you in my life 🍀"
    ];
    
    defaultMessages.forEach((text) => {
      const id = this.messageId++;
      this.messages.set(id, { id, text });
    });
  }
  
  // Image methods
  async getImages(): Promise<Image[]> {
    return Array.from(this.images.values());
  }
  
  async addImage(insertImage: InsertImage): Promise<Image> {
    const id = this.imageId++;
    const image: Image = { ...insertImage, id };
    this.images.set(id, image);
    return image;
  }
  
  async deleteImage(id: number): Promise<boolean> {
    return this.images.delete(id);
  }
  
  // Message methods
  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }
  
  async addMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageId++;
    const message: Message = { ...insertMessage, id };
    this.messages.set(id, message);
    return message;
  }
  
  async deleteMessage(id: number): Promise<boolean> {
    return this.messages.delete(id);
  }
}

export const storage = new MemStorage();
