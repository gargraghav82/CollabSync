import Home from './pages/Home';
import './css/app.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VideoRoom from './pages/VideoRoom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './redux/actions/authActions';
import toast from 'react-hot-toast';






function App() {

  const {isAuthenticated} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
        await dispatch(loadUser());
    }
    load();
  } , []
  )

  const { message, error} = useSelector(
    state => state.authReducer
  );


  useEffect(() => {
    if (error) {
        console.log(error);
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      console.log(message);
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [error, message]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/SignIn",
      element: isAuthenticated ? <Home/> : <SignIn/>,
    },
    {
      path: "/SignUp",
      element: isAuthenticated ? <Home/> : <SignUp/>,
    },
    {
      path: "/collab",
      element: isAuthenticated ? <VideoRoom/> : <SignIn/>,
    },
  
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
