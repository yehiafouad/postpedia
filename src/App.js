import "./App.css";
import { LanguageProvider } from "./context/languageContext";
import Routes from "./routes/routes";
import { ToastProvider } from "react-toast-notifications";
import ToastContainer from "./components/ToastContainer";
import StateContext from "./context/stateContext";
import { UserProvider } from "./context/UserContext";
import { SocketProvider } from "./context/socketContent";
import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState({ modalName: [], data: null });
  const [update, setUpdate] = useState(false);
  return (
    <ToastProvider
      components={ToastContainer}
      autoDismiss={true}
      placement="top-center"
    >
      <StateContext.Provider
        value={{ showModal, setShowModal, update, setUpdate }}
      >
        <SocketProvider>
          <UserProvider>
            <LanguageProvider>
              <div className="App main-font">
                <Routes />
              </div>
            </LanguageProvider>
          </UserProvider>
        </SocketProvider>
      </StateContext.Provider>
    </ToastProvider>
  );
}

export default App;
