<template>
  <div class="toasts">
    <UiToast v-for="toast in toasts" :key="toast.id" :type ="toast.type" :message = "toast.message"/>
  </div>
</template>

<script>

import UiToast from './UiToast.vue';

let lastId = 0;
const disappearTime = 5000

export default {
  name: 'TheToaster',

  components: { UiToast },

  lastId,
  disappearTime,

  data(){ 
    return {
      toasts: []
    }
  },

  methods: {
    success(message){
      this.addToast('success', message);
    },

    error(message){
      this.addToast('error', message);
    },

    addToast(type, message){

      lastId = lastId + 1;

      const newToast = {
        id: lastId,
        type: type,
        message: message,
       
      };

      this.toasts.push(newToast);

      setTimeout(() => {
        this.toasts.shift();
      }, disappearTime);
    }
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

</style>
