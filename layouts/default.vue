<template>
  <div>
    <mt-header></mt-header>
    <nuxt />
  </div>
</template>

<script>
import mtHeader from '../components/public/mtHeader'

export default {
  components: {
    mtHeader
  }
}
</script>


<style lang="scss">
@import '@/assets/css/common.scss';
body{
  min-width: $page_min_width;
  font-size: 14px;
  color: #333;
}
</style>
