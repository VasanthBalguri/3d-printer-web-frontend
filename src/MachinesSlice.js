import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const mock = true;

const initialState = {
    machines:[]
}

export const asyncGetMachines = createAsyncThunk("machines/asyncGetMachines",async() => {
    if(!mock)
    return axios.get('/machines').then(function (response){
        // handle success
        return response.data;
        }).catch(function (error) {
        // handle error
        console.log(error);
        return error;
        });
    else
    {
        return [{id:"M-02",name:"ultimaker"},{id:"M-03",name:"tevo"},{id:"M-04",name:"tevo"}];
    }
});

export const asyncAddMachine = createAsyncThunk("machines/asyncAddMachines",async(newMachine) => {
    if(!mock)
    axios.post('/addMachine',newMachine).then(function (response){
        // handle success
        return response.data;
        }).catch(function (error) {
        // handle error
        console.log(error);
        return error;
        });
    else
    {
        return null;
    }
});

export const asyncGetMachine = createAsyncThunk("machines/asyncGetMachine",async(machineId) => {
    if(!mock)
    return axios.get(`/machine${machineId}`).then(function (response){
        // handle success
        return response.data;
        }).catch(function (error) {
        // handle error
        console.log(error);
        return error;
        });
    else
    {
        return {id:machineId,name:"test",type:"FDM",material:"PLA",temprature:30,status:"Idle"};
    }
});

export const machinesSlice = createSlice({
    name: "machines",
    initialState,
    reducers: {
        setMachine: (state,action) => {
            
        },
        setMachines: (state,action) => {
            state.machines = action.payload;
        }
    },
    extraReducers: {
        [asyncGetMachines.pending]: (state,action) => {

        },
        [asyncGetMachines.fulfilled]: (state,action) => {
            state.machines = action.payload;
        },
        [asyncGetMachines.rejected]: (state,action) => {

        },
        [asyncGetMachine.pending]: (state,action) => {

        },
        [asyncGetMachine.fulfilled]: (state,action) => {
            //console.log(action.payload);
            const indexVal = state.machines.findIndex(machine => machine.id == action.payload.id)
            const newArr = [...state.machines.slice(0,indexVal),action.payload,...state.machines.slice(indexVal+1)]
            state.machines = newArr;
        },
        [asyncGetMachine.rejected]: (state,action) => {
            
        },
        [asyncAddMachine.pending]: (state,action) => {
        },
        [asyncAddMachine.fulfilled]: (state,action) => {
            state.machines = [...state.machines,action.payload];
        },
        [asyncAddMachine.rejected]: (state,action) => {
            
        }
    }
});

export const { setMachine, setMachines} = machinesSlice.actions

export default machinesSlice.reducer
