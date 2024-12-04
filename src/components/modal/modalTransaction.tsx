import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";
import {
  CloseButton,
  ContainerDateInput,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContextSelector } from "use-context-selector";
import { Transaction, TransactionsContext } from "@/contexts/TransactionsContext";
import { DateInput } from "../date";
import { ComponentProps, useEffect } from "react";
import React from "react";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  createdAt: z.date().optional(),
  type: z.enum(["income", "outcome"]),
  fixed: z.boolean(),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;


type ModalEditionProps = {
  id?: string;
  data?: Transaction;
  title: string;
}

export function ModalTransaction({ id = "", data, title, }: ModalEditionProps) {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => context.createTransaction
  );
  const editTransaction = useContextSelector(TransactionsContext,
    (context) => context.editTransaction
  );

  const { control, register, handleSubmit, watch, reset } =
    useForm<NewTransactionFormInputs>({
      resolver: zodResolver(newTransactionFormSchema),
    });


  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const transformedData = {
      ...data,
      createdAt: data.fixed
        ? 0
        : data.createdAt
          ? new Date(data.createdAt).getTime()
          : new Date().setHours(0, 0, 0, 0),
    };

    if (id) {
      await editTransaction(id, transformedData);
      reset();
      return;
    }
    createTransaction(transformedData);
    reset();
  }

  const description = watch("description");
  const price = watch("price");
  const category = watch("category");
  const type = watch("type");
  const fixed = watch("fixed");
  const isSubmitDisabled = !description || !price || !category || !type;

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>{title}</Dialog.Title>
        <CloseButton onClick={() => reset()}>
          <X size={20} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            value={data?.description}
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            step="0.01"
            required
            value={data?.price}
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            value={data?.category}
            {...register("category")}
          />

          <label htmlFor="fixed">
            <input type="checkbox" id="fixed" {...register("fixed")} />
            Valor mensal
          </label>

          {!fixed && (
            <Controller
              control={control}
              name="createdAt"
              render={({ field }) => (
                <ContainerDateInput>
                  <DateInput
                    onValueChange={field.onChange}
                    value={data !== undefined ? new Date(data?.createdAt) : field.value}
                  />
                </ContainerDateInput>
              )}
            />
          )}
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <TransactionType
                onValueChange={field.onChange}
                value={data?.type || field.value}
              >
                <TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )}
          />
          <button type="submit" disabled={isSubmitDisabled}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
