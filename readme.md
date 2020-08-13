## Stacks
1. Typescript
2. NodeJS
3. Express
4. GraphQL
5. TypeGraphQL
6. TypeORM
7. Redis
8. Session
...


### Postman Settings when use fileupload resolver

- operations: {"query":"mutation FileUpload ($picture: Upload!){\n  uploadImage(picture: $picture)\n}"})
- map: {"0": ["variables.picture"]} => picture needs to match with mutation parameter 
- 0 : file.jpg => set hashmap in formdata