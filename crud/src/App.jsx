import Homepage from './1.CRUD_by_RTK-Q/ui/Pages/Homepage';
import { store } from './1.CRUD_by_RTK-Q/Redux/app/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Provider store={store}>
        <Homepage />
      </Provider>
    </>
  );
}

export default App;
