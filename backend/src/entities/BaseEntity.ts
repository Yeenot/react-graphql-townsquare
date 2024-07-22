import {
  PrimaryGeneratedColumn,
  BaseEntity as TypeORMBaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export interface IBaseEntity {
  id: number;
  created_at: Date;
  updated_at: Date;
}

// Base entity of all entities
export abstract class BaseEntity extends TypeORMBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
