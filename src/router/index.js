import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import ProjectView from "@/views/ProjectView.vue";
import Error404View from "@/views/Error404View.vue";

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView,
        meta: {
            title: 'Acceuil'
        }
    },
    {
        path: '/projets',
        name: 'ProjectsView',
        component: ProjectsView,
        meta: {
            title: 'Projets'
        }
    },/*
    {
        path: '/projets/tags/:tag',
        name: 'ProjectsWithTag',
        component: ProjectsWithTag,
        meta: {
            title: 'Projets'
        }
    },*/
    {
        path: '/projets/:id',
        name: 'ProjectView',
        component: ProjectView,
        meta: {
            title: "Projet"
        }
    },
    {
        path: "/404",
        name: "NotFound",
        component: Error404View
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/404"
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
