import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  Unsubscribe,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './config';
import { AddTaskProps, DTOTask, EditTaskProps, Task } from '@/types';

export function getTasks(): Promise<DTOTask[]> {
  return new Promise((resolve, reject) => {
    const tasksRef = collection(db, 'tasks');
    getDocs(tasksRef)
      .then((res) => {
        const tasksAddapted = res.docs.map((task) => {
          const data = task.data();
          return { id: task.id, data };
        });
        resolve(tasksAddapted);
      })
      .catch((e) => reject(e));
  });
}
export function addTask({
  title,
  hourFrom,
  hourTo,
  selectedDays,
  createdAt,
  creator
}: AddTaskProps): Promise<DocumentReference<DocumentData, DocumentData>> {
  return new Promise((resolve, reject) => {
    const tasksAddapted = collection(db, 'tasks');
    addDoc(tasksAddapted, {
      title,
      hourFrom,
      hourTo,
      selectedDays,
      isCompleted: false,
      createdAt,
      creator,
    })
      .then((newDocRef) =>
        resolve(newDocRef),
      )
      .catch((e) => reject(e));
  });
}

export function ListenTasks(
  callback: CallableFunction,
  onErrorCallback: CallableFunction,
  userEmail: string): Promise<Unsubscribe> {
  return new Promise((resolve, reject) => {
    const tasksRef = collection(db, 'tasks');
    const queryRef = query(tasksRef, where('creator', '==', userEmail));
    resolve(onSnapshot(
      queryRef,
      ({ docs }) => {
        const newTasks = docs.map((task) => {
          const data = task.data();
          const id = task.id;

          return { id, ...data };
        });
        callback(newTasks);
      },
      (error) => {
        onErrorCallback(error);
      },
    ))
  })
}

export function deleteTaskById(id: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const docToDelete = doc(db, 'tasks', id);
    getDoc(docToDelete)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          deleteDoc(docToDelete).then(() => {
            resolve(true);
          });
        } else {
          reject(false);
        }
      })
      .catch((err) => reject(err));
  });
}

export function editTask({
  id,
  title,
  hourFrom,
  hourTo,
  selectedDays
}: EditTaskProps): Promise<void> {
  return new Promise((resolve, reject) => {
    const docRef = doc(db, 'tasks', id);
    updateDoc(docRef, { title, hourTo, hourFrom, selectedDays })
      .then(resolve)
      .catch(reject);
  });
}

export function toggleCompleteTask(id: string, prev: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    const docRef = doc(db, 'tasks', id);
    updateDoc(docRef, { isCompleted: !prev }).then(resolve).catch(reject);
  });
}

export function deleteAllTasks(creator: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const q = query(collection(db, 'tasks'), where('creator', '==', creator))
    getDocs(q).then(({ docs }) => {
      const tasksIdToDel = docs.map(doc => doc.id)
      tasksIdToDel.forEach((id) => {
        deleteTaskById(id).then(resolve)
      })
    })
  })
}