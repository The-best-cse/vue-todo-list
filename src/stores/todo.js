// Main store `@/stores/todo.js` for handling to-do list CRUD
import { defineStore } from 'pinia'
import axios from '../utils/axiosInstance'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todoList: [], // Holds the fetched to-do items
    originalTodoList: [],
    loading: false,
  }),
  getters: {
    /**
     * Gets the to-do list from the state
     */
    getTodoList: (state) => state.todoList
  },
  actions: {
    /**
     * Fetches the to-do list from the server
     */
    async fetchTodoList() {
      this.loading = true
      const response = await axios.get('/todos')
      if(response.data.todos){
        this.loading = false
        this.todoList = response.data.todos
        this.originalTodoList = Array.from(this.todoList)
        this.persistState()
      }
    
    },

    /**
     * Creates single to-do
     * @param {object} newTodo
     */

    async createTodo(newTodo) {
      const response = await axios.post('/todos/add', newTodo) // Adding a new todo will not add it into the server.
      this.todoList.push(response.data)
      this.persistState()
    },

    /**
     * Updates single to-do
     * @param {string} todoId
     * @param {object} updatedTodo
     */
    async updateTodo(todoId, updatedTodo) {
      const response = await axios.put(`/todos/${todoId}`, updatedTodo) // Updating a todo will not update it into the server.

      // Find the index of the todo item with the given ID
      const index = this.todoList.findIndex((todo) => todo.id === todoId)
      if (index !== -1) {
        this.todoList[index] = response.data
        this.persistState()
      }
    },

    /**
     * Delets single to-do
     * @param {string} todoId
     */

    async deleteTodo(todoId) {
      const response = await axios.delete(`/todos/${todoId}`) // It will simulate a DELETE request and will return deleted todo with "isDeleted" & "deletedOn" keys.
      if (response.data?.isDeleted) {
        // Find the index of the todo item with the given ID
        const indexToRemove = this.todoList.findIndex((todo) => todo.id === todoId)

        // Remove the item from the array using splice
        if (indexToRemove !== -1) {
          this.todoList.splice(indexToRemove, 1)
          this.persistState()
        }
      }
    },

     /**
     * Resets todos to stored state or original list
     */
    resetTodos() {
      const storedState = localStorage.getItem('todoStoreState')
      if (storedState) {
        const state = JSON.parse(storedState)
        this.todoList.splice(0, this.todoList.length, ...state.todoList)
      } else {
        this.todoList.splice(0, this.todoList.length, ...this.originalTodoList)
      }
    },

    /**
     * Filter todos based on a regex pattern in the todo text
     * @param {RegExp} regex - Regular expression pattern to filter todos
     * @returns {object[]} - Returns an array of found todos matching the pattern
     */
    filterTodosByRegex(regex) {
      const filteredTodos = this.todoList.filter((todo) => regex.test(todo.todo))
      this.todoList.splice(0, this.todoList.length, ...filteredTodos)
    },

    /**
     * Filter todos based on a state if 'completed' or ' not completed'
     * @param {Boolean} state - Todo state
     * @returns {object[]} - Returns an array of found todos matching the state
     */
    filterTodosByState(state) {
      const filteredTodos = this.todoList.filter((todo) => todo.completed === state)
      this.todoList.splice(0, this.todoList.length, ...filteredTodos)
    },

    /**
     * Function to persist state to localStorage
     */
    persistState() {
      localStorage.setItem('todoStoreState', JSON.stringify(this.$state))
    },

    /**
     * Function to load state from localStorage
     */
    async hydrateState() {
      const storedState = localStorage.getItem('todoStoreState')
      if (storedState) {
        this.$state = JSON.parse(storedState)
      } else {
        await this.fetchTodoList()
      }
    }
  }
})
