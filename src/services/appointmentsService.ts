import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export interface AppointmentData {
  service?: string;
  notes?: string;
  date?: { seconds: number; nanoseconds: number };
  status?: string;
}

export interface Appointment extends AppointmentData {
  id: string;
}

const collectionName = "appointments";

export async function getAppointments(): Promise<Appointment[]> {
  const q = query(collection(db, collectionName));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AppointmentData),
  }));
}

export async function getAppointmentById(id: string): Promise<Appointment> {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error("Agendamento não encontrado");
  return { id: docSnap.id, ...(docSnap.data() as AppointmentData) };
}

export async function createAppointment(data: AppointmentData) {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
}

export async function updateAppointment(id: string, data: Partial<AppointmentData>) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
}

export async function deleteAppointment(id: string) {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}

// Listener com callback de erro suportado
export function subscribeAppointments(
  callback: (appointments: Appointment[]) => void,
  errorCallback?: (error: Error) => void
) {
  const q = query(collection(db, collectionName));
  return onSnapshot(
    q,
    (querySnapshot) => {
      const appointments: Appointment[] = [];
      querySnapshot.forEach((doc) => {
        appointments.push({ id: doc.id, ...(doc.data() as AppointmentData) });
      });
      callback(appointments);
    },
    (error) => {
      if (errorCallback) errorCallback(error);
    }
  );
}
