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
        name: true;
      };
    };
    customer: {
      select: {
        id: true;
        carPlate: true;
        customerDescription: true;
      };
    };
  };
}>;

export type CardTipProps = CardTipData & {
  loggedUserId: string;
};

export async function CardTip({ loggedUserId, id, tip, tipComment, createdAt, user, customer }: CardTipProps) {
  const isTipCreator = loggedUserId === user?.id;

  return (
    <Card>
      <CardSection>
        <div className="flex items-center justify-between">
          <CardTitle>{getChileanMoneyFormat(tip)}</CardTitle>
          {isTipCreator ? (
            <ButtonOptionsTip
              tip={{
                id,
                tip,
                tipComment
              }}
              customer={customer}
            />
          ) : null}
        </div>
        {tipComment ? <CardDescription>{tipComment}</CardDescription> : null}
        {user?.name ? (
          <Badge variant="outline" className="w-fit">
            {user.name}
          </Badge>
        ) : null}
        <Badge variant="outline" className="w-fit">
          {getChileanDateFormat(createdAt)}
        </Badge>
      </CardSection>
    </Card>
  );
}
