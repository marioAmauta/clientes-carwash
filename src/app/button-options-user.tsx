"use client";

import { User } from "@prisma/client";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { createPortal } from "react-dom";

import { authClient } from "@/lib/auth-client";
import { APP_LINKS, TEST_IDS } from "@/lib/constants";
import { cn, eventPreventDefault } from "@/lib/utils";

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

export function ButtonOptionsUser({ name }: Pick<User, "name">) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { isOpen, setIsOpen } = useButtonOptions({ isPending });

  function navigateToProfile() {
    router.push(`${APP_LINKS.USER_PAGE}/${name}`);
  }

  function onLogout() {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push(APP_LINKS.LOGIN_PAGE);
            router.refresh();
          }
        }
      });
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
          <DropdownMenuLabel>Hola {name}!</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={navigateToProfile} data-testid={TEST_IDS.profileButton}>
            Ver perfil
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={eventPreventDefault}>
            <ButtonLogout onLogout={onLogout} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isPending && createPortal(<Modal type="loading" />, document.body)}
    </>
  );
}
