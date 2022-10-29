<script lang="ts" setup>
interface Props {
  title: string
  back?: string
  backLabel?: string
}
const props = withDefaults(defineProps<Props>(), { back: '', backLabel: '戻る' })
</script>
<template>
  <section class="hero is-hero-bar">
    <div class="hero-body">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title">
              {{ props.title }}
            </h1>
          </div>
        </div>
        <div v-if="props.back !== ''" class="level-right">
          <div class="level-item">
            <nuxt-link :to="props.back">
              {{ props.backLabel }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
