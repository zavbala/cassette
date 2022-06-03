<template>
  <select v-model="state.market">
    <option v-for="(option, key) in options" :value="option.value" :key="key">
      {{ option.text }}
    </option>
  </select>
</template>

<script lang="ts">
import { state } from "../lib/store";

export default {
  data() {
    return {
      state,
      selected: "US",
      options: [
        { value: "AR", text: "Argentina" },
        { value: "AU", text: "Australia" },
        { value: "AT", text: "Austria" },
        { value: "BR", text: "Brazil" },
        { value: "CA", text: "Canada" },
        { value: "CL", text: "Chile" },
        { value: "CO", text: "Colombia" },
        { value: "DK", text: "Denmark" },
        { value: "FI", text: "Finland" },
        { value: "FR", text: "France" },
        { value: "DE", text: "Germany" },
        { value: "IN", text: "India" },
        { value: "ID", text: "Indonesia" },
        { value: "IE", text: "Ireland" },
        { value: "IT", text: "Italy" },
        { value: "JP", text: "Japan" },
        { value: "MX", text: "Mexico" },
        { value: "NZ", text: "New Zealand" },
        { value: "NO", text: "Norway" },
        { value: "PH", text: "Philippines" },
        { value: "PL", text: "Poland" },
        { value: "ES", text: "Spain" },
        { value: "SE", text: "Sweden" },
        { value: "", text: "The Netherlands" },
        { value: "UK", text: "UK" },
        { value: "US", text: "United States" },
      ],
    };
  },
};
</script>

<style>
select {
  color: var(--sulu);
  border: var(--sulu) 2px solid !important;
  padding: 2rem;
  border-radius: 5px;
  font-weight: 600;
}
</style>
