import { UserEntity } from "./user";

export interface GuidesEntity {
  id: number;
  keyword: string;
  content: string;
  author: UserEntity
  createdAt: Date;
}