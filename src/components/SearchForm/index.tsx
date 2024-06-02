import { MagnifyingGlass, X } from "phosphor-react";
import {
  ButtonClear,
  ButtonSubmit,
  SearchFormContainer,
  SectionInput,
} from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
import { useEffect } from "react";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export default function SearchForm() {
  const filterTransaction = useContextSelector(
    TransactionsContext,
    (context) => context.filterTransaction
  );

  const { register, handleSubmit, reset, watch } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    const queryData = data.query.toLowerCase();
    await filterTransaction(queryData);
  }
  const query = watch("query");
  const isSubmitDisabled = !query;

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <SectionInput>
        <input
          type="text"
          placeholder="Busque por transações"
          {...register("query")}
        />
        <ButtonClear
          type="button"
          onClick={() => {
            reset({ query: "" });
            filterTransaction("");
          }}
          disabled={isSubmitDisabled}
        >
          <X size={20} weight="bold" />
        </ButtonClear>
      </SectionInput>
      <ButtonSubmit type="submit" disabled={isSubmitDisabled}>
        <MagnifyingGlass size={20} weight="bold" />
        Buscar
      </ButtonSubmit>
    </SearchFormContainer>
  );
}
