<script lang="ts" setup>
import { getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'

/** One invalid field: the `id` of its control, and the words of its own error line. */
export interface SaErrorSummaryError {
  for: string
  message: string
}

/**
 * Every invalid field of a form, at its top, linking to each. It takes the focus each time its form
 * is submitted and errors remain, so that a long form never fails out of sight, and draws nothing
 * while there are none.
 */
export interface SaErrorSummaryProps {
  /** Written whole, the count included, as "Fix 3 fields to continue". */
  title: string
  errors: SaErrorSummaryError[]
}

const props = defineProps<SaErrorSummaryProps>()

const titleId = useId()
const box = ref<HTMLElement>()

// The summary watches the form it sits in, so that an app has nothing to call. The form's own submit
// handler runs before this one, which is registered after it, so the errors it sets are read once
// they are drawn. A change to the errors with no submit moves nothing: the person is typing.
let form: HTMLFormElement | null = null

async function onSubmit() {
  await nextTick()
  if (props.errors.length > 0) {
    box.value?.focus()
  }
}

onMounted(() => {
  // The root is a comment while there is nothing to draw; its parent is in the form either way.
  const root = getCurrentInstance()?.proxy?.$el as Node | undefined
  form = root?.parentElement?.closest('form') ?? null
  form?.addEventListener('submit', onSubmit)
})

onBeforeUnmount(() => form?.removeEventListener('submit', onSubmit))

/** Moves the focus to the field, leaving the URL as it was: the link points at a place on the page. */
function follow(event: MouseEvent, id: string) {
  event.preventDefault()
  box.value?.ownerDocument.getElementById(id)?.focus()
}
</script>

<template>
  <!-- No live region: the focus it takes is what a screen reader announces, once. -->
  <div
    v-if="errors.length > 0"
    ref="box"
    tabindex="-1"
    role="group"
    :aria-labelledby="titleId"
    class="flex w-full gap-2 rounded-md border border-danger-line bg-danger-subtle p-3 text-sm text-danger outline-primary focus-visible:outline-2 focus-visible:outline-offset-2"
  >
    <ExclamationCircleIcon class="mt-0.5 size-4 shrink-0" />
    <div class="min-w-0">
      <p :id="titleId" class="font-semibold">{{ title }}</p>
      <ul>
        <li v-for="error in errors" :key="error.for">
          <a
            :href="`#${error.for}`"
            class="inline-flex min-h-control items-center underline outline-primary hover:no-underline focus-visible:outline-2"
            @click="follow($event, error.for)"
            >{{ error.message }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
