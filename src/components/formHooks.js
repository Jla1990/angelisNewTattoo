import { useState, useReducer } from 'React'

/**
 * @title : Form State Management
 * @desc  : In house state management for
 *          1) Input fields on a form
 *          2) Lists
 *          3) Pagination
            All three are used for the Manual Fill Order

            Pass in validation for on-the-fly evaluation of inputs
 */

export function useFormState(initialValue, validation = null, required = true) {
    let [value, setValue] = useState(initialValue)
    let [touched, setTouched] = useState(0)
    let [error, setError] = useState(null) 
    

    function handleChange(e) {
        if (e.target.type === 'checkbox') {
            setValue(e.target.checked)
        } else {
            setValue(e.target.value)
        }
        setTouched(1)
    }

    function override(e) {
        setValue(e)
    }

    function handleBlur(e) {
        const input = e.target.value
        const hasError = input.length > 0 && validation && !validation.fn(input)
        if (input.length === 0 && required) {
            setError('This field is required')
        } else if (hasError) {
            setError(validation.error)
        } else {
            setError(null)
        }
        setValue(input)
        setTouched(1)
    }

    return {
        input: {
            value: value,
            onChange: true ? handleChange : undefined,
            onBlur: handleBlur
        },
        touched,
        error,
        required,
        override
    }
}