import { addTask, editTask } from '@/DAO/tasks';
import { UseAsyncCreateProps } from '@/types';

export default function useAsyncCreate({
  title,
  hourFrom,
  hourTo,
  selectedDays,
  creator,
  task,
}: UseAsyncCreateProps) {
  return new Promise((resolve, reject) => {
    if (task) {
      const { id } = task;
      editTask({ id, title, hourFrom, hourTo, selectedDays })
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
