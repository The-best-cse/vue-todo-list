<template>
  <div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>
    <ul>
      <li v-for="todo in todoList" :key="todo.id">
        {{ todo.todo }}
        <button @click="updateTodo(todo)">Update</button>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
    <!-- <input v-model="newTodo" /> -->
    <button @click="createTodo">Add Todo</button>
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
