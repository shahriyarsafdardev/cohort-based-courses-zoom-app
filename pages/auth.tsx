import React from 'react'
import { useRouter } from 'next/router'
import { Button, Stack, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { styled } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  mainComponent: {
    height: '100vh',
    width: '100%',
    background: 'linear-gradient(163.43deg, #9E5AD7 11.47%, #29064C 91.06%)',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  learnMoreButton: {
    backgroundColor: 'rgba(16, 22, 88, 0.3)',
    color: '#ffffff',
    textTransform: 'none',
    height: '48px',
    borderRadius: '50px',
    borderColor: '#ffffff',
    fontSize: '16px',
    '&:hover': {
      borderColor: '#ffffff'
    }
  }
}))

const MainHeading = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  fontWeight: 700,
  color: '#FFFFFF',
  lineHeight: '54px'
}))

const MainDescription = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 400,
  color: '#FFFFFF',
  lineHeight: '27px'
}))

const StyledImage = styled('img')(({ theme }) => ({
  maxHeight: '90%',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: '60%'
  }
}))

const RightPanel = styled(Box)(({ theme }) => ({
  width: '70%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}))

const RightPanelContent = styled(Stack)(({ theme }) => ({
  width: '60%',
  [theme.breakpoints.down('md')]: {
    width: '80%'
  },
  [theme.breakpoints.up(2000)]: {
    width: '577px'
  }
}))

function Auth() {
  const router = useRouter()
  const classes = useStyles()

  const code = router.query['code']

  return (
    <Stack className={classes.mainComponent} direction="row">
      <StyledImage src="/success-sidebar.png" />
      <RightPanel>
        <RightPanelContent spacing={5}>
          <Stack spacing={2}>
            <MainHeading>
              Congratulations, you have installed the Sphere Zoom App!
            </MainHeading>
            <MainDescription>
              Prepare for your next Sphere live session by learning how to use
              the app to save timestamps and notes.
            </MainDescription>
          </Stack>
          <Button
            variant="outlined"
            className={classes.learnMoreButton}
            onClick={() =>
              window.open(
                'https://drive.google.com/file/d/1pNXGlh2UOy_0y-t6N6upyRz_fQoHPwjO/view?usp=sharing',
                '_blank'
              )
            }
          >
            Learn More
          </Button>
        </RightPanelContent>
      </RightPanel>
    </Stack>
  )
}

export default Auth
