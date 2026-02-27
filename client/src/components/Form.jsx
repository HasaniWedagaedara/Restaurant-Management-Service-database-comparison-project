import React, { useEffect, useState } from "react";
import "../App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Form = ({ handleSubmit, handleOnChange, handleClose, rest }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [addressErr, setAddressErr] = useState(false);
  const [telephoneErr, setTelephoneErr] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(rest.name);
    setAddress(rest.address);
    setTelephone(rest.telephone);
  }, [rest.name, rest.address, rest.telephone]);

  const handleName = (e) => {
    setName(e.target.value);
    handleOnChange(e);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
    handleOnChange(e);
  };

  const handleTelephone = (e) => {
    setTelephone(e.target.value);
    handleOnChange(e);
  };

  const handleSubmitBtn = (e) => {
    e.preventDefault();

    let valid = true;

    if (name === "") {
      setNameErr(true);
      valid = false;
    } else {
      setNameErr(false);
    }

    if (address === "") {
      setAddressErr(true);
      valid = false;
    } else {
      setAddressErr(false);
    }

    if (telephone === "" || isNaN(telephone)) {
      setTelephoneErr(true);
      valid = false;
    } else {
      setTelephoneErr(false);
    }

    if (valid) {
      handleSubmit();
    }
  };

  return (
    <div className="addcontainer">
      <form onSubmit={handleSubmitBtn}>
        <i className="bi bi-x-circle-fill" onClick={handleClose}></i>

        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="  Restuarant Name"
          onChange={handleName}
          value={name}
        />
        {nameErr && <span className="text-danger">Name is required!</span>}

        <label htmlFor="address">Address: </label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="  Address of the Restuarant"
          onChange={handleAddress}
          value={address}
        />
        {addressErr && <span className="text-danger">Address is required!</span>}

        <label htmlFor="telephone">Telephone: </label>
        <input
          type="text"
          id="telephone"
          name="telephone"
          placeholder="  Telephone Number"
          onChange={handleTelephone}
          value={telephone}
        />
        {telephoneErr && (
          <span className="text-danger">Telephone Number must be numeric</span>
        )}

        <br />
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;