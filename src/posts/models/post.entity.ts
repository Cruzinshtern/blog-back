import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class PostEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  author: string;

  @Column({ unique: true })
  title: string;

  @Column()
  text: string;
}
