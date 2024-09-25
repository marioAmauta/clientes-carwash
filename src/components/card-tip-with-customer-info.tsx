import { Prisma } from "@prisma/client";

import { getChileanDateFormat, getChileanMoneyFormat } from "@/lib/utils";

import { ButtonOptionsCustomer } from "@/components/button-options-customer";
import { ButtonOptionsTip } from "@/components/button-options-tip";
import { CardButtonSectionCustomer } from "@/components/card-button-section-customer";
import { CardSeparator } from "@/components/card-separator";
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardSection, CardSubTitle, CardTitle } from "@/components/ui/card";

export type CardTipWithCustomerInfoData = Prisma.TipGetPayload<{
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
    customer: {
      select: {
        carPlate: true;
        customerDescription: true;
        createdAt: true;
        createdById: true;
      };
    };
  };
}>;

type CardTipWithCustomerInfoProps = CardTipWithCustomerInfoData & {
  userId: string;
  hiddenCreatorUsername?: boolean;
};

export async function CardTipWithCustomerInfo({
  userId,
  hiddenCreatorUsername,
  id,
  tip,
  tipComment,
  createdAt,
  user,
  customer
}: CardTipWithCustomerInfoProps) {
  const isTipCreator = userId === user?.id;
  const isCustomerCreator = userId === customer.createdById;

  return (
    <CardSection>
      <div className="flex items-center justify-between">
        <CardSubTitle>{customer.carPlate}</CardSubTitle>
        {isCustomerCreator ? <ButtonOptionsCustomer carPlate={customer.carPlate} /> : null}
      </div>
      {customer.customerDescription ? <CardDescription>{customer.customerDescription}</CardDescription> : null}
      <CardSeparator />
      <div className="flex items-center justify-between">
        <CardTitle>{getChileanMoneyFormat(tip)}</CardTitle>
        {isTipCreator ? <ButtonOptionsTip tipId={id} carPlate={customer.carPlate} /> : null}
      </div>
      {tipComment ? <CardDescription>{tipComment}</CardDescription> : null}
      {user?.username ? (
        <>
          {hiddenCreatorUsername ? null : (
            <Badge variant="outline" className="w-fit">
              {user.username}
            </Badge>
          )}
        </>
      ) : null}
      <Badge variant="outline" className="w-fit">
        {getChileanDateFormat(createdAt)}
      </Badge>
      <CardSeparator />
      <CardButtonSectionCustomer carPlate={customer.carPlate} />
    </CardSection>
  );
}
