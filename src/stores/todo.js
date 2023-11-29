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

    /**
     * Creates single to-do 
     */

    async createTodo(newTodo) {
      const response = await axios.post('/todos/add', newTodo);
      this.todoList.push(response.data);
    },

    /**
     * Updates single to-do 
     */
    async updateTodo(todoId, updatedTodo) {
      const response = await axios.put(`/todos/${todoId}`, updatedTodo);
      const index = this.todoList.findIndex((todo) => todo.id === todoId);
      if (index !== -1) {
        this.todoList[index] = response.data;
      }
    },

    /**
     * Delets single to-do 
     */

    async deleteTodo(todoId) {
      await axios.delete(`/todos/${todoId}`);
      this.todoList = this.todoList.filter((todo) => todo.id !== todoId);
    },
  },
});
