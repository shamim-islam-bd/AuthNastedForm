import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormController from "../components/FormController";
import { SuccessMessage } from "../components/Success";

export default function DataFrom({ user }) {
  const { control, setValue, handleSubmit, register, reset } = useForm();
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({});
  const [Nameerror, setNameError] = useState("");
  const [Sectorerror, setSectorError] = useState("");
  const [Checkboxerror, setCheckboxError] = useState("");
  const [success, setSuccess] = useState("");
  // const [fillForm, setFillForm] = useState({});

  const sectorChange = (e) => {
    setValue("sector", e.target.value);
  };
  const nameChange = (e) => {
    setValue("name", e.target.value);
  };

  const refillForm = () => {
    if (formData) {
      reset({
        name: formData?.name,
        sector: formData?.sector,
        checkbox: formData?.checkbox,
      });
    }
  };

  useEffect(() => {
    axios
      .get("https://authnastedformapi.onrender.com/getdata")
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // getting formdata from server
  useEffect(() => {
    axios
      .get("https://authnastedformapi.onrender.com/getformdata")
      .then((response) => {
        setFormData(response.data);
        response?.data?.map((data) => {
          if (data.user === user._id) {
            setFormData(data);
            // console.log("fillForm: ", data);
          }
        });
      })
      .catch((error) => {
        setError(error.response.data);
        console.log(error);
      });
  }, []);

  // console.log("fillForm: ", fillForm);

  const onSubmit = (data) => {
    // console.log(data);
    if (data.name === "") {
      return setNameError("Name is required");
    }
    if (data.sector === "") {
      return setSectorError("Sector is required");
    }
    if (data.checkbox === false) {
      return setCheckboxError("Checkbox is required");
    }
    axios
      .put(`https://authnastedformapi.onrender.com/postdata`, data)
      .then((response) => {
        // empty error fields
        setNameError("");
        setSectorError("");
        setCheckboxError("");
        setFormData(response.data);
        console.log(response.data);
        setSuccess("Data saved successfully");
      })
      .catch((error) => {
        // setError(error.response.data);
        console.log(error.message);
      });
  };

  return (
    <div className="centered mt-5 rounded">
      {success && <SuccessMessage data={success} onClose={() => close} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="p">
          Please enter your name and pick the Sectors you are currently.
        </p>
        <br />
        <div className="form-group">
          <label htmlFor="name" className="text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            {...register("name")}
            onChange={nameChange}
            className={`form-control ${Nameerror ? "is-invalid" : ""}`}
          />
          {Nameerror && (
            <div className="invalid-feedback">Please enter your name</div>
          )}
        </div>
        <br />
        <span className="span mb-3" htmlFor="Sectors">
          Sectors :
        </span>
        <br />
        <div className="form-group">
          <FormController
            name="sector"
            Sectorerror={Sectorerror}
            sectorChange={sectorChange}
            control={control}
            formData={formData}
            options={options}
            register={register}
          />
        </div>
        <div className="form-check mt-2">
          <input
            {...register("checkbox")}
            type="checkbox"
            // onClick={checkboxChange}
            value={formData?.checkbox}
            // value={formData?.checkbox}
            className="form-check-input"
            id="exampleCheck1"
          />{" "}
          <span>Agree to terms and conditions</span>
          {Checkboxerror && (
            <div className="invalid-feedback">Please agreed.</div>
          )}
        </div>
        <br />
        <div className="flex">
          <input type="submit" value="Save" /> -
          <button onClick={() => refillForm()}>Refill & Update</button>
        </div>
      </form>
    </div>
  );
}
