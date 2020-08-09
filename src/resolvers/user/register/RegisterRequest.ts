import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";

@InputType()
export class RegisterRequest {
    @Field()
    @Length(1, 255)
    name: string;

    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({ message: "Email Already In Use" })
    email: string;

    @Field()
    password: string;
}