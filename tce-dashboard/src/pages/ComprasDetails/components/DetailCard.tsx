import { Paper, Typography, Box, Divider } from '@mui/material';

interface DetailCardProps {
  title: string;
  content: Record<string, string | number | null>;
}

export function DetailCard({ title, content }: DetailCardProps) {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ my: 1 }} />
      {Object.entries(content).map(([key, value]) => (
        <Box key={key} sx={{ my: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {key}
          </Typography>
          <Typography variant="body2">
            {value || '-'}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
}
