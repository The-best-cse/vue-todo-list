// Main store `@/stores/todo.js` for handling to-do list CRUD
import { defineStore } from 'pinia';
import axios from '../utils/axiosInstance';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todoList: [], // Holds the fetched to-do items
  }),
  getters: {
    /**
     * Gets the to-do list from the state
     */
    getTodoList: (state) => state.todoList,
  },
  actions: {
    /**
     * Fetches the to-do list from the server
     */
    async fetchTodoList() {
      const response = await axios.get('/todos');
      this.todoList = response.data.todos;
    },
  },
});
