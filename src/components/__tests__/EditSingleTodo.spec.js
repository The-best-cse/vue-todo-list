import { mount } from '@vue/test-utils'
import { expect, vi, it } from 'vitest'
import { createTestingPinia } from '@pinia/testing'

import EditSingleTodo from '@/components/EditSingleTodo.vue'
import { useTodoStore } from '@/stores/todo'

let wrapper = mount(EditSingleTodo, {
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

it('renders the component properly', () => {
  expect(wrapper.exists()).toBe(true)
})

it('emits "close" event when "Close" button is clicked', async () => {
  await wrapper.vm.$nextTick() // Wait for the component to update/render fully
  const closeButton = wrapper.findAll('button')[1]
  await closeButton.trigger('click')

  expect(wrapper.emitted('close')).toBeTruthy()
})

it('edits a todo when "Edit" button is clicked', async () => {
  const editButton = wrapper.findAll('button')[0]
  wrapper.find('input').setValue('Updated Todo')

  await editButton.trigger('click')
  await wrapper.vm.$nextTick() // Wait for the component to update

  expect(todoStore.updateTodo).toHaveBeenCalledTimes(1)
  expect(todoStore.updateTodo).toHaveBeenCalledWith(1, { todo: 'Updated Todo' });
  expect(wrapper.emitted('success')).toBeTruthy()
})