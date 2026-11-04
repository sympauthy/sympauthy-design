/** The navigation the demos of the app shell draw. */
export const demoSections = [
  {
    label: 'Accounts',
    entries: [
      { key: 'users', label: 'Users', link: { href: '#users' }, current: true },
      { key: 'invitations', label: 'Invitations', link: { href: '#invitations' } }
    ]
  },
  {
    label: 'Configuration',
    entries: [
      { key: 'clients', label: 'Clients', link: { href: '#clients' } },
      {
        key: 'claims',
        label: 'Claims',
        link: { href: '#claims' },
        disabledReason: 'Your role does not allow reading claims.'
      }
    ]
  }
]
