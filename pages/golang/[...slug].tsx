import { DocLayout } from "#/components/docLayout"
import collectFilePath from "#/lib/collectFilePath"
import { getFileBySlug } from "#/lib/getFileBySlug"
import { MDXLayoutRender } from "#/components/mdx-components/MDXcomponents"
import { TOC } from "#/components/table-of-content"
import path from 'node:path'
import { ActiveAnchorProvider } from "#/components/contexts/activeAnchorProvider"
import { PageSEO } from "#/components/mdx-head"
import { NoteRoutes } from "#/appConfigs/note-routes"

const contentDir = 'content/golang'
const root = process.cwd()

export default function Page({slug, mdxSource, toc, frontmatter}) {
  return (
    <>
      <PageSEO frontmatter={frontmatter} />
      <main className="mx-3 relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
        <ActiveAnchorProvider>
          <div className="mx-auto w-full min-w-0">
            <MDXLayoutRender mdxSource={mdxSource} />
            <hr className="my-4 border-slate-200 md:my-6" />
          </div>
          <div className="hidden text-sm xl:block">
            <TOC headings={toc}/>
          </div>
        </ActiveAnchorProvider>
      </main>
    </>
  )
}
Page.PageLayout = (page) => {
  return <DocLayout routes={NoteRoutes}>{page}</DocLayout>
}

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
      slug, 
      mdxSource: post.mdxSource, 
      toc: post.toc,
      frontmatter: post.frontmatter
    }
  }
}

