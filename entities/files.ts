import { UserEntity } from "./user";

export interface FilesEntity {
  id: number;
  slug: string;
  insightMotherId: number;
  authorId: number;
  url: string;
  type: 'image' | 'video'
  fileName: string;
  author: UserEntity
}