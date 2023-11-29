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

});
