import { mount } from '@vue/test-utils'
import { expect, vi, it } from 'vitest'
import { createTestingPinia } from '@pinia/testing'

import FilterTodoList from '@/components/FilterTodoList.vue'
import { useTodoStore } from '@/stores/todo'

let wrapper = mount(FilterTodoList, {
  global: {
    plugins: [
      createTestingPinia({
        createSpy: vi.fn
      })
    ]
  }
})

let todoStore = useTodoStore() // uses the testing pinia!

it('calls reloadPage method when "Reset" button is clicked', async () => {

  const mockReload = vi.fn();
  delete window.location;
  window.location = { reload: mockReload }; // Mocking window.location.reload()

  const resetButton = wrapper.find('button');

  // Simulate a click event on the button
  await resetButton.trigger('click');

  expect(mockReload).toHaveBeenCalledTimes(1);

  // Clean up the mock after the test
  delete window.location;
});

it('calls filterTodos method when input text changes', async () => {
  const input = wrapper.find('input');
  await input.setValue('search text');
  await input.trigger('click')

  await wrapper.vm.$nextTick() // Wait for the component to update

  expect(todoStore.filterTodosByRegex).toHaveBeenCalledTimes(1)
});

it('filters todos by state when input is "completed" or "not completed"', async () => {
  const input = wrapper.find('input');
  
  await input.setValue('completed');
  expect(todoStore.filterTodosByState).toHaveBeenCalledTimes(1);
  expect(todoStore.filterFactor.type).toBe('state');
  expect(todoStore.filterFactor.data).toBe(true); // Assuming completed state

  await input.setValue('not completed');
  expect(todoStore.filterTodosByState).toHaveBeenCalledTimes(2);
  expect(todoStore.filterFactor.type).toBe('state');
  expect(todoStore.filterFactor.data).toBe(false); // Assuming not completed state
});

it('filters todos by regex for other input values', async () => {
  const input = wrapper.find('input');
  
  await input.setValue('specific text');

  expect(todoStore.filterTodosByRegex).toHaveBeenCalledTimes(2);
  expect(todoStore.filterFactor.type).toBe('regex');
  expect(todoStore.filterFactor.data).toEqual(expect.any(RegExp)); // Expecting a regex
});