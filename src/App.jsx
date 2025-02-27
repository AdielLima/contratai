import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import HomePage from "./pages/HomePage";
import Assistentes from "./pages/Assistentes";
import { GlobalStyle } from "./styles";

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
      {/* <HomePage /> */}
      <Assistentes/>
    </ErrorBoundary>
  );
}
export default App;