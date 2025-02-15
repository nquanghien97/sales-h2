import { UserEntity } from "./user";

export interface InsightMotherEntity {
  id: number;
  keyword: string;
  content: string;
  author: UserEntity
  createdAt: Date;
}