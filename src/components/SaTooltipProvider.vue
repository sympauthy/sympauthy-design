<script lang="ts" setup>
import { TooltipProvider } from 'reka-ui'

/**
 * Goes once at the root of an app that draws a `SaTooltip`. It holds the delay, which is also
 * what lets a pointer moving between two tooltips skip it.
 */
</script>

<template>
  <TooltipProvider :delay-duration="150">
    <slot />
  </TooltipProvider>
</template>
