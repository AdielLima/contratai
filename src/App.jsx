import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import HomePage from "./pages/HomePage";
import Assistentes from "./pages/Assistentes";
import { GlobalStyle } from "./styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login"
import Wrapper from "./pages/Wrapper";


function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Ocorreu um erro:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Tentar novamente</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reinicialize estado, chame alguma lógica de limpeza etc.
      }}
    >
  <GlobalStyle/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/assistentes"
          element={
            // <Wrapper>
              <Assistentes />
            // </Wrapper>
          }
        />
      </Routes>
      </BrowserRouter>
      </ErrorBoundary>
  )
    
}
export default App;