import { inject, type InjectionKey, type Ref } from 'vue'

/**
 * Set by the breadcrumb in a shell's bar while its link back stands below `sm:` where the control
 * opening the drawer would. Named here rather than written on both sides, since the bar and the shell
 * around it never meet.
 */
export const APP_SHELL_MENU_REPLACED: InjectionKey<Ref<boolean>> = Symbol(
  'sa-app-shell-menu-replaced'
)

/** Nothing for a breadcrumb drawn outside a shell, which has no control to stand in for. */
export const useAppShellMenuReplaced = () => inject(APP_SHELL_MENU_REPLACED, undefined)
