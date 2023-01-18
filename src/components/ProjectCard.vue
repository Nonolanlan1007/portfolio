<template>
  <div class="card">
    <img v-if="imgPath" v-bind:src="imgPath" alt="Project logo" class="logo" />
    <div class="card-content">
      <h1>
        {{ name }}
      </h1>
      <div v-if="tags && tags.length > 0" class="tags">
        <TagCard v-for="tag in tags.slice(0, 5)" v-bind:color="tag.color" v-bind:name="tag.name" v-bind:logo="tag.logo" :key="tag.name"></TagCard>
      </div>
      <h3 v-if="description">
        {{ description.length > 200 ? description.slice(0, 201) + "..." : description }}
      </h3>
      <div v-if="frameworks_langs && frameworks_langs.length > 0" class="frameworks_langs">
          <img v-for="framework in frameworks_langs" :key="framework" v-bind:src="chooseIcon(framework)" v-bind:alt="framework" />
      </div>
    </div>
  </div>
</template>

<script>
import TagCard from "@/components/TagCard.vue";
export default {
  name: "ProjectCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    imgPath: {
      type: String || undefined,
      required: false,
    },
    tags: {
      type: Array,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    frameworks_langs: {
      type: Array,
      required: false,
    },
  },
  components: {
    TagCard,
  },
  methods: {
    chooseIcon (icon) {
      if (typeof icon !== "string") return;

      switch (icon) {
        case "vuejs": return "https://i.imgur.com/44BYsBc.png";
        case "reactjs": return "https://i.imgur.com/dJx1toy.png";
        case "javascript": return "https://i.imgur.com/bBbC1l1.png";
        case "html": return "https://i.imgur.com/kQ029gJ.png";
        case "css": return "https://i.imgur.com/YqExwBg.png";
        case "typescript": return "https://i.imgur.com/XRRobsJ.png";
        case "mongodb": return "https://i.imgur.com/NTYBYv4.png";
      }
      return "https://cdn.discordapp.com/avatars/692374264476860507/47dc8337803d2a8f284d2a6fdec829c6.png";
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 1em;
  background-color: #bebebe;
  filter: opacity(0.6);
  max-width: 50%;
  padding: 5px;
  margin: 10px;
  display: flex;
}

.logo {
  width: 250px;
  height: 250px;
  margin: 10px;
  border-radius: 100%;
  background: linear-gradient(270deg, #04354e, #0082ab);
  background-size: 400% 400%;

  -webkit-animation: AnimationName 19s ease infinite;
  -moz-animation: AnimationName 19s ease infinite;
  -o-animation: AnimationName 19s ease infinite;
  animation: AnimationName 19s ease infinite;
}

.card-content {
  margin: 20px;
}

.tags {
  display: flex;
}

h3 {
  font-family: 'Sofia Sans Condensed', sans-serif;
}

.frameworks_langs {
  display: flex;
}

.frameworks_langs img {
  height: 35px;
  width: 35px;
  margin: 5px;
  border-radius: 100%;
}
</style>