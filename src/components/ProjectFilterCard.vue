<template>
  <div v-if="tags && tags.length > 0 || contributors && contributors.length > 0" class="main">
    <div v-if="tags && tags.length > 0">
      <h1>
        Filtrer par tag :
      </h1>
      <div class="tags">
        <Tag v-for="tag in tags" v-bind:name="tag.name" v-bind:color="tag.color" v-bind:logo="tag.logo" :key="tag.id"></Tag>
      </div>
    </div>
    <div v-if="contributors && contributors.length > 0" class="infos-block">
      <h2>
        Contributeurs :
      </h2>
      <div class="contributors">
        <ContributorCard v-for="contributor in contributors" v-bind:name="contributor.name" v-bind:logo="contributor.avatar" v-bind:github="contributor.github" :key="contributor.name"></ContributorCard>
      </div>
    </div>
  </div>
</template>

<script>
import projects from "@/assets/projects/projects.json";
import Tag from "@/components/TagCard.vue";
import ContributorCard from "@/components/ContributorCard.vue";

export default {
  name: "ProjectFilterCard",
  data: () => {
      return {
        projects: projects,
        tags: [],
        contributors: []
      }
  },
  created() {
    let allTags = []

    projects.forEach(x => {if (x.tags) x.tags.map(tag => allTags.push(tag))})

    allTags = allTags.filter((item, index, self) =>
        index === self.findIndex(t => t.name === item.name)
    );

    this.$data.tags = allTags

    let allContributors = []

    projects.forEach(x => {if (x.contributors) x.contributors.map(tag => allContributors.push(tag))})

    allContributors = allContributors.filter((item, index, self) =>
        index === self.findIndex(t => t.name === item.name)
    );

    this.$data.contributors = allContributors
  },
  components: {
    Tag,
    ContributorCard
  }
}
</script>

<style scoped>
  div.main {
    border-radius: 1em;
    background-color: #bebebe;
    filter: opacity(0.6);
    padding: 15px;
    padding-left: 25px;
    padding-right: 25px;
    margin: 10px;
    margin-top: 50px;
    max-width: 25%;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
  }
  .contributors {
    display: flex;
    flex-wrap: wrap;
  }
</style>