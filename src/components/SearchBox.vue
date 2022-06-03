<template>
  <div class="box">
    <input
      ref="inputRef"
      v-model="state.query"
      type="search"
      placeholder="Search Podcast..."
    />
    <button
      v-if="state.query.length"
      type="button"
      @click="state.set('query', '')"
    >
      X
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { state } from "../lib/store";

export default defineComponent({
  setup() {
    const inputRef = ref<HTMLInputElement>();
    onMounted(() => inputRef.value?.focus());

    return {
      state,
    };
  },
});
</script>

<style>
.box {
  margin: 2rem 0;
  color: var(--sulu);
  border: var(--sulu) 5px solid;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
}

input[type="search"] {
  font-size: 4rem;
  color: inherit;
  width: 100%;
  font-weight: 600;
  text-transform: capitalize;
}

@media screen and (max-width: 1024px) {
  .box {
    padding: 1rem;
    width: 90%;
    margin: 2rem auto;
  }

  input[type="search"] {
    font-size: 2rem;
  }
}
</style>
