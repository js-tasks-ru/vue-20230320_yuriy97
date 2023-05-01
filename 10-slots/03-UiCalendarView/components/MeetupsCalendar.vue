<template>
  <UiCalendarView v-slot="{item}">
    <UiCalendarEvent 
       v-for="meetup in meetupsMap[item.date.toDateString()]"
      :key="meetup.title"
      tag="a"
      :href="`/meetups/${meetup.id}`">
      {{ meetup.title }}
    </UiCalendarEvent>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
    meetupsMap() {
      const result = {};
      this.meetups.map((meetup) => {
        const dateString = new Date(meetup.date).toDateString();
        if (!result[dateString]) {
          result[dateString] = [meetup];
        } else {
          result[dateString].push(meetup);
        }
      });
      return result;
    },
  }
};
</script>

<style scoped></style>
