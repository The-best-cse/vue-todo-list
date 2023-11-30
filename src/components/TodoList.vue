<!-- single todo component -->
<template>
  <div class="overflow-hidden rounded-lg bg-gray-100 shadow-md dark:bg-gray-700">
    <div class="px-4 py-2">
      <!-- todo card -->
      <div v-for="todo in todoList" :key="todo.id" class="flex flex-row w-full border-b py-2 dark:border-gray-500">
        <div class="flex w-1/12 mr-1 grid justify-items-end items-center">
          <input v-model="todo.completed" type="checkbox" class="form-checkbox h-5 w-5 cursor-pointer rounded text-primary" />
        </div>
        <div class="flex w-8/12 grid justify-items-start items-center">
          <div v-bind:class = "(todo.completed)?'line-through':''" class="ml-1 px-1 text-sm md:text-base xl:text-lg text-secondary">{{ todo.todo }}</div>
        </div>
        <div class="flex mx-auto w-3/12 justify-items-end items-center">
          <div class="px-1 mx-auto">
            <!-- update icon -->
            <svg @click="updateTodo(todo)" class="h-7 w-7 cursor-pointer text-gray-800 dark:text-white hover:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
              <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
            </svg>
          </div>
          <div class="px-1 mx-auto">
            <!-- delete icon -->
            <svg @click="deleteTodo(todo.id)" class="h-7 w-7 cursor-pointer text-gray-800 dark:text-white hover:text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
            </svg>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useTodoStore } from '@/stores/todo'

export default {
  setup() {
    const todoStore = useTodoStore()
    const todoList = ref([])
    const newTodo = ref({})
    const error = ref(null)
    const success = ref(null)

    const createTodo = async () => {
      try {
        newTodo.value = {
          todo: 'Use DummyJSON in the project',
          completed: false,
          userId: 5
        }

        await todoStore.createTodo(newTodo.value)
        success.value = 'New todo has been created'
      } catch (e) {
        // Handle and display the error
        error.value = e.message || 'An error occurred while creating the todo.'
      }
    }

    const updateTodo = async (todo) => {
      try {
        const updatedTodo = prompt('Update todo:', todo.todo)
        const updatedTodoObj = {
          todo: updatedTodo
        }

        if (updatedTodo !== null) {
          await todoStore.updateTodo(todo.id, updatedTodoObj)
          success.value = 'Todo has been updated successfully'
        }
      } catch (e) {
        // Handle and display the error
        error.value = e.message || 'An error occurred while updating the todo.'
      }
    }

    const deleteTodo = async (todoId) => {
      try {
      if (confirm('Are you sure you want to delete this todo?')) {
        await todoStore.deleteTodo(todoId)
        success.value = 'Todo has been deleted successfully'
      }
    } catch (e) {
        // Handle and display the error
        error.value = e.message || 'An error occurred while deleting the todo.'
      }
    }

    onMounted(async () => {
      await todoStore.fetchTodoList()
      todoList.value = todoStore.getTodoList
    })

    return {
      todoList,
      newTodo,
      error,
      success,
      createTodo,
      updateTodo,
      deleteTodo
    }
  }
}
</script>
<style>
.error {
  color: red;
  margin-bottom: 10px;
}
.success {
  color: green;
  margin-bottom: 10px;
}
</style>
