import { toast } from 'react-toastify';

const handleError = (error) => {
  if (error.response) {
    if (error.response.status === 400) {
      toast.error(error.response.data.message);
    } else if (error.response.status === 409) {
      toast.warning(error.response.data.message);
    } else {
      toast.error('An error occurred, please try again later!');
    }
  } else {
    toast.error('An error occurred, please try again later!');
  }
};

export default handleError;
