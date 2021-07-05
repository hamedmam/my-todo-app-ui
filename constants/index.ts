import { Status } from './../providers/DataProvider/index';
export const todoDefaultState = {
  id: '',
  title: '',
  status: Status.todo,
  description: '',
  dueAt: 20210101,
  categoryName: '',
  categoryColor: '',
};
export const todosDefaultState = [todoDefaultState];
