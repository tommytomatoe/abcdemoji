<!-- components/ui/InfoButton.vue -->
<template>
  <button
    class="fixed top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-50 transition-colors duration-200"
    :class="buttonClasses"
    @click="$emit('click')"
    aria-label="Show Instructions"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
      <path d="M9 18h6"/>
      <path d="M10 22h4"/>
      <path d="m12 2-1 1 1 1 1-1z"/>
    </svg>
  </button>
</template>

<script setup>
defineEmits(['click'])

const buttonClasses = {
  'bg-[#a563eb]': true,
  'hover:bg-[#9149e7]': true,
  'text-white': true,
}
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>