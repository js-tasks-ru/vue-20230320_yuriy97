import { result } from 'lodash';
import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';



const App = defineComponent({

    name: 'App',

    data () {
        return {
            id: null,
            title:''
        }
    },

    watch:{
      id(newId,oldId){
        if(oldId !== newId)
          fetchMeetupById(newId).then(result => this.title = result.title);

      }
    }  
});



function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}


const app = createApp(App);
const vm = app.mount('#app');

