<script lang="ts" setup>
import { PAGE_ACTIONS_OUTLET } from './pageActionsOutlet'

/**
 * What a screen lets a person do, drawn in the bar that names the screen rather than wherever the
 * page happens to reach first, so that the control sits in the same place on every screen. It needs
 * a `CommonBreadcrumb` on screen to draw into.
 */
</script>

<template>
  <!-- Deferred, so the bar above is mounted by the time a page rendered in the same pass asks for
       it. -->
  <Teleport defer :to="`#${PAGE_ACTIONS_OUTLET}`">
    <slot />
  </Teleport>
</template>
