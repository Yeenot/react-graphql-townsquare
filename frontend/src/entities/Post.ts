import { IBaseEntity } from "./BaseEntity";
import { ICategory } from "./Category";
import { IUser } from "./User";

export interface IPost extends IBaseEntity {
  title: string;
  order: number;
  user: IUser;
  category: ICategory;
}

export interface IPostResponse {
  newPostOrder: IPost;
  posts: IPost[];
}
