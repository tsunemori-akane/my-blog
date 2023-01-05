import { NoteRoutes } from "#/appConfigs/noteroutes"
import { DocLayout } from "#/components/docLayout"
import collectFilePath from "#/lib/collectFilePath"
import { getFileBySlug } from "#/lib/getFileBySlug"
import { MDXLayoutRender } from "#/components/mdx-components/MDXcomponents"

import path from 'node:path'

const contentDir = 'content/docs'
const root = process.cwd()

export default function Page({slug, mdxSource}) {
  
  return (
    <main className="ml-6 relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <MDXLayoutRender mdxSource={mdxSource} />
        <hr className="my-4 border-slate-200 md:my-6" />
      </div>
    </main>
  )
}
Page.PageLayout = DocLayout

export async function getStaticPaths() {
  const prefixPath = path.join(root, contentDir)
  const slugpaths = await collectFilePath(prefixPath)
  //const len = contentDir.split('/').length
  
  return {
    paths: slugpaths.map(item => ({
      params: {
        slug: item
            .slice(prefixPath.length+1)
            .replace(/\\/g, '/')
            .split('/')
      }
    })),
    fallback: false
  }
}

export async function getStaticProps({params}) {
  const slug = params?.slug?.join("/")
  const post = await getFileBySlug(contentDir, slug)
  return {
    props: {
      slug, mdxSource: post.mdxSource
    }
  }
}

