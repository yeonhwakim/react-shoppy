import { Outlet } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import Header from "./components/Header";
import { LoginContextProvider } from "./context/LoginContext";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <LoginContextProvider>
          <Header />
          <Outlet />
        </LoginContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
