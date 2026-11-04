<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { SA_PAGE_ACTIONS_OUTLET } from '../../../src/index'

/**
 * `SaPageActions` for a demo in a frame. `SaPageActions` looks for its bar in the page's document, and
 * this in the document it was drawn into.
 */
const anchor = ref<HTMLElement>()
const outlet = ref<HTMLElement | null>(null)

onMounted(() => {
  outlet.value = anchor.value?.ownerDocument.getElementById(SA_PAGE_ACTIONS_OUTLET) ?? null
})
</script>

<template>
  <span ref="anchor" hidden />
  <Teleport v-if="outlet" :to="outlet"><slot /></Teleport>
</template>
