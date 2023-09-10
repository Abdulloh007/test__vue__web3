<script>
import gql from 'graphql-tag'
import { useMetaMaskWallet } from "vue-connect-wallet";
import {ref} from 'vue'

const address = ref(null);
const wallet = useMetaMaskWallet();

export default {
  apollo: {
    swaps: gql(`query {
      swaps(first: 5, orderBy: timestamp) {
        id,
        caller,
        tokenIn,
        tokenInSym,
        tokenOut,
        tokenOutSym,
        tokenAmountIn,
        tokenAmountOut,
        userAddress {
          id
        },
        poolId {
          id,
          name,
          owner,
          address,
          totalSwapVolume
        },
        timestamp
      }
    }`)
  },
  components: {},
  data() {
    return {
      swaps: ''
    }
  },
  methods: {
    connect: async () => {
      const accounts = await wallet.connect();
      if (typeof accounts === "string") {
        console.log("An error occurred" + accounts);
      }
      document.querySelector('.wallet__token').innerHTML = accounts[0];
    }
  },

}

</script>

<template>
  <div class="wrap">
    <ol class="list">
      <li v-for="item in swaps" class="swap">
        <p class="prop"> <b>Sender</b> {{ item.caller }}</p>
        <p class="prop"> <b>Receiver</b> {{ item.poolId.address }}</p>
        <p class="prop"> <b>In amount</b> {{ item.tokenAmountIn }} {{ item.tokenInSym }}</p>
        <p class="prop"> <b>Out amount</b> {{ item.tokenAmountOut }} {{ item.tokenOutSym }}</p>
        <p class="prop"> <b>Timestamp</b> {{ new Date(item.timestamp).toLocaleDateString() }} {{ new
          Date(item.timestamp).toLocaleTimeString() }}</p>
      </li>
    </ol>
    <button @click="connect" class="conn__btn">connect</button>
    <h4 class="wallet__token" ref="address"></h4>
  </div>
</template>

<style scoped>
.wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 100px auto;
  width: 100%;
  max-width: 1315px;
}

.list {
  width: 100%;
}

.swap {
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
}

.swap b {
  font-weight: bold;
}

.swap b::after {
  content: ':';
  font-weight: bold;
}

.conn__btn {
  margin: 50px 20px 50px 0;
  padding: 10px 15px;
  border-radius: 10px;
  background: #333333;
  border: 1px solid #fff;
  color: #fff;
}
</style>
