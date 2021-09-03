import React, { useEffect, useState } from "react";
import { Typography, FormGroup, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { userService, alertService } from "../../_services";

function AddEdit({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;

  // form validation rules
  const validationSchema = Yup.object().shape({
    label: Yup.string().required("Lable is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    number: Yup.string().required("Serial number is required"),
    password: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .concat(isAddMode ? Yup.string().required("Password is required") : null)
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .when("password", (password, schema) => {
        if (password || isAddMode)
          return schema.required("Confirm Password is required");
      })
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  // functions to build form returned by useForm() hook
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    errors,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  function onSubmit(data) {
    return isAddMode ? createUser(data) : updateUser(id, data);
  }

  function createUser(data) {
    return userService
      .create(data)
      .then(() => {
        alertService.success("OLT added", { keepAfterRouteChange: true });
        history.push(".");
      })
      .catch(alertService.error);
  }

  function updateUser(id, data) {
    return userService
      .update(id, data)
      .then(() => {
        alertService.success("OLT updated", { keepAfterRouteChange: true });
        history.push("..");
      })
      .catch(alertService.error);
  }

  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isAddMode) {
      // get user and set form fields
      userService.getById(id).then((user) => {
        const fields = ["label", "firstName", "lastName", "email", "number"];
        fields.forEach((field) => setValue(field, user[field]));
        setUser(user);
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <Typography variant="h3">{isAddMode ? "Add OLT" : "Edit OLT"}</Typography>

      <FormGroup>
        <label>OLT's Label</label>
        <input
          name="label"
          type="text"
          ref={register}
          className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
        />
        <Box className="invalid-feedback">{errors.label?.message}</Box>
      </FormGroup>
      <FormGroup>
        <label>Owner First Name</label>
        <input
          name="firstName"
          type="text"
          ref={register}
          className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
        />
        <Box className="invalid-feedback">{errors.firstName?.message}</Box>
      </FormGroup>
      <FormGroup>
        <label>Owner Last Name</label>
        <input
          name="lastName"
          type="text"
          ref={register}
          className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
        />
        <Box className="invalid-feedback">{errors.lastName?.message}</Box>
      </FormGroup>

      <Box className="form-row">
        <FormGroup>
          <label>Owner Email</label>
          <input
            name="email"
            type="text"
            ref={register}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <Box className="invalid-feedback">{errors.email?.message}</Box>
        </FormGroup>
        <FormGroup>
          <label>Owner Serial Number</label>
          <input
            name="number"
            type="text"
            ref={register}
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
          />
          <Box className="invalid-feedback">{errors.number?.message}</Box>
        </FormGroup>
      </Box>
      {!isAddMode && (
        <Box>
          <Typography variant="h4" className="pt-3">
            Change Password
          </Typography>
          <Typography>Leave blank to keep the same password</Typography>
        </Box>
      )}
      <Box className="form-row">
        <FormGroup>
          <label>
            Password
            {!isAddMode &&
              (!showPassword ? (
                <Box>
                  {" "}
                  -{" "}
                  <a
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-primary"
                  >
                    Show
                  </a>
                </Box>
              ) : (
                <em> - {user.password}</em>
              ))}
          </label>
          <input
            name="password"
            type="password"
            ref={register}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <Box className="invalid-feedback">{errors.password?.message}</Box>
        </FormGroup>
        <FormGroup>
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            ref={register}
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
          />
          <Box className="invalid-feedback">
            {errors.confirmPassword?.message}
          </Box>
        </FormGroup>
      </Box>
      <FormGroup>
        <Button
          style={{ width: "6rem", margin: "1rem 0 0.5rem" }}
          type="submit"
          disabled={formState.isSubmitting}
          variant="contained"
          color="primary"
        >
          {formState.isSubmitting && (
            <Box className="spinner-border spinner-border-sm"></Box>
          )}
          Save
        </Button>
        <Link to={isAddMode ? "." : ".."}>
          <Button
            style={{ width: "6rem" }}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
        </Link>
      </FormGroup>
    </form>
  );
}

export { AddEdit };
