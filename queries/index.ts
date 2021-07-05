import { Status } from './../providers/DataProvider/index';
const getTodos = `
  query MyQuery {
    getTodos {
      description
      id
      title
      status
      dueAt
      categoryName
      categoryColor
    }
  }
`;

const getDueTodos = `
    query MyQuery {
      getDueTodos {
        categoryColor
        categoryName
        description
        dueAt
        id
        title
        status
      }
    }
  `;

const getTodosByCagtegory = (categoryName: string) => `
  query MyQuery {
    getTodosByCategory(categoryName: "${categoryName}") {
      description
      id
      title
      dueAt
      status
      categoryName
      categoryColor
    }
  }
`;

const getTodosByStatus = (status: string) => `
  query MyQuery {
    getTodosByStatus(status: "${status}") {
      description
      id
      title
      dueAt
      status
      categoryName
      categoryColor
    }
  }
`;

const getTodo = (id: string) => `
query MyQuery {
  getTodo(id: "${id}") {
    description
    id
    title
    status
    dueAt
    categoryName
    categoryColor
  }
}
`;

const updateTodoById = ({
  id,
  title,
  description,
  dueAt,
  status,
}: {
  id: string;
  title: string;
  description: string;
  dueAt: number;
  status: Status;
}) => `
  mutation MyMutation {
    updateTodo(description: "${description}", dueAt: ${dueAt}, id: "${id}", title: "${title}", status: "${status}") {
      categoryColor
      categoryName
      description
      dueAt
      id
      title
      status
    }
  }  
`;

const getCategories = `
  query MyQuery {
    getCategories {
      id
      name
      color
    }
  }
`;

const createNewCategory = ({
  name,
  color,
}: {
  name: string;
  color: string;
}) => `
  mutation MyMutation {
    createCategory(name: "${name}", color: "${color}") {
      id
      name
      color
    }
  }
`;

const createTodo = ({
  title,
  description,
  categoryName,
  categoryColor,
  dueAt,
}: {
  title: string;
  description: string;
  categoryName: string;
  categoryColor: string;
  dueAt: number;
}) => `
  mutation MyMutation {
    createTodo(title: "${title}", description: "${description}", categoryName: "${categoryName}", categoryColor: "${categoryColor}", dueAt: ${dueAt}) {
      id
      description
      title
      dueAt
      categoryName
      categoryColor
      status
    }
  }
`;

export {
  getTodos,
  getDueTodos,
  getTodosByCagtegory,
  getTodosByStatus,
  getTodo,
  updateTodoById,
  getCategories,
  createNewCategory,
  createTodo,
};
