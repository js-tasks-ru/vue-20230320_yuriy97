import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupInfo from './MeetupInfo.js';
import MeetupDescription from './MeetupDescription';
import MeetupCover from './MeetupCover.js';
import MeetupAgenda from './MeetupAgenda';
import MeetupAgendaItem from './MeetupAgendaItem';


export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupInfo,
    MeetupDescription,
    MeetupCover,
    MeetupAgenda,
    MeetupAgendaItem

  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <MeetupCover :title="meetup.title" :image="meetup.image"/>

      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">
            <MeetupDescription :description="meetup.description" />            
            <MeetupAgenda v-if='meetup.agenda.length>0' :agenda="meetup.agenda"/>
            <UiAlert v-else>Программа пока пуста...</UiAlert>
          </div>
          <div class="meetup__aside">
            <MeetupInfo :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date"/>
          </div>
        </div>
      </UiContainer>
    </div>`,
});
