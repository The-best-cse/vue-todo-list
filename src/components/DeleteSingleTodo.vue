<template>
    <!-- <teleport to="body"> -->
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 class="text-lg font-semibold mb-4 text-center">You Are Going to Delete This?</h2>
        <div class="mb-4">
          <input disabled v-model="checkBeforeDeleteTodo.todo" class="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring focus:border-blue-400" />
        </div>
        <div class="flex justify-center space-x-4">
          <button @click="deleteTodo" class="py-2 px-4 bg-red-500 text-white rounded-md text-sm hover:bg-blue-600">Delete!</button>
          <button @click="closeDeleteDilouge" class="py-2 px-4 bg-gray-300 text-gray-800 rounded-md text-sm hover:bg-gray-400">Close</button>
        </div>
      </div>
    </div>
    <!-- </teleport> -->
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useTodoStore } from '@/stores/todo'

  export default {
    emits: ['close', 'success','error'],
    props: {
      todo: Object // Accepts a single todo object
    },
   
    setup(props, { emit }) {
     

      const todoStore = useTodoStore()
      const checkBeforeDeleteTodo = ref({ ...props.todo }) // Create a copy of the passed todo
      const deleteTodo = async () => {
        try {
          await todoStore.deleteTodo(checkBeforeDeleteTodo.value.id)
          emit('success', 'To Do Is Deleted!' )
          closeDeleteDilouge()
      } catch (e) {
        // Display the error
        emit('error',`Error deleting data: ${e.message || 'An error occurred while deleting this todo.'}` )
        closeDeleteDilouge()
      }
      }
  
      const closeDeleteDilouge = () => {
        emit('close')
      }
  
      return {
        checkBeforeDeleteTodo,
        deleteTodo,
        closeDeleteDilouge,
      }
    }
  }
  </script>
  