<script lang="ts" setup>
import CommonCard from './CommonCard.vue'

/**
 * The first thing on a record's page: what identifies the record, in a grid of `SummaryField`s. The
 * sections under it are `DetailSection`s rather than more of these.
 */
</script>

<template>
  <CommonCard>
    <dl class="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-3">
      <slot />
    </dl>
  </CommonCard>
</template>
