# Navigation

How a person moves between the screens of an app built like the admin, and how they get back. The flow has none of this: it is one card at a time, and a person moves on by finishing it.

## Usage

- **A screen's ancestors decide its navigation.** They are the screens above it: none for a collection, one for a record, two for a view of a record. A screen says where it is, and everything below follows from that.
- **What the bar starts with follows from them, at each width.**

| Ancestors   | Below `sm:`                                                      | `sm:` to `lg:`                                | From `lg:`                                     |
| ----------- | ---------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------- |
| None        | The control opening the drawer, then the screen's name           | The same                                      | The permanent sidebar, then the name           |
| One or more | A link back to the nearest, then its name over the screen's name | The drawer's control, the ancestors, the name | The permanent sidebar, the ancestors, the name |

- **The sidebar leads to the screens with no ancestors.** Those are where a person starts, so it never lists a record.
- **Below `sm:` the drawer opens only from a screen with no ancestors.** Deeper, a phone has room for one control at the start of the bar, and a way back is what a person looks for there. The way to the drawer is back up.
- **The way back goes up, and not through the browser's history.** It is a link to the nearest ancestor, so it leads to the same screen however the person arrived, a link from elsewhere included.
- **A record's name leads to it.** A collection's rows link through the record's name ([Table](/components/table)), and no row is a link as a whole.
- **A record's views depend on the width.** From `sm:` they are [Tabs](/components/tabs) under its summary, and the bar goes on naming the record. Below `sm:` it opens on its summary and a list of them, and each is a screen of its own with the record as its nearest ancestor.
- **Below `sm:` what a screen lets a person do is always a [Menu](/components/menu)'s mark with no border, at the end of the bar.** That holds for a single action too, so that a phone finds it in one place and in one shape on every screen. What explains a view goes first in that menu, since a phone has no tab to draw it beside.
- **Not for** a process with steps: a person finishes those, and there is nothing to go back up to.

## Accessibility

- **The link back draws no words, and is named for where it leads**, as "Back to Ada Lovelace" (WCAG 4.1.2).
- **Every screen has one `h1`, its own name**, whichever width draws it (WCAG 1.3.1). The name over it is its parent's, and sits outside the heading.

## Related

- [AppShell](/components/app-shell): the bar, the sidebar and the drawer.
- [Breadcrumb](/components/breadcrumb): the ancestors and the link back.
- [Sidebar](/components/sidebar): what leads to the screens with no ancestors.
- [RecordPage](/components/record-page): a phone's list of a record's views.
- [Tabs](/components/tabs): the same views, from `sm:`.
- [Menu](/components/menu): a screen's actions.
