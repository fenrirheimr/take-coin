<script setup>
import {onMounted, ref} from 'vue'
import debounce from 'lodash/debounce'

import Close from '@/components/icons/Close.vue'
import ActionButton from "@/components/ActionButton.vue";

import { modalStore } from '@/store/modal'

const props = defineProps({
  show: Boolean,
})

const emit = defineEmits(['close'])
const modal = ref(null)

const removed = debounce(() => {
  emit('close')
}, 500)

function closeModal() {
  modal.value.classList.add('removing')
  removed()
}

</script>

<template>
  <Teleport to="body">
    <div v-if="props.show" ref="modal" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="close-modal">
            <Close :width="24" :height="24" @click="closeModal" />
          </div>
          <div class="title">{{ modalStore().getModalData.title }}</div>
          <div class="text" v-html="modalStore().getModalData.text" />

          <div class="button-wrapper" v-if="modalStore().getModalData.hasButton">
            <ActionButton @click="modalStore().getModalData.callback()" size="medium" :title="modalStore().getModalData.buttonText" />
          </div>

        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-mask {
  @include flex(row, center, center);
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .modal-wrapper {
    @include flex(row, center, center);
  }
  .modal-container {
    width: 83.6734693878vw;
    min-height: 10vh;
    margin: 0 auto;
    padding: 20px 17px;
    background-color: #000;
    border-radius: 20px;
    border: 1px solid #fff;
    box-shadow: 0 50px 30px rgba(0, 0, 0, 0.3);
    animation: slide-in-blurred-top 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
    position: relative;
    text-align: center;
    .title {
      @include font-style($font-size: 20px, $font-weight: 600, $color: #fff);
      margin-top: 36px;
      margin-bottom: 24px;
    }
    .text {
      @include font-style($font-size: 14px, $font-weight: 500, $color: #fff, $line-height: normal);
      ::v-deep {
        .colored {
          color: #1FDD00 !important;
        }
      }
    }
    .button-wrapper {
      margin-top: 36px;
    }
    .close-modal {
      @include absolute(16px, 16px, auto, auto);
      width: 24px;
      height: 24px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  &.removing {
    .modal-container {
      animation: slide-out-blurred-top 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both;
    }
  }
}



@keyframes slide-in-blurred-top {
  0% {
    transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
    transform-origin: 50% 0;
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scaleY(1) scaleX(1);
    transform-origin: 50% 50%;
    filter: blur(0);
    opacity: 1;
  }
}

@keyframes slide-out-blurred-top {
  0% {
    transform: translateY(0) scaleY(1) scaleX(1);
    transform-origin: 50% 0;
    filter: blur(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-1000px) scaleY(2) scaleX(0.2);
    transform-origin: 50% 0;
    filter: blur(40px);
    opacity: 0;
  }
}

@keyframes swirl-in-fwd {
  0% {
    transform: rotate(-540deg) scale(0);
    opacity: 0;
  }
  100% {
    transform: rotate(0) scale(1);
    opacity: 1;
  }
}

@keyframes slide-in-fwd-center {
  0% {
    transform: translateZ(-1400px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0);
    opacity: 1;
  }
}
@keyframes slide-out-bck-center {
  0% {
    transform: translateZ(0);
    opacity: 1;
  }
  100% {
    transform: translateZ(-1400px);
    opacity: 0;
  }
}
</style>
