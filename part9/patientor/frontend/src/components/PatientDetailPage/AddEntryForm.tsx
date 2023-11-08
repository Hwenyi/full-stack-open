import { useState, SyntheticEvent, ChangeEvent } from "react";
import { TextField, InputLabel, MenuItem, Select, Grid, Button, Input, SelectChangeEvent } from '@mui/material';

import { EntryFormValues, Diagnosis } from '../../types';

type Props = {
  onSubmit: (values: EntryFormValues, resetter: () => void) => void;
  onCancel: () => void;
  onOpen: () => void;
  visible: boolean
  diagnoses: Diagnosis[]
};

const AddEntryForm = ({ onSubmit, visible, onOpen, onCancel, diagnoses }: Props ) => {
  const [type, setType] = useState<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'>('OccupationalHealthcare');
  const [description, setDescription] = useState('good');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [dig, setDig] = useState('');

  const style = {
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    borderStyle: 'dashed'
  };

  const emptyTheForm = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setRating('');
    setDischargeDate('');
    setDischargeCriteria('');
    setEmployerName('');
    setSickLeaveStart('');
    setSickLeaveEnd('');
    setDiagnosisCodes([]);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const common = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    if ( type === 'HealthCheck') {
      const object: EntryFormValues = {
        ...common,
        type,
        healthCheckRating: Number(rating),
      };
  
      onSubmit(object, emptyTheForm);
    } else if ( type === 'Hospital') {
      const discharge = dischargeDate.length>0 && dischargeCriteria.length>0 ? {
        date: dischargeDate,
        criteria: dischargeCriteria
      } : undefined;
  
      const object: EntryFormValues = {
        ...common,
        type,
        discharge,
      };
  
      onSubmit(object, emptyTheForm);
    } else if ( type === 'OccupationalHealthcare') { 
      const sickLeave = sickLeaveStart.length>0 && sickLeaveEnd.length>0 ? {
        startDate: sickLeaveStart,
        endDate: sickLeaveEnd
      } : undefined;      
      
      const object: EntryFormValues = {
        ...common,
        type,
        employerName,
        sickLeave
      };
  
      onSubmit(object, emptyTheForm);
    }
  
  };

  if ( !visible ) {
    return (
      <div style={{ marginTop: 10 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onOpen}
        >
          add entry
        </Button>
      </div>
    );
  }

  const typeOptions = ['HealthCheck', 'Hospital', 'OccupationalHealthcare'];

  const onTypeChange =  (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      if ( value==='HealthCheck' || value==='Hospital' || value==='OccupationalHealthcare') {
        setType(value);
      }
    }
  };

  const healthCheckOptions = ['0','1','2','3' ];

  const onHealthCheckChange =  (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      setRating(value);

    }
  };

  const diagnosisOptions = diagnoses.map(d => d.code);

  const onDiagnosisChange =  (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    console.log(event.target.value);
    if ( Array.isArray(event.target.value)) {
      const codes = event.target.value as string[];
      setDiagnosisCodes(codes);
    }
  };

  return (
    <form style={style} onSubmit={addEntry}>
      <InputLabel style={{ marginTop: 20 }}>Entry type</InputLabel>
      <Select
        fullWidth
        value={type}
        onChange={onTypeChange}
      >
        {typeOptions.map(type =>
          <MenuItem key={type} value={type} >
            {type}
          </MenuItem>
        )}
      </Select>
      <div style={{ marginBottom: 20 }} />
      <TextField
        label="Description"
        fullWidth 
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
      <Input
        type="date"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
      <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
      <Select
        fullWidth
        multiple
        value={diagnosisCodes}
        onChange={onDiagnosisChange}
      >
        {diagnosisOptions.map(type =>
          <MenuItem key={type} value={type} >
            {type}
          </MenuItem>
        )}
      </Select>
      {type === 'HealthCheck'&&(
        <div>
          <InputLabel style={{ marginTop: 20 }}>Health check rating</InputLabel>
          <Select
            fullWidth
            value={rating}
            onChange={onHealthCheckChange}
          >
            {healthCheckOptions.map(type =>
              <MenuItem key={type} value={type} >
                {type}
              </MenuItem>
            )}
          </Select>
        </div>
      )}
      {type === 'Hospital'&&(
        <div>
          <InputLabel style={{ marginTop: 20 }}>Discharge</InputLabel>
          <div style={{marginLeft: 10}}>
          <InputLabel style={{ marginTop: 20 }}>date</InputLabel>
            <Input  
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="condition"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </div>
        </div>
      )}
      {type === 'OccupationalHealthcare'&&(
        <div>
        <TextField
            label="Employee"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
        <div>
          <InputLabel style={{ marginTop: 20 }}>Sickleave</InputLabel>
          <div style={{marginLeft: 10}}>
            <InputLabel style={{ marginTop: 20 }}>start</InputLabel>
            <Input  
              type="date"
              fullWidth
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>end</InputLabel>
            <Input  
              type="date"
              fullWidth
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </div>
        </div>
        </div>
      )}

      <div style={{ margin: 20 }}/> 

      <Grid>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            style={{ float: "left" }}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              float: "right",
            }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>    
      <div style={{ margin: 60 }}/> 
    </form>
  );
};

export default AddEntryForm;