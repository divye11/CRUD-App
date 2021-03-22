import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'rgba(24,24,32,1)',
    minHeight: '100vh',
    maxHeight: '100%',
    paddingLeft: 0,
    paddingRight: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    margin: 0,
    background: 'rgba(29,29,39,1)',
  },
  body: {
    width: '100%',
    flexGrow: 1,
    paddingTop: '5%',
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold',
    color: 'white',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    height: '30%',
  },
  itemContainer: {
    maxHeight: '20%',
  },
  subTitle: {
    fontFamily: 'Inter, sans-serif',
    color: 'white',
  },
  addTaskContainer: {
    borderRadius: '1rem',
    border: '3px solid rgba(226, 232, 240, 0.1) ',
    maxHeight: '15%',
    minHeight: '15%',
    display: 'flex',
    padding: '1%',
    marginBottom: '10%',
  },
  checkbox: {
    color: 'rgb(251, 118, 161)',
    height: '100%',
  },
  TaskContainer: {
    borderRadius: '1rem',
    border: '3px solid rgba(226, 232, 240, 0.1) ',
    maxHeight: '15%',
    minHeight: '15%',
    display: 'flex',
    padding: '1%',
    marginBottom: '2%',
    alignItems: 'center',
  },
  TaskContainer2: {
    borderRadius: '1rem',
    maxHeight: '15%',
    minHeight: '15%',
    display: 'flex',
    padding: '1%',
    marginBottom: '2%',
    alignItems: 'center',
    background: 'rgba(33,33,43,1)',
  },
  AddIconContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '1%',
  },
  AddIconContainer2: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '1%',
  },
  pFont: {
    fontFamily: 'Inter, sans-serif',

    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.5,
    fontSize: '1.1rem',
    fontWeight: 500,
  },
  menuList: {
    background: 'rgba(30,30,41)',
    borderColor: 'rgba(30,30,41)',
    borderRadius: '0.375rem',
    boxShadow: 'none',
    color: 'white',
  },
  paper: {
    background: 'rgba(30,30,41)',
    borderColor: 'rgba(30,30,41)',
    borderRadius: '0.375rem',
    boxShadow: 'none',
    color: 'white',
  },
  menuItem: {
    borderBottom: '2px solid black',
  },
}));

export default useStyles;
