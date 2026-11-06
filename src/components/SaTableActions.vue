<script lang="ts" setup>
/**
 * The cell holding what can be done to a row: one mark, usually a `SaMenu` drawn with its `icon`. At
 * the row's end across, as tall as the mark whether or not the row has one, so that rows stay one
 * height. Below `sm:` it keeps one place in every row, the top right corner centred on the first
 * line, out of the row's flow: the record's name and its values lay out as they would without it,
 * and a row with no action is drawn as one with.
 */
</script>

<template>
  <td class="sa-cell-actions px-4 py-3 whitespace-nowrap">
    <div class="flex min-h-control items-center justify-end">
      <slot />
    </div>
  </td>
</template>
