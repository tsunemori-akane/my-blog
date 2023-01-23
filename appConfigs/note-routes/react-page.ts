export const react = 
{
  name: "React",
  prefix: "/docs/react",
  children: [
    {
      name: "Hooks",
      route: "/docs/react/hooks",
      description: ""
    },
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