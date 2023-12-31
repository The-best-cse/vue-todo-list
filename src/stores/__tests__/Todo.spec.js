import { describe, it, expect } from 'vitest'
import { createPinia } from 'pinia';
import { createApp } from 'vue'

import { useTodoStore } from '@/stores/todo';
import App from '@/App.vue'

describe('Todo-List store apis CRUD Testing', () => {

    const pinia = createPinia()
    const app = createApp(App)
    app.use(pinia)
    const todoStore = useTodoStore(); 

    it('fetches todo list from API', async () => {
        try {
            await todoStore.fetchTodoList();
            expect(todoStore.todoList.length).to.not.equal(0);
        }
        catch (error) {
            console.error('Error in "fetches todo list from API" test:', error);
            throw error;
        }
    });

    it('creates a new todo', async () => {
        try {
            const newTodo = { todo: 'Test Todo', completed: false, userId: 5 };
            await todoStore.createTodo(newTodo);

            // Check if the newTodo is in the todoList
            const isTodoInList = todoStore.todoList.some(todo => (
                todo.todo === newTodo.todo &&
                todo.completed === newTodo.completed
            ));

            expect(isTodoInList).toBe(true);
        } catch (error) {
            console.error('Error in "creates a new todo" test:', error);
            throw error;
        }
    });


    it('updates a todo', async () => {
        const updatedTodo = { todo: 'Updated Todo', completed: true };
        const todoId = 2;
        await todoStore.updateTodo(todoId, updatedTodo);

        const index = todoStore.todoList.findIndex((todo) => todo.id === todoId);
        expect(todoStore.todoList[index].todo).to.equal('Updated Todo');
    });

    it('deletes a todo', async () => {
        const todoId = 3;
        await todoStore.deleteTodo(todoId);

        const index = todoStore.todoList.findIndex((todo) => todo.id === todoId);
        expect(index).to.equal(-1); // Not Found
    });

});
