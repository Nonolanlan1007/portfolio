<template>
  <router-link class="router-link" v-bind:to="`/projets/${String(id)}`">
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
        <div class="card-footer">
          <div style="display: flex">
            <div v-if="created_at" class="date">
              <img src="@/assets/icons/calendrier.png" alt="Calendar icon" class="icon" />
              <p>{{ parseDate(created_at) }}</p>
            </div>
            <div v-if="collaborators && collaborators.length > 0" style="align-items: center; display: flex; margin-left: 10px">
              <img src="@/assets/icons/collaborateurs.png" alt="Collaborateurs" class="icon" />
              <div class="collaborateurs" style="display: flex; align-items: center;">
                <img v-for="collaborator in collaborators.slice(0, 4)" v-bind:src="collaborator.avatar" alt="Collaborator logo" class="icon" :key="collaborator.name" />
                <img v-if="collaborators.length > 3" src="@/assets/icons/plus.png" alt="more" class="icon" />
              </div>
            </div>
          </div>
          <div v-if="frameworks_langs && frameworks_langs.length > 0" class="frameworks_langs">
            <img v-for="framework in frameworks_langs.slice(0, 6)" :key="framework" v-bind:src="chooseIcon(framework)" v-bind:alt="framework" class="icon" />
            <img v-if="frameworks_langs.length > 5" src="@/assets/icons/plus.png" alt="more" class="icon" />
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import TagCard from "@/components/TagCard.vue";
import moment from "moment";
moment.locale("fr");
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
    created_at: {
      type: Number,
      required: false,
    },
    collaborators: {
      type: Array,
      required: false,
    },
    id: {
      type: Number,
      required: true,
    }
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
    },
    parseDate (date) {
      return moment(date).format("DD/MM/YYYY");
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

.icon {
  height: 35px;
  width: 35px;
  margin: 5px;
  border-radius: 100%;
}

.date p {
  font-family: 'Nunito', sans-serif;
  color: white;
}

.date {
  display: flex;
  align-items: center;
  margin-right: 10px
}

.router-link {
  text-decoration: none;
  color: black;
}
</style>