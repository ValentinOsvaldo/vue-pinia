<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <div class="border-b border-blue-500">
        <slot name="header"></slot>
      </div>

      <div class="my-5">
        <slot name="body"></slot>
      </div>

      <div class="modal-action">
        <slot name="actions"></slot>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
interface Props {
  open?: boolean;
}
withDefaults(defineProps<Props>(), {
  open: false,
});
</script>
