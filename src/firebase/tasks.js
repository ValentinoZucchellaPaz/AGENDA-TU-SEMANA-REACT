import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './config';

function mapTasksToArray(task) {
  const data = task.data();
  const id = task.id;

  return { id, ...data };
}

export function getTasks() {
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
  creator,
}) {
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
        resolve({ title, hourTo, hourFrom, selectedDays, newDocRef }),
      )
      .catch((e) => reject(e));
  });
}

export function ListenTasks(callback, onErrorCallback, userEmail) {
  return new Promise((resolve, reject) => {
    const tasksRef = collection(db, 'tasks');
    const queryRef = query(tasksRef, where('creator', '==', userEmail));
    resolve(onSnapshot(
      queryRef,
      ({ docs }) => {
        const newTasks = docs.map(mapTasksToArray);
        callback(newTasks);
      },
      (error) => {
        onErrorCallback(error);
      },
    ))
  })
}

export function deleteTaskById(id) {
  return new Promise((resolve, reject) => {
    const docToDelete = doc(db, 'tasks', id);
    getDoc(docToDelete)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          deleteDoc(docToDelete).then(() => {
            resolve(true);
          });
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(`el documento con id ${id} no existe`);
        }
      })
      .catch((err) => reject(err));
  });
}

export function editTask({ title, hourFrom, hourTo, selectedDays, id }) {
  return new Promise((resolve, reject) => {
    const docRef = doc(db, 'tasks', id);
    updateDoc(docRef, { title, hourTo, hourFrom, selectedDays })
      .then(resolve)
      .catch(reject);
  });
}

export function toggleCompleteTask(id, prev) {
  return new Promise((resolve, reject) => {
    const docRef = doc(db, 'tasks', id);
    updateDoc(docRef, { isCompleted: !prev }).then(resolve).catch(reject);
  });
}

export function deleteAllTasks(creator) {
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