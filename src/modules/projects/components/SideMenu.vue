<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <h2 class="text-lg font-bold mx-4">
      <router-link to="/"> Proyectos </router-link>
    </h2>
    <p class="text-sm text-gray-500 mx-4" v-if="projectsStore.isEmpty">No hay proyectos</p>
    <ul v-else class="menu w-full">
      <li v-for="project in projectsStore.projectList" :key="project.id">
        <template v-if="project.tasks.length >= 1">
          <details open>
            <summary>
              <router-link :to="{ path: `/project/${project.id}` }">
                {{ project.name }}
              </router-link>
            </summary>
            <ul>
              <li v-for="task in project.tasks" :key="task.id">
                <router-link :to="{ path: `/project/${project.id}` }">{{ task.name }}</router-link>
              </li>
            </ul>
          </details>
        </template>

        <template v-else>
          <router-link :to="{ path: `/project/${project.id}` }">{{ project.name }}</router-link>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { useProjectsStore } from '../stores/projects.store';

const projectsStore = useProjectsStore();
</script>
