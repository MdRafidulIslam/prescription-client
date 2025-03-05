import React, { useState } from "react";
import Swal from "sweetalert2";

const Home = () => {
  const [inputFields, setInputFields] = useState([{ name: "" }]);

  const [formData, setFormData] = useState({
    name: "",
    uname: "",
    designation: "",
    age: "",
    _id: "" 
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = { name: "" };

    setInputFields([...inputFields, newfield]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.patientname.value;
    const uname = form.uname.value;
    const designation = form.designation.value;
    const age = form.age.value;

    const addUser = { name, uname, designation, age };
    console.log(inputFields,addUser);
    fetch('http://localhost:5000/addprescription',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({addUser,inputFields})
    })
    .then(res=>res.json())
    .then(data=>{

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
    })

  };
  return (
    <div className="bg-slate-200 p-20">
      <form onSubmit={handleSubmit}>
        {/* {unit name and date row} */}
        <div className="md:flex ">
          <div className="form-control md:w-1/2 ml-36">
            <div className="label">
              <span className="label-text text-blue-500">Unit Name :</span>
            </div>

            <input
              type="text"
              name="uname"
              placeholder="enter unit name"
              className="input input-bordered input-primary text-xl text-blue-500 input-sm w-full max-w-xs"
              value={formData.uname}
              onChange={(e) => setFormData({ ...formData, uname: e.target.value })}
              disabled={isSubmitted}
            />
          </div>
          <div className="form-control md:w-1/2">
            <div className="label">
              <span className="label-text text-blue-500">Id No :</span>
            </div>

            <input
              type="text"
              name="id"
              placeholder="generated id no"
              className="input input-bordered input-primary text-xl text-blue-500 input-sm w-full max-w-xs"
              value={formData._id || ""}
              disabled
            />
          </div>
        </div>
        {/* {name and age row} */}
        <div className="md:flex ">
          <div className="form-control md:w-1/2 ml-36">
            <div className="label">
              <span className="label-text text-blue-500">Name :</span>
            </div>

            <input
              type="text"
              name="patientname"
              placeholder="enter name"
              className="input input-bordered input-primary text-blue-500 text-xl input-sm w-full max-w-xs"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isSubmitted}
            />
          </div>
          <div className="form-control md:w-1/2">
            <div className="label">
              <span className="label-text text-blue-500">Age :</span>
            </div>

            <input
              type="number"
              name="age"
              placeholder="enter age"
              className="input input-bordered input-primary text-blue-500 text-xl input-sm w-full max-w-xs"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              disabled={isSubmitted}
            />
          </div>
        </div>
        {/* {designation and id no row} */}
        <div className="md:flex ">
          <div className="form-control md:w-1/2 ml-36">
            <div className="label">
              <span className="label-text text-blue-500">Designation :</span>
            </div>

            <input
              type="text"
              name="designation"
              placeholder="enter designation"
              className="input input-bordered input-primary text-blue-500 text-xl input-sm w-full max-w-xs"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              disabled={isSubmitted}
            />
          </div>
         
        </div>
      
        <div className="divider divider-primary w-full mt-10"></div>
        <div className="my-8 text-center">
          <h2 className="text-4xl text-blue-500">Please Fill The Medicine Field...</h2>
        </div>
        <div className="mt-10 text-center">
          {inputFields.map((input, index) => {
            return (
              <div key={index}>
                <input
                  name="name"
                  placeholder="enter the medicine"
                  className="input input-bordered input-primary text-xl text-blue-500 input-sm w-full max-w-xs mb-6"
                  value={input.name}
                  onChange={(event) => handleFormChange(index, event)}
                  disabled={isSubmitted}

                  
                />
              </div>
            );
          })}
          <button type="button"  onClick={addFields} disabled={isSubmitted} className="btn btn-info btn-sm">
            Add More Medicine
          </button>
        </div>
        <div className="flex items-center justify-center mt-12 ml-[600px]">
          <input
            type="submit"
            value="Add Prescription"
            className="btn btn-info btn-md  text-white p-2 mr-10"
          />
            <input
            type="button"
            value="Print Prescription"
            className="btn btn-success btn-md  text-white p-2 "
          />
        </div>
      </form>

     
    </div>
  );
};

export default Home;
