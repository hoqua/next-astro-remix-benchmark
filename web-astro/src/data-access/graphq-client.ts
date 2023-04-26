import { webEnv } from '../environments/environment'
import {getGraphqlClient} from "../lib/get-graphql-client";

const { api } = webEnv

export const gql = getGraphqlClient(api.gqlUrl)
