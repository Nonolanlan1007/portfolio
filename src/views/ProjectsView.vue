<template>
  <div>
    <h1>Projects</h1>
    <ul>
      <li v-for="project in projects" :key="project.id">
        <router-link :to="'/projects/' + project.id">{{ project.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProjectsView"
}
</script>

<style scoped>

</style>