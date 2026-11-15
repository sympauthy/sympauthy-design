# Control height

How tall a control is, and how large anything a person presses is.

## Usage

- **Every control is `control-height` tall, in both apps.** The flow chose it so a thumb hits a control on a phone; the admin follows, since it is used on tablets and phones too.
- **Everything a person presses but a link is at least `control-height`**, so that it can be touched: a control, a menu item, a list option, a tab, a sidebar entry, a radio's row.
- **A mark too small to draw at that size keeps its size and takes the target around it.** An icon beside a value or a word draws a pseudo-element `control-height` square, without opening up the line it sits on. A target may overlap what does nothing when pressed, such as the word beside it.
- **A link keeps the height of its text**, inside a sentence or in a list of links, since a target that size would cover the lines above and below it or space a list out of the layout it sits in. Links stacked one under another are set at least 24px apart, so that two targets never overlap (WCAG 2.5.8). A component may still give a link a `control-height` target where it stands alone, as `SaLink` and `SaRecordLink` do.
- **`.sa-control` carries it** (`min-h-control min-w-control`), so a control is never shorter, nor narrower: an icon-only button is a square. The apps never write a height on a control.
- **What differs between the apps is the text inside**, not the box: the admin's buttons are `panel-strong` and as wide as their label; the flow's are 16px/600 and full width. Every text field is 16px in both.

| Control             | Component                                                  | Height                                       | Width                                                             |
| ------------------- | ---------------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------- |
| Button, every style | `SaButton`                                                 | `control-height`                             | its label, at least `control-height`; full width in the auth card |
| Icon-only button    | `SaButton` with `iconOnly`, or `collapseLabel` below `sm:` | `control-height`                             | `control-height`                                                  |
| Dropdown trigger    | `SaMenu`'s button                                          | `control-height`                             | its label                                                         |
| Text button         | `SaButton` with `variant="text"`                           | `control-height`                             | its label, at least `control-height`                              |
| Link standing alone | `SaLink`                                                   | its line, with a `control-height` target     | its label, at least `control-height`                              |
| Text field          | `SaInput`                                                  | `control-height`                             | its container                                                     |
| Select              | `SaSelect`                                                 | `control-height`                             | its container                                                     |
| Combobox            | `SaCombobox`'s button                                      | `control-height`                             | its container                                                     |
| Password toggle     | `SaPasswordInput`'s eye                                    | its icon, with a `control-height` target     | its icon, with a `control-height` target                          |
| Disclosure head     | `SaDisclosure`'s button                                    | `control-height`                             | its container                                                     |
| Text area           | `SaTextarea`                                               | at least `control-height`; set by its `rows` | its container                                                     |
| Radio option        | `SaRadioGroup`                                             | at least `control-height`, the whole row     | its container                                                     |
| Code digit box      | `CodeInput`                                                | 64px: larger, never smaller                  | shares the row                                                    |

## Tokens

<TokenTable group="size" :only="['control-height']" />

## Accessibility

- **`control-height` meets the touch targets a thumb needs**: Apple's minimum and WCAG's enhanced target size (2.5.5), both 44px.
- **A link meets the minimum target size by its spacing** (WCAG 2.5.8): inside a sentence it is exempt, and links in a list are 24px apart.

## Related

- [Button](/components/button): every style, and the icon-only square.
- [Field](/components/field): the text field, the password toggle and the select.
- [Combobox](/components/combobox): its button.
- [Disclosure](/components/disclosure): its head.
- [Link](/components/link): `SaLink`'s target.
- [Menu](/components/menu): its trigger.
- [CodeInput](/components/code-input): the one control taller than the rest.
