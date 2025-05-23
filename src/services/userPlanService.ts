import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const userCollection = "users";
const planCollection = "plans";

export async function getUserById(id: string) {
  const docRef = doc(db, userCollection, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error("Usuário não encontrado");
  return { id: docSnap.id, ...(docSnap.data() as any) };
}

export async function updateUser(id: string, data: any) {
  const docRef = doc(db, userCollection, id);
  await updateDoc(docRef, data);
}

export async function getPlanById(id: string) {
  const docRef = doc(db, planCollection, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error("Plano não encontrado");
  return { id: docSnap.id, ...(docSnap.data() as any) };
}

export async function updatePlan(id: string, data: any) {
  const docRef = doc(db, planCollection, id);
  await updateDoc(docRef, data);
}
