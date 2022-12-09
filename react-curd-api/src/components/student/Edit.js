import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import { useState, useEffect } from "react";
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles({
 headingColor: {
  backgroundColor: deepPurple[400],
  color: "white"
 },
 addStuColor: {
  backgroundColor: green[400],
  color: "white"
 },

});

const Edit = () => {
 const classes = useStyles();
 const { id } = useParams();
 const navigate = useNavigate();
 const [name, setName] = useState({
  name: "",
  email: ""
 });
 useEffect(() => {
  async function getStudent() {
   try {
    const student = await axios.get(`https://639363d8ab513e12c50d02a6.mockapi.io/studentdata/${id}`)
    // console.log(student.data);
    setName(student.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getStudent();
 }, [id]);

 function onTextFieldChange(e) {
  setName({
   ...name,
   [e.target.name]: e.target.value
  })
 }

 async function onFormSubmit(e) {
  e.preventDefault()
  try {
   await axios.put(`https://639363d8ab513e12c50d02a6.mockapi.io/studentdata/${id}`, name)
   navigate.push("/")
  } catch (error) {
   console.log("Something is Wrong");
  }
 }
 function handleClick() {
    navigate("/")
 }
 return (
  <>
   <Box textAlign="center" p={2} className={classes.headingColor} mb={2}>
    <Typography variant="h2">React CRUD with API Call</Typography>
   </Box>

   <Grid container justifyContent="center" spacing={4}>
    <Grid item md={6} xs={12}>
     <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
      <Typography variant="h4">Edit Student</Typography>
     </Box>
     <form>
      <Grid container spacing={2}>
       <Grid item xs={12} sm={6}>
        <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="ID" autoFocus value={id} disabled />
       </Grid>
       <Grid item xs={12} sm={6}>
        <TextField autoComplete="stuname" name="stuname" variant="outlined" required fullWidth id="stuname" label="Name" value={name.name} onChange={e => onTextFieldChange(e)} />
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" value={name.email} onChange={e => onTextFieldChange(e)} />
       </Grid>
      </Grid>
      <Box m={3}>
       <Button type="button" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}> Update </Button>
      </Box>
     </form>
     <Box m={3} textAlign="center">
      <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
     </Box>
    </Grid>
   </Grid >
  </>
 )
}

export default Edit