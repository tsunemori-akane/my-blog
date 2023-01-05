import { MainNav } from "./top-nav"
import { MainNavRoute } from "#/appConfigs/mainnavroute"

export default function TopLayout() {
  return (
    <>
      <header className="px-4 sticky top-0 z-40 w-full border-b border-slate-200 bg-docsy-blue">
        <div className="flex items-center h-16 sm:justify-between">
          <MainNav items={ MainNavRoute }/>
        </div>
      </header>
    </>
  )
}