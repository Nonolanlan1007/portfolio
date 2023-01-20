<template>
  <div class="flex">
    <div class="main">
      <ProjectCard
          v-for="project in projects"
          v-bind:name="project.name"
          v-bind:imgPath="project.imgPath"
          v-bind:shortDesc="project.shortDesc"
          v-bind:tags="project.tags"
          v-bind:description="project.description"
          v-bind:frameworks_langs="project.langs_frameworks"
          v-bind:created_at="project.created_at"
          v-bind:collaborators="project.contributors"
          v-bind:id="project.id"
          :key="project.id"
      ></ProjectCard>
      <ProjectCard v-if="!projects || projects.length === 0" name="Zut! Il n'y a pour le moment aucuns projets affichés ici !"></ProjectCard>
    </div>
    <ProjectFilterCard></ProjectFilterCard>
  </div>
</template>

<script>
import ProjectCard from "@/components/ProjectCard.vue";
import projects from "@/assets/projects/projects.json";
import ProjectFilterCard from "@/components/ProjectFilterCard.vue";

export default {
  name: "ProjectsView",
  data() {
    return {
      projects: projects
    };
  },
  components: {
    ProjectCard,
    ProjectFilterCard
  },
}
</script>

<style scoped>
  .main {
    align-items: center;
    margin-top: 50px;
    margin-left: 50px;
    margin-right: 50px;
    width: 50%;
  }

  .flex {
    display: flex;
    width: 100%;
  }

  @media all and (max-width: 1000px) {
    .main {
      margin-left: 0;
      margin-right: 0;
      width: auto;
    }

    .flex {
      display: block;
    }
  }
</style>