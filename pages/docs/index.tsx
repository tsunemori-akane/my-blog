import React, { ReactElement } from "react"
import { DocLayout } from "#/components/docLayout"
import { BlockLink } from "#/components/blocklink"
import { DocsMainPageRoute } from "#/appConfigs/dochomepage"
export default function Page() {
  return (
    <>
      <main className="ml-6 relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0">
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Categories</h1>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {
              DocsMainPageRoute.map(e => {
                return (
                  <BlockLink key={e.title} icon={<e.icon/>} title={e.title} />
                )
                
              })
            }
          </div>
        </div>
      </main>
    </>
  )
}

Page.PageLayout = DocLayout
 