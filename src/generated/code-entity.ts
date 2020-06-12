import { Column, Entity, Index, OneToMany } from "typeorm";
import { SubmissionEntity } from "./submission-entity";

@Index("code_pkey", ["id"], { unique: true })
@Entity("code", { schema: "public" })
export class CodeEntity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()"
  })
  id?: string;

  @Column("character varying", { name: "lang" })
  lang?: string;

  @Column("text", { name: "content" })
  content?: string;

  @OneToMany(
    () => SubmissionEntity,
    SubmissionEntity => SubmissionEntity.code
  )
  submissions?: SubmissionEntity[];

  constructor(init?: Partial<CodeEntity>) {
    Object.assign(this, init);
  }
}
