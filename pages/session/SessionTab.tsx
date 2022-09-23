import {
  Stack,
  Button,
  Typography,
  Box,
  CircularProgress,
  Theme,
} from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect, useRef } from 'react'
import TimeStamp from './Timestamp'
import { TimeStampType, ActiveSession } from '../../utils/types/user'
import axios from '../../utils/axios'

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#101658',
  borderRadius: '20px',
  width: '90%',
  fontSize: '14px',
  textTransform: 'none',
  margin: 0,
  '&:hover': { backgroundColor: '#101658' },
}))

const StyledPage = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
}))

const StyledStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '25px',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '50%',
  },
}))

const useStyles = makeStyles((theme: Theme) => ({
  buttonSubmitted: {
    backgroundColor: '#147A16 !important',
  },
  buttonSubmit: {
    backgroundColor: '#101658 !important',
  },
}))

function SessionTab() {
  const [activeSession, setActiveSession] = useState<ActiveSession>()
  const [sessionTimestamps, setSessionTimestamps] = useState<TimeStampType[]>(
    []
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const classes = useStyles()
  const first = useRef(false)

  const handleAddTimestamp = () => {
    first.current = true
    setIsSubmitting(true)
    try {
      axios
        .post('/session_timestamps/add_timestamp.json', {
          session_id: activeSession?.id,
          session_time: activeSession?.session_time,
        })
        .then(
          (response) => {
            setSessionTimestamps([
              response.data.timestamp,
              ...sessionTimestamps,
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
      {activeSession && activeSession.id ? (
        <>
          <StyledStack
            spacing={2}
            sx={{
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.08)',
              padding: '25px',
              background: '#ffffff',
              zIndex: '2',
            }}
          >
            <Stack direction="column" spacing={2} alignItems="center">
              <img src="/sphere_blue.svg" alt="logo" width="140" />
              <Typography
                style={{
                  textAlign: 'center',
                  margin: '32px 0px',
                  color: '#333333',
                }}
              >
                Timestamps allow you to easily save points in your sessions so
                that you can review them later!
              </Typography>
              <StyledButton
                variant="contained"
                onClick={handleAddTimestamp}
                className={
                  isSubmitting ? classes.buttonSubmitted : classes.buttonSubmit
                }
              >
                {isSubmitting ? 'Timestamp saved!' : 'Save Timestamp'}
              </StyledButton>
            </Stack>
            {sessionTimestamps.length > 0 && (
              <>
                <Box
                  style={{
                    borderTop: '2px solid #E2E8F0',
                    borderRadius: '20px',
                    width: '300px',
                    height: '0px',
                  }}
                />
                <Typography style={{ color: '#334155', fontWeight: 'bold' }}>
                  Saved Timestamps
                </Typography>
              </>
            )}
          </StyledStack>
          <StyledStack
            spacing={2}
            key={sessionTimestamps?.length}
            sx={{ height: '100vh', overflowY: 'scroll' }}
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
          </StyledStack>
        </>
      ) : (
        <Typography
          style={{ color: '#334155', fontWeight: 'bold', margin: 'auto' }}
        >
          No sessions live at the moment
        </Typography>
      )}
    </StyledPage>
  )
}

export default SessionTab
