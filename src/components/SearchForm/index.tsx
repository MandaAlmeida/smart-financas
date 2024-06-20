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

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export default function SearchForm() {
  const filterTransaction = useContextSelector(
    TransactionsContext,
    (context) => context.fetchDate
  );

  const { register, handleSubmit, reset, watch } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });
  const query = watch("query");
  async function handleSearchTransactions(data: SearchFormInputs) {
    const queryData = data.query.toLowerCase();
    await filterTransaction(queryData);
  }

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
      <ButtonSubmit type="submit">
        <MagnifyingGlass size={20} weight="bold" />
        Buscar
      </ButtonSubmit>
    </SearchFormContainer>
  );
}
