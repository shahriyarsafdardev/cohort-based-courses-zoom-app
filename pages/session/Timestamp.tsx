import React, { useState } from 'react'
import { TimeStampType } from '../../utils/types/user'
import { Box, Typography, Stack, Button, TextField } from '@material-ui/core'
import axios from '../../utils/axios'
import { styled } from '@material-ui/core/styles'
import ConfirmationAlert from './ConfirmationAlert'
import { makeStyles } from '@material-ui/styles'

const StyledIcon = styled('img')(() => ({
  width: 24,
  height: 24,
  position: 'absolute',
  top: '5px',
  right: '5px',
  cursor: 'pointer'
}))

const useStyles = makeStyles((theme) => ({
  input: {
    background: '#FFFFFF'
  }
}))

function TimeStamp({
  timeStamp,
  updateTimestamps,
  setActiveSession,
  deleteTimestamp,
  addAnimation
}: {
  timeStamp?: TimeStampType
  updateTimestamps: Function
  setActiveSession: Function
  deleteTimestamp: Function
  addAnimation: boolean
}) {
  const [updateDescription, setUpdateDescription] = useState(false)
  const [description, setDescription] = useState<string>(
    timeStamp?.description || ''
  )
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  function secondsToHms(d: any) {
    const secs = Number(d)

    const h = Math.floor(secs / 3600)
    let result = ''

    if (h > 0) {
      result = new Date(secs * 1000).toISOString().slice(11, 19)
    } else {
      result = new Date(secs * 1000).toISOString().slice(14, 19)
    }

    return result
  }

  const handleSubmit = () => {
    setUpdateDescription(!updateDescription)
    if (updateDescription) {
      axios
        .post(`/session_timestamps/${timeStamp?.id}/update_timestamp.json`, {
          description: description
        })
        .then((res) => {
          updateTimestamps(res.data)
        })
    }
  }

  const handleDelete = () => {
    axios
      .delete(`/session_timestamps/${timeStamp?.id}/remove_timestamp.json`)
      .then((res) => {
        deleteTimestamp(timeStamp?.id)
      })
  }

  return (
    <Box
      style={{
        padding: '24px',
        margin: '16px',
        border: '1px solid #C4CDD5',
        background: '#F9FAFB',
        borderRadius: '8px',
        width: '100%',
        position: 'relative'
      }}
      className={addAnimation ? 'animation-slideDown' : ''}
    >
      <StyledIcon
        onClick={() => {
          setOpen(true)
        }}
        src="/cross.svg"
      />
      <ConfirmationAlert
        title=""
        open={open}
        alertText="Are you sure you want to delete this timestamp?"
        onCancel={() => {
          setOpen(false)
        }}
        onConfirm={() => handleDelete()}
      />
      <Stack direction="column" spacing={1.5}>
        {updateDescription ? (
          <>
            <Typography
              style={{ color: '#454F5B', fontSize: '14px', fontWeight: 'bold' }}
            >
              {secondsToHms(timeStamp?.timestamp || 0)}
            </Typography>
            <TextField
              id="outlined-multiline-static"
              placeholder="Add a description here to help you remember what this timestamp refers to..."
              multiline
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={description}
              InputProps={{ className: classes.input }}
            />
          </>
        ) : (
          <Typography style={{ color: '#454F5B', fontSize: '14px' }}>
            <span style={{ fontWeight: 'bold' }}>
              {secondsToHms(timeStamp?.timestamp || 0)}
            </span>
            {` | ${timeStamp?.description || 'New Timestamp'}`}
          </Typography>
        )}
        <Button
          onClick={handleSubmit}
          variant="outlined"
          style={{
            borderRadius: '20px',
            color: '#475569',
            textTransform: 'none'
          }}
          fullWidth
        >
          {updateDescription
            ? 'Save description'
            : !timeStamp?.description
            ? 'Add description'
            : 'Edit description'}
        </Button>
      </Stack>
    </Box>
  )
}

export default TimeStamp
