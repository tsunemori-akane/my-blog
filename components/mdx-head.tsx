import Head from "next/head";

export function PageSEO ({frontmatter}) {
  const title = frontmatter.title ?? ''
  const description = frontmatter.description ?? ''

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="article"></meta>
        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
      </Head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q0ES402K4M"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-Q0ES402K4M');
      </script>
    </>
  )
}