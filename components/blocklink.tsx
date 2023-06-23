import Link from "next/link"
import { cn } from "#/lib/utils"
import styles from './blocklink.module.css'

export function BlockLink({ href, icon, title}) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col justify-start overflow-hidden rounded-lg border border-gray-200 bg-gray-100 text-current no-underline shadow shadow-gray-100 transition-all duration-200',
        'hover:border-gray-300 hover:shadow-lg hover:bg-slate-50 hover:shadow-md hover:shadow-gray-100',
        'active:shadow-sm active:shadow-gray-200'
      )}
    >
      <div
        className={cn(
          'flex gap-2 p-4 font-bold',
          styles.blocklink
        )}
      >
        {icon}
        <div className="flex gap-1 text-ellipsis">
          {title}
        </div>
      </div>
    </Link>
  )
}

