import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../clientApp";

export default async function singUp(email: string, password: string) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }
  return { result, error };
}
