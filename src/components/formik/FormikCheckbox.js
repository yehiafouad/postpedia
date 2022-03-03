import React from 'react'
import {Field} from 'formik'
import {Form} from 'semantic-ui-react'

function FormikCheckbox({label, name, className, ...props}) {
  return (
    <>
      <Field name={name}>
        {({form, field}) => {
          const {errors, touched} = form
          return (
            <Form.Checkbox
              id={name}
              {...field}
              {...props}
              label={
                <label
                  htmlFor={name}
                  className="text-base text-labelColor font-normal"
                >
                  <p className="ml-1">{label}</p>
                </label>
              }
              className={`block ${className}`}
              error={touched[name] && errors[name]}
            />
          )
        }}
      </Field>
    </>
  )
}

export default FormikCheckbox
