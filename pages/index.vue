<!-- pages/index.vue -->
<template>
  <div class="game-container">
    <GameBackground />
    <GameFooter />
    <MobileInput
      :input-ref="inputRef"
      :focus-input="focusInput"
      :handle-mobile-input="handleMobileInput"
    />
    <GameInstructions :is-first-key="isFirstKey" />
    <GameKeyDisplay
      :pressed-key="pressedKey"
      :is-first-key="isFirstKey"
    />
    <GameAnimations :animations="animations" />
  </div>
</template>

<script setup>
import { useGame } from '~/composables/useGame'
import GameBackground from '~/components/layout/GameBackground.vue'
import GameFooter from '~/components/layout/GameFooter.vue'
import MobileInput from '~/components/game/MobileInput.vue'
import GameInstructions from '~/components/game/GameInstructions.vue'
import GameKeyDisplay from '~/components/game/GameKeyDisplay.vue'
import GameAnimations from '~/components/game/GameAnimations.vue'

const {
  animations,
  pressedKey,
  isFirstKey,
  inputRef,
  focusInput,
  handleMobileInput
} = useGame()
</script>

<style scoped>
/* Transition animations for the boxes */
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