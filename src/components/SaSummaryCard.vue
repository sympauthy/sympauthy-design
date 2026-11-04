<script lang="ts" setup>
import SaCard from './SaCard.vue'

/**
 * The first thing on a record's page: what identifies the record, in a grid of `SaSummaryField`s. The
 * sections under it are `SaDetailSection`s rather than more of these.
 */
</script>

<template>
  <SaCard>
    <dl class="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-3">
      <slot />
    </dl>
  </SaCard>
</template>
