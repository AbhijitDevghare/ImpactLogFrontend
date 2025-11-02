import { Toaster } from 'react-hot-toast';
import CustomeRoutes from './routes/CustomRoutes';
import OtherRoutes from './routes/OthersRoutes';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import './App.css';
import { useEffect } from 'react';
import { getUser } from './redux/slices/AuthSlice';

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getUser()); // verify user on load
  }, [dispatch]);

  return (
    <>
      <CustomeRoutes />
      <OtherRoutes />
      <Toaster />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
