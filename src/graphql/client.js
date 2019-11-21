import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import VueApollo from 'vue-apollo'
import { getEnvParams } from './../assets/resources/scripts/rdsENV';
import { ADMIN_AUTH_TOKEN } from './../assets/resources/scripts/serviceConst';

const { uri } = getEnvParams();

const httpLink = new HttpLink({
  uri
})

// Error Handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
    window.location.href = '/#/signin';
    return false;
  }
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authMiddleware = setContext(async (request, { headers }) => {
  const token = localStorage.getItem(ADMIN_AUTH_TOKEN) || null
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  }
})

const links = new ApolloLink.from([errorLink, authMiddleware, httpLink])
// Create the apollo client
export const apolloClient = new ApolloClient({
  link: links,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

// Install the Vue plugin
Vue.use(VueApollo)

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})
