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
import { useEffect } from "react";
import {
  Transaction,
  TransactionsContext,
} from "@/contexts/TransactionsContext";
import { DateInput } from "../date";

const TransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  createdAt: z.date().optional(),
  type: z.enum(["income", "outcome"]),
  fixed: z.boolean(),
});

type TransactionFormInputs = z.infer<typeof TransactionFormSchema>;

interface ModalEditionProps {
  id: string;
  data: Transaction;
  setIsOpen: (isOpen: boolean) => void;
}

export function ModalEdition({ id, data, setIsOpen }: ModalEditionProps) {
  const { control, register, handleSubmit, watch, reset } =
    useForm<TransactionFormInputs>({
      resolver: zodResolver(TransactionFormSchema),
    });

  const editTransaction = useContextSelector(TransactionsContext, (context) => {
    return context.editTransaction;
  });

  useEffect(() => {
    reset({
      description: data.description,
      price: data.price,
      category: data.category,
      type: data.type,
      createdAt: new Date(data.createdAt),
    });
  }, [data, reset]);

  async function handleEditTransaction(formData: TransactionFormInputs) {
    const transformedData = {
      ...formData,
      createdAt: formData.fixed
        ? 0
        : formData.createdAt
        ? new Date(formData.createdAt).getTime()
        : Date.now(),
    };
    await editTransaction(id, transformedData);
    setIsOpen(false);
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
        <Dialog.Title>Editar transação</Dialog.Title>
        <CloseButton
          onClick={() => {
            reset();
            setIsOpen(false);
          }}
        >
          <X color="white" size={20} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleEditTransaction)}>
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
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />
          <button type="submit" disabled={isSubmitDisabled}>
            Editar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
