import { Entity, Column } from "typeorm";
import "reflect-metadata";
import { BaseEntity, IBaseEntity } from "./Base";

// Post entity interface
export interface IPost extends IBaseEntity {
  title: string;
  order: number;
}

@Entity()
export class Post extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  order!: number;
}
