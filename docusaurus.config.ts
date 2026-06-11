import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import remarkSteps from './src/remark/steps';

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
  ],

  future: {
    v4: true,
  },

  url: 'https://help.tmrw.education',
  baseUrl: '/',
  organizationName: 'tmrw-education',
  projectName: 'help',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    hooks: {
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
    [
      '@docusaurus/plugin-content-docs',
      {
        // id 'default' (not 'sxp') so @easyops-cn search's version lookup resolves on non-doc pages
        id: 'default',
        path: `${CONTENT}/sxp`,
        routeBasePath: 'sxp',
        sidebarPath: './sidebars.ts',
        remarkPlugins: [remarkSteps],
        exclude: ['**/README.md', '**/.DS_Store', '**/*.pdf', '**/99-Images/README.md'],
        editUrl: 'https://github.com/tmrw-education/help/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ess',
        path: `${CONTENT}/hr`,
        routeBasePath: 'ess',
        sidebarPath: './sidebars.ts',
        remarkPlugins: [remarkSteps],
        exclude: ['**/README.md', '**/.DS_Store', '**/*.pdf', '**/99-Images/README.md'],
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
        exclude: ['**/README.md', '**/.DS_Store', '**/*.pdf', '**/99-Images/README.md'],
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
        exclude: ['**/README.md', '**/.DS_Store', '**/*.pdf'],
        editUrl: 'https://github.com/tmrw-education/help/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'lxp',
        path: `${CONTENT}/lxp`,
        routeBasePath: 'lxp',
        sidebarPath: './sidebars.ts',
        remarkPlugins: [remarkSteps],
        exclude: ['**/README.md', '**/.DS_Store', '**/*.pdf'],
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
        docsRouteBasePath: ['sxp', 'ess', 'fo', 'pxp', 'lxp'],
        docsDir: [`${CONTENT}/sxp`, `${CONTENT}/hr`, `${CONTENT}/finops`, `${CONTENT}/pxp`, `${CONTENT}/lxp`],
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
      logo: {
        alt: 'tmrw Help',
        src: 'img/tmrw-logo.svg',
        // header is always dark, so the same light-on-dark logo serves both color modes
        srcDark: 'img/tmrw-logo.svg',
      },
      items: [
        {
          to: '/sxp',
          label: 'StaffXP',
          position: 'left',
          activeBaseRegex: '/sxp',
        },
        {
          to: '/pxp',
          label: 'ParentXP',
          position: 'left',
          activeBaseRegex: '/pxp',
        },
        {
          to: '/lxp',
          label: 'LearnerXP',
          position: 'left',
          activeBaseRegex: '/lxp',
        },
        {
          to: '/ess',
          label: 'Employee Self-Service',
          position: 'left',
          activeBaseRegex: '/ess',
        },
        {
          to: '/fo',
          label: 'Finance & Operations',
          position: 'left',
          activeBaseRegex: '/fo',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
