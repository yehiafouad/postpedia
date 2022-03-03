import React from 'react'
import {Field} from 'formik'
import {Form} from 'semantic-ui-react'

function FormikTextArea({label, name, className, ...props}) {
  return (
    <>
      <label htmlFor={name} className="font-normal text-base text-labelColor">
        {label}
      </label>
      <Field name={name}>
        {({form, field}) => {
          const {errors, touched} = form
          return (
            <Form.TextArea
              id={name}
              {...field}
              {...props}
              className={`block mt-2 text-sm ${className}`}
              error={touched[name] && errors[name]}
            />
          )
        }}
      </Field>
    </>
  )
}

export default FormikTextArea
