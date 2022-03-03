import {Field} from 'formik'
import {DateInput} from 'semantic-ui-calendar-react'
import {formatDate, stringToDate} from '../../utils/date-format'

function FormikDate({label, name, ...props}) {
  return (
    <>
      <label htmlFor={name} className="font-normal text-labelColor text-base">
        {label}
      </label>
      <Field name={name}>
        {({form, field}) => {
          const {setFieldTouched, setFieldValue, errors, touched} = form
          const {value} = field
          return (
            <DateInput
              id={name}
              closable
              {...field}
              {...props}
              value={formatDate(value)}
              iconPosition="left"
              className="mt-2"
              onBlur={() => setFieldTouched(name, true)}
              onChange={(e, {value}) =>
                setFieldValue(name, stringToDate(value))
              }
              error={touched[name] && errors[name]}
            />
          )
        }}
      </Field>
    </>
  )
}

export default FormikDate
