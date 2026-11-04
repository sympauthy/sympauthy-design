# Control height

How tall a control is, in both apps.

## Usage

- **Every control is `control-height` tall, in both apps.** The flow chose it so a thumb hits a control on a phone; the admin follows, since it is used on tablets and phones too.
- **`.control` carries it** (`min-h-control min-w-control`), so a control is never shorter, nor narrower: an icon-only button is a square. The apps never write a height on a control.
- **What differs between the apps is the text inside**, not the box: the admin's buttons are `admin-strong` and as wide as their label; the flow's are 16px/600 and full width. Every text field is 16px in both.

| Control             | Component                           | Height                                       | Width                                                             |
| ------------------- | ----------------------------------- | -------------------------------------------- | ----------------------------------------------------------------- |
| Button, every style | `CommonButton`                      | `control-height`                             | its label, at least `control-height`; full width in the auth card |
| Icon-only button    | `CommonButton` with `collapseLabel` | `control-height`                             | `control-height`                                                  |
| Dropdown trigger    | `CommonMenu`'s button               | `control-height`                             | its label                                                         |
| Text field          | `FormInput`                         | `control-height`                             | its container                                                     |
| Select              | a select in a `FormField`           | `control-height`                             | its container                                                     |
| Text area           | a text area in a `FormField`        | at least `control-height`; set by its `rows` | its container                                                     |
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
