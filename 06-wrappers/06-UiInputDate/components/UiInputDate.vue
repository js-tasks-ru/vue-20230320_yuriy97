<template>
  <UiInput :modelValue="value" :type ="type" @input="changeDate">
    <template v-if="$slots['left-icon']" #left-icon>
      <slot name="left-icon" />
    </template>
    <template v-if="$slots['right-icon']" #right-icon>
      <slot name="right-icon" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    modelValue: {
      type: Number,
      default: null,
    },
    type: {
      type: String,
      default: 'date',
      validator: (type) => ['date','time','datetime-local'].includes(type),
    },
    step: {
      type: String
    }
  },

  emits:['update:modelValue'],

  computed: {
    value(){
      if(!this.modelValue) return '';

      const date = new Date(this.modelValue).toISOString();
      
      if(this.type === 'date')
        return date.slice(0,10);
      else if(this.type === 'datetime-local')
        return date.slice(0,16);
      else if(this.type === `time`)
        return this.step && this.step % 60 !== 0 ? date.slice(11,19) : date.slice(11,16)
      return '';
    }
  },

  methods: {
    changeDate($event){
      this.$emit('update:modelValue', $event.target.valueAsNumber);
    }
  },
};
</script>
