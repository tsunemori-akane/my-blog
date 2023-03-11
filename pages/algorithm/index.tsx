import React, { ReactElement } from "react"
import { DocLayout } from "#/components/docLayout"
import { AlgorithmRoutes } from "#/appConfigs/algorithm-routes"

export default function Page() {
  return (
    <>
      <main className="ml-6 relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0">
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Categories</h1>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <span>滑动窗口</span>
            <span>动态规划</span>
            <span>排列问题</span>
            <span>排序问题</span>
            <span>二叉树</span>
            <span>DFS BFS</span>
          </div>
        </div>
      </main>
    </>
  )
}

Page.PageLayout = (page) => {
  return <DocLayout routes={ AlgorithmRoutes }>{page}</DocLayout>
}
