import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type UserRoleType = "admin" | "editor" | "ghost";

@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;


}
