<script setup>
import { useRoute } from 'vue-router'
import Loader from '@/components/Loader.vue'
import Portfolio from '@/partials/Portfolio.vue'

const route = useRoute()
</script>

<template>
  <section>
    <Suspense>
      <Portfolio />
      <template #fallback>
        <div class="loading">
          Loading...
        </div>
      </template>
    </Suspense>
    <Teleport to="body">
      <Loader :spinner="route.meta.spinner" :duration="route.meta.duration" />
    </Teleport>
  </section>
</template>

<style scoped lang="scss">
section {
  @include flex(column, center, center);
  height: 100%;
  .loading {
    min-height: 100vh;
  }
}
</style>
