# Themes

- **Light is the default and the first theme.** Every token has a Dark value.
- **The flow follows the device**: under `prefers-color-scheme: dark` it switches to the Dark values. An end user meets the flow inside an app that may already be dark, and a white flash on sign-in is jarring.
- **The admin stays light.** Its design-system standard defers dark mode; the Dark values are ready for when it adopts it.
