import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import type { Project } from '../interfaces/project.interface';
import { useLocalStorage } from '@vueuse/core';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []));

  const addProject = (name: string) => {
    if (name.length === 0) return;

    projects.value.push({
      id: uuidv4(),
      name,
      tasks: [],
    });
  };

  const addTaskToProject = (id: string, taskName: string) => {
    if (taskName.trim().length === 0) return;

    const project = projects.value.find((project) => project.id === id);

    if (!project) return;

    project.tasks.push({
      completedAt: null,
      id: uuidv4(),
      name: taskName,
    });
  };

  const toggleTask = (projectId: string, taskId: string) => {
    const project = projects.value.find((p) => p.id === projectId);

    if (!project) throw new Error(`Project ${projectId} not found`);

    const task = project.tasks.find((t) => t.id === taskId);

    if (!task) throw new Error(`Task ${taskId} not found`);

    task.completedAt = task.completedAt ? null : new Date();
  };

  return {
    // Properties
    projects,

    // Getters
    projectList: computed(() => [...projects.value]),
    isEmpty: computed(() => projects.value.length === 0),
    projectsWithCompletion: computed(() => {
      return projects.value.map((project) => {
        const total = project.tasks.length;
        const completed = project.tasks.filter((task) => task.completedAt).length;
        const completion = total === 0 ? 0 : (completed / total) * 100;

        return {
          id: project.id,
          name: project.name,
          taskCount: total,
          completion,
        };
      });
    }),

    // Actions
    addProject,
    addTaskToProject,
    toggleTask,
  };
});
