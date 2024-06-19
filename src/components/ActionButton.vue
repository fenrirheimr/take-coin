<script setup>
defineProps({
  size: String,
  title: String,
})
</script>

<template>
  <div
    class="root-action-button" :class="{
      'size-small': size === 'small',
      'size-medium': size === 'medium',
      'size-large': size === 'large',
    }"
  >
    <div class="text">
      {{ title || 'Пригласить друга' }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.root-action-button {
  @include flex(row, center, center);
  width: 100%;
  background: linear-gradient(90deg, #00BD01 0%, #28C629 100%);
  backdrop-filter: blur(20.4px);
  border-radius: 8px;
  padding: 16px 0;
  cursor: pointer;
  user-select: none;
  .text {
    @include font-style($font-size: 24px, $font-weight: 800, $color: #fff);
  }

  &:active,
  &:focus, {
    animation: blink .5s both
  }

  &.size-small {}
  &.size-medium {
    .text {
      @include font-style($font-size: 18px, $font-weight: 700, $color: #fff);
    }
  }
  &.size-large {
    .text {
      @include font-style($font-size: 24px, $font-weight: 700, $color: #fff);
    }
  }
}
</style>
