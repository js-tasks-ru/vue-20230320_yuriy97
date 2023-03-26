import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({

    name: 'App',

    data () {
        return {
            first: 0,
            second: 0,
            operation: 'sum'
            
        }
    },

    computed :{

       result(){
            switch(this.operation){
                case('sum'): return this.first + this.second;
                case('subtract'): return this.first - this.second;
                case('multiply'): return this.first * this.second;
                case('divide'): return this.first / this.second;
                default: return '';
            };
       }
    }
});

const app = createApp(App);
const vm = app.mount('#app');
