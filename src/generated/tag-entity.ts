import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { ProblemEntity } from "./problem-entity";

@Index("tag_pkey", ["id"], { unique: true })
@Index("tag_name_key", ["name"], { unique: true })
@Entity("tag", { schema: "public" })
export class TagEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id?: number;

  @Column("character varying", { name: "name", unique: true })
  name?: string;

  @ManyToMany(
    () => ProblemEntity,
    ProblemEntity => ProblemEntity.tags
  )
  problems?: ProblemEntity[];

  constructor(init?: Partial<TagEntity>) {
    Object.assign(this, init);
  }
}
