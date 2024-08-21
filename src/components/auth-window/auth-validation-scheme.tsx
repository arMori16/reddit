import * as yup from 'yup'

export const signupScheme = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password:yup.string().min(6,'Password too short').max(50,'Password too long').required('Password is required'),
    firstName:yup.string()
})