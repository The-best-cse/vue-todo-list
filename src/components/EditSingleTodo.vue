<template>
  <teleport to="body">
    <div class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
    <div class="absolute inset-0 bg-opacity-50 bg-black"></div>
    <div class="z-10 mx-auto w-full sm:w-3/4 md:w-1/2 bg-white rounded-lg overflow-hidden shadow-xl">
        <div class="p-4">
    <div class="w-full flex items-center justify-between">
      <input v-model="editedTodo.todo" class="w-full max-w-md px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
    </div>
    <div class="mt-4 flex justify-between">
      <button @click="updateTodo" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Update</button>
      <button @click="closeEditSingleTodo" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Close</button>
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
    const editedTodo = ref({ ...props.todo }) // Create a copy of the passed todo
    const updateTodo = async () => {
      const updatedTodoObj = {
        todo: editedTodo.value.todo
      }

      await todoStore.updateTodo(editedTodo.value.id, updatedTodoObj)
      closeEditSingleTodo()
    }

    const closeEditSingleTodo = () => {
      emit('close')
    }

    return {
      editedTodo,
      updateTodo,
      closeEditSingleTodo
    }
  }
}
</script>
