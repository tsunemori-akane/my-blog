import fs from 'fs'
import { bundleMDX } from 'mdx-bundler'
import path from 'path'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkFootnotes from 'remark-footnotes'
import remarkMath from 'remark-math'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
//import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypePrettyCode from 'rehype-pretty-code'

const root = process.cwd()

export async function getFileBySlug(type, slug) {
  const mdxPath = path.join(root, type, `${slug}.mdx`)
  const mdPath = path.join(root, type, `${slug}.md`)
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf-8')
    : fs.readFileSync(mdPath, 'utf-8')
  
  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'esbuild.exe')
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'bin', 'esbuild')
  }

  let toc = []

  const { code, frontmatter } = await bundleMDX({
    source,
    mdxOptions(options, frontmatter) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeKatex,
        [rehypeAutolinkHeadings, {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Permalink for this section"
          }
        }],
        
        [rehypeCitation, { path: path.join(root, 'data') }],
        //[rehypePrismPlus, { ignoreMissing: true }],
        [
          rehypePrettyCode,
          {
            theme: "one-dark-pro",
            onVisitLine(node) {
              // Prevent lines from collapsing in `display: grid` mode, and allow empty
              // lines to be copy/pasted
              if (node.children.length === 0) {
                node.children = [{ type: "text", value: " " }]
              }
            },
            onVisitHighlightedLine(node) {
              node.properties.className.push("line--highlighted")
            },
            onVisitHighlightedWord(node) {
              node.properties.className = ["word--highlighted"]
            },
          },
        ],
        rehypePresetMinify,
      ]
      return options
    },
  })

  return {
    mdxSource: code
  }
}