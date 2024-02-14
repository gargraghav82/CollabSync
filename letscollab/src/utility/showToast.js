
import { toast } from 'react-hot-toast'; // replace with your actual toast library
import { useDispatch, useSelector } from 'react-redux';

export const useToast = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const error = useSelector((state) => state.error);

  const showToast = () => {
    if (message) {
      toast.success(message);
      dispatch({ type: 'CLEAR_MESSAGE' }); // Replace with your action type to clear message
    }

    if (error) {
      toast.error(error);
      dispatch({ type: 'CLEAR_ERROR' }); // Replace with your action type to clear error
    }
  };

  return showToast;
};