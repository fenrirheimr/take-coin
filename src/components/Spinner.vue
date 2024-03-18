<script setup>
// import { onMounted, ref } from 'vue'
// import debounce from 'lodash/debounce'
//
// const props = defineProps({
//   spinner: Boolean,
//   duration: Number,
// })
//
// const loaderWrapper = ref(null)
// const spinner = ref(null)
// const open = ref(false)
//
// const isLoaded = debounce(() => {
//   open.value = true
// }, props.duration || 1500)
//
// const isLoading = debounce(() => {
//   loaderWrapper.value.classList.add('open')
//   if (props.spinner)
//     spinner.value.classList.add('open')
//
//   isLoaded()
// }, props.duration || 1500)
//
// onMounted(() => {
//   isLoading()
// })
</script>

<template>
  <div class="spinner-wrapper">
    <span class="spinner" />
  </div>
</template>

<style scoped lang="scss">
.spinner-wrapper {
  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -10vw;
    margin-left: -10vw;
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
    animation: rotate 1s linear infinite;
    z-index: 1001;
    &::before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 5px solid #BDFF00;
      animation: prixClipFix 2s linear infinite ;
    }
    &.open {
      display: none;
    }
  }

  @keyframes rotate {
    100%   {transform: rotate(360deg)}
  }

  @keyframes prixClipFix {
    0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
    25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
    50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
    75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
    100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
  }
}
</style>
