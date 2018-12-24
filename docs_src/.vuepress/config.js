'use strict';

const pkg = require('../../package');

const name = 'NoSmoke';
const githubLink = 'https://github.com/macacajs/NoSmoke';

module.exports = {
  dest: 'docs',
  base: `/${name}/`,

  locales: {
    '/': {
      lang: 'en-US',
      title: name,
      description: pkg.description,
    },
    '/zh/': {
      lang: 'zh-CN',
      title: name,
      description: pkg.description,
    },
  },
  head: [
  ],
  serviceWorker: true,
  themeConfig: {
    repo: `macacajs/${name}`,
    editLinks: true,
    docsDir: 'docs_src',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh',
          },
        },
        nav: [
          {
            text: 'Guide',
            link: '/guide/'
          },
        ],
        sidebar: {
          '/guide/': genSidebarConfig('Guide')
        }
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        serviceWorker: {
          updatePopup: {
            message: '发现新内容可用',
            buttonText: '刷新',
          },
        },
        nav: [
          {
            text: '指南',
            link: '/zh/guide/'
          },
        ],
        sidebar: {
          '/zh/guide/': genSidebarConfig('指南')
        }
      },
    },
  },
};

function genSidebarConfig(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        'quick-start',
        'configuration',
        'cross-platform',
        'hooks',
        'continous-integration',
        'roadmap',
      ],
    },
  ];
}
