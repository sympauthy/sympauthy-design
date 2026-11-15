# Focus management

Where the focus goes as a person moves through an app: what the components move themselves, and what an app built with them moves.

## Usage

- **The focus stays where the person put it, unless what holds it goes away or the screen changes.** An app never moves it as content arrives, as a person types, or on a timer: a person on a keyboard or a screen reader loses their place each time it does.
- **A new screen puts the focus on its name.** After the app navigates, it focuses the screen's `h1`: in an app built like the admin, the one [Breadcrumb](/components/breadcrumb) draws, whose `id` is `SA_PAGE_HEADING`; in the flow, its card's title. A screen reader then says where the person arrived, and Tab goes on from the top of the page. The first load keeps the browser's own start, and a change that leaves the person on the same screen, such as a filter, a sort or a page of a list, moves nothing.
- **A screen puts no field in focus as it opens.** Its name takes the focus, and the first field is one Tab away.
- **An overlay takes the focus as it opens and gives it back as it closes.** The components do this themselves, through their reka-ui primitive: a [Dialog](/components/dialog) starts on its first control, a [ConfirmDialog](/components/confirm-dialog) on Cancel, a [Combobox](/components/combobox) on its search. Closing returns the focus to what opened the overlay, but for a press outside it, which leaves the focus where the person pressed. An app writes no focus for an overlay.
- **A failed submit puts the focus on what failed.** A form of more than three fields leads with an [ErrorSummary](/components/error-summary), which takes the focus itself after the app's own validation, and from the app's call to its `focus()` after the server's. A shorter form focuses its first invalid field. A failure that is no field's is an [Alert](/components/alert), which is announced where it appears and moves no focus.
- **An action that leaves the person on the screen leaves the focus where it was.** What it changed says so on the screen, as a copy control saying "Copied", and a screen reader hears it through the part that changed.
- **What removes the focused part hands the focus on.** A row deleted from a list gives it to the next row's record link, or the previous one's at the end, or to the screen's name once the list is empty. An action that leaves the screen it was on, such as deleting the record the screen showed, is a new screen, and the rule above holds.
- **The order of the focus is the order of reading.** The order of the markup is the order on screen, so that Tab follows the eye, and no `tabindex` is above 0. What takes the focus from script and not from Tab, as a screen's name or an error summary, takes `tabindex="-1"`.
- **The focus is always seen where the keyboard moved it.** Which ring is drawn is [Focus, states and motion](/foundations/focus)'s; a screen's name, being no control, draws none.

## Accessibility

- **The focus moves in an order that keeps the meaning of the screen** (WCAG 2.4.3): a new screen starts at its name, an overlay holds the focus until it closes and gives it back, and a removed part hands it on rather than dropping it to the page.
- **An error is pointed out where the person is** (WCAG 3.3.1): the focus moves to the summary of a long form, or to the field of a short one.
- **A status that moves no focus is still heard** (WCAG 4.1.3): an [Alert](/components/alert) carries its role, and a change in place is said by the part that changed.

## Related

- [Breadcrumb](/components/breadcrumb): the screen's name, which a new screen focuses.
- [Dialog](/components/dialog): where its focus starts, and where it returns.
- [ConfirmDialog](/components/confirm-dialog): focus starting on Cancel.
- [Combobox](/components/combobox): its search, and the field the focus returns to.
- [ErrorSummary](/components/error-summary): the focus a failed submit takes, and its `focus()`.
