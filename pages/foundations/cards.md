# Cards, radius and depth

- **The system is flat. Nothing casts a shadow**: not a card, a menu, a popover or a dialog. A surface is set apart by its `ink-200` border, and an open dialog also by its scrim.
- **There is one card**: `surface`, a 1px `ink-200` border, `radius-lg`, padded `space-4` then `space-6` from `sm:`. The flow's auth card, an admin `CommonCard`, a record's summary and section cards, and the box around a table are all this card; they differ only in width and in whether the content is flush (a table, a definition list) or padded.
- **A radius says what the thing is**: `radius-md` for a control, button, menu, alert or tag; `radius-lg` for a card, dialog or popover; `radius-full` for a spinner. Nothing else.
