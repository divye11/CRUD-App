// importing contexts
import { InternetProvider } from '../Contexts/InternetContext';

function Provider({ children }) {
  return <InternetProvider>{children}</InternetProvider>;
}

export default Provider;
