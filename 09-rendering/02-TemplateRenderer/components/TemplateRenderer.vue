<script>
import { compile, h, defineComponent } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },
  computed: {

    renerFunction(){
      return compile(this.template);
    },

    innerComponent() {
      return defineComponent({

        name: 'computedComponent',
        props: ['bindings'],
        components: this.components,
        render: this.renerFunction,
      })
    }
  },

  render(){
   return h(this.innerComponent,{bindings: this.bindings});

  }
};
</script>
