<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import tokens from '../../../tokens.json'

const props = defineProps<{
  group: 'color' | 'type' | 'spacing' | 'radius' | 'size'
  only?: string[]
  except?: string[]
}>()

interface Cell {
  value: string
  specimen?: CSSProperties
  sample?: { text: string; style: CSSProperties }
}

interface Token {
  name: string
  value: string
  usage: string
}

interface Row {
  name: string
  usage: string
  cells: Cell[]
}

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

function colorRows(): Row[] {
  return colors.map(({ name, usage }) => ({
    name,
    usage,
    cells: themes.map((theme): Cell => {
      const value = literal(name, theme.id)
      return { value, specimen: { background: value, border: '1px solid var(--ink-200)' } }
    })
  }))
}

function typeRows(): Row[] {
  return tokens.type.groups.flatMap((group) =>
    group.styles.map(({ name, usage, ...style }) => {
      const s = style as typeof style & { family?: string; letterSpacing?: string }
      const family = s.family ?? group.family
      const parts = [`${s.fontSize}/${s.lineHeight}`, s.fontWeight, s.letterSpacing, family]
      const cell: Cell = {
        value: parts.filter(Boolean).join(' · '),
        sample: {
          text: s.sample,
          style: {
            fontFamily: `var(--font-${family})`,
            fontSize: s.fontSize,
            lineHeight: s.lineHeight,
            fontWeight: s.fontWeight,
            letterSpacing: s.letterSpacing
          }
        }
      }
      return { name, usage, cells: [cell] }
    })
  )
}

function plainRows(group: Token[], specimen?: (value: string) => CSSProperties): Row[] {
  return group.map(({ name, value, usage }) => ({
    name,
    usage,
    cells: [{ value, specimen: specimen?.(value) }]
  }))
}

const rows = computed(() => {
  const all = {
    color: colorRows,
    type: typeRows,
    spacing: () =>
      plainRows(tokens.spacing.tokens, (value) => ({
        width: value,
        background: 'var(--primary)'
      })),
    radius: () =>
      plainRows(tokens.radius.tokens, (value) => ({
        borderRadius: value,
        border: '1px solid var(--ink-400)'
      })),
    size: () => plainRows(tokens.size.tokens)
  }[props.group]()
  return all.filter(
    ({ name }) => (props.only?.includes(name) ?? true) && !props.except?.includes(name)
  )
})

const columns = computed(() => {
  if (props.group === 'color') return themes.map((theme) => theme.name)
  return [props.group === 'type' ? 'Sample' : 'Value']
})
</script>

<template>
  <table class="token-table">
    <thead>
      <tr>
        <th>Token</th>
        <th v-for="column in columns" :key="column">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.name">
        <td class="token">
          <code>{{ row.name }}</code>
          <p>
            <template v-for="(part, i) in row.usage.split('`')" :key="i">
              <code v-if="i % 2">{{ part }}</code>
              <template v-else>{{ part }}</template>
            </template>
          </p>
        </td>
        <td v-for="(cell, i) in row.cells" :key="i">
          <p v-if="cell.sample" class="sample" :style="cell.sample.style">{{ cell.sample.text }}</p>
          <span class="value">
            <span v-if="cell.specimen" class="specimen"><i :style="cell.specimen"></i></span>
            <code>{{ cell.value }}</code>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.token {
  min-width: 180px;
}

.token p {
  margin: 4px 0 0;
  color: var(--vp-c-text-2);
  line-height: 20px;
}

.sample {
  margin: 0 0 8px;
  min-width: 200px;
  color: var(--vp-c-text-1);
}

.value {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.specimen {
  flex: 0 0 auto;
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
}

.specimen i {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
