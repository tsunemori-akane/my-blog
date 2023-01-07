import { getMDXComponent } from 'mdx-bundler/client'
import { cn } from '#/lib/utils'
import { useMemo } from 'react'
import { Card } from './card'
import { Callout } from './callout'
import { Pre } from './pre'
import Image from 'next/image'
import { ReactElement, ComponentProps} from 'react'

const createHeaderLink = (
  Tag: `h${1 | 2 | 3 | 4 | 5 | 6}`
) =>
  function HeaderLink({
    children,
    id,
    className,
    ...props
  }: ComponentProps<'h2'>): ReactElement {
  
    return (
      <Tag
        className={cn(
          'font-semibold tracking-tight',
          {
            h1: `mt-2 scroll-m-20 text-4xl font-bold ${className}`,
            h2: `mt-10 scroll-m-20 border-b border-b-slate-200 pb-1 text-3xl first:mt-0 ${className}`,
            h3: `mt-8 scroll-m-20 text-2xl ${className}`,
            h4: `mt-8 scroll-m-20 text-xl ${className}`,
            h5: `mt-8 scroll-m-20 text-lg ${className}`,
            h6: `mt-8 scroll-m-20 text-base ${className}`
          }[Tag]
        )}
        {...props}
      >
        {children}
        {/* <a
          href={`#${id}`}
          className="subheading-anchor"
          aria-label="Permalink for this section"
        /> */}
      </Tag>
    )
  }

export const MDXcomponents = {
  h1: createHeaderLink('h1'),
  h2: createHeaderLink('h2'),
  h3: createHeaderLink('h3'),
  h4: createHeaderLink('h4'),
  h5: createHeaderLink('h5'),
  h6: createHeaderLink('h6'),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        "font-medium text-slate-900 underline underline-offset-4 text-cyan-500",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-2 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 [&>*]:text-slate-600",
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn("rounded-md border border-slate-200", className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <hr className="my-4 border-slate-200 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "m-0 border-t border-slate-300 p-0 even:bg-slate-100",
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border border-slate-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border border-slate-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code 
      className={cn(
        'border-black border-opacity-10 bg-opacity-10 bg-black break-words rounded-md border py-0.5 px-[.25em] text-[.9em]',
        className
      )}
      {...props}
    ></code>
  ),
  pre: Pre,
  Image,
  Callout,
  Card,
}

export const MDXLayoutRender = ({mdxSource}) => {
  
  const Component = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return (
    <main>
      <Component components={MDXcomponents}/>
    </main>
  )
}