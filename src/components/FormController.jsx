import React from "react";
import { Controller } from "react-hook-form";

export default function FormController({
  formData,
  setFormData,
  options,
  control,
  register,
  sectorChange,
  Sectorerror,
}) {
  console.log("frm controller: ", formData.updateData);

  return (
    <div>
      <Controller
        name="sector"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <select
            {...register("sector")}
            {...field}
            onChange={sectorChange}
            // className="form-select mt-2"
            className={`form-control ${Sectorerror ? "is-invalid" : ""}`}
          >
            <option value="">Select Sector</option>
            {options?.map((option) => {
              return option.sector.map((Opt) => {
                // console.log(Opt);
                return (
                  <>
                    <option key={Opt._id} value={Opt?.value}>
                      {Opt.name}
                    </option>

                    {Opt?.subOptions?.map((subOption) => {
                      // console.log(subOption);
                      return (
                        <>
                          <option key={subOption._id} value={subOption?.value}>
                            &nbsp;&nbsp;&nbsp;&nbsp;{subOption.name}{" "}
                          </option>
                          {subOption?.subOptions2?.map((subOpt2) => {
                            // console.log(subOpt2);
                            return (
                              <option key={subOpt2._id} value={subOpt2?.value}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {subOpt2.name}
                              </option>
                            );
                          })}
                        </>
                      );
                    })}
                  </>
                );
              });
            })}
          </select>
        )}
      />
      {Sectorerror && (
        <div className="invalid-feedback">Please Select a Sector</div>
      )}
    </div>
  );
}
