import { UserEntity } from "./user";

export interface HandleRejectionEntity {
  id: number;
  category: string;
  content: string;
  author: UserEntity
  createdAt: Date;
}