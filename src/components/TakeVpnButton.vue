<script setup>
import ArrowLeft from '@/components/icons/ArrowLeft.vue'

defineProps({
  title: String,
  route: Object,
})

const goToTakeVPN_bot = () => {
  window.location.href = "https://t.me/TakeVPN_bot?start=utm=telegram_app_takecoin"
}
</script>


<template>
  <div class="root-take-vpn-button" @click="goToTakeVPN_bot">
    <span>{{ title }}</span>
    <ArrowLeft class="arrow" :width="8" :height="12" />
  </div>
</template>

<style scoped lang="scss">
.root-take-vpn-button {
  @include flex(row, center, center);
  @include font-style($font-size: 16px, $font-weight: 600, $color: rgba(255,255,255, .80));
  gap: 11px;
  width: 100%;
  height: 55px;
  background: rgba(255,255,255, .17);
  border: 1px solid rgba(255,255,255, .72);
  border-radius: 8px;
  margin: 0 auto;

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
