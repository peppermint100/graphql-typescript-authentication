import { Resolver, Mutation, Arg } from "type-graphql"
import { User } from "./../../entities/User"
import { redis } from "./../../redis"

@Resolver()
export class ConfirmUserResolver {
    @Mutation(() => Boolean)
    async confirmUser(
        @Arg("token") token: string
    ): Promise<boolean> {
        const userId = await redis.get(token)
        console.log("redis token : ", userId)

        await User.update({ id: parseInt(userId!, 10) }, { confirmed: true });
        await redis.del(token);

        if (!userId) return false

        return true
    }
}