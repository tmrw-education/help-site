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
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'lxp',
        path: `${CONTENT}/lxp`,
        routeBasePath: 'lxp',
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
        docsRouteBasePath: ['sxp', 'ess', 'fo', 'pxp', 'lxp', 'hr', 'scm'],
        docsDir: [
          `${CONTENT}/sxp`,
          `${CONTENT}/ess`,
          `${CONTENT}/finops`,
          `${CONTENT}/pxp`,
          `${CONTENT}/lxp`,
          `${CONTENT}/hr`,
          `${CONTENT}/scm`,
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
        {
          to: '/hr',
          label: 'Human Resources',
          position: 'left',
          activeBaseRegex: '/hr',
        },
        {
          to: '/scm',
          label: 'Supply Chain Management',
          position: 'left',
          activeBaseRegex: '/scm',
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
