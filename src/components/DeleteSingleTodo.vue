<template>
    <teleport to="body">
        <div class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
    <div class="absolute inset-0 bg-opacity-50 bg-black"></div>
    <div class="z-10 mx-auto w-full sm:w-3/4 md:w-1/2 bg-white rounded-lg overflow-hidden shadow-xl">
        <div class="p-4">
    <div class="w-full flex items-center justify-between">
      <input disabled v-model="checkBeforeDeleteTodo.todo" class="w-full max-w-md px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
    </div>
    <div class="mt-4 flex justify-between">
      <button @click="deleteTodo" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Yes</button>
      <button @click="closeDeleteDilouge" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">No</button>
    </div>
  </div>
    </div>
  </div>
    </teleport>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useTodoStore } from '@/stores/todo'
  
  export default {
    emits: ['close'],
    props: {
      todo: Object // Accepts a single todo object
    },
    setup(props, { emit }) {
      const todoStore = useTodoStore()
      const checkBeforeDeleteTodo = ref({ ...props.todo }) // Create a copy of the passed todo
      const deleteTodo = async () => {
        console.log(checkBeforeDeleteTodo.value)
    //     try {
    //   if (confirm('Are you sure you want to delete this todo?')) {
    //     await todoStore.deleteTodo(todoId)
    //     success.value = 'Todo has been deleted successfully'
    //   }
    // } catch (e) {
    //     // Handle and display the error
    //     error.value = e.message || 'An error occurred while deleting the todo.'
    //   }
        await todoStore.deleteTodo(checkBeforeDeleteTodo.value.id)
        closeDeleteDilouge()
      }
  
      const closeDeleteDilouge = () => {
        emit('close')
      }
  
      return {
        checkBeforeDeleteTodo,
        deleteTodo,
        closeDeleteDilouge
      }
    }
  }
  </script>
  