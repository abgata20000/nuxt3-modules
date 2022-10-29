<script lang="ts" setup>
interface Props {
  page: number
  limit: number
  totalPage: number
  totalCount: number
}
interface Emits {
  (e: 'selectPage', value: number): void;
}
const emit = defineEmits<Emits>()
const props = withDefaults(defineProps<Props>(), {})
const { page, limit, totalPage } = toRefs(props)
const selectPage = (toPage: number) => {
  emit('selectPage', toPage)
}

const isSelected = (myPage: number) => {
  return myPage === page.value
}

const isFirstPage = computed(() => {
  return page.value === 1
})

const isLastPage = computed(() => {
  return page.value === totalPage.value
})

const prevPage = computed(() => {
  return page.value - 1
})
const toPrevPage = () => {
  if (isFirstPage.value) { return }
  selectPage(prevPage.value)
}
const nextPage = computed(() => {
  return page.value + 1
})
const toNextPage = () => {
  if (isLastPage.value) { return }
  selectPage(nextPage.value)
}

const pages = computed(() => {
  const pages = []
  const start = Math.max(1, page.value - 2)
  const last = Math.min(totalPage.value, page.value + 2)
  for (let i = start; i <= last; i++) {
    pages.push(i)
  }
  return pages
})
const isShowFirstPage = computed(() => {
  return !pages.value.includes(1)
})
const isShowLastPage = computed(() => {
  return !pages.value.includes(totalPage.value)
})

const isNothing = computed(() => {
  return totalPage.value === 0
})
</script>

<template>
  <nav v-if="!isNothing" class="pagination" role="navigation" aria-label="pagination">
    <a class="pagination-previous" :class="{'is-disabled': isFirstPage}" @click="toPrevPage">&lt;</a>
    <a class="pagination-next" :class="{'is-disabled': isLastPage}" @click="toNextPage">&gt;</a>
    <ul class="pagination-list">
      <li v-if="isShowFirstPage">
        <a class="pagination-link" @click="selectPage(1)">1</a>
      </li>
      <li v-if="isShowFirstPage">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-for="myPage in pages" :key="myPage">
        <a class="pagination-link" :class="{'is-current': isSelected(myPage)}" @click="selectPage(myPage)">{{ myPage }}</a>
      </li>
      <li v-if="isShowLastPage">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-if="isShowLastPage">
        <a class="pagination-link" @click="selectPage(totalPage)">{{ totalPage }}</a>
      </li>
    </ul>
  </nav>
</template>
