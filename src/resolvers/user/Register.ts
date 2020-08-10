import { RegisterRequest } from './register/RegisterRequest';
import { Resolver, Query, Mutation, Arg, } from "type-graphql"
import bcrypt from "bcryptjs"
import { User } from "./../../entities/User"
import { sendEmail } from './../../utils/sendEmail';
import { createConfirmationUrl } from './../../utils/createConfirmationUrl';

@Resolver()
export class RegisterResolver {
    @Query(() => String)
    async helloWorld() {
        return "hello world"
    }

    @Mutation(() => User)
    async register(@Arg("data")
    {
        email,
        name,
        password
    }: RegisterRequest): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        }).save();

        await sendEmail(email, await createConfirmationUrl(user.id))

        return user;
    }
}