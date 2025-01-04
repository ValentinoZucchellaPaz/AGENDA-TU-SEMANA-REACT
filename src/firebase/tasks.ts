import { addDoc, collection, deleteDoc, doc, FirestoreError, getDoc, getDocs, onSnapshot, query, Unsubscribe, updateDoc, where } from "firebase/firestore";
import { db } from "./config";
import { Task } from "./types";

//get
export async function getTasks(): Promise<Task[]> {
    const taskRef = collection(db, "tasks")
    const snapshot = await getDocs(taskRef)
    const tasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data
    })) as Task[]
    return tasks
}
export async function getTaskById(id: string): Promise<Task | null> {
    const taskRef = doc(db, "tasks", id)
    const snapshot = await getDoc(taskRef)
    if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data } as Task
    }
    return null
}

//add
export async function addTask(task: Omit<Task, "id">): Promise<string> {
    const taskRef = collection(db, "tasks")
    const docRef = await addDoc(taskRef, task)
    return docRef.id
}

//delete
export async function deleteTask(id: string): Promise<void> {
    const docRef = doc(db, "tasks", id)
    await deleteDoc(docRef)
}
export async function deleteAll(creatorEmail: string): Promise<void> {
    const taskRef = collection(db, "tasks")
    const q = query(taskRef, where("creator", "==", creatorEmail))
    const snapshot = await getDocs(q)
    const deletePromise = snapshot.docs.map(doc => deleteDoc(doc.ref))
    await Promise.all(deletePromise)
}

//edit
export async function updateTask(id: string, updatedTask: Partial<Task>): Promise<void> {
    const docRef = doc(db, "task", id)
    await updateDoc(docRef, updatedTask)
}

//listen
export function listenTasks(
    userMail: string,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    setError: React.Dispatch<React.SetStateAction<FirestoreError | null>>): Unsubscribe {
    const taskRef = collection(db, "tasks")
    const q = query(taskRef, where("creator", "==", userMail))
    return onSnapshot(q, ({ docs }) => {
        const tasks = docs.map(doc => ({ id: doc.id, ...doc.data() })) as Task[]
        setTasks(tasks)
    }, (error) => setError(error))
}

//toggle complete
export async function toggleComplete(id: string, prev: boolean) {
    await updateTask(id, { isCompleted: !prev })
}