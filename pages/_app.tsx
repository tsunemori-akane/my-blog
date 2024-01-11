//import '../styles/globals.css'
import "../styles/tailwind_global.css";
import "#/styles/pretty_code.css";
import TopLayout from "#/components/topLayout";
import Script from "next/script";
// type ComponentWithPageLayout = AppProps & {
//   Component: AppProps["Component"] & {
//     PageLayout?: React.ComponentType
//   }
// }

export default function App({ Component, pageProps }) {
  const getLayout = Component.PageLayout || ((page) => page);
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-16SW6LLSL4"
      ></Script>
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-16SW6LLSL4');
        `}
      </Script>
      <div className="flex min-h-screen flex-col">
        <TopLayout />
        {getLayout(<Component {...pageProps} />)}
        {/* <>
          { Component.PageLayout ? (
            <Component.PageLayout>
              <Component {...pageProps} />
            </Component.PageLayout>
          )
            : <Component {...pageProps} />
          }
        </> */}
      </div>
    </>
  );
}
