export const fundamental = 
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
      name: "继承",
      route: "/docs/fundamental/inheritance",
      description: ""
    },
    {
      name: "正则",
      route: "/docs/fundamental/regularExpression",
      description: ""
    },
    {
      name: "事件循环",
      route: "/docs/fundamental/eventLoop",
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