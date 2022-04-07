import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

//pages
import {Home} from './pages/Home';
import {NewRoom} from './pages/NewRoom';
import {Room} from './pages/Room';

import { AuthContextProvider } from "./contexts/AuthContextType";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
          <Route path="/rooms/:id" element={<Room />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
