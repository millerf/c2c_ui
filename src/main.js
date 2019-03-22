// Require the main Sass manifest file
import Vue from 'vue';
import App from '@/App.vue';

import config from '@/js/config';

import VueAnalytics from 'vue-analytics';

import router from '@/js/vue-plugins/router';

import alertWindow from '@/js/vue-plugins/alert-window';
import documentUtils from '@/js/vue-plugins/document-utils';
import fontAwesome from '@/js/vue-plugins/font-awesome-config';
import getText from '@/js/vue-plugins/gettext-plugin';
import globalComponents from '@/js/vue-plugins/generic-components';
import helperWindow from '@/js/vue-plugins/helper-window';
import imageViewer from '@/js/vue-plugins/image-viewer';
import localStorage from '@/js/vue-plugins/local-storage';
import stripMarkdown from '@/js/vue-plugins/strip-markdown';
import upperCaseFirstLetter from '@/js/vue-plugins/uppercase-first-letter';
import user from '@/js/vue-plugins/user';
import vueMoment from '@/js/vue-plugins/vue-moment.js';

require('./assets/sass/main.scss');

Vue.config.productionTip = false;
Vue.config.silent = false;

Vue.use(localStorage); // First, vm.$localStorage property

// Google analytics
Vue.use(VueAnalytics, {
  id: config.googleAnalyticsKey,
  // debug: {
  //   enabled: true, // default value
  //   trace: true, // default value
  //   sendHitTask: true // default value
  // },
  router,
  autoTracking: {
    // do not send updates if query parameter has changed
    // note that skipSamePath does not do the job, as document's titles is part of route
    // https://github.com/MatteoGabriele/vue-analytics/blob/master/docs/page-tracking.md#customize-router-updates
    shouldRouterUpdate(to, from) {
      return to.name !== from.name || String(to.params.id) !== String(from.params.id);
    },
    pageviewTemplate(route) {
      return {
        page: route.path,
        title: 'Camptocamp.org',
        location: window.location.href
      };
    }
  },
  set: [
    { field: 'anonymizeIp', value: true }
  ],
  fields: {
    cookieDomain: window.location.host === 'localhost:8080' ? 'none' : window.location.host
  }
});

Vue.use(vueMoment); // moment functions
Vue.use(documentUtils); // getDocumentType, getLocale functions
Vue.use(fontAwesome); // <fa-icon /> component
Vue.use(getText); // vm.$gettext() function and v-translate directive
Vue.use(helperWindow); // vm.$helper property
Vue.use(alertWindow); // vm.$alert property
Vue.use(imageViewer);
Vue.use(globalComponents); // Components available everywhere
Vue.use(stripMarkdown); // stripMarkdown filter
Vue.use(upperCaseFirstLetter); // upperCaseFirstLetter filter
Vue.use(user); // vm.$user property

new Vue({
  router,
  created() {
    this.$language.firstLoad();
  },
  render: h => h(App)
}).$mount('#app');