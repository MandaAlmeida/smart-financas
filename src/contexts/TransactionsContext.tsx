import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { auth, db } from "@/firebase/clientApp";
import {
  collection,
  query,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";

interface Item {
  id: string;
  data: Transaction;
}

export interface Transaction {
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: number;
}

interface CreateTransactionInput {
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
}

interface TransactionContextType {
  transactions: Item[];
  fetchDate: () => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
  filterTransaction: (descrition: string) => void;
}

interface TransactionsProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export default function TransactionsProvider({ children }: TransactionsProps) {
  const [transactions, setTransactions] = useState<Item[]>([]);

  const fetchDate = useCallback(async () => {
    try {
      if (auth.currentUser) {
        const q = query(collection(db, auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const itemsArray: Item[] = [];

        querySnapshot.forEach((doc) => {
          const itemData = doc.data();
          const item: Item = {
            id: doc.id,
            data: {
              description: itemData.description,
              price: itemData.price,
              category: itemData.category,
              type: itemData.type,
              createdAt: itemData.createdAt,
            },
          };
          itemsArray.push(item);
        });

        setTransactions(itemsArray);
        console.log(itemsArray);
      }
    } catch (e) {
      console.error(e);
    }
  }, [setTransactions]);

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data;
      const newTransaction: Transaction = {
        description: description,
        price: price,
        category: category,
        type: type,
        createdAt: Date.now(),
      };
      await addDoc(collection(db, `${auth.currentUser?.uid}`), newTransaction);
      fetchDate();
    },
    [fetchDate]
  );

  const deleteTransaction = useCallback(
    async (id: string) => {
      if (auth.currentUser) {
        try {
          await deleteDoc(doc(db, auth.currentUser.uid, id));
          fetchDate();
          console.log("Transaction deleted:", id);
        } catch (e) {
          console.error("Error deleting transaction:", e);
        }
      }
    },
    [fetchDate]
  );

  const filterTransaction = useCallback(async (description: string) => {
    if (description && auth.currentUser) {
      const docRef = collection(db, auth.currentUser.uid);
      const items: Item[] = [];
      const q = query(docRef, where("description", "==", description));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const itemData = doc.data();
        const item: Item = {
          id: doc.id,
          data: {
            description: itemData.description,
            price: itemData.price,
            category: itemData.category,
            type: itemData.type,
            createdAt: itemData.createdAt,
          },
        };
        items.push(item);
      });
      setTransactions(items);
    }
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        deleteTransaction,
        fetchDate,
        filterTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
