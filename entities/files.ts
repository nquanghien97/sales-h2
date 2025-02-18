import { ImageCategory } from "@prisma/client";
import { UserEntity } from "./user";

export interface FilesEntity {
  id: number;
  category: ImageCategory;
  insightMotherId: number;
  authorId: number;
  url: string;
  type: 'image' | 'video'
  imageName: string;
  author: UserEntity
}