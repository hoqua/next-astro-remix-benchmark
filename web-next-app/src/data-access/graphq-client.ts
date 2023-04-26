import { webEnv } from '../environments/environment'
import {getGraphqlClient} from "@/app/lib/get-graphql-client";

const { api } = webEnv

export const gql = getGraphqlClient(api.gqlUrl)
