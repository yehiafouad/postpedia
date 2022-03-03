import React from 'react'
import {Field} from 'formik'
import {Form, Select} from 'semantic-ui-react'

function FormikSelect({
  name,
  className,
  onChangeCallback,
  onBlurCallback,
  ...props
}) {
  
  return (
    <>
      <Field name={name}>
        {({form, field}) => {
          const {errors, touched, setFieldValue, setFieldTouched} = form
          return (
            <Form.Field
              control={Select}
              id={name}
              {...field}
              {...props}
              className={`block ${className}`}
              onChange={(e, {value}) => {
                setFieldValue(name, value)
                onChangeCallback && onChangeCallback(value)
              }}
              onBlur={() => {
                setFieldTouched(name, true)
                onBlurCallback && onBlurCallback(form.values[name])
              }}
              error={touched[name] && errors[name]}
            />
          )
        }}
      </Field>
    </>
  )
}

export default FormikSelect
