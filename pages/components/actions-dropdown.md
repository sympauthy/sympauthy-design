# ActionsDropdown

<p class="caps-note">Admin · specified here, implemented in the app</p>

The actions of one record or page in the admin: a [Menu](/components/menu) that knows about scopes.

**Trigger**: at the right end of the breadcrumb bar, saying "Actions".

**Scopes**: an item names the scopes its call is made under, and one the token lacks is drawn disabled, naming them as its `disabledReason`.

**The consumer provides** the items: label, icon, handler, the scopes each needs, and whether it destroys.
