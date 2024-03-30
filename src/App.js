import Home from './pages/Home';
import { UserContext } from './UserContext.js';

function App() {
  // dummy function meant to retrieve the val
  const retrieveUserId = () => {
    return 6;
  }
  return (
    <UserContext.Provider value={retrieveUserId()}>
      <Home />
    </UserContext.Provider>
  );
}

export default App;


