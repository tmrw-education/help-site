import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import remarkSteps from './src/remark/steps';
// old page address → new one, for pages whose id or folder changed (see the file's header in AGENTS.md)
import redirects from './src/data/redirects.json';

// Content lives in the sibling `help` repo. Locally we read it directly from
// ../help (real dir → live reload, and avoids the symlink build break).
// CI overrides via CONTENT_DIR after checking the content repo out as a sibling.
const CONTENT = process.env.CONTENT_DIR ?? '../help';

const config: Config = {
  title: 'tmrw Help',
  tagline: 'Help and support for the tmrw education platform',
  // PNG favicon (not SVG — Safari rasterizes SVG favicons onto a white tile).
  // Default = light (white) mark, which reads on the typical dark tab strip.
  favicon: 'img/tmrw-logo-icon-light.png',

  // Theme-aware in Chrome/Firefox/Edge: dark mark on light browser chrome,
  // light mark on dark. (Safari ignores media-query favicons and uses the
  // default above.)
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        href: '/img/tmrw-logo-icon-dark.png',
        media: '(prefers-color-scheme: light)',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        href: '/img/tmrw-logo-icon-light.png',
        media: '(prefers-color-scheme: dark)',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/img/tmrw-logo-icon-light.png',
      },
    },
    // Microsoft Clarity
    {
      tagName: 'script',
      attributes: { type: 'text/javascript' },
      innerHTML: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","x4nctox3q7");`,
    },
  ],

  future: {
    v4: true,
  },

  url: 'https://help.tmrw.education',
  baseUrl: '/',
  organizationName: 'tmrw-education',
  projectName: 'help',
  trailingSlash: false,

  // A broken link fails the build, and deploy.yml publishes only after a successful build, so a
  // page linking to a missing or `draft: true` page never reaches the live site.
  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
      // images stay a warning: ZoomImage shows "Screenshot coming soon" for a missing one by design
      onBrokenMarkdownImages: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    ['@docusaurus/plugin-client-redirects', { redirects }],
    [
      '@docusaurus/plugin-content-docs',
      {
        // id 'default' (not 'sxp') so @easyops-cn search's version lookup resolves on non-doc pages
        id: 'default',
        path: `${CONTENT}/sxp`,
        routeBasePath: 'sxp',
        sidebarPath: './sidebars.ts',
        remarkPlugins: [remarkSteps],
        exclude: ['**/README.md', '**/readme.md', '**/.DS_Store', '**/*.pdf', '**/99-Images/README.md'],
        editUrl: 'https://github.com/tmrw-education/help/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'hr',
        path: `${CONTENT}/hr`,
        routeBasePath: 'hr',
        sidebarPath: './sidebars.ts',
        remarkPlugins: [remarkSteps],
        exclude: ['**/README.md', '**/readme.md', '**/.DS_Store', '**/*.pdf', '**/99-Images/README.md'],
        editUrl: 'https://github.com/tmrw-education/help/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ess',
        path: `${CONTENT}/ess`,
        routeBasePath: 'ess',
        sidebarPath: './sidebars.ts',
        remarkPlugins: [remarkSteps],
        exclude: ['**/README.md', '**/readme.md', '**/.DS_Store', '**/*.pdf', '**/99-Images/README.md'],
        editUrl: 'https://github.com/tmrw-education/help/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'scm',
        path: `${CONTENT}/scm`,
        routeBasePath: 'scm',
        sidebarPath: './sidebars.ts',
        remarkPlugins: [remarkSteps],
        exclude: ['**/README.md', '**/readme.md', '**/.DS_Store', '**/*.pdf', '**/99-Images/README.md'],
        editUrl: 'https://github.com/tmrw-education/help/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'fo',
        path: `${CONTENT}/finops`,
        routeBasePath: 'fo',
        sidebarPath: './sidebars.ts',
        remarkPlugins: [remarkSteps],
        exclude: ['**/README.md', '**/readme.md', '**/.DS_Store', '**/*.pdf', '**/99-Images/README.md'],
        editUrl: 'https://github.com/tmrw-education/help/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'pxp',
        path: `${CONTENT}/pxp`,
        routeBasePath: 'pxp',
        sidebarPath: './sidebars.ts',
        remarkPlugins: [remarkSteps],
        exclude: ['**/README.md', '**/readme.md', '**/.DS_Store', '**/*.pdf'],
        editUrl: 'https://github.com/tmrw-education/help/edit/main/',
      },
    ],
    // LearnerXP (`help/lxp/`) is unwired until it has real articles: its only page said "coming soon".
    // To restore: add its plugin block back here, its search paths below, and its entry in src/data/products.tsx.
    [
      '@docusaurus/plugin-content-docs',
      {
        // GrowthXP (Growth Experience Platform, the LMS). Needs `help/gxp/` to exist, or the build fails.
        id: 'gxp',
        path: `${CONTENT}/gxp`,
        routeBasePath: 'gxp',
        sidebarPath: './sidebars.ts',
        remarkPlugins: [remarkSteps],
        exclude: ['**/README.md', '**/readme.md', '**/.DS_Store', '**/*.pdf'],
        editUrl: 'https://github.com/tmrw-education/help/edit/main/',
      },
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: ['sxp', 'ess', 'fo', 'pxp', 'hr', 'scm', 'gxp'],
        docsDir: [
          `${CONTENT}/sxp`,
          `${CONTENT}/ess`,
          `${CONTENT}/finops`,
          `${CONTENT}/pxp`,
          `${CONTENT}/hr`,
          `${CONTENT}/scm`,
          `${CONTENT}/gxp`,
        ],
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      // 3-state: system (laptop) / light / dark — auto-matches the visitor's OS preference
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Help',
      logo: {
        alt: 'tmrw Help',
        // 't' icon mark (not the wordmark); light-on-dark serves both modes since the header is always dark
        src: 'img/tmrw-logo-icon-light.svg',
        srcDark: 'img/tmrw-logo-icon-light.svg',
      },
      // One product switcher (grouped menu) instead of seven links — see src/components/ProductSwitcher.
      items: [{ type: 'custom-productSwitcher', position: 'left' }],
    },
    // No footer: the navbar carries the brand on every page, and a footer holding only a logo
    // repeated it. It comes back when there is a public privacy policy to link (Clarity runs here).
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
