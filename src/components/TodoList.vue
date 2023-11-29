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
          completed: false
          // userId: 5
        }

        await todoStore.createTodo(newTodo.value)
        success.value = 'New todo has been created'
      } catch (e) {
        // Handle and display the error
        error.value = e.message || 'An error occurred while creating the todo.'
      }
    }

    const updateTodo = async (index) => {
      const updatedTodo = prompt('Update todo:', todoStore.todos[index])
      if (updatedTodo !== null) {
        await todoStore.updateTodo(index, updatedTodo)
      }
    }

    const deleteTodo = async (index) => {
      if (confirm('Are you sure you want to delete this todo?')) {
        await todoStore.deleteTodo(index)
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
