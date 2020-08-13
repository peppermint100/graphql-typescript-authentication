import { dbtest } from './../../../test/dbtest';
import { Connection } from 'typeorm';
import gCall from "./../../../test/gCall"

let conn: Connection

beforeAll(async () => {
    conn = await dbtest()
})

afterAll(async () => {
    await conn.close()
})

const registerMutation = `
    mutation SignUp($data: RegisterRequest!){
  register(
    data: $data
  ) {
    id
    name
    email
  }
}
`

describe("SignUp", () => {
    it("create user", async () => {
        console.log(
            await gCall({
                source: registerMutation,
                variableValues: {
                    data: {
                        name: "iksuss",
                        email: "iksu@navsser.com",
                        password: "123123"
                    }
                }
            })
        )
    })
})