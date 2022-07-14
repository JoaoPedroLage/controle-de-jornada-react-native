import { registerRootComponent } from 'expo';
import AppProvider from './front-end/context/AppProvider';
import App from './front-end/pages/Login';

registerRootComponent(
  App,
  () => (props) => (
    <AppProvider>
      <App {...props} />
    </AppProvider>
  ),
  () => App
);