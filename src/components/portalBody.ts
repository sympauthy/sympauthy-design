import { getCurrentInstance, onMounted, shallowRef } from 'vue'

/**
 * The body of the document this component is drawn in, for a portal to open in. It is the page's in
 * every app. A component teleported into a frame would otherwise open its overlay on the page around
 * the frame, away from what opened it.
 */
export function usePortalBody() {
  const instance = getCurrentInstance()
  const body = shallowRef<HTMLElement | undefined>()

  onMounted(() => {
    body.value = instance?.proxy?.$el?.ownerDocument?.body
  })

  return body
}
