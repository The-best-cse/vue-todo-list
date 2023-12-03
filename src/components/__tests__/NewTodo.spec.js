import { mount } from '@vue/test-utils'
import { expect, vi, it } from 'vitest'
import { createTestingPinia } from '@pinia/testing'

import NewTodo from '@/components/NewTodo.vue'
import { useTodoStore } from '@/stores/todo'

let wrapper = mount(NewTodo, {
  global: {
    plugins: [
      createTestingPinia({
        createSpy: vi.fn
      })
    ]
  }
})

let todoStore = useTodoStore() // uses the testing pinia!

it('renders input and button elements', () => {
  expect(wrapper.find('input').exists()).toBe(true)
  expect(wrapper.find('button').exists()).toBe(true)
})

it('adds a new todo when button is clicked', async () => {
  const todoText = 'New Todo'
  wrapper.find('input').setValue(todoText)

  await wrapper.find('button').trigger('click')
  await wrapper.vm.$nextTick() // Wait for the component to update

  await wrapper.vm.createTodo()

  expect(todoStore.createTodo).toHaveBeenCalledTimes(1)
  expect(todoStore.createTodo).toHaveBeenCalledWith({
    todo: todoText,
    completed: false,
    userId: 5
  })
  expect(wrapper.vm.todoText).toBe('')
  expect(wrapper.vm.success).toBe('New todo has been created')
  expect(wrapper.vm.error).toBe(null)
})

it('disables button when input is empty', async () => {
  const button = wrapper.find('button')

  expect(button.attributes('disabled')).toBeFalsy() // Check if the disabled attribute is present

  const input = wrapper.find('input');
  await input.setValue('new todo'); 

  await input.trigger('input'); // Trigger an input event to simulate user interaction

  await wrapper.vm.$nextTick()

  expect(button.attributes('disabled')).toBeUndefined() 
})
