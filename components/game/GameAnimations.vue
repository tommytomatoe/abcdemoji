<!-- components/game/GameAnimations.vue -->
<template>
  <TransitionGroup
    tag="div"
    :css="false"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
  >
    <div
      v-for="animation in visibleAnimations"
      :key="animation.id"
      class="floating-emoji"
      :style="getAnimationStyle(animation)"
    >
      {{ animation.emoji }}
    </div>
  </TransitionGroup>
</template>

<script setup>
import { computed } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  animations: {
    type: Array,
    required: true
  }
})

// Only render animations that are visible
const visibleAnimations = computed(() => 
  props.animations.filter(a => a.opacity > 0.01)
)

// Precompute styles instead of binding directly
const getAnimationStyle = (animation) => ({
  left: `${animation.x}px`,
  top: `${animation.y}px`,
  opacity: animation.opacity,
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden'
})

const onBeforeEnter = (el) => {
  gsap.set(el, {
    opacity: 0,
    scale: 0.5,
    y: 30
  })
}

const onEnter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    opacity: 1,
    scale: 1,
    y: 0,
    ease: 'back.out(1.7)',
    onComplete: done,
    force3D: true // Enable hardware acceleration
  })
}

const onLeave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    opacity: 0,
    scale: 0.5,
    y: -30,
    ease: 'back.in(1.7)',
    onComplete: done,
    force3D: true
  })
}
</script>

<style>
.floating-emoji {
  position: absolute;
  pointer-events: none;
  transform: translateZ(0); /* Force GPU acceleration */
}
</style>