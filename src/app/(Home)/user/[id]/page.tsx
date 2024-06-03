"use client";
import SearchForm from "@/components/SearchForm";
import { Summary } from "@/components/Summary";
import { Header } from "@/components/header";
import { Table } from "@/components/table";
import { TranactionsContainer } from "@/styles/app/Home";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useRouter as useRouterNavigation } from "next/navigation";
import { useEffect } from "react";

export default function Transactions() {
  const [user] = useAuthState(auth);
  const navigation = useRouterNavigation();

  useEffect(() => {
    if (!user) {
      navigation.push("/");
    }
  }, [user, navigation]);
  return (
    <div>
      <Header />
      <Summary />

      <TranactionsContainer>
        <SearchForm />
        <Table />
      </TranactionsContainer>
    </div>
  );
}
