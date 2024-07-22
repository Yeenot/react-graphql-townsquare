import { IBaseEntity } from "./BaseEntity";

export interface IUser extends IBaseEntity {
  first_name: string;
  last_name: string;
  email: string;
}
