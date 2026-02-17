import { Toaster } from 'react-hot-toast';
import CustomeRoutes from './routes/CustomRoutes';
import OtherRoutes from './routes/OthersRoutes';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import './App.css';
import { useEffect } from 'react';
import { getUserWhenAppLoads } from './redux/slices/AuthSlice';
import Loader from './components/Loader/Loader';

function AppContent() {
  const dispatch = useDispatch();
  const authLoading = useSelector((state) => state.auth.authLoading);

  useEffect(() => {
    dispatch(getUserWhenAppLoads());
  }, [dispatch]);

  if (authLoading) {
    return <Loader />;
  }

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
