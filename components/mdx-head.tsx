import Head from "next/head";

export function PageSEO ({frontmatter}) {
  const title = frontmatter.title ?? ''
  const description = frontmatter.description ?? ''

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="article"></meta>
      <meta property="og:title" content={title}></meta>
      <meta property="og:description" content={description}></meta>
    </Head>
  )
}