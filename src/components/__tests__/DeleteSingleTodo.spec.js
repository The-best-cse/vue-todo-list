import { mount } from '@vue/test-utils'
import { expect, vi, it } from 'vitest'
import { createTestingPinia } from '@pinia/testing'

import DeleteSingleTodo from '@/components/DeleteSingleTodo.vue'
import { useTodoStore } from '@/stores/todo'

let wrapper = mount(DeleteSingleTodo, {
  props: {
    todo: {
      id: 1,
      todo: 'Sample Todo'
    }
  },
  global: {
    plugins: [
      createTestingPinia({
        createSpy: vi.fn
      })
    ]
  }
})

let todoStore = useTodoStore() // uses the testing pinia!

it('deletes a todo when "Delete!" button is clicked', async () => {
  const deleteButton = wrapper.findAll('button')[0];
  await deleteButton.trigger('click');
  await wrapper.vm.$nextTick(); // Wait for component updates after the click

  expect(todoStore.deleteTodo).toHaveBeenCalledTimes(1);
  expect(todoStore.deleteTodo).toHaveBeenCalledWith(1);
  expect(wrapper.emitted('success')).toBeTruthy()
});

it('closes dialog when "Close" button is clicked', async () => {
  const closeButton = wrapper.findAll('button')[1];

  await closeButton.trigger('click');
  await wrapper.vm.$nextTick(); // Wait for component updates after the click

  expect(wrapper.emitted('close')).toBeTruthy()
});