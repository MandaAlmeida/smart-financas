import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { auth, db } from "@/firebase/clientApp";
import { dateFormatter } from "@/utils/formatter";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  User,
  UserCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

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

export interface TransactionContextType {
  transactions: Item[];
  fetchDate: (descrition: string) => void;
  deleteTransaction: (id: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
  user: User | null;
  loading: boolean;
  signin: (
    email: string,
    password: string
  ) => Promise<{ result: UserCredential | null; error: Error | null }>;
  signout: () => void;
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  filteredTransactions: Item[];
}

interface TransactionsProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export default function TransactionsProvider({ children }: TransactionsProps) {
  const currentDate = new Date();
  const initialRange: DateRange = {
    from: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    to: addDays(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
      0
    ),
  };

  const [transactions, setTransactions] = useState<Item[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [range, setRange] = useState<DateRange | undefined>(initialRange);

  const filteredTransactions = transactions?.filter((item) => {
    const dateItem = dateFormatter.format(item.data.createdAt);
    const dateFrom = dateFormatter.format(range?.from);
    const dateTo = dateFormatter.format(range?.to);
    const found = dateFrom >= dateItem || dateTo >= dateItem;
    return found;
  });

  const signin = async (email: string, password: string) => {
    let result: UserCredential | null = null;
    let error: Error | null = null;
    try {
      result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      router.push(`/user/${result.user.uid}`);
    } catch (e: any) {
      error = e as Error;
    }
    return { result, error };
  };

  const signout = () => {
    try {
      auth.signOut().then(() => {
        setUser(null);
        console.log(user);
        router.push("/");
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDate = useCallback(
    async (description: string) => {
      try {
        if (auth.currentUser) {
          const docRef = collection(db, auth.currentUser.uid);
          const querySnapshot = await getDocs(docRef);
          const items: Item[] = [];

          if (description) {
            const keywords = description.toLowerCase().split(" ");
            querySnapshot.forEach((doc) => {
              const itemData = doc.data();
              if (
                keywords.some((keyword) =>
                  itemData.description.toLowerCase().includes(keyword)
                )
              ) {
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
              }

              console.log(items);
            });
          } else {
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
          }
          setTransactions(items);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [setTransactions]
  );

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

      const docRef = await addDoc(
        collection(db, `${auth.currentUser?.uid}`),
        newTransaction
      );

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        { id: docRef.id, data: newTransaction },
      ]);
    },
    [setTransactions]
  );

  const deleteTransaction = useCallback(
    async (id: string) => {
      if (auth.currentUser) {
        try {
          await deleteDoc(doc(db, auth.currentUser.uid, id));
          setTransactions((prevTransactions) =>
            prevTransactions.filter((transaction) => transaction.id !== id)
          );
          console.log("Transaction deleted:", id);
        } catch (e) {
          console.error("Error deleting transaction:", e);
        }
      }
    },
    [setTransactions]
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push(`/user/${auth.currentUser?.uid}`);
        fetchDate("");
      }
    });
  }, [fetchDate, router]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        deleteTransaction,
        fetchDate,
        user,
        loading,
        signin,
        signout,
        range,
        setRange,
        filteredTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
