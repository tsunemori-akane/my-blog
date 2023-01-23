'use client';

import { NoteRoutes } from "#/appConfigs/note-routes"
import { RecursiveMenu } from "./SideNavItems";

export function SideNavigator() {
  return (
    <>
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full flex-shrink-0 overflow-y-auto border-r border-r-slate-100 py-6 pr-2 pl-4 md:sticky md:block lg:py-10 bg-[#fafaf9]">
        <RecursiveMenu dir={NoteRoutes} /> 
      </aside>
    </>
  )
}