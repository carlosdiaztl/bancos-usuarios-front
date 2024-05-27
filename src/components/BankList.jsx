import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import NavBar from "./NavBar";

const BankList = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/banks");
      setBanks(response.data.data);
      setLoading(false);
      console.log(response);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBank = {
      name: e.target.name.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
    };

    try {
      await axios.post("http://localhost:8000/api/banks", newBank);
      fetchBanks();
      e.target.reset();
      Swal.fireEvent(
        "success",
        "Banco creado",
        "El banco ha sido creado exitosamente"
      );
    } catch (error) {
      Swal.fire("Error", "Error al crear el banco", error);
      console.error("Error creating new bank:", error);
    }
  };

  if (loading) {
    return <div className="container">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="container">
        Error al cargar los bancos: {error.message}
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <h1>Lista de Bancos</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" name="name" required />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Dirección</label>
            <input
              type="text"
              className="form-control"
              name="address"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Teléfono</label>
            <input type="text" className="form-control" name="phone" required />
          </div>
          <button type="submit" className="btn btn-primary">
            Crear Banco
          </button>
        </form>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {banks.length > 0 ? (
              banks.map((bank) => (
                <tr key={bank.id}>
                  <td>{bank.id}</td>
                  <td>{bank.name}</td>
                  <td>{bank.address}</td>
                  <td>{bank.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No se encontraron bancos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BankList;
