import { FILE_CATEGORY } from "@prisma/client";

export interface FileCategoriesEntity {
  id: number;
  title: string;
  category: FILE_CATEGORY;
  slug: string;
  createdAt: Date;
}