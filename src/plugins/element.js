import Vue from 'vue';
import {
  MessageBox,
  Message,
  Loading,
  Button,
  Input,
  Icon,
  Dialog,
  Pagination
} from 'element-ui';

Vue.use(Button);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Dialog);
Vue.use(Pagination);


Object.assign(Vue.prototype, {
  $ELEMENT: { zIndex: 999 }, // size: 'small',
  $message: Message,
  $messageBox: MessageBox,
  $confirm: MessageBox.confirm,
  $alert: MessageBox.alert,
  $prompt: MessageBox.prompt,
  $loading: Loading,
});
