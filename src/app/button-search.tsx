"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { TEST_IDS } from "@/lib/constants";
import { SearchCarPlateSchemaType } from "@/lib/definitions";
import { searchCarPlateSchema } from "@/lib/schemas";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function ButtonSearch() {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<SearchCarPlateSchemaType>({
    resolver: zodResolver(searchCarPlateSchema),
    defaultValues: {
      carPlate: ""
    }
  });

  function onSubmit({ carPlate }: SearchCarPlateSchemaType) {
    if (!carPlate) {
      return;
    }

    setOpen(false);

    push(`/${carPlate.toUpperCase()}`);

    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className="bg-secondary" data-testid={TEST_IDS.searchButtonTrigger}>
          <Search className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buscar cliente</DialogTitle>
          <DialogDescription>Busca al cliente por su patente</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="carPlate"
              render={({ field }) => {
                field.value = field.value.toUpperCase();

                return (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input type="search" placeholder="TS1234" data-testid={TEST_IDS.searchForm.search} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" data-testid={TEST_IDS.searchForm.submitButton}>
              Buscar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
