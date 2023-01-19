<template>
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
</template>

<script>
import ProjectCard from "@/components/ProjectCard.vue";
import projects from "@/assets/projects/projects.json";

export default {
  name: "ProjectsView",
  data() {
    return {
      projects: projects
    };
  },
  components: {
    ProjectCard,
  },
}
</script>

<style scoped>
  .main {
    align-items: center;
    margin-top: 50px;
    margin-left: 50px;
  }
</style>