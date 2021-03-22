import { TextField } from '@material-ui/core';
import useStyles from './TextFieldStyles';
function Field(props) {
  const {
    fullWidth = false,
    value = '',
    onChange = () => {},
    placeholder = 'please type something',
    disableUnderline = true,
    color = '#fff',
  } = props;
  const classes = useStyles();
  return (
    <TextField
      disableUnderline={disableUnderline}
      classes={{
        root: classes.container,
        focused: classes.focusedText,
        underline: classes.underline,
      }}
      InputLabelProps={{
        style: {
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: '100%',
          color: '#fff',
        },
      }}
      InputProps={{
        disableUnderline: true,
        style: {
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: '100%',
          color: '#fff',
        },
      }}
      fullWidth={fullWidth}
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

export default Field;
