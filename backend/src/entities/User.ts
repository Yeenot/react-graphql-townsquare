import { Entity, Column, OneToMany } from "typeorm";

import { BaseEntity, IBaseEntity } from "./BaseEntity";
import { Post } from "./Post";

export interface IUser extends IBaseEntity {
  first_name: string;
  last_name: string;
  email: string;
}

@Entity("users")
export class User extends BaseEntity {
  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column({ unique: true })
  @Column()
  email!: string;

  // A user has many posts
  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];
}
