import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  agendaItemIcons,
  agendaItemDefaultTitles,

  props: {
    agendaItem:{
      type: Object,
      required: true,

    },
  },

  methods: {
    getAgendaIcon(){
      return agendaItemIcons[this.agendaItem.type]

    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="\`/assets/icons/icon-\${this.getAgendaIcon()}.svg\`" class="icon" :alt="getAgendaIcon()" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }} </div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title"> 
          <template v-if="agendaItem.title"> {{ agendaItem.title }} </template>
          <template v-else> {{ $options.agendaItemDefaultTitles[agendaItem.type] }} </template>
        </h3>
        <p v-if="agendaItem.type === 'talk'" class="agenda-item__talk">
          <span>{{ agendaItem.speaker }} </span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }} </span>
        </p>
        <p>{{ agendaItem.description }} </p>
      </div>
    </div>`,
});
