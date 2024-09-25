import { Plus, QrCode } from "lucide-react";
import Link from "next/link";

import { TEST_IDS, APP_LINKS, SITE_TITLE } from "@/lib/constants";
import { sessionUtility } from "@/lib/session";
import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

import { ButtonOptionsUser } from "./button-options-user";
import { ButtonSearch } from "./button-search";
import { HeaderHider } from "./header-hider";

export async function Header() {
  const { user, isAdmin } = await sessionUtility();

  return (
    <HeaderHider className="sticky top-0 z-50 w-full bg-primary backdrop-blur-md transition-all">
      <div
        className={cn(
          "container mx-auto flex h-16 items-center justify-center px-4 py-3 text-background",
          user && "justify-between"
        )}
      >
        <Link
          href={APP_LINKS.HOME_PAGE}
          data-testid={TEST_IDS.homepageLink}
          className={cn(buttonVariants({ variant: "link" }), "px-0 font-bold uppercase text-inherit")}
        >
          {SITE_TITLE}
        </Link>
        {user ? (
          <nav className="flex items-center justify-between gap-3 md:gap-8">
            <>
              {isAdmin ? (
                <Link
                  href={APP_LINKS.CREATE_INVITATION_CODE_PAGE}
                  data-testid={TEST_IDS.createInvitationLink}
                  className={cn(buttonVariants({ size: "icon" }), "bg-teal-500")}
                >
                  <QrCode className="size-5" />
                </Link>
              ) : null}
              <ButtonSearch />
              <Link
                href={APP_LINKS.NEW_CUSTOMER_PAGE}
                data-testid={TEST_IDS.createNewCustomerHeaderLink}
                className={cn(buttonVariants({ size: "icon" }), "bg-green-500")}
              >
                <Plus className="size-5" />
              </Link>
              <ButtonOptionsUser username={user.username} />
            </>
          </nav>
        ) : null}
      </div>
    </HeaderHider>
  );
}
