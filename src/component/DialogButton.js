import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Typography } from '@mui/material';

function AlertDialog({ buttonName,Title, contentComponent: ContentComponent }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button sx={{ width: '200px'}} variant="outlined" onClick={handleClickOpen}>
        {buttonName}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
      >
        <DialogContent>
          <Typography variant="h5" align="center" style={{ fontFamily: 'Arial' }}>
            {Title}</Typography>
          <ContentComponent />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

AlertDialog.propTypes = {
  buttonName: PropTypes.string.isRequired,
  contentComponent: PropTypes.elementType.isRequired,
};

export default AlertDialog;
