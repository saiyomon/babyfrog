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
    
    // Add default motivational messages for Valeria
    const defaultMessages = [
      "Valeria, your smile makes my world brighter! ❤️",
      "My little dumpling, you make my heart hop with joy! 🐸",
      "Being with you, Val, is my favorite place to be 💕",
      "You're toad-ally amazing, amor! I ribbit you! 🐸",
      "Every day with my baby feels like a sunny day! ☀️",
      "Val, your laugh is my favorite sound in the world 🎵",
      "You're my sunshine on cloudy days, dumpling ☁️",
      "Just thinking about you, crybaby, makes me smile 😊",
      "Amor, you make ordinary moments extraordinary ✨",
      "I'm so lucky to have you in my life, Valeria 🍀",
      "To my sweet Val, you're the most precious gift 💝",
      "My little dumpling, you're perfect in every way 💖",
      "Amor, I cherish every moment we spend together 💗",
      "Valeria, you're the cutest thing in my world 🌸",
      "Baby, your love fills my heart completely 💓",
      "Crybaby, your tears are as precious as pearls 💧",
      "Val, you're the melody that plays in my heart 🎵",
      "My dumpling, I fall more in love with you every day 💘",
      "To my amor, you light up even the darkest days ✨",
      "Valeria, you're my favorite thought every night and day 💭"
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
