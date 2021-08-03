import React,{useState} from 'react'
import MachineForm from "./MachineForm";
import MachineCard from "./MachineCard";
import PageHeader from "../../components/PageHeader";
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import { Paper, makeStyles, TableBody, TableRow, TableCell, TableHead, Toolbar ,MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import * as machineService from "../../services/machineService"
import useTable from '../../components/useTable';
import Controls from "../../components/controls/Controls";
import Button from './../../components/controls/Button';
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(theme =>({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },

    tableCell: {
      color: "green"
    },

    tableHealth: {
      color: "red"
    },
    newButton: {
      position:'absolute',
      right:'10px'
    }

    
}))

const headCells = [
  {id:'name',label:'Nom'},
  {id:'unitId',label:'Unité'},
  {id:'status',label:'Statut'},
  {id:'health',label:'Santé'},
  {id:'actions',label:'Actions',disableSorting:true},
]

const greenTheme = createMuiTheme({ palette: { primary: green } })


export default function Machines() {

  const classes = useStyles();
  const [recordForEdit, setRecordForEdit]= useState(null)
  const [records,setRecords]=useState(machineService.getAllMachines())
  const [openPopup, setOpenPopup] = useState(false)
  const [openCard, setOpenCard] = useState(false)

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(records, headCells);

  const addOrEdit = (machine) => {
    if (machine.id == 0)
          machineService.insertMachine(machine)
          else
    machineService.updateMachine(machine)
    setRecordForEdit(null)
    setOpenPopup(false)
    setRecords(machineService.getAllMachines())
  }

  const openInPopup = item =>{
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  const onDelete = id => {
    machineService.deleteMachine(id);
    setRecords(machineService.getAllMachines())
  }

    return(
        <>
        <PageHeader
          title="Hopia"
          subTitle="Gestion de machines"
          icon={<EmojiTransportationIcon fontSize="large"/>}
        />
      <Paper className={classes.pageContent}>      
      
        
        <Toolbar>

          <Controls.Input
          label="Rechercher une machine"
          />

          <Controls.Button
          text = "Ajouter"
          variant = "outlined"
          color= "blue"
          startIcon = {<AddIcon />}
          className={classes.newButton}
          onClick = {() => {setOpenPopup(true);setRecordForEdit(null);}}
          />

        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
              {
                recordsAfterPagingAndSorting().map(item =>
                (<TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.unitId}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.health}</TableCell>
                  <TableCell>
                  <MuiThemeProvider theme={greenTheme}>
                    <Controls.ActionButton
                      color="primary">
                      <VisibilityIcon fontSize="small"
                      onClick = {() => setOpenCard(true)} />
                    
                    </Controls.ActionButton>
                    </MuiThemeProvider>

                    <Controls.ActionButton
                      color="primary">
                      <EditOutlinedIcon fontSize="small" 
                      onClick = {() => {setOpenPopup(true);setRecordForEdit(item);}} />
                    </Controls.ActionButton>

                    <Controls.ActionButton
                      color="secondary">
                      <CloseIcon fontSize="small" 
                      onClick = {()=> {onDelete(item.id)}}/>
                    </Controls.ActionButton>

                  </TableCell>
                </TableRow>))
              }
          </TableBody>
        </TblContainer>
        <TblPagination />

        
      </Paper>

      <Popup
        title = "Formulaire machine"
        openPopup = {openPopup}
        setOpenPopup = {setOpenPopup}
      >
        <MachineForm 
        recordForEdit = {recordForEdit}
        addOrEdit={addOrEdit}/>
      </Popup>

      <Popup
        title = "Détails machine"
        openPopup = {openCard}
        setOpenPopup = {setOpenCard}
        >
        <MachineCard 
        recordForEdit = {recordForEdit}/>
        </Popup>

        </>
    )
}