import { ReactElement, useEffect, useState } from "react";
import { cn } from "#/lib/utils";
import { useActiveAnchor } from "./contexts/activeAnchorProvider";

type Heading = {
  value: string;
  url: string;
  depth: 1 | 2 | 3 | 4 | 5 | 6;
}

type TOCProps = {
  headings: Heading[]
}

export function TOC({headings} : TOCProps): ReactElement {
  const hasHeadings = headings.length > 0
  const activeAnchor = useActiveAnchor()
  return (
    <>
      {hasHeadings && (
        <div className="sticky top-16 h-[calc(100vh-3.5rem)] flex-1  overflow-y-auto [hyphens:auto]">
          <p className="mb-4 font-semibold tracking-tight">On This Page</p>
          <ul>
            {headings.map(({ value, url, depth }) => (
              <li className="my-2 scroll-my-6 scroll-py-6" key={value}>
                <a
                  href={url}
                  className={cn(
                    {
                      2: "font-semibold",
                      3: "ml-4",
                      4: "ml-8",
                      5: "ml-12",
                      6: "ml-16",
                    }[depth],
                    "inline-block",
                    activeAnchor == url 
                      ? 'text-cyan-600/75 subpixel-antialiased contrast-more:!text-primary-600'
                      : 'text-gray-500 hover:text-gray-900',
                      'contrast-more:text-gray-900 contrast-more:underline'
                  )}
                >
                  {value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}