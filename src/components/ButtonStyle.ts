export type ButtonStyle = {
  /** CSS classes applied to the button when it is active. */
  activeClasses: string
  /** CSS classes applied to the button when it is loading. */
  loadingClasses: string
  /** CSS classes applied to the button when it is submitting. */
  submittingClasses: string
  /** CSS classes applied to the button when it is disabled. */
  disabledClasses: string
}

/** What the screen is for. The only filled button of the system. */
export const primaryColoredButton: ButtonStyle = Object.freeze({
  activeClasses: 'border-transparent bg-primary text-on-primary hover:bg-primary-hover',
  loadingClasses: 'border-transparent bg-primary text-on-primary cursor-wait',
  submittingClasses: 'border-transparent bg-primary text-on-primary cursor-wait',
  disabledClasses: 'border-transparent bg-disabled text-on-disabled cursor-not-allowed'
})

/** Everything beside the primary action, in the admin. */
export const secondaryColoredButton: ButtonStyle = Object.freeze({
  activeClasses: 'border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200',
  loadingClasses: 'border-gray-200 bg-gray-100 text-gray-700 cursor-wait',
  submittingClasses: 'border-gray-200 bg-gray-100 text-gray-700 cursor-wait',
  // Paler than its active state, not darker: the toolbar's refresh control wears it on every fetch.
  disabledClasses: 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
})

/** The alternative path inside an auth card: an identity provider, "No, cancel". */
export const outlineColoredButton: ButtonStyle = Object.freeze({
  activeClasses: 'border-primary bg-transparent text-primary hover:bg-primary-subtle',
  loadingClasses: 'border-primary bg-transparent text-primary cursor-wait',
  submittingClasses: 'border-primary bg-transparent text-primary cursor-wait',
  disabledClasses: 'border-gray-200 bg-transparent text-gray-400 cursor-not-allowed'
})

/** What destroys or revokes, inside a confirmation only. Soft, so it never competes with primary. */
export const dangerColoredButton: ButtonStyle = Object.freeze({
  activeClasses: 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100',
  loadingClasses: 'border-red-200 bg-red-50 text-red-700 cursor-wait',
  submittingClasses: 'border-red-200 bg-red-50 text-red-700 cursor-wait',
  disabledClasses: 'border-transparent bg-disabled text-on-disabled cursor-not-allowed'
})
