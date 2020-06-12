import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { CodeEntity } from "./code-entity";
import { ProblemEntity } from "./problem-entity";
import { UserEntity } from "./user-entity";

@Index("submission_pkey", ["id"], { unique: true })
@Entity("submission", { schema: "public" })
export class SubmissionEntity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()"
  })
  id?: string;

  @Column("character varying", { name: "status", default: () => "'Pending'" })
  status?: string;

  @Column("double precision", { name: "score", nullable: true, precision: 53 })
  score?: number | null;

  @Column("integer", { name: "time_usage", nullable: true })
  timeUsage?: number | null;

  @Column("integer", { name: "memory_usage", nullable: true })
  memoryUsage?: number | null;

  @Column("text", { name: "test_points", nullable: true })
  testPoints?: string | null;

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "now()"
  })
  createdAt?: Date;

  @ManyToOne(
    () => CodeEntity,
    CodeEntity => CodeEntity.submissions,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "code_id", referencedColumnName: "id" }])
  code?: CodeEntity;

  @ManyToOne(
    () => ProblemEntity,
    ProblemEntity => ProblemEntity.submissions,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "problem_id", referencedColumnName: "id" }])
  problem?: ProblemEntity;

  @ManyToOne(
    () => UserEntity,
    UserEntity => UserEntity.submissions,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user?: UserEntity;

  constructor(init?: Partial<SubmissionEntity>) {
    Object.assign(this, init);
  }
}
