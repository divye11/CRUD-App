// importing contexts
import { InternetProvider } from '../Contexts/InternetContext';
import { TaskProvider } from '../Contexts/TaskContext';

function Provider({ children }) {
  return (
    <InternetProvider>
      <TaskProvider>{children}</TaskProvider>
    </InternetProvider>
  );
}

export default Provider;
