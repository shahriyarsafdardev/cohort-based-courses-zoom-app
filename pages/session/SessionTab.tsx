import {
  Stack,
  Button,
  Typography,
  Box,
  CircularProgress,
  Theme
} from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect, useRef } from 'react'
import TimeStamp from './Timestamp'
import { TimeStampType, ActiveSession } from '../../utils/types/user'
import axios from '../../utils/axios'
import zoomSdk from '@zoom/appssdk'
import useAuth from '../../utils/hooks/useAuth'
import ConfirmationAlert from './ConfirmationAlert'

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#101658',
  borderRadius: '20px',
  width: '100%',
  fontSize: '14px',
  textTransform: 'none',
  margin: 0,
  '&:hover': { backgroundColor: '#101658' }
}))

const StyledPage = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
  width: '100%',
  overflowY: 'hidden'
}))

const StyledTimestampHeader = styled(Stack)(({ theme }) => ({
  width: '50%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}))

const NavHeading = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 500,
  color: '#101658',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px'
  }
}))

const TimestampDescription = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: '#333333',
  fontSize: '16px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px'
  }
}))

const StyledLogo = styled('img')(({ theme }) => ({
  width: '140',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))

const StyledTimestamps = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '25px',
  width: '100%',
  overflowX: 'hidden',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))

const StyledTimestampsMobile = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '25px',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}))

const SavedTimestamps = styled(Stack)(({ theme }) => ({
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.08)',
  background: '#ffffff',
  zIndex: '2',
  height: '48px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))

const StyledContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  position: 'relative',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row'
  }
}))

const TopHeader = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  height: '48px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.08)',
  background: '#ffffff',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '15px',
  alignItems: 'center'
}))

const StyledBox = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}))

const useStyles = makeStyles((theme: Theme) => ({
  buttonSubmitted: {
    backgroundColor: '#147A16 !important'
  },
  buttonSubmit: {
    backgroundColor: '#101658 !important'
  }
}))

function SessionTab() {
  const [activeSession, setActiveSession] = useState<ActiveSession>()
  const [sessionTimestamps, setSessionTimestamps] = useState<TimeStampType[]>(
    []
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const classes = useStyles()
  const first = useRef(false)
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const configureApp = async () => {
    const res = await zoomSdk.config({
      popoutSize: { width: 480, height: 360 },
      capabilities: ['getRunningContext']
    })
    const context = await zoomSdk.getRunningContext()
  }

  const StyledStack = styled(Stack)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '25px',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '288px',
      justifyContent: `${sessionTimestamps.length > 0 ? 'flex-end' : 'center'}`
    }
  }))

  useEffect(() => {
    configureApp()
  }, [])

  const handleAddTimestamp = () => {
    first.current = true
    setIsSubmitting(true)
    try {
      axios
        .post('/session_timestamps/add_timestamp.json', {
          session_id: activeSession?.id,
          session_time: activeSession?.session_time
        })
        .then(
          (response) => {
            setSessionTimestamps([
              response.data.timestamp,
              ...sessionTimestamps
            ])
          },
          (error) => {
            console.log(error)
          }
        )
    } catch (e) {
      console.log(e)
    }
    setTimeout(() => {
      setIsSubmitting(false)
    }, 1000)
  }

  const handleUpdateTimestamp = (res: TimeStampType) => {
    const index = sessionTimestamps.findIndex(
      (timestamp) => timestamp.id === res.id
    )
    if (index > -1) {
      const updatedTimestamp = [...sessionTimestamps]
      updatedTimestamp[index] = res
      setSessionTimestamps(updatedTimestamp)
    }
  }

  const handleDeleteTimestamp = (id: string) => {
    first.current = false
    const index = sessionTimestamps.findIndex(
      (timestamp) => timestamp.id === id
    )
    if (index > -1) {
      const updatedTimestamp = [...sessionTimestamps]
      const updatedTimestamps = updatedTimestamp.filter(
        (timestamp) => timestamp.id !== id
      )
      setSessionTimestamps(updatedTimestamps)
    }
  }

  useEffect(() => {
    try {
      axios.get('/session_timestamps/active_session.json').then((res) => {
        setActiveSession(res.data?.active_session || [])
        setSessionTimestamps(res.data?.timestamps)
      })
    } catch (e) {
      console.log(e)
    }
  }, [])

  if (typeof activeSession === 'undefined') {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <StyledPage>
      <ConfirmationAlert
        title=""
        open={open}
        alertText="Are you sure you want to log out?"
        onCancel={() => {
          setOpen(false)
        }}
        onConfirm={() => logout()}
      />
      {activeSession && activeSession.id ? (
        <StyledContainer alignItems="center">
          <StyledStack
            spacing={2}
            sx={{
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.08)',
              padding: '0px 25px',
              background: '#ffffff',
              zIndex: '2',
              position: 'relative'
            }}
          >
            <TopHeader>
              <NavHeading>{user?.email}</NavHeading>
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => setOpen(true)}
              >
                <NavHeading
                  style={{ fontWeight: 'bold', textDecoration: 'underline' }}
                >
                  Logout
                </NavHeading>
                <img
                  src="/logout.svg"
                  alt="logout"
                  style={{ marginLeft: '5px' }}
                />
              </Box>
            </TopHeader>
            <StyledTimestampHeader
              direction="column"
              spacing={3}
              alignItems="center"
            >
              <StyledLogo src="/sphere_blue.svg" alt="logo" />
              <TimestampDescription>
                Timestamps allow you to easily save points in your sessions so
                that you can review them later!
              </TimestampDescription>
              <StyledButton
                variant="contained"
                onClick={handleAddTimestamp}
                className={
                  isSubmitting ? classes.buttonSubmitted : classes.buttonSubmit
                }
              >
                {isSubmitting ? 'Timestamp saved!' : 'Save Timestamp'}
              </StyledButton>
              {sessionTimestamps.length > 0 && (
                <StyledBox>
                  <Box
                    style={{
                      borderTop: '2px solid #E2E8F0',
                      borderRadius: '20px',
                      width: '300px',
                      height: '0px'
                    }}
                  />
                  <Typography
                    style={{
                      color: '#334155',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      margin: '16px 0px'
                    }}
                  >
                    Saved Timestamps
                  </Typography>
                </StyledBox>
              )}
            </StyledTimestampHeader>
          </StyledStack>
          <StyledTimestampsMobile
            spacing={2}
            key={sessionTimestamps?.length}
            sx={{ height: '69vh', overflowY: 'scroll' }}
          >
            {sessionTimestamps &&
              sessionTimestamps.map((timestamp, i) => {
                return (
                  <TimeStamp
                    timeStamp={timestamp}
                    key={timestamp?.id}
                    updateTimestamps={handleUpdateTimestamp}
                    setActiveSession={setActiveSession}
                    deleteTimestamp={handleDeleteTimestamp}
                    addAnimation={first.current && i === 0}
                  />
                )
              })}
          </StyledTimestampsMobile>
          <Box
            sx={{
              width: '100%'
            }}
          >
            <SavedTimestamps>
              <Typography style={{ color: '#334155', fontWeight: 'bold' }}>
                Saved Timestamps
              </Typography>
            </SavedTimestamps>

            <StyledTimestamps
              spacing={2}
              key={sessionTimestamps?.length}
              sx={{ height: '94vh', overflowY: 'scroll' }}
            >
              {sessionTimestamps &&
                sessionTimestamps.map((timestamp, i) => {
                  return (
                    <TimeStamp
                      timeStamp={timestamp}
                      key={timestamp?.id}
                      updateTimestamps={handleUpdateTimestamp}
                      setActiveSession={setActiveSession}
                      deleteTimestamp={handleDeleteTimestamp}
                      addAnimation={first.current && i === 0}
                    />
                  )
                })}
            </StyledTimestamps>
          </Box>
        </StyledContainer>
      ) : (
        <>
          <TopHeader>
            <NavHeading>{user?.email}</NavHeading>
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setOpen(true)}
            >
              <NavHeading
                style={{ fontWeight: 'bold', textDecoration: 'underline' }}
              >
                Logout
              </NavHeading>
              <img
                src="/logout.svg"
                alt="logout"
                style={{ marginLeft: '5px' }}
              />
            </Box>
          </TopHeader>
          <Typography
            style={{ color: '#334155', fontWeight: 'bold', margin: 'auto' }}
          >
            No sessions live at the moment
          </Typography>
        </>
      )}
    </StyledPage>
  )
}

export default SessionTab
