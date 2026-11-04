<script lang="ts" setup>
import CommonCard from './CommonCard.vue'

/**
 * The fields of one record, a `DefinitionRow` each, inside the card a section is drawn in. The rows
 * carry their own padding, so the card carries none.
 */
</script>

<template>
  <CommonCard :padded="false">
    <dl class="divide-y divide-gray-200">
      <slot />
    </dl>
  </CommonCard>
</template>
