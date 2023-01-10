const fundamental = 
{
  name: "Fundamentals",
  prefix: "/docs/fundamental",
  children: [
    {
      name: "类型转换",
      route: "/docs/fundamental/typeConversion",
      description: "类型转换"
    },
    {
      name: "函数闭包",
      route: "/docs/fundamental/closure",
      description: "闭包"
    },
    {
      name: "原型",
      route: "/docs/fundamental/prototype",
      description: ""
    },
    {
      name: "正则",
      route: "/docs/fundamental/regularExpression",
      description: ""
    },
    {
      name: "垫片polyfill",
      prefix: "/docs/fundamental/polyfill",
      children: [
        {
          name: "数组方法",
          route: "/docs/fundamental/polyfill/array",
        },
        {
          name: "深拷贝",
          route: "/docs/fundamental/polyfill/deepclone",
        },
        {
          name: "防抖节流",
          route: "/docs/fundamental/polyfill/debounceandthrottle",
        },
      ]
    },
  ]
};

const css = 
{
  name: "Css",
  prefix: "/docs/css",
  children: [
    {
      name: 'How css work',
      route: '/docs/css/how_css_work'
    },
    
    {
      name: 'Css Modules',
      route: '/docs/css/css_modules'
    },
  ]
};

const react = 
{
  name: "React",
  prefix: "/docs/react",
  children: [
    {
      name: "React-router-dom",
      route: "/docs/react/react-router-dom",
      description: "路由"
    },
    {
      name: "Components",
      route: "/docs/react/react_components",
    },
    {
      name: "Fiber架构",
      prefix: "/docs/react/fiber",
      children: [
        {
          name: "Fiber",
          route: "docs/react/fiber/1st",
          disabled: true
        },
      ]
    },
  ]
};

const vue = {
  name: "Vue",
  prefix: "/docs/vue",
  children: [
    {
      name: '自定义指令',
      route: '/docs/vue/customDirective'
    },
    {
      name: 'Vue Loader',
      route: '/docs/vue/vue_loader'
    }
  ]
}

export const NoteRoutes = [
  fundamental,
  css,
  react,
  vue
];