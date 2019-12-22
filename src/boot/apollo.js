import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import fetch from 'node-fetch';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { LocalStorage } from 'quasar';
import auth from './../store/auth';

// Config URL to call API
const uri = process.env.API;

// Error Handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    const Unauthorized =
      graphQLErrors[0].statusCode === 401 ||
      graphQLErrors[0].error === 'Unauthorized';

    if (Unauthorized) {
      auth.actions.forceLogout();
    }

    return false;
  }
  if (networkError) {
    // console.log(`[Network error]: ${networkError}`);
  }
});

// Create HTTP Link
const httpLink = createHttpLink({
  uri: uri,
  fetch: fetch,
  // headers: headers,
});

// Validate Token
const authMiddleware = setContext((request, previousContext) => {
  // Get user token
  let token = '';
  if (LocalStorage.getItem('USER_INFO')) {
    token = LocalStorage.getItem('USER_INFO').token;
  } else if (auth.state.currentUser) {
    token = auth.state.currentUser.token;
  }
  return {
    headers: {
      // Make sure you include any existing headers!
      ...previousContext.headers,
      authorization: `Bearer ${token}`,
    },
  };
});

// Create Apollo Link
const link = new ApolloLink.from([errorLink, authMiddleware, httpLink]);

// Create the apollo client
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

export default ({ app, Vue }) => {
  Vue.use(VueApollo);
  app.apolloProvider = apolloProvider;
};
