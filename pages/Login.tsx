import * as Yup from 'yup'
import { useState } from 'react'
import { useFormik, Form, FormikProvider } from 'formik'
import { styled } from '@material-ui/core/styles'
import { Icon } from '@iconify/react'
import eyeFill from '@iconify/icons-eva/eye-fill'
import eyeOffFill from '@iconify/icons-eva/eye-off-fill'
// material
import {
  Stack,
  Alert,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Typography,
  Box
} from '@material-ui/core'
import { LoadingButton } from '@material-ui/lab'
import useAuth from '../utils/hooks/useAuth'
import useIsMountedRef from '../utils/hooks/useIsMountedRef'
import Head from 'next/head'
// ----------------------------------------------------------------------
type InitialValues = {
  email: string
  password: string
  remember: boolean
  afterSubmit?: string
}

const StyledLogin = styled(Form)(({ theme }) => ({
  width: '100%',
  maxWidth: '280px'
}))

export default function LoginForm() {
  const { login } = useAuth()
  const isMountedRef = useIsMountedRef()
  const [showPassword, setShowPassword] = useState(false)
  const [color, setColor] = useState<any>('error')

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required')
  })

  const formik = useFormik<InitialValues>({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      setSubmitting(true)
      try {
        await login(values.email, values.password).then((res: any) => {
          console.log(res)
        })
        if (isMountedRef.current) {
          setSubmitting(false)
        }
      } catch (error: any) {
        console.error(error)
        values.password = ''
        if (isMountedRef.current) {
          setSubmitting(false)
          setErrors({ afterSubmit: error.message })
        }
        if (error.color) {
          setColor(error.color)
        }
      }
    }
  })

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik

  const handleShowPassword = () => {
    setShowPassword((show) => !show)
  }

  return (
    <>
      <Head>
        <title>Sphere | Login</title>
      </Head>
      <FormikProvider value={formik}>
        <Box style={{ position: 'absolute', top: '20px' }}>
          <img src="/sphere_blue.svg" alt="logo" width="140" />
        </Box>
        <StyledLogin autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography
            style={{
              color: '#000000',
              fontWeight: 600,
              marginBottom: '20px',
              fontSize: '18px'
            }}
          >
            Log in to your Sphere account
          </Typography>
          <Stack spacing={3}>
            {errors.afterSubmit && (
              <Alert severity={color}>{errors.afterSubmit}</Alert>
            )}

            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              inputProps={{
                form: {
                  autocomplete: 'off'
                }
              }}
              sx={{
                background: '#ffffff !important',
                '& input:-webkit-autofill': {
                  backgroundColor: 'white !important',
                  color: '#475569 !important'
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px'
                }
              }}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              inputProps={{
                'data-testid': 'password',
                endadornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                background: '#ffffff !important',
                '& input:-webkit-autofill': {
                  backgroundColor: 'white !important',
                  color: '#475569 !important'
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px'
                }
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FormControlLabel
              sx={{
                '& .MuiFormControlLabel-label': {
                  color: '#475569 !important'
                }
              }}
              control={
                <Checkbox
                  {...getFieldProps('remember')}
                  checked={values.remember}
                  sx={{ color: '#637381 !important' }}
                />
              }
              label="Remember me"
            />
          </Stack>

          <LoadingButton
            data-testid="loginBtn"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            style={{ backgroundColor: '#101658', borderRadius: '20px' }}
          >
            Login
          </LoadingButton>
        </StyledLogin>
      </FormikProvider>
    </>
  )
}
