import { MeResolver } from './resolvers/user/Me';
import { RegisterResolver } from './resolvers/user/Register';
import { LoginResolver } from './resolvers/user/Login';
import { ConfirmUserResolver } from './resolvers/user/ConfirmUser';
import { FileUploadResolver } from './resolvers/fileupload/FileUpload';

import { buildSchema } from "type-graphql"

export const createSchema = () => {
    return buildSchema({
        // resolvers: [__dirname + "/resolvers/*/*.ts"],
        resolvers: [FileUploadResolver, ConfirmUserResolver, LoginResolver, RegisterResolver, MeResolver],
        authChecker: ({ context: { req } }) => !!req.session.userId
    })
}