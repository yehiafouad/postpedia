import React from 'react'
import {Field} from 'formik'
import ReactCodeInput from 'react-code-input'

function FormikVerifyCode({label, name, className, ...props}) {
  const codeProps = {
    inputStyle: {
      margin: '4px',
      MozAppearance: 'textfield',
      width: '35px',
      borderRadius: '3px',
      fontSize: '35px',
      fontWeight: 'bold',
      height: '45px',
      textAlign: 'center',
      paddingLeft: '7px',
      backgroundColor: '#f2421b',
      color: '#f2421b',
      padding: '4px',
      border: '1px solid #f2421b',
    },
    inputStyleInvalid: {
      fontFamily: 'monospace',
      margin: '4px',
      MozAppearance: 'textfield',
      width: '15px',
      borderRadius: '3px',
      fontSize: '14px',
      height: '26px',
      paddingLeft: '7px',
      backgroundColor: 'black',
      color: '#f2421b',
      border: '1px solid #f2421b',
    },
  }
  return (
    <>
      <Field name={name}>
        {({form, field}) => {
          const {errors, touched, setFieldValue} = form
          return (
            <ReactCodeInput
              type="number"
              className={`text-center w-100 ${className}`}
              fields={6}
              id={name}
              {...field}
              {...codeProps}
              {...props}
              onChange={value => {
                setFieldValue(name, value)
              }}
            />
          )
        }}
      </Field>
    </>
  )
}

export default FormikVerifyCode
