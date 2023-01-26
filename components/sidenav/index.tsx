'use client';
import { useRef, useEffect } from "react";
import { NoteRoutes } from "#/appConfigs/note-routes"
import { RecursiveMenu } from "./SideNavItems";
import scrollIntoView from 'scroll-into-view-if-needed'
import { usePathname } from 'next/navigation';

export function SideNavigator() {
  const boundaryRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  useEffect(() => {
    //const activeElement = document.querySelector('aside a._activePage')
    const activeElement = boundaryRef.current?.querySelector('aside a._activePage')
    
    if (activeElement && (window.innerWidth > 767 || dir)) {
      const scroll = () => {
        scrollIntoView(activeElement, {
          block: 'center',
          inline: 'center',
          scrollMode: 'always',
          boundary: boundaryRef.current
        })
      }
      if (NoteRoutes) {
        // needs for mobile since menu has transition transform
        setTimeout(scroll, 300)
      } else {
        scroll()
      }
    }
  }, [pathname])
  return (
    <>
      <aside ref={boundaryRef} className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full flex-shrink-0 overflow-y-auto border-r border-r-slate-100 py-6 pr-2 pl-4 md:sticky md:block lg:py-10 bg-[#fafaf9]">
        <RecursiveMenu dir={NoteRoutes} /> 
      </aside>
    </>
  )
}