<script lang="ts" setup>
import SaCard from './SaCard.vue'

/**
 * The fields of one record, a `SaDefinitionRow` each, inside the card a section is drawn in. The rows
 * carry their own padding, so the card carries none.
 */
</script>

<template>
  <SaCard :padded="false">
    <dl class="divide-y divide-gray-200">
      <slot />
    </dl>
  </SaCard>
</template>
