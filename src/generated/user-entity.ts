import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { ProblemEntity } from "./problem-entity";
import { SubmissionEntity } from "./submission-entity";

@Index("user_email_key", ["email"], { unique: true })
@Index("user_pkey", ["id"], { unique: true })
@Index("user_name_key", ["name"], { unique: true })
@Entity("user", { schema: "public" })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id?: number;

  @Column("character varying", { name: "name", unique: true })
  name?: string;

  @Column("character varying", { name: "email", unique: true })
  email?: string;

  @Column("character varying", { name: "password" })
  password?: string;

  @Column("character varying", { name: "role", default: () => "'user'" })
  role?: string;

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "now()"
  })
  createdAt?: Date;

  @OneToMany(
    () => ProblemEntity,
    ProblemEntity => ProblemEntity.author
  )
  problems?: ProblemEntity[];

  @OneToMany(
    () => SubmissionEntity,
    SubmissionEntity => SubmissionEntity.user
  )
  submissions?: SubmissionEntity[];

  constructor(init?: Partial<UserEntity>) {
    Object.assign(this, init);
  }
}
