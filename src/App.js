import Home from './Containers/Home/Home';
import { hot } from 'react-hot-loader/root';
import Provider from './helpers/Providers';
import { useContext, useEffect } from 'react';
import { InternetContext } from './Contexts/InternetContext';

function App() {
  // const { setInternet } = useContext(InternetContext);

  // function updateNetwork() {
  //   setInternet(window.navigator.onLine);
  // }

  // useEffect(() => {
  //   window.addEventListener('offline', updateNetwork);
  //   window.addEventListener('online', updateNetwork);
  //   return () => {
  //     window.removeEventListener('offline', updateNetwork);
  //     window.removeEventListener('online', updateNetwork);
  //   };
  // });
  return (
    <Provider>
      <Home />
    </Provider>
  );
}

export default hot(App);
