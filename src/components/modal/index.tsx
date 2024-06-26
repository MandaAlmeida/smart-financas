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
import { Section } from "lucide-react";

const newTransactrionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  createdAt: z.date(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactrionFormSchema>;

export function Modal() {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction;
    }
  );

  const { control, register, handleSubmit, watch, reset } =
    useForm<NewTransactionFormInputs>({
      resolver: zodResolver(newTransactrionFormSchema),
    });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const transformedData = {
      ...data,
      createdAt: data.createdAt.getTime(),
    };
    createTransaction(transformedData);

    reset();
  }

  const description = watch("description");
  const price = watch("price");
  const category = watch("category");
  const type = watch("type");
  const createdAt = watch("createdAt");
  const isSubmitDisabled =
    !description || !price || !category || !createdAt || !type;

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
          <Controller
            control={control}
            name="createdAt"
            render={({ field }) => (
              <ContainerDateInput>
                <DateInput onValueChange={field.onChange} value={field.value} />
              </ContainerDateInput>
            )}
          />

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
