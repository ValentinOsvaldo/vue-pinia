<template>
  <div class="w-full" v-if="project">
    <section class="m-2">
      <bread-crums :name="project.name" />
    </section>

    <section class="m-2">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completada</th>
              <th>Nombre</th>
              <th>Completada en</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-base-300" v-for="task in project?.tasks" :key="task.id">
              <th>
                <input
                  type="checkbox"
                  :checked="!!task.completedAt"
                  @change="projectsStore.toggleTask(project.id, task.id)"
                  class="checkbox checkbox-primary"
                />
              </th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt?.toLocaleString() }}</td>
            </tr>
            <tr class="hover:bg-base-300">
              <th></th>
              <td>
                <input
                  type="text"
                  class="input input-primary w-full opacity-60 transition-all hover:opacity-100 focus:opacity-100"
                  placeholder="Nueva tarea"
                  v-model="taskName"
                  @keypress.enter="onAddTask"
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import BreadCrums from '@/modules/common/components/BreadCrums.vue';
import { useProjectsStore } from '../stores/projects.store';

interface Props {
  id: string;
}

const props = defineProps<Props>();
const router = useRouter();
const projectsStore = useProjectsStore();
const project = computed(() => {
  return projectsStore.projectList.find((project) => project.id === props.id);
});

const taskName = ref('');

const onAddTask = () => {
  if (!project.value) return;

  projectsStore.addTaskToProject(project.value.id, taskName.value);

  taskName.value = '';
};

watch(
  () => project.value,
  (newValue) => {
    if (!newValue) {
      router.replace('/');
    }
  },
  {
    immediate: true,
  },
);
</script>
