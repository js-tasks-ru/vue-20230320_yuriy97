<template>
  <button @click="addCount">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: { 
    type: Number,
    default: 0,
  }
  },
  data(){
    return{
      localCount: this.count,
    };
  },

  emits: ['update:count'],

  methods: {
    addCount(){
      this.localCount = this.localCount+1
      this.$emit('update:count',this.localCount)
    }
  },

  watch: {
    count(newValue) {
      this.localCount = newValue
    }
  }
};
</script>
