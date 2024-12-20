import { ref, onMounted, onUnmounted } from 'vue'
import { letterMap } from '~/utils/letterMap'

export const useGame = () => {
  const animations = ref([])
  const pressedKey = ref(null)
  const currentItems = ref({})
  const activeKeys = ref(new Set())
  const isFirstKey = ref(true)
  const lastItemName = ref(null)
  const timeoutRef = ref(null)
  const inputRef = ref(null)
  let animationTimer = null

  const createAnimation = (item) => {
    const newAnimation = {
      id: Math.random(),
      emoji: item.emoji,
      name: item.name,
      x: Math.random() * (window.innerWidth - 60),
      y: Math.random() * (window.innerHeight - 60),
      opacity: 1
    }
    animations.value = [...animations.value, newAnimation]
  }

  const focusInput = () => {
    if (inputRef.value) {
      inputRef.value.focus()
    }
  }

  const clearScreen = () => {
    animations.value = []
    isFirstKey.value = true
    if (timeoutRef.value) {
      clearTimeout(timeoutRef.value)
      timeoutRef.value = null
    }
    pressedKey.value = null
  }

  const handleLetterKey = (key) => {
    // Clear any existing timeout
    if (timeoutRef.value) {
      clearTimeout(timeoutRef.value)
      timeoutRef.value = null
    }

    let item
    if (activeKeys.value.has(key)) {
      item = currentItems.value[key]
    } else {
      const items = letterMap[key].filter(i => i.name !== lastItemName.value)
      item = items[Math.floor(Math.random() * items.length)]
      currentItems.value = { ...currentItems.value, [key]: item }
      lastItemName.value = item.name
    }

    pressedKey.value = {
      letter: key.toUpperCase(),
      item,
      isNumber: false
    }
    createAnimation(item)
  }

  const handleNumberKey = (key) => {
    // Clear any existing timeout
    if (timeoutRef.value) {
      clearTimeout(timeoutRef.value)
      timeoutRef.value = null
    }

    const number = parseInt(key)
    pressedKey.value = {
      display: key,
      isNumber: true,
      count: number
    }

    for (let i = 0; i < number; i++) {
      const allItems = Object.values(letterMap).flat()
      const randomItem = allItems[Math.floor(Math.random() * allItems.length)]
      createAnimation(randomItem)
    }
  }

  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase()

    // Ignore modifier keys
    if (e.metaKey || e.ctrlKey ||
      key === 'meta' || key === 'control' || key === 'shift' ||
      key === 'alt' || key === 'capslock' || key === 'tab') {
      return
    }

    if (key === ' ' || key === 'escape' || key === '0') {
      clearScreen()
      return
    }

    if (isFirstKey.value) {
      isFirstKey.value = false
    }


    if (/^[1-9]$/.test(key)) {
      handleNumberKey(key)
      return
    }

    if (letterMap[key]) {
      handleLetterKey(key)
    }

    activeKeys.value = new Set([...activeKeys.value, key])
  }

  const handleKeyUp = (e) => {
    const key = e.key.toLowerCase()

    // Remove from active keys
    activeKeys.value = new Set([...activeKeys.value].filter(k => k !== key))

    // Remove from current items
    const updatedItems = { ...currentItems.value }
    delete updatedItems[key]
    currentItems.value = updatedItems

    if (pressedKey.value &&
      ((pressedKey.value.letter === key.toUpperCase()) ||
        (pressedKey.value.display === key))) {
      timeoutRef.value = setTimeout(() => {
        pressedKey.value = null
        timeoutRef.value = null
      }, 2500)
    }
  }

  // Handle mobile input
  const handleMobileInput = (event) => {
    const key = event.target.value.toLowerCase()
    event.target.value = '' // Clear the input

    if (key) {
      handleKeyDown({ key })
      // Simulate key up after a brief delay
      setTimeout(() => handleKeyUp({ key }), 100)
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Start animation timer
    animationTimer = setInterval(() => {
      animations.value = animations.value
        .filter(a => a.opacity > 0)
        .map(a => ({ ...a, opacity: a.opacity - 0.005 }))

      // Show instructions if all animations are gone
      if (animations.value.length === 0 && !isFirstKey.value) {
        isFirstKey.value = true
      }
    }, 50)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)

    if (timeoutRef.value) {
      clearTimeout(timeoutRef.value)
    }

    if (animationTimer) {
      clearInterval(animationTimer)
    }
  })

  return {
    animations,
    pressedKey,
    isFirstKey,
    inputRef,
    focusInput,
    handleMobileInput
  }
}