# Sidebar

<p class="caps-note">Admin · specified here, implemented in the app</p>

The admin's navigation: sections of entries on a Cassis ground, permanent from `lg:` and a drawer below it.

**Look**: `nav-ground`, `sidebar-width` (256px). Head 56px: the dark mark (`sympauthy-icon-dark.svg`, 24px), the wordmark in white and "Admin" in `nav-muted`, a `nav-divider` rule under it. Section labels 12px/600 uppercase `nav-muted`; entries 14px `nav-text`, 8px by 16px; hover `nav-hover`.

**Current entry**: `nav-active` fill, white 500 text, a 3px `gold` rule on its left edge: the only place gold marks state, echoing the key in the mark.

**Disabled entry**: `nav-disabled`, `aria-disabled="true"`, keeps focus, and says why in a tooltip on the right.

**Order**: sections and entries from the most used to the least; the first entry is the page the panel lands on (see the admin's page layout standard).

**The consumer provides** the sections from `navigation.ts`; the component reads the current route and the token's scopes.
