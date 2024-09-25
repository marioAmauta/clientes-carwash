import { Prisma } from "@prisma/client";

import { getChileanDateFormat } from "@/lib/utils";

import { Card } from "@/components/ui/card";

import { ButtonOptionsInvitationCode } from "./button-options-invitation-code";

export type CardInvitationCodeProps = Prisma.InvitationCodeGetPayload<{
  select: {
    code: true;
    isUsed: true;
    createdAt: true;
  };
}>;

export function CardInvitationCode({ code, isUsed, createdAt }: CardInvitationCodeProps) {
  return (
    <li>
      <Card className="space-y-1.5 px-4 py-2">
        <div className="flex items-center justify-between">
          <span>{code}</span>
          <ButtonOptionsInvitationCode code={code} />
        </div>
        <p>{isUsed ? "Usado" : "No usado"}</p>
        <p>{getChileanDateFormat(createdAt)}</p>
      </Card>
    </li>
  );
}
