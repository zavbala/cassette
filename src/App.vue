<template>
  <main class="center">
    <SearchBox />

    <ul v-if="state.query">
      <ShowItem v-for="item in state.shows" :key="item.id" :item="item" />
    </ul>
  </main>

  <footer>
    <a href="https://github.com/zavbala/cassette" target="_blank"> GitHub </a>
  </footer>

  <AnalyticsModal v-if="state.currentShow" />
</template>

<script lang="ts">
import SearchBox from "./components/SearchBox.vue";
import ShowItem from "./components/ShowItem.vue";
import AnalyticsModal from "./components/AnalyticsModal.vue";

import { getAccessToken } from "./lib/spotify";
import { defineComponent } from "vue";
import { state } from "./lib/store";

import "./assets/base.css";

export default defineComponent({
  data() {
    return {
      state,
    };
  },
  components: {
    SearchBox,
    ShowItem,
    AnalyticsModal,
  },
  async mounted() {
    const { access_token, token_type } = await getAccessToken();
    window.localStorage.setItem("token", `${token_type} ${access_token}`);
  },
});
</script>

<style>
footer {
  height: calc(2rem - 100vh);
  background-color: var(--blue-zodiac);
  display: flex;
  align-items: center;
  justify-content: center;
}

ul {
  width: 100%;
  height: 40vh;
}

main {
  max-width: 728px;
  margin: auto;
  height: 90vh;
  flex-direction: column;
}
</style>
