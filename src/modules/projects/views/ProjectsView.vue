<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Projecto</th>
          <th>Tareas</th>
          <th>Avance</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="hover:bg-base-300"
          v-for="(project, index) in projectsStore.projectsWithCompletion"
          :key="project.id"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ project.name }}</td>
          <td>{{ project.taskCount }}</td>
          <td>
            <div class="flex items-center gap-2">
              <progress
                class="progress progress-primary w-56"
                :value="project.completion"
                max="100"
              ></progress>
              <span> {{ project.completion.toFixed(0) }}% </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <input-modal
      :open="modalOpen"
      @close="modalOpen = false"
      @value="projectsStore.addProject"
      placeholder="Ingrese un valor"
      title="Nuevo proyecto"
      description="Ingrese el nombre del nuevo proyecto"
    />

    <custom-modal :open="customModalOpen">
      <template #header>
        <h1 class="mb-2 text-4xl">My title custom</h1>
      </template>

      <template #body>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium odio, inventore iure
          totam quis amet minima sapiente ad molestias sint, sunt tempore maxime culpa rerum alias
          quod quas corrupti? Voluptates!
        </p>
      </template>

      <template #actions>
        <div class="flex justify-end mt-5 gap-2">
          <button class="btn" @click="() => (customModalOpen = false)">Close</button>
        </div>
      </template>
    </custom-modal>

    <fab-button @click="modalOpen = true">
      <add-circle />
    </fab-button>

    <fab-button @click="customModalOpen = true" position="bottom-left">
      <add-circle />
    </fab-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import { useProjectsStore } from '../stores/projects.store';

const modalOpen = ref(false);
const customModalOpen = ref(false);

const projectsStore = useProjectsStore();
</script>
