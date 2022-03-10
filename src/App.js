import React, {useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { useRef } from 'react';

function App() {
  const [olio, setOlio] = useState({desc:'', date: '', prio: ''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const inputChanged = (event) => {
    setOlio({...olio, [event.target.name]: event.target.value});
  }

  const addTodo = (event) => {
    setTodos([...todos, olio]);
  }

  const deleteTodo = (event) => {
    if (gridRef.current.getSelectedNodes().length > 0){
    setTodos(todos.filter((todo, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex))
    }
    else {
      alert("Select row first");
    }
  }

  const columns = [
    {headerName: 'Date', field: 'date', sortable: true, filter: true, floatingFilter: true},
    {headerName: 'Description', field: 'desc', sortable: true, filter: true, floatingFilter: true},
    {headerName: 'Priority', field: 'prio', sortable: true, filter: true, floatingFilter: true,
    cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}}
  ]


  return (
    <div className="App">
      <div id='eka' style={{width: '80%', margin: 'auto'}}>
        <input type="text" name="desc" value={olio.desc} placeholder="Description" onChange={inputChanged}></input>
        <input type="text" name="date" value={olio.date} placeholder="Date" onChange={inputChanged}></input>
        <input type="text" name="prio" value={olio.prio} placeholder="Priority" onChange={inputChanged}></input>
        <button onClick={addTodo}>Add</button>
        <button onClick={deleteTodo}>Delete</button>
        </div>

      <div className='ag-theme-material' style={{height: '700px', width: '80%', margin: 'auto'}}>
        <AgGridReact
          ref={gridRef}
          onGridReady={params => gridRef.current = params.api}
          rowSelection='single'
          columnDefs= {columns}
          rowData= {todos}
          animateRows={true}>
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;