import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Length } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  password: string

  @Column({ default: true })
  isActive: boolean

  @Column({ nullable: true, type: "datetime" })
  lastLogin: Date;

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;

  hashPassword () {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid (unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
