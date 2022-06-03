<template>
  <li @click="() => state.set('currentShow', item.id)">
    <img @dragstart.prevent :src="cover" :alt="item.name" loading="lazy" />
    <div>
      <span> {{ item.name }} </span>
      <small> {{ item.publisher }} </small>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { state } from "../lib/store";

export default defineComponent({
  data() {
    return {
      state,
      cover: "",
    };
  },
  props: {
    item: {
      type: Object as PropType<SpotifyApi.ShowObject>,
      required: true,
    },
  },
  created() {
    this.cover = this.$props.item.images[2].url;
  },
});
</script>

<style>
li {
  padding: 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.7rem;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
}

li:hover {
  background-color: var(--blue-zodiac);
}

li > div {
  margin-left: 2rem;
}

span {
  color: var(--sulu);
}

small {
  color: #fff;
  font-weight: 300;
}
</style>
