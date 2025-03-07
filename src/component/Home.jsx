import React, { useState, useRef } from "react";
import generatePDF, { Resolution, Margin } from "react-to-pdf";

import Swal from "sweetalert2";

const options = {
  filename: "Prescription.pdf",
  method: "save",
  resolution: Resolution.HIGH,
  page: {
    margin: Margin.SMALL,
    format: "a4",
    orientation: "landscape",
  },
  canvas: {
    mimeType: "image/jpeg",
    qualityRatio: 1,
  },
  overrides: {
    pdf: {
      compress: true,
    },
    canvas: {
      useCORS: true, // Ensure CORS is enabled
    },
  },
};

const Home = () => {
  const targetRef = useRef();
  const [inputFields, setInputFields] = useState([{ name: "" }]);
  const [formData, setFormData] = useState({
    name: "",
    uname: "",
    designation: "",
    age: "",
    _id: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newField = { name: "" };
    setInputFields([...inputFields, newField]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.patientname.value;
    const uname = form.uname.value;
    const designation = form.designation.value;
    const age = form.age.value;

    const addUser = { name, uname, designation, age };
    console.log(inputFields, addUser);

    fetch("http://localhost:5000/addprescription", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ addUser, inputFields }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Prescription added successfully",
            icon: "success",
            confirmButtonText: "Added",
          });

          setFormData({
            name: data.name,
            uname: data.uname,
            designation: data.designation,
            age: data.age,
            _id: data.insertedId,
          });

          setIsSubmitted(true);
        }
      });
  };

  return (
    <div ref={targetRef}>
      <div className="flex items-center justify-center bg-slate-300">
        <img
          src="../../public/1630629403471.jpg"
          alt=""
          className="w-14 h-14 mt-6 mb-6"
        />
        <h2 className="text-6xl text-blue-500 ml-7 mt-6 mb-6">FOUR H GROUP</h2>
      </div>
      <div
        className="bg-gray-100 min-h-screen py-12 px-6 flex items-center justify-center"
       
      >
        <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit}>
            {/* Unit Name and ID */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="form-control">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Unit Name:
                </label>
                <input
                  type="text"
                  name="uname"
                  placeholder="Enter unit name"
                  className="input input-bordered w-full px-4 py-2 text-lg rounded-md border-gray-300 shadow-sm"
                  value={formData.uname}
                  onChange={(e) =>
                    setFormData({ ...formData, uname: e.target.value })
                  }
                  disabled={isSubmitted}
                />
              </div>

              <div className="form-control">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  ID No:
                </label>
                <input
                  type="text"
                  name="id"
                  placeholder="Generated ID No"
                  className="input input-bordered w-full px-4 py-2 text-lg rounded-md border-gray-300 shadow-sm"
                  value={formData._id || ""}
                  disabled
                />
              </div>
            </div>

            {/* Name and Age */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="form-control">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  name="patientname"
                  placeholder="Enter name"
                  className="input input-bordered w-full px-4 py-2 text-lg rounded-md border-gray-300 shadow-sm"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={isSubmitted}
                />
              </div>

              <div className="form-control">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Age:
                </label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  className="input input-bordered w-full px-4 py-2 text-lg rounded-md border-gray-300 shadow-sm"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  disabled={isSubmitted}
                />
              </div>
            </div>

            {/* Designation */}
            <div className="form-control mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Designation:
              </label>
              <input
                type="text"
                name="designation"
                placeholder="Enter designation"
                className="input input-bordered w-full px-4 py-2 text-lg rounded-md border-gray-300 shadow-sm"
                value={formData.designation}
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
                disabled={isSubmitted}
              />
            </div>

            <div className="divider my-8"></div>
            <h2 className="text-center text-3xl text-blue-500 mb-8">
              Please Fill The Medicine Field...
            </h2>

            {/* Medicine Input Fields */}
            <div className="mb-8">
              {inputFields.map((input, index) => {
                return (
                  <div key={index} className="mb-4">
                    <input
                      name="name"
                      placeholder="Enter the medicine"
                      className="input input-bordered w-full px-4 py-2 text-lg rounded-md border-gray-300 shadow-sm"
                      value={input.name}
                      onChange={(event) => handleFormChange(index, event)}
                      disabled={isSubmitted}
                    />
                  </div>
                );
              })}
              <button
                type="button"
                onClick={addFields}
                disabled={isSubmitted}
                className="btn  bg-red-300 text-black px-6 py-3 rounded-md mt-4"
              >
                Add More Medicine
              </button>
            </div>

            <div className="flex justify-center space-x-6 mt-12">
              <input
                type="submit"
                value="Add Prescription"
                className="btn bg-green-300 text-black px-6 py-3 rounded-md shadow-md"
              />
              <input
                type="button"
                onClick={() => generatePDF(targetRef, options)}
                value="Print Prescription"
                className="btn bg-red-300 text-black px-6 py-3 rounded-md shadow-md"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
