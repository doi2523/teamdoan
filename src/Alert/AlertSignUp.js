import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackbar({ open, handleClose, success, error }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ width: '100%' }} // Setting width to full width for a mobile-like alert
    >
      {success ? (
        <Alert onClose={handleClose} severity="success" sx={{ width: '50%' }}>
          Đăng ký thành công!
        </Alert>
      ) : (
        <Alert onClose={handleClose} severity="error" sx={{ width: '50%' }}>
          Đăng ký thất bại: {error}
        </Alert>
      )}
    </Snackbar>
  );
}