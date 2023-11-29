<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import TodoList from '@/components/TodoList.vue'
import NewTodo from '@/components/NewTodo.vue'
import FiliterTodoList from '@/components/FiliterTodoList.vue'

</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <FiliterTodoList></FiliterTodoList>
    <TodoList></TodoList>
    <NewTodo></NewTodo>
  </main>
</template>
