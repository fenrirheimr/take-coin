<script setup>
import { useRouter } from 'vue-router'
import ArrowRightLong from '@/components/icons/ArrowRightLong.vue'

defineProps({
  title: String,
  route: Object,
})

const router = useRouter()
</script>

<template>
  <div class="root-go-back-button" @click="router.push({ path: '/' })">
    <ArrowRightLong class="arrow" :width="39" :height="24" />
    <span>На главную</span>
  </div>
</template>

<style scoped lang="scss">
.root-go-back-button {
  @include flex(row, flex-start, center);
  @include font-style($font-size: 16px, $font-weight: 600, $color: rgba(255,255,255, .80));
  gap: 11px;
  height: 55px;
  border-radius: 8px;
  align-self: flex-start;
  margin: 0 32px;
  cursor: pointer;
  &:active,
  &:focus, {
    animation: blink .5s both
  }
}

@keyframes blink {
  0% {
    color: #FFF500;
    opacity: .5
  }

  100% {
    color: #fff;
    opacity: 1
  }
}
</style>
