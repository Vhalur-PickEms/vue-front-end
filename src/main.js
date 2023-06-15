import { createApp } from 'vue'
import { createAuth0 } from '@auth0/auth0-vue';
import App from './App.vue'

import './assets/main.css'

const app = createApp(App);

app.use(
    createAuth0({
      domain: "dev-4iw3c7p0viewq3vw.us.auth0.com",
      clientId: "Nwn8EsQElzChsSnVCjIWLUz6fp0oZAXy",
      authorizationParams: {
        redirect_uri: 'http://localhost:5173',
        audience: "https://www.defianceTest",
        scope: 'openid profile email team:read-write',
      }
    })
  );

app.mount('#app')
