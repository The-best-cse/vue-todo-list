import { mount } from '@vue/test-utils'
import { expect, vi, it } from 'vitest'
import { createTestingPinia } from '@pinia/testing'

import TodoList from '@/components/TodoList.vue'
import { useTodoStore } from '@/stores/todo'

let wrapper = mount(TodoList, {
  global: {
    plugins: [
      createTestingPinia({
        createSpy: vi.fn
      })
    ]
  }
})

let todoStore = useTodoStore() // uses the testing pinia!

it('check MessageDisplay component exists or not', async () => {
  const MessageDisplay = wrapper.findComponent({ name: 'MessageDisplay' })
  expect(MessageDisplay.exists()).toBe(true)
})


it('displays success message after data is fetched', async () => {
  // Simulate successful data fetching
  const fetchData = wrapper.vm.fetchData
  await fetchData

  expect(todoStore.hydrateState).toHaveBeenCalledTimes(1)
  wrapper.vm.$options.showMessage = true
  wrapper.vm.$options.successMessage = 'Data fetched successfully!'

  // Ensure success message is displayed
  expect(wrapper.find('.success-message').exists()).toBe(true)
  expect(wrapper.find('.success-message').text()).toBe('Data fetched successfully!')

})

