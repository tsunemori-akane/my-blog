export const fundamental = 
{
  name: "Fundamentals",
  prefix: "/docs/fundamental",
  children: [
    {
      name: "类型转换",
      route: "/docs/fundamental/typeConversion",
    },
    {
      name: "函数闭包",
      route: "/docs/fundamental/closure",
    },
    {
      name: "原型",
      route: "/docs/fundamental/prototype",
    },
    {
      name: "继承",
      route: "/docs/fundamental/inheritance",
    },
    {
      name: "正则",
      route: "/docs/fundamental/regularExpression",
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
          name: "Object方法",
          route: "/docs/fundamental/polyfill/object",
        },
        {
          name: "promise方法",
          route: "/docs/fundamental/polyfill/promise",
          // disabled: true
        },
        {
          name: "深拷贝",
          route: "/docs/fundamental/polyfill/deepclone",
        },
        {
          name: "防抖节流",
          route: "/docs/fundamental/polyfill/debounceandthrottle",
        },
        {
          name: "工具方法",
          route: "/docs/fundamental/polyfill/toolFns",
        },
        {
          name: "expressions相关",
          route: "/docs/fundamental/polyfill/expressions",
        },
      ]
    },
  ]
};