# Control height

- **Every control is `control-height` (44px) tall, in both apps.** The flow chose 44px so a thumb hits a control on a phone; the admin follows, since it is used on tablets and phones too. 44px is Apple's minimum touch target and WCAG's enhanced target size (2.5.5).
- **`.control` carries it** (`min-h-control min-w-control`), so a control is never shorter, nor narrower: an icon-only button is a 44px square. The apps never write a height on a control.
- **What differs between the apps is the text inside**, not the box: the admin's buttons are 14px/500 and as wide as their label; the flow's are 16px/600 and full width. Every text field is 16px in both.

| Control             | Component                           | Height                                       | Width                                                 |
| ------------------- | ----------------------------------- | -------------------------------------------- | ----------------------------------------------------- |
| Button, every style | `CommonButton`                      | `control-height`                             | its label, at least 44px; full width in the auth card |
| Icon-only button    | `CommonButton` with `collapseLabel` | `control-height`                             | `control-height`                                      |
| Dropdown trigger    | `ActionsDropdown`'s button          | `control-height`                             | its label                                             |
| Text field          | `FormInput`                         | `control-height`                             | its container                                         |
| Select              | a select in a `FormField`           | `control-height`                             | its container                                         |
| Text area           | a text area in a `FormField`        | at least `control-height`; set by its `rows` | its container                                         |
| Code digit box      | `CodeInput`                         | 64px: larger, never smaller                  | shares the row                                        |
