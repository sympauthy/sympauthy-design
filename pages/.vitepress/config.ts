import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, postcssIsolateStyles } from 'vitepress'
import type { Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { sympauthyCodeTheme } from './code-theme.ts'

const base = '/sympauthy-design/'
const publicDir = fileURLToPath(new URL('../public', import.meta.url))

/**
 * GitHub Pages answers a folder of pages/public with its index.html (/theme-builder/); Vite's dev
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
    ['meta', { name: 'theme-color', content: '#7B1E3A' }],
    // tokens.css follows the device unless the page pins a theme: the site's switch is that pin.
    [
      'script',
      {},
      `(() => {
        const root = document.documentElement
        const sync = () => (root.dataset.theme = root.classList.contains('dark') ? 'dark' : 'light')
        sync()
        new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['class'] })
      })()`
    ]
  ],
  markdown: {
    theme: { light: sympauthyCodeTheme, dark: sympauthyCodeTheme }
  },
  vite: {
    // A demo inside `.vp-raw` is drawn with the apps' styles alone: the site's own would draw a
    // table of records as prose.
    css: { postcss: { plugins: [postcssIsolateStyles({ includeFiles: [/vp-doc\.css/] })] } },
    // Tailwind compiles the live component demos; the pages themselves use VitePress's theme.
    plugins: [tailwindcss(), publicFolderIndex()]
  },
  themeConfig: {
    logo: { src: '/logo.svg', alt: '' },
    siteTitle: 'Symp<span class="wordmark-strong">Authy</span> Design',

    nav: [
      { text: 'Foundations', link: '/foundations/', activeMatch: '^/foundations/' },
      { text: 'Components', link: '/components/' },
      { text: 'Using in the apps', link: '/using-in-apps' },
      { text: 'Branding', link: '/branding' },
      { text: 'SympAuthy', link: 'https://sympauthy.github.io/' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Flow pages', link: '/flow' },
          { text: 'Admin panel', link: '/admin' },
          { text: 'Using in the apps', link: '/using-in-apps' },
          { text: 'Branding a deployment', link: '/branding' }
        ]
      },
      {
        text: 'Foundations',
        items: [
          { text: 'Overview', link: '/foundations/' },
          { text: 'Content', link: '/foundations/content' },
          { text: 'Color', link: '/foundations/color' },
          { text: 'Themes', link: '/foundations/themes' },
          { text: 'Type', link: '/foundations/type' },
          { text: 'Spacing', link: '/foundations/spacing' },
          { text: 'Control height', link: '/foundations/control-height' },
          { text: 'Shape', link: '/foundations/shape' },
          { text: 'Focus, states and motion', link: '/foundations/focus' },
          { text: 'Layout', link: '/foundations/layout' },
          { text: 'Iconography', link: '/foundations/iconography' },
          { text: 'The mark', link: '/foundations/mark' }
        ]
      },
      {
        text: 'Common',
        items: [
          { text: 'Alert', link: '/components/alert' },
          { text: 'BrandLogo', link: '/components/brand-logo' },
          { text: 'Button', link: '/components/button' },
          { text: 'Card', link: '/components/card' },
          { text: 'CopyableValue', link: '/components/copyable-value' },
          { text: 'EmptyValue', link: '/components/empty-value' },
          { text: 'Field', link: '/components/field' },
          { text: 'Link', link: '/components/link' },
          { text: 'LoadingState', link: '/components/loading-state' },
          { text: 'Pagination', link: '/components/pagination' },
          { text: 'Skeleton', link: '/components/skeleton' },
          { text: 'Spinner', link: '/components/spinner' },
          { text: 'Table', link: '/components/table' },
          { text: 'Tag', link: '/components/tag' }
        ]
      },
      {
        text: 'Flow',
        items: [
          { text: 'AuthCard', link: '/components/auth-card' },
          { text: 'CodeInput', link: '/components/code-input' },
          { text: 'ConfirmRequest', link: '/components/confirm-request' }
        ]
      },
      {
        text: 'Admin',
        items: [
          { text: 'ActionsDropdown', link: '/components/actions-dropdown' },
          { text: 'ConfirmDialog', link: '/components/confirm-dialog' },
          { text: 'RecordPage', link: '/components/record-page' },
          { text: 'Sidebar', link: '/components/sidebar' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/sympauthy/sympauthy-design' }],

    search: { provider: 'local' }
  }
})
