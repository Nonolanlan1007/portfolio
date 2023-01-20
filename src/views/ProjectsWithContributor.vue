<template>
  <div class="main">
    <div>
      <ProjectCard
          v-for="contribution in contributions"
          v-bind:name="contribution.name"
          v-bind:imgPath="contribution.imgPath"
          v-bind:shortDesc="contribution.shortDesc"
          v-bind:tags="contribution.tags"
          v-bind:description="contribution.description"
          v-bind:frameworks_langs="contribution.langs_frameworks"
          v-bind:created_at="contribution.created_at"
          v-bind:collaborators="contribution.contributors"
          v-bind:id="contribution.id"
          :key="contribution.id"
      ></ProjectCard>
      <ProjectCard v-if="!contributions || contributions.length === 0" v-bind:name="`Zut! ${this.$route.params.name} n'a participé à aucun projets !`"></ProjectCard>
    </div>
    <div class="infos">
      <img v-bind:src="githubProfile.avatar_url" alt="Avatar" class="circle" height="200" width="200" />
      <div class="content">
        <div class="btn btn-primary tooltip"><h1>{{ githubProfile.login }}</h1>
          <div class="top">
            <h3>{{ githubProfile.name || githubProfile.login }}</h3>
            <i></i>
          </div>
        </div>
        <h3>{{ githubProfile.bio }}</h3>
        <div v-if="githubProfile.location" class="flex">
          <div class="btn btn-primary tooltip"><img src="@/assets/icons/emplacement.png" alt="Emplacement" class="icon" />
            <div class="top">
              <h3>Localisation</h3>
              <i></i>
            </div>
          </div>
          <h3>{{ githubProfile.location }}</h3>
        </div>
        <div class="flex">
          <a v-bind:href="githubProfile.html_url" class="flex" target="_blank">
            <img src="@/assets/icons/github_black.png" alt="GitHub" class="icon" />
            <h3>Voir sur GitHub</h3>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import projects from "@/assets/projects/projects.json";
import ProjectCard from "@/components/ProjectCard.vue";
import { getUser } from "@/assets/scripts/githubAPI.js";

export default {
  name: "ProjectsWithContributor",
  data () {
    return {
      projects: projects,
      contributions: [],
      githubProfile: null
    }
  },
  components: {
    ProjectCard
  },
  async created () {

    let data = await getUser(this.$route.params.name);
    this.githubProfile = data.data;

    let allContributions = [];

    projects.forEach(x => {
      if (!x.contributors || x.contributors.length === 0) return;
      x.contributors.forEach(y => {
        if (y.name === this.$route.params.name) {
          allContributions.push(x);
        }
      });
    })

    if (allContributions.length === 0) this.$router.push({ name: "NotFound" });

    this.$data.contributions = allContributions;
  }
}
</script>

<style scoped>
  .infos {
    border-radius: 1em;
    background-color: #bebebe;
    filter: opacity(0.6);
    padding: 15px;
    padding-left: 25px;
    padding-right: 25px;
    margin: 10px;
    margin-top: 50px;
    display: flex;
  }

  .circle {
    border-radius: 100%;
  }

  .content {
    margin-left: 20px;
    margin-top: 20px;
  }

  .icon {
    height: 35px;
    width: 35px;
    margin: 5px;
    border-radius: 100%;
  }

  .flex {
    display: flex;
    align-items: center;
    margin: 15px;
  }

  .main {
    display: flex;
    align-items: center;
  }

  @media all and (max-width: 480px) {
    .main {
      display: block;
    }
    .infos {
      display: block;
    }
  }
</style>