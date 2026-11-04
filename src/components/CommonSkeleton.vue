<script lang="ts" setup>
/**
 * The place of a value that has not arrived, the size of what will replace it, so that the screen
 * does not move when it does. A caller sizes it with `class`: it owns the color and the motion only.
 */
</script>

<template>
  <div
    class="cursor-progress rounded-md bg-gray-300 motion-safe:animate-pulse"
    aria-hidden="true"
  />
</template>
