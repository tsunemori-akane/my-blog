import { SideNavigator } from "./sidenav"

export function DocLayout({children}) {
  return (
    <div className="flex-1  md:grid md:grid-cols-[220px_1fr] md:gap-3 lg:grid-cols-[240px_1fr] lg:gap-6">
      <SideNavigator/>
      {children}
    </div>
)
}