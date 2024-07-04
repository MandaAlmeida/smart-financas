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
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  User,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
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
  createdAt: number;
}

export interface TransactionContextType {
  transactions: Item[];
  fetchDate: (descrition: string) => void;
  deleteTransaction: (id: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
  editTransaction: (
    id: string,
    updatedFields: Partial<Transaction>
  ) => Promise<void>;
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
    if (item.data.createdAt === 0) {
      return true;
    } else {
    }
    const dateItem =
      item.data.createdAt === 0 ? 0 : dateFormatter.format(item.data.createdAt);
    const dateFrom = range?.from ? dateFormatter.format(range.from) : null;
    const dateTo = range?.to ? dateFormatter.format(range.to) : null;

    if (!dateFrom || !dateTo) {
      return false;
    }
    const found = dateItem >= dateFrom && dateItem <= dateTo;
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
      console.error("Error signing in:", error);
    }
    return { result, error };
  };
  const signout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User signed out");
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDate = useCallback(
    async (description: string) => {
      try {
        if (auth.currentUser) {
          const userUid = auth.currentUser.uid;
          const docRef = collection(db, "users", userUid, "transactions");
          const querySnapshot = await getDocs(docRef);
          let items: Item[] = [];

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

          items = items.sort((a, b) => {
            return (
              new Date(a.data.createdAt).getTime() -
              new Date(b.data.createdAt).getTime()
            );
          });

          setTransactions(items);
          console.log(items);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [setTransactions]
  );

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      try {
        if (auth.currentUser) {
          const userUid = auth.currentUser.uid;
          const { description, price, category, type, createdAt } = data;
          const newTransaction = {
            description,
            price,
            category,
            type,
            createdAt: createdAt ? new Date(createdAt).getTime() : Date.now(),
          };

          const docRef = await addDoc(
            collection(db, "users", userUid, "transactions"),
            newTransaction
          );

          setTransactions((prevTransactions) => {
            const updatedTransactions = [
              ...prevTransactions,
              { id: docRef.id, data: newTransaction },
            ];

            return updatedTransactions.sort(
              (a, b) =>
                new Date(a.data.createdAt).getTime() -
                new Date(b.data.createdAt).getTime()
            );
          });

          console.log("Transaction created:", newTransaction);
        }
      } catch (e) {
        console.error("Error creating transaction:", e);
      }
    },
    [setTransactions]
  );

  const deleteTransaction = useCallback(
    async (id: string) => {
      if (auth.currentUser) {
        const userUid = auth.currentUser.uid;
        try {
          await deleteDoc(doc(db, "users", userUid, "transactions", id));
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

  const editTransaction = useCallback(
    async (id: string, updatedFields: Partial<Transaction>) => {
      if (auth.currentUser) {
        const userUid = auth.currentUser.uid;
        try {
          await updateDoc(
            doc(db, "users", userUid, "transactions", id),
            updatedFields
          );

          setTransactions((prevTransactions) =>
            prevTransactions.map((transaction) =>
              transaction.id === id
                ? {
                    ...transaction,
                    data: { ...transaction.data, ...updatedFields },
                  }
                : transaction
            )
          );

          console.log("Transaction edit:", id);
        } catch (e) {
          console.error("Error editing transaction:", e);
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
        editTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
