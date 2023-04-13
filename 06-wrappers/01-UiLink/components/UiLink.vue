<template>
  <component :is = "tag" class="link" v-bind="$attrs">
    <slot/>
  </component>
</template>

<script>
export default {
  name: 'UiLink',
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: 'router-link'
    }
  }
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
