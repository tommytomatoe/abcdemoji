<!-- components/game/GameKeyDisplay.vue -->
<template>
  <Transition>
    <BlueyBox v-if="pressedKey && !isFirstKey">
      <template v-if="pressedKey.isNumber">
        <div class="bluey-font bluey-letter">
          {{ pressedKey.display }}
        </div>
        <div class="bluey-font bluey-name">
          Can you count to {{ pressedKey.count }}?
        </div>
      </template>
      <template v-else>
        <div class="bluey-font bluey-letter">
          {{ pressedKey.letter }}
        </div>
        <div class="bluey-emoji">
          {{ pressedKey.item.emoji }}
        </div>
        <div class="bluey-font bluey-name">
          {{ pressedKey.item.name }}
        </div>
      </template>
    </BlueyBox>
  </Transition>
</template>

<script setup>
import BlueyBox from '../ui/BlueyBox.vue'

defineProps({
  pressedKey: {
    type: Object,
    default: null
  },
  isFirstKey: {
    type: Boolean,
    required: true
  }
})
</script>