import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../clientApp";

export default async function signUp(email: string, password: string) {
  let result: UserCredential | null = null;
  let error: Error | null = null;
  try {
    // Cria o usuário
    result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    await setDoc(doc(db, "users", user.uid, "transactions"), {
      email: user.email,
    });
  } catch (e: any) {
    error = e as Error;
    console.error("Error signing up:", error);
  }
  return { result, error };
}
