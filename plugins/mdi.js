import Vue from 'vue';
import 'vue-material-design-icons/styles.css';
import SortAscending from 'vue-material-design-icons/SortAscending.vue';
import SortDescending from 'vue-material-design-icons/SortDescending.vue';
import WindowClose from 'vue-material-design-icons/WindowClose.vue';

export default function materialIcons() {
  Vue.component('SortAscendingMdi', SortAscending);
  Vue.component('SortDescendingMdi', SortDescending);
  Vue.component('WindowCloseMdi', WindowClose);
}
