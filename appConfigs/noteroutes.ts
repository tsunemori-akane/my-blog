export const NoteRoutes = [
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
    ]
  },
  {
    name: "Css",
    prefix: "/docs/css",
    children: [
      {
        name: 'How css work',
        route: '/docs/css/how_css_work'
      }
      
    ]
  },
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
  },
];