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
    
    // Add default motivational messages for Valeria with cute pet names
    const defaultMessages = [
      "dumpling, ur the cutest bean in the world 🐸",
      "my smol baby, you make my heart go boing! 💕",
      "amor, ur smile is my sunshine & moonshine! ✨",
      "val, u r the pixelated princess of my heart! 👑",
      "crybaby, i love your tiny cheeks so much! 💖",
      "dumpling, ur tummy is the best place 4 cuddles 🫂",
      "baby, no frog could ever be as cute as u! 🐸💚",
      "amor, let's have a picnic by the pond soon! 🧺",
      "val, ur eyes sparkle brighter than pixel stars! ⭐",
      "crybaby, pls never stop being so smol & cute 🥹",
      "my dumpling is the most precious treasure! 💝",
      "amor, i love ur tiny hands & feet so much! 👣",
      "val, ur my player 2 in this game of life! 🎮",
      "baby, i'd cross 1000 pixel ponds 4 u! 🏊‍♀️",
      "crybaby, ur tears make the prettiest pearls 💧",
      "smol dumpling, ur the queen of this safe zone! 👑",
      "amor, let's craft our future together, block by block! 🏠",
      "val, when u smile my heart does a lil hop! 🦘",
      "baby, ur more precious than all the cherry blossoms! 🌸",
      "dumpling, ur voice is my favorite game soundtrack! 🎵"
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
