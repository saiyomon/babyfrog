import { pgTable, text, serial, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Schema for images
export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  data: text("data").notNull(), // base64 encoded image data
});

// Schema for messages
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
});

export const insertImageSchema = createInsertSchema(images).pick({
  filename: true,
  data: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  text: true,
});

export type InsertImage = z.infer<typeof insertImageSchema>;
export type Image = typeof images.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
