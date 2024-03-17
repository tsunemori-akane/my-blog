'use client';

import React, { useRef, useState, useEffect, memo} from 'react';
import { cn } from '#/lib/utils';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const TreeState: Record<string, boolean> = Object.create(null)

function Dropdownbar({name, open, onPress}) {

  return (
    <button 
      className='mt-2 flex w-full' 
      onClick={onPress}
    >
      <span 
        className={cn(
          'flex justify-center items-center',
          'before:content-[""] before:mr-4 before:h-0 before:border-y-4 before:border-l-4 before:border-y-transparent before:border-l-black',
          open && 'before:rotate-90 before:origin-center before:transition-transform before:duration-300'
        )}
      >
        {name}
      </span>
    </button>
  )
}

function Dropdownlistitem({route, name, disabled}) {
  const pathname = usePathname()
  return (
    <div className={cn(
      'flex items-center rounded-md py-2',
      'before:content-[""] before:block before:w-1 before:h-1 before:mr-4 before:rounded-full before:bg-[#666] last:mb-0',
      {
        "bg-gradient-to-r from-transparent to-stone-200": pathname === route
      }
      )}
    >
      <Link 
        className={cn(
          'no-underline text-base w-full hover:underline',
          disabled && 'cursor-not-allowed opacity-40' ,
          pathname === route ? '_activePage' : '_inactivePage'
        )} 
        href={disabled? "#" : route}>{name}
      </Link>
    </div>
  )
}

function Collapse({children, open}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<any>()
  const initialState = useRef(open)
  //console.log("open change to :" , open)
  useEffect(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current)
    }
    if (open) {
      const container = containerRef.current
      const inner = innerRef.current
      if (container && inner) {
        const contentHeight = innerRef.current.clientHeight
        container.style.maxHeight = contentHeight + 'px'
        container.classList.remove('duration-500')
        container.classList.add('duration-300')

        inner.style.opacity = '1'
        animationRef.current = setTimeout(() => {
          const container = containerRef.current
          if (container) {
            // should be style property in kebab-case, not css class name
            container.style.removeProperty('max-height')
          }
        }, 300)
      }
    } else {
      const container = containerRef.current
      const inner = innerRef.current
      if (container && inner) {
        const contentHeight = innerRef.current.clientHeight
        container.style.maxHeight = contentHeight + 'px'
        container.classList.remove('duration-300')
        container.classList.add('duration-500')

        inner.style.opacity = '0'
        setTimeout(() => {
          const container = containerRef.current
          if (container) {
            container.style.maxHeight = '0px'
          }
        }, 0)
      }
    }
  },[open])
  return (
    <div
      ref={containerRef}
      className="transform-gpu overflow-hidden transition-all duration-300 ease-in-out motion-reduce:transition-none"
      style={{
        maxHeight: initialState.current? undefined : 0
      }}
    >
      <div
        ref={innerRef}
        className={cn(
          'transform-gpu overflow-hidden transition-opacity duration-500 ease-in-out motion-reduce:transition-none'
        )}
        style={{
          opacity: initialState.current ? 1 : 0
        }}
      >
        {children}
      </div>
    </div>
  )
}

const Folder = memo(FolderImpl)
function FolderImpl ({item}) {
  const pathname = usePathname()
  const focusedRouteInside = pathname.startsWith(item.prefix || '' + '/')
  // console.log("pathname:", pathname)
  // console.log("prefix:", item.prefix)
  // console.log("focusedRouteInside:", focusedRouteInside)
  const open =
    TreeState[item.prefix] !== undefined
      ? TreeState[item.prefix] 
      : focusedRouteInside
  const rerender = useState({})[1]

  const handleClickDropdown = (e) => {
    TreeState[item.prefix] = !open
    rerender({})
  }

  return (
    <div key={item.name}>
      <Dropdownbar
        name={item.name} 
        open={open}
        onPress={handleClickDropdown}
      />
      <Collapse open={open}>
        <div className='mt-1 h-auto border-l-[#d4d4d4] border-l pl-7'>
          <RecursiveMenu dir={item.children} />
        </div>
      </Collapse>
    </div>
  )
}
export function RecursiveMenu({ dir }) {

  return (
    <>
    <div>
      {
        dir.map(item => {
          if(item.children) {
            return (
              <Folder key={item.name} item={item} />
            )
          } else {
            return (
              <Dropdownlistitem key={item.name} route={item.route} name={item.name} disabled={item.disabled} />
            )
          }
        })
      }
    </div>
    </>
  )
}