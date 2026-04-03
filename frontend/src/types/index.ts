export interface User {
  username: string;
  password: string;
}

export type ContentType = "youtube" | "twitter" | "article" | "document";

export interface Content {
  _id: string;
  title: string;
  link: string;
  type: ContentType;
  userId: string;
}

export interface ApiResponse<T> {
  message: string;
  data?: T;
  token?: string;
}