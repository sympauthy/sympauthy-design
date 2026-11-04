# BrandLogo

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaBrandLogo</code></p>

The deployment's logo, as the server answers it, and SympAuthy's where it answers none.

<div class="demo"><ClientOnly><div class="row">
  <SaBrandLogo />
  <SaBrandLogo large />
  <span class="inline-flex rounded-md bg-nav p-3"><SaBrandLogo dark /></span>
</div></ClientOnly></div>

The demo has no server behind it, so it draws SympAuthy's logos.

## Usage

- **The default**: on a light ground, in a page pinned light.
- **`dark`**: on a ground that is dark whatever the theme, such as the sidebar.
- **`followDevice`**: on a page that follows the device, which is a page whose `fetchBrand` answered `darkMode: 'auto'`. Under `off`, leave it unset, so that a dark device cannot draw the dark logo on a light page.
- **`large`**: heading a screen outside an app's shell.
- **Not for** the favicon: the server's `/branding/icon` is linked from `index.html` ([Using in the apps](/using-in-apps)).

## Look

- **Default size**: 24px tall and at most half the width of its row, so that a wide logo leaves the name room and is scaled rather than squashed.
- **`large`**: 40px tall.

## Behavior

- **Unreadable**: where the server answers no image, it draws the file of `logos/` for the same ground.

## Accessibility

- **Its `alt` is empty, because it is drawn beside the deployment's name** (WCAG 1.1.1). A logo with no name beside it needs a name from the consumer.

## API

The consumer provides the deployment's name beside it, and which ground it sits on.

| Name           | Type      | Default | Description                                              |
| -------------- | --------- | ------- | -------------------------------------------------------- |
| `dark`         | `boolean` | `false` | Drawn on a dark ground whatever the theme.               |
| `followDevice` | `boolean` | `false` | Follows the device's preference, and ignores `dark`.     |
| `large`        | `boolean` | `false` | The size a screen outside an app's shell is headed with. |
| `server`       | `string`  | `''`    | The server's origin, for an app hosted on another one.   |

## Related

- [Branding a deployment](/branding): what the server answers.
- [The mark](/foundations/mark): SympAuthy's own logo.
- [Sidebar](/components/sidebar): draws the `dark` logo.
