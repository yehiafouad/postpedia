import React from 'react'
import {Field} from 'formik'
import {RegionDropdown} from 'react-country-region-selector'

function FormikCity({label, name, className, ...props}) {
  return (
    <>
      <label htmlFor={name} className="font-normal text-base text-labelColor">
        {label}
      </label>
      <Field name={name}>
        {({form, field}) => {
          const {errors, touched, setFieldValue} = form
          return (
            <RegionDropdown
              id={name}
              {...field}
              {...props}
              className={`block mt-1 ${className}`}
              error={touched[name] && errors[name]}
              onChange={val => setFieldValue(name, val)}
            />
          )
        }}
      </Field>
    </>
  )
}
export default FormikCity
