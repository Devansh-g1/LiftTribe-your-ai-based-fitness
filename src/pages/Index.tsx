
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to the home page since our app starts from there
  return <Navigate to="/" replace />;
};

export default Index;
