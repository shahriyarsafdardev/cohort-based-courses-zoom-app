import React from 'react'
import { TimeStampType } from '../utils/types/user'
import { Box, Typography, Stack, Button } from '@material-ui/core'

function TimeStamp({ timeStamp }: { timeStamp?: TimeStampType }) {
  return (
    <Box style={{ padding: '24px', margin: '16px', border: '1px solid #C4CDD5', background: '#F9FAFB', borderRadius: '8px' }}>
      <Stack direction="column" spacing={1}>
        <Typography style={{ color: '#454F5B', fontSize: '14px' }}>12:20 | This could potentially be really interesting for my team. We apply this is a different context but I wonder if it would be valuable. This also makes me think of the google case study which I link to later.</Typography>
        <Button variant="outlined" style={{ borderRadius: '20px', color: '#475569' }} fullWidth>Edit Description</Button>
      </Stack>
    </Box>
  )
}

export default TimeStamp