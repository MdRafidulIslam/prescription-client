import React, { useState, useRef } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PrescriptionPDF from "./PrescriptionPDF";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2";

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());

  // console.log(startDate?.toLocaleDateString());
  // const targetRef = useRef();
  const [inputFields, setInputFields] = useState([
    { mname: "", quantity: "", morning: false, noon: false, night: false },
  ]);
  const [inputFields1, setInputFields1] = useState([{ symptoms: "" }]);
  const [inputFields2, setInputFields2] = useState([{ experiment: "" }]);
  const [inputFields3, setInputFields3] = useState([{ test: "" }]);
  const [formData, setFormData] = useState({
    name: "",
    uname: "",
    designation: "",
    employeeId: "",
    dated: "",
    age: "",
    _id: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.checked;
    setInputFields(data);
    console.log(event.target.name, event.target.checked);
  };

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };
  const handleFormChange1 = (index, event) => {
    let data = [...inputFields1];
    data[index][event.target.name] = event.target.value;
    setInputFields1(data);
  };
  const handleFormChange2 = (index, event) => {
    let data = [...inputFields2];
    data[index][event.target.name] = event.target.value;
    setInputFields2(data);
  };
  const handleFormChange3 = (index, event) => {
    let data = [...inputFields3];
    data[index][event.target.name] = event.target.value;
    setInputFields3(data);
  };
  const [users, setUsers] = useState({});

  const addFields = () => {
    let newField = {
      mname: "",
      quantity: "",
      morning: false,
      noon: false,
      night: false,
    };

    setInputFields([...inputFields, newField]);
  };
  const addFields1 = () => {
    let newField1 = {
      symptoms: "",
    };

    setInputFields1([...inputFields1, newField1]);
  };
  const addFields2 = () => {
    let newField2 = {
      experiment: "",
    };

    setInputFields2([...inputFields2, newField2]);
  };
  const addFields3 = () => {
    let newField3 = {
      test: "",
    };

    setInputFields3([...inputFields3, newField3]);
  };
  // console.log(startDate.toLocaleDateString("en-GB"));
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.patientname.value;
    const uname = form.uname.value;
    const designation = form.designation.value;
    const age = form.age.value;
    const employeeId = form.employeeId.value;
    const dated = startDate.toLocaleDateString("en-GB");

    const addUser = { name, uname, designation, age, employeeId, dated };
    // console.log(inputFields, addUser);
    setUsers(addUser);

    fetch("https://doctor-prescriptions-server.vercel.app/addprescription", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        addUser,
        inputFields,
        inputFields1,
        inputFields2,
        inputFields3,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
            dated: data.dated,
            employeeId: data.employeeId,
            _id: data.insertedId,
          });

          setIsSubmitted(true);
        }
      });
  };

  return (
    <div>
      <div className="bg-gray-100 min-h-screen py-12 px-6 flex items-center justify-center">
        <div className="max-w-5xl w-full bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit}>
            {/* date picker */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="form-control">
                <label className="block text-lg font-medium text-blue-500 mb-2">
                  Date :
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="input input-bordered w-full px-4 py-2 text-lg rounded-md border-gray-300 shadow-md"
                  disabled={isSubmitted}
                />
              </div>
            </div>
            {/* Unit Name and ID */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="form-control">
                <label className="block text-lg font-medium text-blue-500 mb-2">
                  Unit Name:
                </label>

                <select
                  name="uname"
                  className="select select-bordered w-full px-4 py-2 text-lg rounded-md border-gray-300 shadow-md"
                  value={formData.uname}
                  onChange={(e) =>
                    setFormData({ ...formData, uname: e.target.value })
                  }
                  disabled={isSubmitted}
                  required
                >
                  <option value="">--select unit name--</option>
                  <option value="Four H Dying and Printing Ltd.">Four H Dyeing and Printing Ltd.</option>
                  <option value=" Four H Fashions Ltd. (Head Office)"> Four H Fashions Ltd. (Head Office)</option>
                  <option value="Four H Apparels Ltd.">Four H Apparels Ltd.</option>
                </select>
              </div>

              <div className="form-control">
                <label className="block text-lg font-medium text-blue-500 mb-2">
                  ID No:
                </label>
                <input
                  type="text"
                  name="id"
                  placeholder="Generated ID No"
                  className="input input-bordered w-full px-4 py-2 text-lg rounded-md border-gray-300 shadow-md"
                  value={formData._id || ""}
                  disabled
                />
              </div>
            </div>

            {/* Name and Age */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="form-control">
                <label className="block text-lg font-medium text-blue-500 mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  name="patientname"
                  placeholder="Enter name"
                  className="input input-bordered w-full px-4 py-2 text-lg rounded-md border-gray-300 shadow-md"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={isSubmitted}
                  required
                />
              </div>

              <div className="form-control">
                <label className="block text-lg font-medium text-blue-500 mb-2">
                  Age:
                </label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  className="input input-bordered w-full px-4 py-2 text-lg rounded-md border-gray-300 shadow-md"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  disabled={isSubmitted}
                  required
                />
              </div>
            </div>

            {/* Designation and employee id*/}

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="form-control mb-6">
                <label className="block text-lg font-medium text-blue-500 mb-2">
                  Designation:
                </label>
                <select
                  name="designation"
                  className="select select-bordered w-full px-4 py-2 text-lg rounded-md border-gray-300 shadow-md"
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                  disabled={isSubmitted}
                  required
                >
                  <option value="">--select employee designation--</option>
                  <option value="Executive">Executive</option>
                  <option value="Assistent Executive">
                    Assistent Executive
                  </option>
                  <option value="Officer">Officer</option>
                </select>
              </div>
              <div className="form-control mb-6">
                <label className="block text-lg font-medium text-blue-500 mb-2">
                  Employee Id :
                </label>
                <input
                  type="text"
                  name="employeeId"
                  placeholder="Enter employeeId"
                  className="input input-bordered w-full px-4 py-2 text-lg rounded-md border-gray-300 shadow-md"
                  value={formData.employeeId}
                  onChange={(e) =>
                    setFormData({ ...formData, employeeId: e.target.value })
                  }
                  disabled={isSubmitted}
                  required
                />
              </div>
            </div>

            <div className="divider my-12"></div>

            <h2 className="text-center text-3xl text-blue-500 mb-8">
              Please Fill The Symptoms,test and experiment Field...
            </h2>

            {/* symptons,test and experiment field */}
            <div className="mb-8">
              <div className="grid md:grid-cols-3 gap-2 mb-3">
                <span className="text-blue-500 text-xl font-semibold ml-6">
                  CC/Symptoms
                </span>
                <span className="text-blue-500 text-xl font-semibold ml-2">
                  Ex
                </span>
                <span className="text-blue-500 text-xl font-semibold ml-6">
                  Test/Diagnostic
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-2 mb-6">
                <div>
                  {inputFields1.map((input, index) => {
                    return (
                      <div key={index} className="mb-6">
                        <input
                          name="symptoms"
                          placeholder="Enter the symptoms"
                          className="input input-bordered w-5/6 h-12 px-4 py-2 text-lg rounded-md border-gray-300 shadow-md"
                          value={input.symptoms}
                          onChange={(event) => handleFormChange1(index, event)}
                          disabled={isSubmitted}
                        />
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    onClick={addFields1}
                    disabled={isSubmitted}
                    className="btn  bg-red-300 text-black px-5 py-2 rounded-md mt-4"
                  >
                    Add More symptoms
                  </button>
                </div>
                <div>
                  {inputFields2.map((input, index) => {
                    return (
                      <div key={index} className="mb-6">
                        <input
                          name="experiment"
                          placeholder="Enter the experiment"
                          className="input input-bordered w-5/6 h-12 px-4 py-2 text-lg rounded-md border-gray-300 shadow-md"
                          value={input.experiment}
                          onChange={(event) => handleFormChange2(index, event)}
                          disabled={isSubmitted}
                        />
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    onClick={addFields2}
                    disabled={isSubmitted}
                    className="btn  bg-red-300 text-black px-5 py-2 rounded-md mt-4"
                  >
                    Add More experiment
                  </button>
                </div>
                <div>
                  {inputFields3.map((input, index) => {
                    return (
                      <div key={index} className="mb-6">
                        <input
                          name="test"
                          placeholder="Enter the test"
                          className="input input-bordered w-5/6 h-12 px-4 py-2 text-lg rounded-md border-gray-300 shadow-md"
                          value={input.experiment}
                          onChange={(event) => handleFormChange3(index, event)}
                          disabled={isSubmitted}
                     
                        />
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    onClick={addFields3}
                    disabled={isSubmitted}
                    className="btn  bg-red-300 text-black px-5 py-2 rounded-md mt-4"
                  >
                    Add More test
                  </button>
                </div>
              </div>
            </div>

            <div className="divider my-12"></div>
            <h2 className="text-center text-3xl text-blue-500 mb-8">
              Please Fill The Medicine Field...
            </h2>

            {/* Medicine Input Fields */}
            <div className="mb-8">
              <div className="grid md:grid-cols-3 gap-1 mb-3">
                <span></span>
                <div className="grid md:grid-cols-3 gap-1 ">
                  <span className="text-blue-500 text-xl font-semibold">
                    Morning
                  </span>
                  <span className="text-blue-500 text-xl font-semibold">
                    Noon
                  </span>
                  <span className="text-blue-500 text-xl font-semibold">
                    Night
                  </span>
                </div>
                <span className="text-blue-500 text-xl font-semibold ml-6">
                  days/times
                </span>
              </div>
              {inputFields.map((input, index) => {
                return (
                  <div key={index} className="grid md:grid-cols-3 gap-6 mb-6">
                    <input
                      name="mname"
                      placeholder="Enter the medicine"
                      className="input input-bordered w-5/6 h-12 px-4 py-2 text-lg rounded-md border-gray-300 shadow-md"
                      value={input.mname}
                      onChange={(event) => handleFormChange(index, event)}
                      disabled={isSubmitted}
                      required
                    />

                    <div className="grid md:grid-cols-3 gap-1 mb-6 mt-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="morning"
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          // checked={input.morning}
                          onChange={(event) => handleChange(index, event)}
                          disabled={isSubmitted}
                        />
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="noon"
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          // checked={input.noon}
                          onChange={(event) => handleChange(index, event)}
                          disabled={isSubmitted}
                        />
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="night"
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          // checked={input.night}
                          onChange={(event) => handleChange(index, event)}
                          disabled={isSubmitted}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="text"
                          name="quantity"
                          className="input input-bordered w-5/6 px-4 py-2 text-lg rounded-md border-gray-300 shadow-md"
                          value={input.quantity}
                          onChange={(event) => handleFormChange(index, event)}
                          disabled={isSubmitted}
                          required
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
              <button
                type="button"
                onClick={addFields}
                disabled={isSubmitted}
                className="btn  bg-red-300 text-black px-5 py-2 rounded-md mt-4"
              >
                Add More Medicine
              </button>
            </div>

            <div className="flex justify-center space-x-6 mt-12">
              <input
                type="submit"
                value="Add Prescription"
                className="btn bg-green-300 text-black px-6 py-3 rounded-md shadow-md"
                disabled={isSubmitted}
              />
              <PDFDownloadLink
                document={
                  <PrescriptionPDF
                    users={users}
                    inputFields={inputFields}
                    inputFields1={inputFields1}
                    inputFields2={inputFields2}
                    inputFields3={inputFields3}
                  />
                }
                fileName="prescription.pdf"
              >
                {/* {({ loading }) =>
                  loading ? (
                    <button
                      type="button"
                      value="Print Prescription"
                      className="btn bg-red-300 text-black px-6 py-3 rounded-md shadow-md"
                      disabled={!isSubmitted}
                    >
                      Loading PDF...
                    </button>
                  ) : (
                    <input
                      type="button"
                      value="Print Prescription"
                      className="btn bg-red-300 text-black px-6 py-3 rounded-md shadow-md"
                      disabled={!isSubmitted}
                    />
                  )
                } */}
                   <input
                      type="button"
                      value="Print Prescription"
                      className="btn bg-red-300 text-black px-6 py-3 rounded-md shadow-md"
                      disabled={!isSubmitted}
                    />
              </PDFDownloadLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
