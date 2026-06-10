import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'tmrw Help',
  tagline: 'Help and support for the tmrw education platform',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://tmrw-education.github.io',
  baseUrl: '/help/',
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
        path: 'sxp',
        routeBasePath: 'sxp',
        sidebarPath: './sidebars.ts',
        exclude: ['**/README.md', '**/.DS_Store', '**/*.pdf', '**/99-Images/README.md'],
        editUrl: 'https://github.com/tmrw-education/help/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ess',
        path: 'hr',
        routeBasePath: 'ess',
        sidebarPath: './sidebars.ts',
        exclude: ['**/README.md', '**/.DS_Store', '**/*.pdf', '**/99-Images/README.md'],
        editUrl: 'https://github.com/tmrw-education/help/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'fo',
        path: 'finops',
        routeBasePath: 'fo',
        sidebarPath: './sidebars.ts',
        exclude: ['**/README.md', '**/.DS_Store', '**/*.pdf', '**/99-Images/README.md'],
        editUrl: 'https://github.com/tmrw-education/help/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'pxp',
        path: 'pxp',
        routeBasePath: 'pxp',
        sidebarPath: './sidebars.ts',
        exclude: ['**/README.md', '**/.DS_Store', '**/*.pdf'],
        editUrl: 'https://github.com/tmrw-education/help/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'lxp',
        path: 'lxp',
        routeBasePath: 'lxp',
        sidebarPath: './sidebars.ts',
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
        docsDir: ['sxp', 'hr', 'finops', 'pxp', 'lxp'],
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
        {
          to: '/pxp',
          label: 'Parent Experience',
          position: 'left',
          activeBaseRegex: '/pxp',
        },
        {
          to: '/lxp',
          label: 'Learner Experience',
          position: 'left',
          activeBaseRegex: '/lxp',
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
