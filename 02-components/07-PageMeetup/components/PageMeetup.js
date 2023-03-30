import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from './MeetupView';
import { fetchMeetupById } from '../meetupService.js';


export default defineComponent({
  name: 'PageMeetup',

  fetchMeetupById,

  data() {
    return {
      meetup: null,
      isLoading: true,
      error: null,
    }
  },

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  watch: {
    meetupId: {
      handler(newId){
        this.loadData(newId);
      },
      immediate: true,
    },
  },
  
  methods: {
    loadData(id){
      this.isLoading = true;
      this.error = null;
      fetchMeetupById(id)
        .then(result => {
          this.meetup = result;
          this.isLoading = false;
        })
        .catch(error => {
          this.error = error.message;
          this.isLoading = false;
        });
    },
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup && !error && !isLoading" :meetup="meetup"/>
      <UiContainer>
        <UiAlert v-if="isLoading">Загрузка...</UiAlert>
      </UiContainer>
      <UiContainer>
        <UiAlert v-if="error">{{ this.error }}</UiAlert>
      </UiContainer>
    </div>`,
});
