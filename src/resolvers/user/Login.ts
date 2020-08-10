import { MyContext } from './../../types/MyContext';
import { Resolver, Mutation, Arg, Ctx } from "type-graphql"
import bcrypt from "bcryptjs"
import { User } from "./../../entities/User"

@Resolver()
export class LoginResolver {
    @Mutation(() => User)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: MyContext,
    ): Promise<User | undefined> {
        const user = await User.findOne({ where: { email } })

        if (!user) return undefined
        if (!user.confirmed) return undefined

        const decoded = await bcrypt.compare(password, user.password)

        if (!decoded) return undefined

        ctx.req.session!.userId = user.id;
        return user;
    }
}