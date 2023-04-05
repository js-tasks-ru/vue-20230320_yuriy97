<template>
  <div class="toast" :class="`toast_${type}`">
    <UiIcon class="toast__icon" :icon="getIcon" />
    <span>{{ message }}</span>
  </div>
</template>
  
<script>
import UiIcon from './UiIcon.vue';
  
const icon = {
  success: 'check-circle',
  error: 'alert-circle',
}
  
export default {
  name: 'UiToast',
  
  components: { UiIcon },
  
  icon,

  props:{
    type: {
        type: String,
        default: 'success',
    },
    message: {
        type: String,
    }
  },
  computed: {
    getIcon(){
        return icon[this.type];
    }
  },
    
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>