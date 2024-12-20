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
      v-for="{ id, emoji, x, y, opacity } in animations"
      :key="id"
      class="floating-emoji"
      :style="{
        left: `${x}px`,
        top: `${y}px`,
        opacity,
      }"
    >
      {{ emoji }}
    </div>
  </TransitionGroup>
</template>

<script setup>
import gsap from 'gsap'

defineProps({
  animations: {
    type: Array,
    required: true
  }
})

const onBeforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = 'scale(0.5) translateY(30px)'
}

const onEnter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    opacity: 1,
    scale: 1,
    y: 0,
    ease: 'back.out(1.7)',
    onComplete: done
  })
}

const onLeave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    opacity: 0,
    scale: 0.5,
    y: -30,
    ease: 'back.in(1.7)',
    onComplete: done
  })
}
</script>

<style scoped>
.floating-emoji {
  will-change: transform, opacity;
  backface-visibility: hidden;
}
</style>