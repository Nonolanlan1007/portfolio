<template>
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
    <ProjectCard v-if="!contributions || contributions.length === 0" v-bind:name="`Zut! Aucun projet ne correspond à ce tag !`"></ProjectCard>
  </div>
</template>

<script>
import projects from "@/assets/projects/projects.json";
import ProjectCard from "@/components/ProjectCard.vue";

export default {
  name: "ProjectsWithTag",
  data () {
    return {
      projects: projects,
      contributions: []
    }
  },
  components: {
    ProjectCard
  },
  async created () {

    let allContributions = [];

    projects.forEach(x => {
      if (!x.tags || x.tags.length === 0) return;
      x.tags.forEach(y => {
        if (y.name === this.$route.params.tag) {
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

</style>