import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Tooltip
} from '@mui/material';
import {
  Description,
  Download,
  AttachFile
} from '@mui/icons-material';

interface DocumentsListProps {
  data: {
    ProcessoAdministrativo?: string;
    NumeroContrato?: string;
    VeiculoComunicacao?: string;
  }
}

export function DocumentsList({ data }: DocumentsListProps) {
  const handleDownload = (documentName: string) => {
    // Implementar lógica de download
    console.log(`Downloading ${documentName}`);
  };

  const documents = [
    {
      name: 'Processo Administrativo',
      number: data.ProcessoAdministrativo,
      type: 'PDF'
    },
    {
      name: 'Contrato',
      number: data.NumeroContrato,
      type: 'PDF'
    },
    {
      name: 'Publicação',
      number: data.VeiculoComunicacao,
      type: 'PDF'
    }
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Documentos
      </Typography>
      <List>
        {documents.map((doc, index) => (
          <div key={index}>
            <ListItem>
              <ListItemIcon>
                {doc.type === 'PDF' ? <Description /> : <AttachFile />}
              </ListItemIcon>
              <ListItemText
                primary={doc.name}
                secondary={`Nº ${doc.number || 'Não disponível'}`}
              />
              <ListItemSecondaryAction>
                <Tooltip title={doc.number ? 'Download' : 'Documento não disponível'}>
                  <span>
                    <IconButton 
                      edge="end" 
                      disabled={!doc.number}
                      onClick={() => handleDownload(doc.name)}
                    >
                      <Download />
                    </IconButton>
                  </span>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            {index < documents.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </Paper>
  );
}
