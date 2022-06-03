<template>
  <aside :class="[state.currentShow ? 'visible' : 'invisible']">
    <div class="apart">
      <button @click="state.set('currentShow', '')">X</button>
      <button v-if="duration" @click="share">Share</button>
    </div>

    <section class="center">
      <img @click="open" @dragstart.prevent :src="cover" alt="" />

      <h1>
        {{ total }}
        <span> Episodes </span>
      </h1>

      <h1>
        {{ Math.floor(duration / 3.6e6) }}
        <span> Hrs </span>
      </h1>
    </section>
  </aside>
</template>

<script lang="ts">
import { state } from "../lib/store";
import { fetcher } from "../lib/spotify";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      state,
      cover: "",
      show: "",
      link: "",
      total: 0,
      duration: 0,
      tweet: "Hey I've listened SHOW for HRS hours and I love it.",
    };
  },
  methods: {
    async calculate() {
      let url = `shows/${this.state.currentShow}/episodes?market=US&limit=50`;
      let milisecs = 0;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { items, next } = (await fetcher(
          url
        )) as SpotifyApi.ShowEpisodesResponse;

        milisecs += items
          .map((episode) => episode.duration_ms)
          .reduce((t, v) => t + v, 0);

        if (!next) break;
        const [, endpoint] = next.split("/v1/");
        url = endpoint;
      }

      this.duration = milisecs;
    },
    share() {
      const text = this.tweet
        .replace("SHOW", this.show)
        .replace("HRS", String(Math.floor(this.duration / 3.6e6)));
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${this.link}`,
        "_blank"
      );
    },
    open() {
      window.open(this.link, "_blank");
    },
  },

  async mounted() {
    const {
      images,
      total_episodes,
      name,
      external_urls: { spotify },
    } = (await fetcher(
      `shows/${this.state.currentShow}?market=US`
    )) as SpotifyApi.ShowObject;

    this.cover = images[1].url;
    this.total = total_episodes;
    this.show = name;
    this.link = spotify;

    await this.calculate();
  },
});
</script>

<style>
aside {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--biscay);
  transition: all 0.2s;
  padding: 3rem;
}

aside > img {
  border-radius: 5px;
  width: 250px;
  height: 250px;
}

aside > section {
  flex-direction: column;
  gap: 1rem;
}

img > div {
  display: grid;
  grid-template-columns: repeat(1fr, 2);
}

.visible {
  opacity: 1;
  z-index: 100;
}

.invisible {
  opacity: 0;
  z-index: -100;
}

h1 {
  font-size: 4rem;
  color: var(--sulu);
}

@media screen and (max-width: 1024px) {
  h1 {
    font-size: 2.5rem;
  }
}
</style>
