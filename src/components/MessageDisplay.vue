<!-- MessageDisplay.vue -->
<template>
<div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-black bg-opacity-50 absolute inset-0"></div>
    <div class="relative z-100 bg-white p-4 rounded-lg shadow-lg">
      <div v-if="successMessage !== ''" class="success-message">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage !== ''" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    successMessage: String,
    errorMessage: String
  }
}
</script>

<style scoped>
.error-message,
.success-message {
  text-align: center;
  /* Customize the message styles as needed */
}

.success-message {
  color: green;
}

.error-message {
  color: red;
}
</style>
