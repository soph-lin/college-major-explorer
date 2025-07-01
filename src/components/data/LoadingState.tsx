import { Box, CircularProgress, Typography } from '@mui/material'
import { Loader2 } from 'lucide-react'

interface LoadingStateProps {
  message?: string
}

export default function LoadingState({
  message = 'Loading data...',
}: LoadingStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        py: 8,
      }}
    >
      <CircularProgress size={60} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h6" color="text.secondary">
          {message}
        </Typography>
      </Box>
    </Box>
  )
}
