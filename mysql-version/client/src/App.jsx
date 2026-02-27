import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Form from "./components/Form";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

axios.defaults.baseURL = "http://localhost:3000/";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    telephone: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    address: "",
    telephone: "",
    _id: "",
  });
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/create", formData);
      const data = response.data;
      sessionStorage.setItem("errors", JSON.stringify(data.errors));
      console.log(data);

      if (data.success) {
        setAddSection(false);
        alert(data.message);
        getFetchData();
        setFormData({
          name: "",
          address: "",
          telephone: "",
        });
        setErrors({});
      } else {
        setErrors(
          data.errors.reduce((acc, curr) => {
            acc[curr.param] = curr.msg;
            return acc;
          }, {}),
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const [dataList, setDataList] = useState([]);
  const getFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };
  useEffect(() => {
    getFetchData();
  }, []);

  console.log(dataList);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);

    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async () => {
    const data = await axios.put("/update", formDataEdit);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };
  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>DashBoard</h1>
        <button
          type="button"
          class="btn btn-primary btn-lg"
          onClick={() => setAddSection(true)}
        >
          Add New Restuarant
        </button>
      </div>

      <div className="container">
        {addSection && (
          <Form
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleClose={() => setAddSection(false)}
            rest={formData}
            errors={errors}
          />
        )}

        {editSection && (
          <Form
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleClose={() => setEditSection(false)}
            rest={formDataEdit}
            errors={errors}
          />
        )}

        <div className="tablecontainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Telephone</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {dataList[0] ? (
                dataList.map((el) => {
                  return (
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.address}</td>
                      <td>{el.telephone}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-success"
                          onClick={() => handleEdit(el)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={() => handleDelete(el._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p style={{ textAlign: "center" }}>No data</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
