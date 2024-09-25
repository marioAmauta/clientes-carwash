"use client";

import { User } from "@prisma/client";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { createPortal } from "react-dom";

import { APP_LINKS, TEST_IDS } from "@/lib/constants";
import { cn, eventPreventDefault } from "@/lib/utils";

import { logoutAction } from "@/app/(auth)/actions";

import { useButtonOptions } from "@/hooks/use-button-options";

import { Modal } from "@/components/Modal";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { ButtonLogout } from "./button-logout";

export function ButtonOptionsUser({ username }: Pick<User, "username">) {
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();
  const { isOpen, setIsOpen } = useButtonOptions({ isPending });

  function navigateToProfile() {
    push(`${APP_LINKS.USER_PAGE}/${username}`);
  }

  function onLogout() {
    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger
          data-testid={TEST_IDS.userMenuButtonTrigger}
          className={cn(buttonVariants({ size: "icon" }), "bg-teal-500")}
        >
          <CircleUserRound className="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hola {username}!</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={navigateToProfile}>Ver perfil</DropdownMenuItem>
          <DropdownMenuItem onSelect={eventPreventDefault}>
            <ButtonLogout onLogout={onLogout} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isPending && createPortal(<Modal type="loading" />, document.body)}
    </>
  );
}
