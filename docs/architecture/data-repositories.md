# Repositories

Repositories are the implementation logic of fetching and manipulating data provided by a data source. In our case it an api. It can also be localstorage or a database.

A ripository can also be an interector with some external service such as an error logger or a file uploader.

## Testing

Unit testing for repositories helps keep this layer

### Swagger CodeGen

An amazing solution to speed up development is Swagger code generation tool. It uses the Swagger openapi.json file to generate a typescript sdk library which very much resembles a repository that we can use.

https://github.com/swagger-api/swagger-codegen
