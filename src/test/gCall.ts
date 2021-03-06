import { graphql, GraphQLSchema } from "graphql";
import { createSchema } from "../createSchema";
import { Maybe } from "graphql/jsutils/Maybe";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

let schema: GraphQLSchema;

export default async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues
  });
};