import { demoBlockPlugin } from 'vitepress-theme-demoblock'
module.exports = {
  title: 'iceblink-ui',
  description: 'Iceblink Luck -- Cocteau Twins',
  themeConfig: {
    lastUpdated: '最后更新时间',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'edit site',
    repo: 'https://gitee.com/login',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present DrinkLessCola'
    },
    nav: [
      { text: '指南', link: '/guide/installation', activeMatch: '/guide/' },
      { text: '组件', link: '/component/button', activeMatch: '/component/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quickStart' }
          ]
        }
      ],
      '/component/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button', link: '/component/button' },
            { text: 'Dropdown', link: '/component/dropdown' },
            { text: 'Tooltip', link: '/component/tooltip' },
            { text: 'Scrollbar', link: '/component/scrollbar' },
          ]
        }
      ]
    },
    
  },
  markdown: {
    config:(md) => {
      md.use(demoBlockPlugin)
    }
  }
}