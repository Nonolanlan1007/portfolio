<template>
  <div class="langs">
    <h1 v-for="lang in langs" v-bind:style="`color: ${lang.color}`" :key="lang.name">{{ lang.name }} : {{ lang.percent }}%</h1>
    <button @click="this.$router.go(0)">Close popup</button>
  </div>
</template>

<script>
import { getRepositoryLangs } from "@/assets/scripts/githubAPI";
import githubColors from "@/assets/githubColors.json";

export default {
  name: "repoLangsPopUp",
  props: ["repo", "close"],
  data() {
    return {
      langs: []
    };
  },
  methods: {
    toPercent (total, value) {
      return Math.round((value*100)/total);
    },
  },
  async created() {
    let langs = await getRepositoryLangs("https://github.com/Nonolanlan1007/portfolio")
    langs = langs.data

    let total = Object.entries(langs).reduce((acc, [key, value]) => acc + value, 0)

    let newLangs = []

    for (const [key, value] of Object.entries(langs)) {
      if (githubColors[key]) newLangs.push({ name: key, color: githubColors[key].color, percent: this.toPercent(total, value), value: value })
      else {
        const currentOthers = newLangs.find(lang => lang.name === "Autres")

        if (currentOthers) {
          currentOthers.value += value
          currentOthers.percent = this.toPercent(total, currentOthers.value)
          newLangs = newLangs.filter(lang => lang.name !== "Autres")
          newLangs.push(currentOthers)
        } else {
          newLangs.push({ name: "Autres", color: "#000000", percent: this.toPercent(total, value), value: value })
        }
      }
    }
    this.langs = newLangs
    console.log(this.langs)
  }
}
</script>

<style scoped>
  .langs {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 500;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    border-radius: 1em;
    padding: 1em;
  }
</style>