import { useState } from 'react';
import './App.css';
//import MainMint from './MainMint';
// import NavBar from './NavBar';
import { Footer, MainMint } from './containers';
import { Navbar } from './components';

function App() {
  const [accounts, setAccounts] = useState([]);
  return (
    
      <div className="App">
      
        <Navbar accounts={accounts} setAccounts={setAccounts}/>
        <MainMint accounts={accounts} setAccounts={setAccounts}/>
        <Footer />
        <div className='moving-background'></div>
        
      </div>
      
  );
}

export default App;
