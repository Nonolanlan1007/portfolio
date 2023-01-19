<template>
  <div class="main">
    <div class="content" v-html="content"></div>
    <div class="infos">
      <div class="infos-block">
        <h1>{{ project.name }}</h1>
        <h3 v-if="project && project.description">
          {{ project.description }}
        </h3>
        <div v-if="frameworks_langs && project.frameworks_langs.length > 0" class="frameworks_langs">
          <img v-for="framework in frameworks_langs.slice(0, 6)" :key="framework" v-bind:src="chooseIcon(framework)" v-bind:alt="framework" class="icon" />
          <img v-if="frameworks_langs.length > 5" src="@/assets/icons/plus.png" alt="more" class="icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import projects from "@/assets/projects/projects.json";
import md from "md";
import moment from "moment/moment";
//import { getRepository } from "@/assets/scripts/githubAPI.js";

export default {
  name: "ProjectView",
  data() {
    return {
      project: { name: "Cool Project" },
      content: "Hello World"
    };
  },
  async created () {
    const project = projects.find(project => project.id === Number(this.$route.params.id));
    if (!project) {
      this.$router.push({ name: "NotFound" });
    }
    this.project = project;

    if (project.content) {
      const htmlContent = md(project.content, {
        linksInNewTab: true
      });

      if (htmlContent) {
        this.content = htmlContent;
        console.log(this.content)
      }
    }
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
  },
}
</script>

<style>
  .main {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 50px;
    margin-left: 50px;
    margin-right: 50px;
  }

  .content {
    width: 75%;
    border-radius: 1em;
    background-color: #bebebe;
    filter: opacity(0.6);
    padding: 25px;
  }

  .infos {
    width: 25%;
    border-radius: 1em;
    background-color: #bebebe;
    filter: opacity(0.6);
    margin-left: 25px;
    padding: 25px;
  }

  pre {
    tab-size: 2;
    color: white;
    background: #263238;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px 3px rgba(0,0,0,0.7);
    padding: 20px;
    font-weight: bold;
  }

  .content blockquote {
    border-left: #0082ab 5px solid;
    padding-left: 15px;
  }

  .content p {
    font-size: 20px;
  }

  .content a {
    color: #0082ab;
    transition: all 0.3s ease-in-out;
  }

  .content a:hover {
    color: white;
    text-decoration: none;
  }

  .content strong {
    font-size: 25px;
  }

  .content p code {
    background: #263238;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px 3px rgba(0,0,0,0.7);
    padding: 5px;
    font-weight: bold;
    color: white;
  }

  .infos-block {
    margin-top: 25px;
  }
</style>