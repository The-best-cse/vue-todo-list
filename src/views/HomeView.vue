<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import TodoList from '@/components/TodoList.vue'
import NewTodo from '@/components/NewTodo.vue'
import FilterTodoList from '@/components/FilterTodoList.vue'

</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <FilterTodoList></FilterTodoList>
    <TodoList></TodoList>
    <NewTodo></NewTodo>
  </main>
</template>
