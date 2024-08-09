import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './store/index.js'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';

import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="983383379443-icooqvrf2s1lfgng04dr1430gnlt6ej2.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
)
