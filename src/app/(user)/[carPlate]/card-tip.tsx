import { Prisma } from "@prisma/client";

import { getChileanDateFormat, getChileanMoneyFormat } from "@/lib/utils";

import { ButtonOptionsTip } from "@/components/button-options-tip";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardSection, CardTitle } from "@/components/ui/card";

export type CardTipData = Prisma.TipGetPayload<{
  select: {
    id: true;
    tip: true;
    tipComment: true;
    createdAt: true;
    user: {
      select: {
        id: true;
        username: true;
      };
    };
  };
}>;

export type CardTipProps = CardTipData & {
  userId: string;
  carPlate: string;
};

export async function CardTip({ userId, carPlate, id, tip, tipComment, createdAt, user }: CardTipProps) {
  const isTipCreator = userId === user?.id;

  return (
    <Card>
      <CardSection>
        <div className="flex items-center justify-between">
          <CardTitle>{getChileanMoneyFormat(tip)}</CardTitle>
          {isTipCreator ? <ButtonOptionsTip tipId={id} carPlate={carPlate} /> : null}
        </div>
        {tipComment ? <CardDescription>{tipComment}</CardDescription> : null}
        {user?.username ? (
          <Badge variant="outline" className="w-fit">
            {user.username}
          </Badge>
        ) : null}
        <Badge variant="outline" className="w-fit">
          {getChileanDateFormat(createdAt)}
        </Badge>
      </CardSection>
    </Card>
  );
}
