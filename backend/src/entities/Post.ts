import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { BaseEntity, IBaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Category } from "./Category";

export interface IPost extends IBaseEntity {
  title: string;
  order: number;
}

@Entity("posts")
export class Post extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  order!: number;

  // Each post is belong to a category
  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn({ name: "category_id" })
  category!: Category;

  // Each post is belong to a user
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
