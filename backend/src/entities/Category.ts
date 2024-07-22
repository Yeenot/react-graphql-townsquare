import { Entity, Column, OneToMany } from "typeorm";

import { BaseEntity, IBaseEntity } from "./BaseEntity";
import { Post } from "./Post";

export interface ICategory extends IBaseEntity {
  category: string;
}

@Entity("categories")
export class Category extends BaseEntity {
  @Column()
  name!: string;

  // A category has many posts
  @OneToMany(() => Post, (post) => post.category)
  posts!: Post[];
}
