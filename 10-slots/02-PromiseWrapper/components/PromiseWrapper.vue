<template>
  <slot :name="status" :error="error" :result="result"  />
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data(){

    return{
      name: null,
      error:null,
      result:null,
    }
  },

  watch: {
    promise: {
      immediate: true,
      handler(){
        this.status = 'pending';
        this.promise.then((response) =>{
          this.status = 'fulfilled';
          this.result = response;
        }).catch((err) =>{
          this.status = 'rejected'
          this.error = err
        }); 
      },
    }
  }
};
</script>
