import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { UserEntity } from "./user-entity";
import { TagEntity } from "./tag-entity";
import { SubmissionEntity } from "./submission-entity";

@Index("problem_pkey", ["id"], { unique: true })
@Index("problem_title_key", ["title"], { unique: true })
@Entity("problem", { schema: "public" })
export class ProblemEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id?: number;

  @Column("character varying", { name: "title", unique: true })
  title?: string;

  @Column("text", { name: "background", nullable: true })
  background?: string | null;

  @Column("text", { name: "description" })
  description?: string;

  @Column("text", { name: "input_format" })
  inputFormat?: string;

  @Column("text", { name: "output_format" })
  outputFormat?: string;

  @Column("text", { name: "samples", nullable: true, default: () => "'[]'" })
  samples?: string | null;

  @Column("text", { name: "note", nullable: true })
  note?: string | null;

  @Column("integer", { name: "difficulty" })
  difficulty?: number;

  @Column("character varying", { name: "status" })
  status?: string;

  @Column("integer", { name: "positive_count", default: () => "0" })
  positiveCount?: number;

  @Column("integer", { name: "negative_count", default: () => "0" })
  negativeCount?: number;

  @Column("integer", { name: "accepted_count", default: () => "0" })
  acceptedCount?: number;

  @Column("integer", { name: "submission_count", default: () => "0" })
  submissionCount?: number;

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "now()"
  })
  createdAt?: Date;

  @Column("timestamp with time zone", {
    name: "updated_at",
    default: () => "now()"
  })
  updatedAt?: Date;

  @Column("integer", { name: "time_limit", nullable: true })
  timeLimit?: number | null;

  @Column("integer", { name: "memory_limit", nullable: true })
  memoryLimit?: number | null;

  @ManyToOne(
    () => UserEntity,
    UserEntity => UserEntity.problems,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "author_id", referencedColumnName: "id" }])
  author?: UserEntity;

  @ManyToMany(
    () => TagEntity,
    TagEntity => TagEntity.problems
  )
  @JoinTable({
    name: "problem_tag",
    joinColumns: [{ name: "problem_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "tag_id", referencedColumnName: "id" }],
    schema: "public"
  })
  tags?: TagEntity[];

  @OneToMany(
    () => SubmissionEntity,
    SubmissionEntity => SubmissionEntity.problem
  )
  submissions?: SubmissionEntity[];

  constructor(init?: Partial<ProblemEntity>) {
    Object.assign(this, init);
  }
}
