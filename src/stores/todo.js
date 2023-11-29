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
      const response = await axios.post('/todos/add', newTodo); // Adding a new todo will not add it into the server.
      this.todoList.push(response.data); 
      
    },

    /**
     * Updates single to-do 
     */
    async updateTodo(todoId, updatedTodo) {
      const response = await axios.put(`/todos/${todoId}`, updatedTodo); // Updating a todo will not update it into the server.
      
      // Find the index of the todo item with the given ID
      const index = this.todoList.findIndex((todo) => todo.id === todoId);
      if (index !== -1) {
        this.todoList[index] = response.data;
      }
    },

    /**
     * Delets single to-do 
     */

    async deleteTodo(todoId) {
      const response = await axios.delete(`/todos/${todoId}`); // It will simulate a DELETE request and will return deleted todo with "isDeleted" & "deletedOn" keys.
      if(response.data?.isDeleted){
         // Find the index of the todo item with the given ID
         const indexToRemove = this.todoList.findIndex(todo => todo.id === todoId);

         // Remove the item from the array using splice
         if (indexToRemove !== -1) {
           this.todoList.splice(indexToRemove, 1);
         }
      }      
    },
  },
});
