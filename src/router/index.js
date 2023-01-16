import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import ProjectsView from "@/views/ProjectsView.vue";

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/projects',
    name: 'ProjectsView',
    component: () => ProjectsView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
