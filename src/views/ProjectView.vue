<template>
  <div class="main">
    <div class="content" v-html="content"></div>
    <div class="infos">
      <div class="infos-block">
        <div class="header">
          <img v-if="project.imgPath" v-bind:src="project.imgPath" height="100" width="100" alt="Logo projet" />
          <h1>{{ project.name }}</h1>
        </div>
        <h3 v-if="project && project.description">
          {{ project.description }}
        </h3>
        <div v-if="project.created_at" class="date">
          <div class="btn btn-primary tooltip"><img src="@/assets/icons/calendrier.png" alt="Date" class="icon" />
            <div class="top">
              <h3>Date de création</h3>
              <i></i>
            </div>
          </div>
          <h3>{{ parseDate(project. created_at) }}</h3>
        </div>
        <div v-if="project.langs_frameworks && project.langs_frameworks.length > 0" class="frameworks_langs">
          <div v-for="framework in project.langs_frameworks" :key="framework" class="frameworks_langs">
            <div class="btn btn-primary tooltip"><img v-bind:src="chooseIcon(framework)" v-bind:alt="framework" class="icon" />
              <div class="top">
                <h3>{{ framework }}</h3>
                <i></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="project.tags" class="infos-block">
        <h2>
          Tags :
        </h2>
        <div class="tags">
          <TagCard v-for="tag in project.tags" v-bind:color="tag.color" v-bind:name="tag.name" v-bind:logo="tag.logo" :key="tag.name"></TagCard>
        </div>
      </div>
      <div v-if="project.contributors && project.contributors.length > 0" class="infos-block">
        <h2>
          Contributeurs :
        </h2>
        <div class="contributors">
          <ContributorCard v-for="contributor in project.contributors" v-bind:name="contributor.name" v-bind:logo="contributor.avatar" v-bind:github="contributor.github" :key="contributor.name"></ContributorCard>
        </div>
      </div>
      <div v-if="project.links.github && langs && langs.length > 0" class="langs">
        <h2>
          Composition du projet :
        </h2>
        <h3 v-for="lang in langs" v-bind:style="`color: ${lang.color}`" :key="lang.name">{{ lang.name }} : {{ lang.percent }}%</h3>
      </div>
      <div v-if="project.links.website || project.links.github || project.links.docs || project.links.additional && project.links.additional.length > 0" class="infos-block">
        <h2>
          Liens :
        </h2>
        <div class="links">
          <div v-if="project.links.website" class="linkDiv">
            <a v-bind:href="project.links.website" target="_blank">
              <img v-bind:src="require('@/assets/icons/site.png')" alt="Website" class="icon" />
              <h3>Site web</h3>
            </a>
          </div>
          <div v-if="project.links.github" class="linkDiv">
            <a v-bind:href="project.links.github" target="_blank">
              <img v-bind:src="require('@/assets/icons/github_black.png')" alt="GitHub" class="icon" />
              <h3>GitHub</h3>
            </a>
          </div>
          <div v-if="project.links.docs" class="linkDiv">
            <a v-bind:href="project.links.docs" target="_blank">
              <img v-bind:src="require('@/assets/icons/docs.png')" alt="Documentation" class="icon" />
              <h3>Documentation</h3>
            </a>
          </div>
          <div v-if="project.links.additional && project.links.additional.length > 0" class="linkDiv">
            <a v-for="link in project.links.additional" v-bind:href="link.link" target="_blank" :key="link.title">
              <img src="@/assets/icons/externalLink.png" alt="Additional link" class="icon" />
              <h3>{{ link.title }}</h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import projects from "@/assets/projects/projects.json";
import md from "md";
import moment from "moment/moment";
import TagCard from "@/components/TagCard.vue";
import ContributorCard from "@/components/ContributorCard.vue";
import {getRepositoryLangs} from "@/assets/scripts/githubAPI";
import githubColors from "@/assets/githubColors.json";

export default {
  name: "ProjectView",
  data() {
    return {
      project: { name: "Cool Project" },
      content: "Hello World",
      langs: []
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

    let langs = await getRepositoryLangs("https://github.com/Nonolanlan1007/portfolio")
    langs = langs.data
    // eslint-disable-next-line
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
      return "https://i.imgur.com/fNzvHhm.png";
    },
    parseDate (date) {
      return moment(date).format("DD/MM/YYYY");
    },
    toPercent (total, value) {
      return Math.round((value*100)/total);
    },
  },
  components: {
    TagCard,
    ContributorCard
  }
}
</script>

<style>
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
    box-shadow: inset 0 0 5px 3px rgba(0,0,0,0.7);
    padding: 5px;
    font-weight: bold;
    color: white;
  }

  @media all and (max-width: 480px) {
    .content * {
      word-wrap:break-word;
    }
  }
</style>

<style scoped>
  .main {
    display: flex;
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

  .infos-block {
    margin-top: 25px;
  }

  .icon {
    height: 35px;
    width: 35px;
    margin: 5px;
    border-radius: 100%;
  }
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .header img {
    border-radius: 100%;
    margin-right: 25px;
  }

  .tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .contributors {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .linkDiv a {
    display: flex;
    align-items: center;
    height: 25px;
    margin: 15px;
  }

  a {
    color: #0082ab;
    transition: all 0.3s ease-in-out;
  }

  a:hover {
    color: white;
    text-decoration: none;
  }

  .langs {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.98);
    border-radius: 1em;
    padding: 1em;
    margin: 15px;
  }

  .frameworks_langs {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .date {
    display: flex;
    align-items: center;
  }

  @media all and (max-width: 480px) {
    .main {
      display: block;
      margin-left: 0;
      margin-right: 0;
    }

    .infos {
      width: auto;
      margin-top: 50px;
      margin-left: 0;
      padding: 10px;
    }

    .langs {
      margin-top: 10px;
      margin-left: 10px;
      margin-right: 10px;
      padding: 15px;
    }
  }
</style>