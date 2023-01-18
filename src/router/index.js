import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import ProjectsWithTag from "@/views/ProjectsWithTag.vue";

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/projects',
    name: 'ProjectsView',
    component: ProjectsView
  },
  {
    path: '/projects/tags/:tag',
    name: 'ProjectsWithTag',
    component: ProjectsWithTag
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
