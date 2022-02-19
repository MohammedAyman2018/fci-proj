import Vue from 'vue'
import notification from 'vue-notification-ui'
import '@/assets/css/animate.min.css'
import '@/assets/css/notification.css'
Vue.use(notification, {
  position: 'notification-bottom-right', // top, bottom, left, right
  duration: 5000, // default
  left: 20, // default
  bottom: 20, // default
  top: 20, // default
  right: 40 // default
})
