import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import type { Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { sympauthyCodeTheme } from './code-theme.ts'

const base = '/sympauthy-design/'
const publicDir = fileURLToPath(new URL('../public', import.meta.url))

/**
 * GitHub Pages answers a folder of docs/public with its index.html (/theme-builder/); Vite's dev
 * server serves public files by exact path only, and shows VitePress's 404 instead. Do the same
 * as Pages in dev.
 */
function publicFolderIndex(): Plugin {
  return {
    name: 'sympauthy:public-folder-index',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const path = req.url?.split('?')[0] ?? ''
        if (
          path.startsWith(base) &&
          path.endsWith('/') &&
          existsSync(join(publicDir, path.slice(base.length), 'index.html'))
        ) {
          req.url = `${path}index.html`
        }
        next()
      })
    }
  }
}

export default defineConfig({
  title: 'SympAuthy Design',
  description: 'The design system of SympAuthy: tokens, components and branding.',
  base,
  head: [
    ['link', { rel: 'icon', href: `${base}favicon.ico`, sizes: '32x32' }],
    ['link', { rel: 'icon', href: `${base}favicon.svg`, type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: `${base}apple-touch-icon.png` }],
    ['meta', { name: 'theme-color', content: '#7B1E3A' }]
  ],
  markdown: {
    theme: { light: sympauthyCodeTheme, dark: sympauthyCodeTheme }
  },
  vite: {
    // Tailwind compiles the live component demos; the docs pages themselves use VitePress's theme.
    plugins: [tailwindcss(), publicFolderIndex()]
  },
  themeConfig: {
    logo: { src: '/logo.svg', alt: '' },
    siteTitle: 'Symp<span class="wordmark-strong">Authy</span> Design',

    nav: [
      { text: 'Foundations', link: '/foundations' },
      { text: 'Components', link: '/components/' },
      { text: 'Using in the apps', link: '/using-in-apps' },
      { text: 'Branding', link: '/branding' },
      { text: 'SympAuthy', link: 'https://sympauthy.github.io/' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Foundations', link: '/foundations' },
          { text: 'Flow pages', link: '/flow' },
          { text: 'Admin panel', link: '/admin' },
          { text: 'Using in the apps', link: '/using-in-apps' },
          { text: 'Branding a deployment', link: '/branding' }
        ]
      },
      {
        text: 'Common',
        items: [
          { text: 'Card', link: '/components/card' },
          { text: 'Button', link: '/components/button' },
          { text: 'Field', link: '/components/field' },
          { text: 'Alert', link: '/components/alert' }
        ]
      },
      {
        text: 'Flow',
        items: [
          { text: 'AuthCard', link: '/components/auth-card' },
          { text: 'ConfirmRequest', link: '/components/confirm-request' },
          { text: 'CodeInput', link: '/components/code-input' }
        ]
      },
      {
        text: 'Admin',
        items: [
          { text: 'Sidebar', link: '/components/sidebar' },
          { text: 'Table', link: '/components/table' },
          { text: 'RecordPage', link: '/components/record-page' },
          { text: 'Tag', link: '/components/tag' },
          { text: 'ActionsDropdown', link: '/components/actions-dropdown' },
          { text: 'ConfirmDialog', link: '/components/confirm-dialog' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/sympauthy/sympauthy-design' }],

    search: { provider: 'local' }
  }
})
