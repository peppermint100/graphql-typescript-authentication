import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { Field, ObjectType, ID } from "type-graphql"

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ length: 100, unique: true })
    email: string

    @Field()
    @Column()
    name: string

    @Column()
    password: string

    @Column({ default: false })
    confirmed: boolean
}