import { Prisma } from "@prisma/client";

import { getChileanDateFormat } from "@/lib/utils";

import { ButtonOptionsCustomer } from "@/components/button-options-customer";
import { CardButtonSectionCustomer } from "@/components/card-button-section-customer";
import { CardSeparator } from "@/components/card-separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardSection, CardTitle } from "@/components/ui/card";

export type CardCustomerData = Prisma.CustomerGetPayload<{
  select: {
    carPlate: true;
    customerDescription: true;
    createdAt: true;
    createdBy: {
      select: {
        id: true;
        username: true;
      };
    };
  };
}>;

type CardCustomerProps = CardCustomerData & {
  userId: string;
  hiddenCreatorUsername?: boolean;
};

export async function CardCustomer({
  userId,
  hiddenCreatorUsername,
  carPlate,
  customerDescription,
  createdAt,
  createdBy
}: CardCustomerProps) {
  const isCustomerCreator = userId === createdBy?.id;

  return (
    <Card>
      <CardSection>
        <div className="flex justify-between">
          <CardTitle>{carPlate}</CardTitle>
          {isCustomerCreator ? <ButtonOptionsCustomer carPlate={carPlate} /> : null}
        </div>
        <CardDescription>{customerDescription ? <span>{customerDescription}</span> : null}</CardDescription>
        {createdBy?.username ? (
          <>
            {hiddenCreatorUsername ? null : (
              <Badge variant="outline" className="w-fit">
                {createdBy.username}
              </Badge>
            )}
          </>
        ) : null}
        <Badge variant="outline" className="w-fit">
          {getChileanDateFormat(createdAt)}
        </Badge>
        <CardSeparator />
        <CardButtonSectionCustomer carPlate={carPlate} />
      </CardSection>
    </Card>
  );
}
