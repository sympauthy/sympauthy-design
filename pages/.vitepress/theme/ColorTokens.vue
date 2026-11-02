<script setup lang="ts">
import tokens from '../../../tokens.json'

const { themes, tokens: colors } = tokens.color
const [first] = themes

/** A token's literal in one theme: a value missing there is the first theme's, an alias is followed. */
function literal(name: string, theme: string): string {
  const { value } = colors.find((t) => t.name === name)!
  const byTheme = value as Record<string, string>
  const v = typeof value === 'string' ? value : (byTheme[theme] ?? byTheme[first.id])
  const alias = v.match(/^\{(.+)\}$/)
  return alias ? literal(alias[1], theme) : v
}
</script>

<template>
  <table class="color-tokens">
    <thead>
      <tr>
        <th>Token</th>
        <th v-for="theme in themes" :key="theme.id">{{ theme.name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="token in colors" :key="token.name">
        <td>
          <code>{{ token.name }}</code>
        </td>
        <td v-for="theme in themes" :key="theme.id">
          <span class="value">
            <i :style="{ background: literal(token.name, theme.id) }"></i>
            <code>{{ literal(token.name, theme.id) }}</code>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.value {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.value i {
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border: 1px solid var(--ink-200);
  border-radius: var(--radius-md);
}
</style>
