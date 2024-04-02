import Home from './pages/Home';
import { UserContext } from './UserContext.js';

function App() {
  // dummy function meant to retrieve the user id to be able to emulate the backend calls regarding carts which require a user id
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


