<!-- components/game/GameInstructions.vue -->
<template>
  <div>
    <header class="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50">
      <img 
        src="/logo.png" 
        alt="Game Logo" 
        class="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-200"
        @click="showInstructions = true"
      />
      <InfoButton @click="showInstructions = true" />
    </header>
    
    <Transition>
      <BlueyBox v-if="isFirstKey" class="z-50">
        <div class="bluey-font bluey-title">
          Let's Learn!
        </div>
        <div class="bluey-subtitle">
          Press any letter or number for some fun!
        </div>
        <div class="bluey-subtitle">
          (Space bar or Esc to clear the screen)
        </div>
      </BlueyBox>
    </Transition>

    <Transition>
      <BlueyBox v-if="showInstructions" class="z-50">
        <div class="max-w-lg">
          <div class="bluey-font bluey-title mb-4">
            How to Play
          </div>
          
          <div class="space-y-4 text-lg">
            <div class="flex items-start space-x-3">
              <span class="text-2xl">🔤</span>
              <p><strong>Letters:</strong> Press any letter key to see a fun emoji and word that starts with that letter!</p>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-2xl">🔢</span>
              <p><strong>Numbers:</strong> Press numbers 1-9 to create that many random emojis!</p>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-2xl">🔄</span>
              <p><strong>Hold Keys:</strong> Hold any letter to keep showing the same emoji</p>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-2xl">❌</span>
              <p><strong>Clear Screen:</strong> Press Space or Escape to clear everything</p>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-2xl">📱</span>
              <p><strong>Mobile Users:</strong> Tap the "Click to start!" button to bring up your keyboard</p>
            </div>

            <div class="mt-6 text-center">
              <button 
                class="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
                @click="showInstructions = false"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      </BlueyBox>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BlueyBox from '../ui/BlueyBox.vue'
import InfoButton from '../ui/InfoButton.vue'

defineProps({
  isFirstKey: {
    type: Boolean,
    required: true
  }
})

const showInstructions = ref(false)

// Handle Escape key
const handleKeyDown = (e) => {
  if (e.key === 'Escape' && showInstructions.value) {
    showInstructions.value = false
    // Prevent the event from bubbling up to other handlers
    e.stopPropagation()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate(-50%, -40%);
}
</style>
