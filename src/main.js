import './assets/main.css'
import "vue-connect-wallet/dist/style.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

import VueConnectWallet from "vue-connect-wallet";

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    cache,
    uri: 'https://api.thegraph.com/subgraphs/name/chimpytuts/darkpools-main-arbitrum',
})

const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})


const app = createApp(App)

app.use(router)
app.use(apolloProvider)
app.use(VueConnectWallet)

app.mount('#app')
