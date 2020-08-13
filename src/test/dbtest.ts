import { createConnection } from "typeorm"


export const dbtest = (drop: boolean = false) => {
    return createConnection(
        {
            "name": "default",
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "root",
            "password": "root",
            "database": "typegraphql_test",
            "synchronize": drop,
            "logging": drop,
            "entities": [
                "../entities/*.*"
            ]
        }
    )
}

export const dbsetup = () => {
    dbtest(true).then(() => process.exit())
}
