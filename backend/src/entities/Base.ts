import {
  PrimaryGeneratedColumn,
  BaseEntity as TypeORMBaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import "reflect-metadata";

// Base entity interface
export interface IBaseEntity {
  id: number;
  created_at: Date;
  updated_at: Date;
}

// Base entity abstract class
export abstract class BaseEntity extends TypeORMBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
