<!-- New Todo Component -->
<template>
    <div class="flex w-full items-center py-3">
        <input v-model="todoText" type="text" placeholder="Add A New To Do" class="w-full rounded-l px-3 py-2 focus:outline-none dark:bg-gray-600 dark:text-white" />
        <button :disabled="todoText === ''" @click="createTodo" class="w-3/12 mx-auto rounded-r bg-blue-800 px-4 py-2 text-white transition duration-300 hover:bg-blue-500">Add</button>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todo'

export default {
  setup() {
    const todoStore = useTodoStore()
    const newTodo = ref({})
    const todoText = ref('')
    const error = ref(null)
    const success = ref(null)

    const createTodo = async () => {
      try {
        newTodo.value = {
          todo: todoText.value,
          completed: false,
          userId: 5
        }

        await todoStore.createTodo(newTodo.value)
        success.value = 'New todo has been created'
        todoText.value = ''
      } catch (e) {
        // Handle and display the error
        error.value = e.message || 'An error occurred while creating the todo.'
      }
    }

    return {
      newTodo,
      todoText,
      error,
      success,
      createTodo,
    }
  }
}
</script>