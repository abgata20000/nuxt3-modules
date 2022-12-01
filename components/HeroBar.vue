<script lang="ts" setup>
interface Props {
  title: string
  back?: string
  backLabel?: string
  next?: string
  prev?: string
}
const props = withDefaults(defineProps<Props>(), { back: '', backLabel: '戻る', next: '', prev: '' })
</script>
<template>
  <section class="hero is-hero-bar">
    <div class="hero-body">
      <div class="level">
        <div class="level-left">
          <div class="level-item" v-if="props.prev !== ''">
            <nuxt-link :to="props.prev">
              <i class="fas fa-arrow-alt-circle-left" />
            </nuxt-link>
          </div>
          <div class="level-item">
            <h1 class="title">
              {{ props.title }}
            </h1>
          </div>
          <div class="level-item" v-if="props.next !== ''">
            <nuxt-link :to="props.next">
              <i class="fas fa-arrow-alt-circle-right" />
            </nuxt-link>
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
