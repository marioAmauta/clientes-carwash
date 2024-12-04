import { Prisma } from "@prisma/client";

import { getChileanDateFormat } from "@/lib/utils";

import { ButtonOptionsCustomer } from "@/components/button-options-customer";
import { CardButtonSectionCustomer } from "@/components/card-button-section-customer";
import { CardSeparator } from "@/components/card-separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardSection, CardTitle } from "@/components/ui/card";

export type CardCustomerData = Prisma.CustomerGetPayload<{
  select: {
    id: true;
    carPlate: true;
    customerDescription: true;
    createdAt: true;
    createdBy: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

type CardCustomerProps = CardCustomerData & {
  loggedUserId: string;
  hiddenCreatorName?: boolean;
};

export async function CardCustomer({
  loggedUserId,
  hiddenCreatorName,
  id,
  carPlate,
  customerDescription,
  createdAt,
  createdBy
}: CardCustomerProps) {
  const isCustomerCreator = loggedUserId === createdBy?.id;

  return (
    <Card>
      <CardSection>
        <div className="flex justify-between">
          <CardTitle>{carPlate}</CardTitle>
          {isCustomerCreator ? (
            <ButtonOptionsCustomer
              customer={{
                id,
                carPlate,
                customerDescription
              }}
            />
          ) : null}
        </div>
        <CardDescription>{customerDescription ? <span>{customerDescription}</span> : null}</CardDescription>
        {createdBy?.name ? (
          <>
            {hiddenCreatorName ? null : (
              <Badge variant="outline" className="w-fit">
                {createdBy.name}
              </Badge>
            )}
          </>
        ) : null}
        <Badge variant="outline" className="w-fit">
          {getChileanDateFormat(createdAt)}
        </Badge>
        <CardSeparator />
        <CardButtonSectionCustomer
          customer={{
            id,
            carPlate,
            customerDescription
          }}
        />
      </CardSection>
    </Card>
  );
}
