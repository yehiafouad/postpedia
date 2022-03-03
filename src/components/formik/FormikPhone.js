import React from "react";
import { Field } from "formik";
import IntlTelInput from "react-intl-tel-input/dist/components/IntlTelInput";
import "react-intl-tel-input/dist/main.css";

function FormikPhone({ label, name, className, containerClassName, ...props }) {
  return (
    <>
      <label htmlFor={name} className="font-normal text-base text-labelColor">
        {label}
      </label>
      <Field name={name}>
        {({ form, field }) => {
          const { errors, touched, setFieldValue } = form;
          return (
            <IntlTelInput
              containerClassName={`intl-tel-input w-100 main-font block mt-1 ${containerClassName}`}
              nationalMode={false}
              autoFocus={true}
              inputClassName={`ltr:pl-14 rtl:pl-0 rtl:pr-14 main-font ${className}`}
              id={name}
              {...field}
              {...props}
              error={touched[name] && errors[name]}
              onPhoneNumberChange={(isValid, phone, country) => {
                setFieldValue(name, phone.replace(" ", ""));
              }}
            />
          );
        }}
      </Field>
    </>
  );
}

export default FormikPhone;
