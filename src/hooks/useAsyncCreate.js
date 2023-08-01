import { addTask, editTask } from '@/firebase/tasks';

export default function useAsyncCreate({
  title,
  hourFrom,
  hourTo,
  selectedDays,
  creator,
  task,
}) {
  return new Promise((resolve, reject) => {
    if (task) {
      const { id } = task;
      editTask({ title, hourFrom, hourTo, selectedDays, id })
        .then(resolve)
        .catch(reject);
    } else {
      const createdAt = new Date();
      addTask({ title, hourFrom, hourTo, selectedDays, createdAt, creator })
        .then(resolve)
        .catch(reject);
    }
  });
}
