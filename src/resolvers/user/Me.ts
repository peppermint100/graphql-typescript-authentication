import { MyContext } from './../../types/MyContext';
import { Resolver, Query, Ctx } from "type-graphql"
import { User } from "./../../entities/User"

@Resolver()
export class MeResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext) {
        if (!ctx.req.session!.userId) return null

        return User.findOne({ where: { id: ctx.req.session!.userId } })
    }
}