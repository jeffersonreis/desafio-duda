import { 
  Paper, 
  Typography,
} from '@mui/material';

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab';
// import { TimelineItem } from '@mui/lab';

import {
  CheckCircle,
  Assignment,
  AttachMoney,
  Description
} from '@mui/icons-material';

interface ProcessTimelineProps {
  data: {
    DataAto?: string;
    DataAprovacao?: string;
    DataPublicacao?: string;
    DataAssinaturaContrato?: string;
    DataSituacao?: string;
    Situacao?: string;
  }
}

export function ProcessTimeline({ data }: ProcessTimelineProps) {
  const timelineItems = [
    {
      date: data.DataAto || data.DataAprovacao,
      title: 'Início do Processo',
      icon: <Assignment />,
      color: 'primary'
    },
    {
      date: data.DataPublicacao,
      title: 'Publicação',
      icon: <Description />,
      color: 'info'
    },
    {
      date: data.DataAssinaturaContrato,
      title: 'Assinatura do Contrato',
      icon: <AttachMoney />,
      color: 'warning'
    },
    {
      date: data.DataSituacao,
      title: data.Situacao || 'Finalizado',
      icon: <CheckCircle />,
      color: 'success'
    }
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Timeline do Processo
      </Typography>
      <Timeline>
        {timelineItems.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color={item.color as any}>
                {item.icon}
              </TimelineDot>
              {index < timelineItems.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle2">
                {item.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.date ? new Date(item.date).toLocaleDateString() : 'Data não disponível'}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Paper>
  );
}
