<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p class="py-4" v-if="description">{{ description }}</p>
      <div class="modal-action flex flex-col">
        <form method="dialog" @submit.prevent="submitValue">
          <input
            ref="inputRef"
            type="text"
            :placeholder="placeholder"
            class="input input-primary w-full flex-1"
            v-model="inputValue"
          />

          <!-- if there is a button in form, it will close the modal -->

          <div class="flex justify-end mt-5 gap-2">
            <button @click="$emit('close')" class="btn">Close</button>
            <button type="submit" class="btn btn-primary">Ok</button>
          </div>
        </form>
      </div>
    </div>
  </dialog>

  <div v-if="open" class="modal-backdrop fixed inset-0 z-10"></div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue';

interface Props {
  open: boolean;
  placeholder?: string;
  title: string;
  description?: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  close: [void];
  value: [text: string];
}>();

const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

watch(props, async ({ open }) => {
  if (open) {
    await nextTick();
    inputRef.value?.focus();
  }
});

const submitValue = () => {
  if (!inputValue.value.trim()) {
    inputRef.value?.focus();

    return;
  }

  emits('value', inputValue.value.trim());
  emits('close');

  inputValue.value = '';
};
</script>
