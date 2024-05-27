import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import NavBar from "./NavBar";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchBanks();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const fetchBanks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/banks");
      setBanks(response.data.data);
      setLoading(false);
      console.log(response.data.data);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name: e.target.name.value,
      email: e.target.email.value,
      bank_id: e.target.bank_id.value,
    };

    try {
      await axios.post("http://localhost:8000/api/users", newUser);
      fetchUsers();
      e.target.reset();
      Swal.fire(
        "Usuario creado",
        "El usuario ha sido creado exitosamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", "Error al crear el usuario", error);
      console.error("Error creating new user:", error);
    }
  };

  if (loading) {
    return <div className="container">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="container">
        Error al cargar los datos: {error.message}
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <h1>Lista de Usuarios</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" name="name" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Banco</label>
            <select className="form-control" name="bank_id" required>
              <option value="">Seleccione un banco</option>
              {banks.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Crear Usuario
          </button>
        </form>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Banco</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.bank ? user.bank.name : "Sin banco"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No se encontraron usuarios</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserList;
