"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
//import { useSelectedLayoutSegment } from "next/navigation"
import { useRouter } from "next/router"
import { cn } from "#/lib/utils"
import { MenuIcon } from "./svg/menu"

export function MainNav({ items }) {
  const router = useRouter()
  return (
    <div className="flex items-center gap-6">
      <Link href="/" className="hidden md:block">
        <Image src="/images/logo/blogger.png" width="48" height="48" alt="blog"/>
      </Link>
      <button type="button" className="md:hidden text-slate-50">
        <MenuIcon />
      </button>
      <nav className="flex gap-6">{
        items?.map(item => {
          return (
            <Link 
            key={item.name}
            className={cn(
              router.pathname?.startsWith(item.route) ? 'text-white font-bold' : 'text-slate-200'
            )}
            href={item.route}>{item.name}</Link>
          )
        })  
      }</nav>
    </div>
  )
}