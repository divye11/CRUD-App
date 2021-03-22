import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    background: 'rgb(29,29,39)',
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    color: 'white',
  },
}));
function CustomDialog(props) {
  const classes = useStyles();
  const {
    state = false,
    handleClose = () => {},
    children = <></>,
    Title = 'Dialog',
    Description = '',
    submit = () => {},
  } = props;
  return (
    <Dialog
      classes={{ paper: classes.container }}
      open={state}
      onClose={handleClose}
      aria-labelledby="form-dialog-title">
      <DialogTitle classes={{ root: classes.title }} id="form-dialog-title">
        {Title}
      </DialogTitle>
      <DialogContent classes={{ root: classes.title }}>
        <DialogContentText classes={{ root: classes.title }}>
          {Description}
        </DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={submit} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
