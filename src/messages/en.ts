/**
 * The words the components say the same on every screen, in English, under `sa` so that they never
 * meet an app's own keys. An app adds them to its messages as they are, beside its own.
 *
 * A word naming what is on a screen is not here: it stays a prop the app passes.
 */
export const SA_MESSAGES_EN = {
  sa: {
    appShell: {
      openMenu: 'Open menu'
    },
    breadcrumb: {
      label: 'Where you are',
      back: 'Back to {parent}'
    },
    combobox: {
      close: 'Close',
      clear: 'Clear'
    },
    confirmDialog: {
      cancel: 'No, cancel'
    },
    copy: {
      copied: 'Copied',
      failed: 'Could not copy'
    },
    errorSummary: {
      title: 'Fix 1 field to continue | Fix {count} fields to continue'
    },
    field: {
      optional: '(optional)'
    },
    listbox: {
      noMatch: 'Nothing matches'
    },
    loadingState: {
      label: 'Loading...'
    },
    pagination: {
      label: 'Pages',
      previous: 'Previous',
      next: 'Next',
      page: 'Page {page} of {totalPages}',
      range: 'Showing {from}-{to} of {total}'
    },
    passwordInput: {
      show: 'Show password'
    },
    sidebar: {
      label: 'Main',
      close: 'Close menu'
    },
    sidebarAccount: {
      signOut: 'Sign out'
    },
    tableEnd: {
      loading: 'Loading more records...',
      end: '{total} record | All {total} records shown',
      retry: 'Retry'
    },
    tableFilters: {
      list: 'Active filters',
      clear: 'Clear filters',
      add: 'Add filter',
      searchFields: 'Search fields',
      searchValues: 'Search values',
      operator: 'Condition',
      value: 'Value',
      choose: 'Choose...',
      addValue: 'Add a value',
      yes: 'Yes',
      no: 'No',
      remove: 'Remove the {field} filter',
      /** What an operator reads over a quantity or a text. */
      operators: {
        eq: 'is',
        ne: 'is not',
        lt: 'is less than',
        lte: 'is at most',
        gt: 'is more than',
        gte: 'is at least',
        in: 'is one of',
        contains: 'contains',
        starts_with: 'starts with',
        is_null: 'is empty'
      },
      /** The comparisons over a `date` or a `date_time`, which read as a moment. */
      dateOperators: {
        eq: 'is on',
        ne: 'is not on',
        lt: 'is before',
        lte: 'is on or before',
        gt: 'is after',
        gte: 'is on or after'
      }
    },
    tableHeader: {
      filtered: 'Filtered'
    },
    tableSort: {
      sort: 'Sort',
      search: 'Search orders',
      ascending: 'ascending',
      descending: 'descending'
    },
    tagsInput: {
      remove: 'Remove {value}'
    }
  }
}

/** The shape of the package's words in any language: the English's, every key held. */
export type SaMessages = typeof SA_MESSAGES_EN
