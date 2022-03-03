import {Field} from 'formik'
import moment from 'moment'
import {TimeInput} from 'semantic-ui-calendar-react'

function FormikTime({label, name, ...props}) {
  return (
    <>
      <label htmlFor={name} className="font-normal text-labelColor text-base">
        {label}
      </label>
      <Field name={name}>
        {({form, field}) => {
          const {setFieldValue, setFieldTouched, errors, touched} = form
          const {value} = field

          return (
            <TimeInput
              id={name}
              closable
              iconPosition="left"
              popupPosition="bottom left"
              timeFormat="AMPM"
              className="mt-2"
              {...field}
              {...props}
              // value={value}
              onBlur={() => setFieldTouched(name, true)}
              onChange={(e, {value}) =>
                setFieldValue(name, moment(value, 'hh:mm A').format())
              }
              error={touched[name] && errors[name]}
            />
          )
        }}
      </Field>
    </>
  )
}

export default FormikTime
