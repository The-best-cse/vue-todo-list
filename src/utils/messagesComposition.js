// composition/messagesComposition.js
import { ref } from 'vue'

export function useMessages() {
  const errorMessage = ref('')
  const successMessage = ref('')
  const showMessage = ref(false)

  const showSuccessMessage = (message) => {
    successMessage.value = message
    errorMessage.value = ''
    showMessage.value = true

    hideMessageAfterDelay()
  }

  const showErrorMessage = (message) => {
    successMessage.value = ''
    errorMessage.value = message
    showMessage.value = true
    hideMessageAfterDelay()
  }

  const hideMessageAfterDelay = () => {
    setTimeout(() => {
      showMessage.value = false
    }, 750) // Hide message after 5 seconds (adjust as needed)
  }

  return {
    errorMessage,
    successMessage,
    showMessage,
    showSuccessMessage,
    showErrorMessage
  }
}
