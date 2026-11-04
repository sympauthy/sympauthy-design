# Control height

How tall a control is, and how large anything a person presses is.

## Usage

- **Every control is `control-height` tall, in both apps.** The flow chose it so a thumb hits a control on a phone; the admin follows, since it is used on tablets and phones too.
- **Everything a person presses is at least `control-height`**, so that it can be touched: a control, a menu item, a list option, a tab, a sidebar entry, a breadcrumb link, a radio's row.
- **A mark too small to draw at that size keeps its size and takes the target around it.** An icon beside a value or a word draws a pseudo-element `control-height` square, without opening up the line it sits on. A target may overlap what does nothing when pressed, such as the word beside it.
- **A link inside a sentence is the one exception**, since a target that size would cover the lines above and below it. Its height is the sentence's (WCAG 2.5.8 exempts it).
- **`.control` carries it** (`min-h-control min-w-control`), so a control is never shorter, nor narrower: an icon-only button is a square. The apps never write a height on a control.
- **What differs between the apps is the text inside**, not the box: the admin's buttons are `admin-strong` and as wide as their label; the flow's are 16px/600 and full width. Every text field is 16px in both.

| Control             | Component                           | Height                                       | Width                                                             |
| ------------------- | ----------------------------------- | -------------------------------------------- | ----------------------------------------------------------------- |
| Button, every style | `CommonButton`                      | `control-height`                             | its label, at least `control-height`; full width in the auth card |
| Icon-only button    | `CommonButton` with `collapseLabel` | `control-height`                             | `control-height`                                                  |
| Dropdown trigger    | `CommonMenu`'s button               | `control-height`                             | its label                                                         |
| Text field          | `FormInput`                         | `control-height`                             | its container                                                     |
| Select              | `FormSelect`                        | `control-height`                             | its container                                                     |
| Text area           | `FormTextarea`                      | at least `control-height`; set by its `rows` | its container                                                     |
| Radio option        | `FormRadioGroup`                    | at least `control-height`, the whole row     | its container                                                     |
| Code digit box      | `CodeInput`                         | 64px: larger, never smaller                  | shares the row                                                    |

## Tokens

<TokenTable group="size" :only="['control-height']" />

## Accessibility

- **`control-height` meets the touch targets a thumb needs**: Apple's minimum and WCAG's enhanced target size (2.5.5), both 44px.

## Related

- [Button](/components/button): every style, and the icon-only square.
- [Field](/components/field): the text field and the select.
- [Menu](/components/menu): its trigger.
- [CodeInput](/components/code-input): the one control taller than the rest.
