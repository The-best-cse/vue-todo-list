<!-- single todo component -->
<template>
  <div class="overflow-hidden rounded-lg bg-gray-100 shadow-md dark:bg-gray-700">
    <div class="px-4 py-2">
      <!-- Use MessageDisplay component to show success or error messages -->
      <MessageDisplay
        v-if="showMessage"
        :successMessage="successMessage"
        :errorMessage="errorMessage"
      ></MessageDisplay>

      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <div class="loading-text">Loading...</div>
      </div>
      <!-- todo list card -->
      <div
        v-else
        v-for="todo in todoList"
        :key="todo.id"
        class="flex flex-row w-full border-b py-2 dark:border-gray-500"
      >
        <div class="flex w-1/12 mr-1 grid justify-items-end items-center">
          <input
            v-model="todo.completed"
            @click="changeTodoState(todo)"
            type="checkbox"
            class="form-checkbox h-5 w-5 cursor-pointer rounded text-primary"
          />
        </div>
        <div class="flex w-8/12 grid justify-items-start items-center">
          <div
          @click="changeTodoState(todo)"
            v-bind:class="todo.completed ? 'line-through' : ''"
            class="ml-1 px-1 text-sm md:text-base xl:text-lg text-secondary cursor-pointer"
          >
            {{ todo.todo }}
          </div>
        </div>
        <div class="flex mx-auto w-3/12 justify-items-end items-center">
          <div class="px-1 mx-auto">
            <!-- update icon updateTodo(todo)-->
            <svg
              @click="updateTodo(todo)"
              class="h-7 w-7 cursor-pointer text-gray-800 dark:text-white hover:text-blue-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path
                d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"
              />
              <path
                d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"
              />
            </svg>
          </div>
          <div class="px-1 mx-auto">
            <!-- delete icon -->
            <svg
              @click="deleteTodo(todo)"
              class="h-7 w-7 cursor-pointer text-gray-800 dark:text-white hover:text-red-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <EditSingleTodo
        v-if="showEditSingleTodo"
        :todo="singleTodoContent"
        @close="showEditSingleTodo = false"
      >
      </EditSingleTodo>
      <DeleteSingleTodo
        v-if="showDeleteDialogue"
        :todo="checkBeforeDeleteTodo"
        @close="showDeleteDialogue = false"
      >
      </DeleteSingleTodo>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useTodoStore } from '@/stores/todo'
import EditSingleTodo from '@/components/EditSingleTodo.vue'
import DeleteSingleTodo from '@/components/DeleteSingleTodo.vue'
import MessageDisplay from '@/components/MessageDisplay.vue'

import { useMessages } from '@/utils/messagesComposition'

export default {
  components: {
    EditSingleTodo,
    DeleteSingleTodo,
    MessageDisplay
  },
  setup() {
    const {
      errorMessage,
      successMessage,
      showMessage,
      showSuccessMessage,
      showErrorMessage
    } = useMessages()

    const todoStore = useTodoStore()
    const todoList = ref([])
    const newTodo = ref({})
    const singleTodoContent = ref({})
    const showEditSingleTodo = ref(false)
    const checkBeforeDeleteTodo = ref({})
    const showDeleteDialogue= ref(false)

    const loading = todoStore.loading


    const updateTodo = async (todo) => {
      showEditSingleTodo.value = true
      singleTodoContent.value = { ...todo }
    }

    const deleteTodo = async (todo) => {
      showDeleteDialogue.value = true
      checkBeforeDeleteTodo.value = { ...todo }
    }

    const changeTodoState = async (todo) => {
      todo.completed = !todo.completed
      const updatedTodoObj = {
        todo: todo.todo,
        completed: todo.completed
      }

      await todoStore.updateTodo(todo.id, updatedTodoObj)
    }

    onMounted(async () => {
      try {
        await todoStore.hydrateState()
        showSuccessMessage('Data fetched successfully!')
        todoList.value = todoStore.getTodoList
      } catch (e) {
        // Handle and display the error
        showErrorMessage(`Error fetching data: ${e.message || 'An error occurred while fetching the todo list.'}`)
      }
    })

    return {
      todoList,
      newTodo,
      showDeleteDialogue,
      checkBeforeDeleteTodo,
      showEditSingleTodo,
      singleTodoContent,
      loading,
      updateTodo,
      deleteTodo,
      errorMessage,
      successMessage,
      showMessage,
      changeTodoState
    }
  }
}
</script>
<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.loading-spinner {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

.loading-text {
  font-size: 16px;
  color: white;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
