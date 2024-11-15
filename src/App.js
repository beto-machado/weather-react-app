// src/App.js
import React from "react";
import "./App.css";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="App bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 min-h-screen text-white">
      <header className="flex justify-center items-center py-10">
        <h1 className="text-5xl font-extrabold tracking-wide text-center">
          Consulta de Clima
        </h1>
      </header>

      <main className="flex justify-center items-center py-8">
        <div className="w-full max-w-xl px-6 py-8 bg-white rounded-lg shadow-lg">
          <Weather />
        </div>
      </main>

      <footer className="text-center py-4 bg-gray-800">
        <p className="text-sm">
          Desenvolvido por <strong>Seu Nome</strong> -{" "}
          <a
            href="https://www.linkedin.com/in/beto-machado"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
          >
            LinkedIn
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
