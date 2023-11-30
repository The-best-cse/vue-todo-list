<!-- Filter Todo Component -->
<template>
  <div class="flex w-full items-center py-3">
    <button
      @click="reloadPage"
      class="w-3/12 rounded-l bg-blue-800 px-4 py-2 mx-auto text-white transition duration-300 hover:bg-blue-500"
    >
      Reset
    </button>
    <input
      v-model="searchText"
      type="text"
      placeholder="Search by text or state: 'completed' or 'not completed'"
      class="flex w-9/12 rounded-r px-3 py-2 focus:outline-none dark:bg-gray-600 dark:text-white"
    />
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useTodoStore } from '@/stores/todo'

export default {
  setup() {
    const todoStore = useTodoStore()
    let searchText = ref('')

    function reloadPage() {
      window.location.reload() // Reloads the page
    }

    const filterTodos = () => {
      const filterInput = searchText.value.trim().toLowerCase()

      const isStateFilter = ['completed', 'not completed'].includes(filterInput);

      if (isStateFilter) {
        const isCompletedState = filterInput === 'completed';
        todoStore.filterTodosByState(isCompletedState)
      } else {
        if (filterInput !== '') {
        const regex = new RegExp(filterInput, 'i') // 'i' for case-insensitive search
        todoStore.filterTodosByRegex(regex)
      }

      }
      
    }

    watch(searchText, () => {
      todoStore.resetTodos()
      filterTodos()
    })

    return {
      searchText,
      filterTodos,
      reloadPage
    }
  }
}
</script>
