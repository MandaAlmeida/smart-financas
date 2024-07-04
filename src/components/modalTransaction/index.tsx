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
import { TransactionsContext } from "@/contexts/TransactionsContext";
import { DateInput } from "../date";

const newTransactrionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  createdAt: z.date().optional(),
  type: z.enum(["income", "outcome"]),
  fixed: z.boolean(),
});

type NewTransactionFormInputs = z.infer<typeof newTransactrionFormSchema>;

export function ModalTransaction() {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction;
    }
  );

  const { control, register, handleSubmit, watch, reset } =
    useForm<NewTransactionFormInputs>({
      resolver: zodResolver(newTransactrionFormSchema),
      defaultValues: { type: "income" },
    });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const transformedData = {
      ...data,
      createdAt: data.fixed
        ? 0
        : data.createdAt
        ? new Date(data.createdAt).getTime()
        : Date.now(),
    };
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
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton onClick={() => reset()}>
          <X color="white" size={20} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            step="0.01"
            required
            {...register("price", {
              valueAsNumber: true,
            })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")}
          />
          <label htmlFor="fixed">
            <input type="checkbox" id="fixed" {...register("fixed")} />
            Valor mensal
          </label>
          {fixed ? (
            ""
          ) : (
            <Controller
              control={control}
              name="createdAt"
              render={({ field }) => (
                <ContainerDateInput>
                  <DateInput
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                </ContainerDateInput>
              )}
            />
          )}

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saida
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />
          <button type="submit" disabled={isSubmitDisabled}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
