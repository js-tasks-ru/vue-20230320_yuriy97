<template>
  <div class="pagination-container">
    <slot v-for="item in itemsOnPage" :key="item.id" :item="item"/>
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    items: {
      type: Array,
      required: true,
    },
  },

  computed: {

    itemsOnPage(){
    
      const begin = (this.page -1) * this.perPage;
      const end = this.page * this.perPage > this.items.length  ? this.items.length : (this.page * this.perPage);
      const onPage = this.items.slice(begin,end);
    
      return onPage;
    }
  }

};
</script>

<style></style>
