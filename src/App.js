import React from 'react';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      
    <NavBar />
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center mb-4">¡Bienvenido!</h1>
          <div className="text-center">
            <h3>Ir a la lista de <a href='/banks'>bancos</a></h3>
            <h3>Ir a la lista de <a href='/users'>usuarios</a></h3>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
