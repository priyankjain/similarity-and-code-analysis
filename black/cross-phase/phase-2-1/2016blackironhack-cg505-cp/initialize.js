 import counterApp from './reducers';
 import App from 'components/App';
 
const store = createStore(counterApp,
                          module.hot && module.hot.data && module.hot.data.counter || 0,
                          window.devToolsExtension && window.devToolsExtension());
 
 if (module.hot) {
   module.hot.accept('./reducers', () => {
