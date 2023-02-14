import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

interface State {
  csigak: Csiga[];
  newCsigaNev: string;
  newCsigaSebbeseg: number;
}

interface Csiga {
  id: number;
  nev: string;
  sebbeseg: number;
}

class App extends Component<{}, State> {
  constructor(props: {}){
    super(props);

    this.state = {
      csigak: [],
      newCsigaNev: "",
      newCsigaSebbeseg: 1,
    }
  }

  async loadCsiga() {
    let response = await fetch('http://localhost:3000/csiga')
    let data = await response.json() as Csiga[];
    this.setState({
      csigak: data,
    })
  }

  componentDidMount() {
    this.loadCsiga();
  }

  csigaDelete = async (id:number) => {
    await fetch('http://localhost:3000/csiga/'+id, {method: 'DELETE'})
    this.loadCsiga();
  }

  newCsiga = async () => {
    const {newCsigaNev, newCsigaSebbeseg} = this.state;

    const adat = {
      nev : newCsigaNev,
      sebbeseg: newCsigaSebbeseg,
    }

    let response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adat)
    });

    this.setState({
      newCsigaNev: '',
      newCsigaSebbeseg: 1,
    })

    await this.loadCsiga();
  }


  render(){
    const { newCsigaNev, newCsigaSebbeseg} = this.state;
    return <div className='container'>
      <div className='row'>
          <div className='col-lg-4'>
            Csiga neve:<input type='text' value={newCsigaNev} onChange={e => this.setState({ newCsigaNev: e.currentTarget.value})}/><br/>
          </div>
          <div className='col-lg-4'>
            Csiga sebbesége:<input type='number' value={newCsigaSebbeseg} onChange={e => this.setState({ newCsigaSebbeseg: parseInt(e.currentTarget.value)})}/><br/>
          </div>
      </div>
      <button onClick={this.newCsiga} className='btn btn-secondary'>Csiga felvétele</button>

      <br/>
      <div className='container'>
        <h2>Csigák listája</h2>
        <div>{this.state.csigak.map(csigak =><tbody><tr><td><th>Név</th> {csigak.nev}</td> <td><th>Sebbeség</th> {csigak.sebbeseg}</td></tr> 
        <button onClick={(event) => this.csigaDelete(csigak.id)} className='btn btn-danger'>Törlés</button> <hr /> </tbody>)}</div>
      </div>
    </div>
    
  
      
    
    
  }
}

export default App;
