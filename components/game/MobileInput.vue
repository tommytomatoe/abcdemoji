<!-- components/game/MobileInput.vue -->
<template>
  <div class="mobile-input">
    <button 
      @click="focusInput"
      class="md:hidden block px-4 py-2 rounded-full bg-[#a563eb] text-white shadow-lg"
    >
      Click to start!
    </button>
    <input
      ref="inputEl"
      id="gameInput"
      name="gameInput"
      type="text"
      inputmode="text"
      pattern="[A-Za-z0-9]*"
      maxlength="1"
      autocapitalize="none"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      aria-label="Game input"
      @input="handleMobileInput"
      class="opacity-0 h-0 w-0 absolute pointer-events-auto"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  inputRef: {
    type: Object,
    required: false,
    default: null
  },
  focusInput: {
    type: Function,
    required: true
  },
  handleMobileInput: {
    type: Function,
    required: true
  }
})

const inputEl = ref(null)

// Focus the input when the button is clicked
const handleFocusInput = () => {
  if (inputEl.value) {
    inputEl.value.focus()
    // On iOS, we may need to scroll to make sure the keyboard shows up
    setTimeout(() => {
      inputEl.value.focus()
      // Optional: scroll to make sure the input is in view
      window.scrollTo(0, 0)
    }, 100)
  }
}

watch(() => inputEl.value, (newValue) => {
  if (props.inputRef) {
    props.inputRef.value = newValue
  }
})

// Override the focusInput prop with our local handler
const focusInput = () => {
  handleFocusInput()
  props.focusInput()
}
</script>

<style scoped>
  .mobile-input {
    display: block;
    position: fixed;
    left: 50%;
    bottom: 4rem;
    transform: translateX(-50%);
    z-index: 50;
  }

  .mobile-input button {
    background: rgba(255, 255, 255, 0.9);
    border: 3px solid #fcd34d;
    border-radius: 1rem;
    padding: 0.75rem 1.5rem;
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    color: #2563eb;
    font-size: 1rem;
    backdrop-filter: blur(4px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
  }

  .mobile-input button:active {
    transform: scale(0.98);
  }

  /* .mobile-input input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  } */

  /* Make input accessible but invisible */
  input {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    height: 1px;
    width: 1px;
    padding: 0;
    margin: 0;
    border: 0;
  }
</style>