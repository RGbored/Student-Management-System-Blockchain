import './App.css';
import Registrationform from './Registrationform';
import contract from './contracts/Greetings.json';
import {ethers} from 'ethers';
import {useEffect, useState} from 'react';

const contractAddress = "0x89E185228aA8bE4fDbc88D109798C5af3778E93c";
const abi = contract.abi;

function App() {

  const [formData, setFormData] = useState({
    name: '',
    rollno: '',
    admno: '',
    course: '',
    branch: '',
    year: '',
  });
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = async ()=>{ 
    const { ethereum } = window;

    if(!ethereum){
      console.log("Please install metamast wallet!");
    }
    else 
    {
      console.log("Metamask detected!");
    }

    const accounts = await ethereum.request({method: 'eth_accounts' });

    if(accounts.length!==0)
    {
      const account = accounts[0];
      console.log("found an authorized account: ", account);
      setCurrentAccount(account);
    }
    else {
      console.log("No authorized account found");
    }

  };

  const connectWalletHandler = async ()=> {

    const { ethereum } = window;

    if(!ethereum) {
      alert("Please install Metamask!");
    }

    try{
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      console.log("Account Found!", accounts[0]);
      setCurrentAccount(accounts[0]);
    }
    catch(err)
    {
      console.log(err);
    }

  };

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} >
        Connect Wallet
      </button>
    )
  }

  const RegisterButton = () => {
    return (
      <button onClick={Register} >
        Register
      </button>
    )
  }

  const getStudentDetailsButton = () => {
    return (
      <button onClick={getDetails} >
        Get Student Details
      </button>
    )
  }



  useEffect(()=>{
    checkWalletIsConnected();
  }, [])

  const Register = async ()=>{
    try{
      const { ethereum } = window;
      if(ethereum){
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const greetingsContract = new ethers.Contract(contractAddress, abi, signer);

        console.log(greetingsContract);
        console.log("initialize function call");
        let Txn = await greetingsContract.greeting();
        console.log(Txn);
        let Fxn = await greetingsContract.multiply();
        console.log(Fxn);
        let address = await greetingsContract.register(formData.name, formData.rollno, formData.admno, formData.course, formData.branch, formData.year);
        console.log("wait no. 1");
        await address.wait();
        console.log(address);
        // console.log(Txn);
        // await Txn.wait();
        // console.log("done", Txn.hash);
      }
      else{
        console.log("Ethereum object does not exist");
      }
    }
    catch (err){
      console.log(err);
    }
  }

  const getDetails = async ()=>{
    try{
      const { ethereum } = window;
      if(ethereum){
        // const provider = new ethers.providers.Web3Provider(ethereum);
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const greetingsContract = new ethers.Contract(contractAddress, abi, signer);

        console.log(greetingsContract);
        console.log("initialize function call");
        let studentDetails = await greetingsContract.getStudentDetails();
        console.log(studentDetails);
        const details = document.getElementById("details");
        var content = "";
        studentDetails.forEach(element => {
          content+=element+"<br>";
        });
        details.innerHTML = content;
      }
      else{
        console.log("Ethereum object does not exist");
      }
    }
    catch (err){
      console.log(err);
    }
  }

  return (
    <div className="App">
      <div>
        {connectWalletButton()}
        {RegisterButton()}
        {getStudentDetailsButton()}
        <Registrationform formData={formData} setFormData={setFormData}/>
        <h1 id='details'></h1>
      </div>
    </div>
  );
}

export default App;
