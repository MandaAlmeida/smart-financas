import {
  createUserWithEmailAndPassword,
  UserCredential,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../clientApp";

export default async function signUp(
  email: string,
  password: string,
  name: string
) {
  let result: UserCredential | null = null;
  let error: Error | null = null;
  try {
    // Cria o usuário
    result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    // Atualiza o displayName do usuário
    if (user) {
      await updateProfile(user, { displayName: name });
    }

    // Salva os dados no Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      name: user.displayName,
    });
  } catch (e: any) {
    error = e as Error;
    console.error("Error signing up:", error);
  }
  return { result, error };
}
