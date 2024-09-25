"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type TabsMenuLinkType = {
  hrefAsValue: string;
  triggerLabel: string;
  totalItemsCount?: number;
  testId?: string;
};

type TabsMenuLinkProps = {
  tabs: TabsMenuLinkType[];
};

export function TabsMenuLink({ tabs }: TabsMenuLinkProps) {
  const pathname = usePathname();

  return (
    <Tabs value={pathname} className="flex justify-center">
      <TabsList>
        {tabs.map(({ hrefAsValue, triggerLabel, testId, totalItemsCount }) => (
          <TabsTrigger key={hrefAsValue} value={hrefAsValue} asChild>
            <Link href={hrefAsValue} data-testid={testId} className="gap-2">
              <span>{triggerLabel}</span>
              {totalItemsCount ? (
                <Badge variant="outline" className="w-max">
                  {totalItemsCount}
                </Badge>
              ) : null}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
