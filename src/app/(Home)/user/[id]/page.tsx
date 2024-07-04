"use client";
import SearchForm from "@/components/SearchForm";
import { Summary } from "@/components/Summary";
import { Header } from "@/components/header";
import { Table } from "@/components/table";
import { ContainerFilter, TranactionsContainer } from "@/styles/app/Home";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useRouter as useRouterNavigation } from "next/navigation";
import { useEffect, useState } from "react";
import CalendarMonth from "@/components/calendar/page";

export default function Transactions() {
  const [user] = useAuthState(auth);
  const navigation = useRouterNavigation();
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setTotalPages(5);
      } else {
        setTotalPages(10);
      }
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigation.push("/");
    }
  }, [user, navigation]);
  return (
    <>
      <Header />
      <Summary />

      <TranactionsContainer>
        <ContainerFilter>
          <SearchForm />
          <CalendarMonth />
        </ContainerFilter>
        <Table itemsPerPage={totalPages} />
      </TranactionsContainer>
    </>
  );
}
