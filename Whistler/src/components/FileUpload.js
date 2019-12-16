import React, { Component } from 'react';
import Web3 from 'web3';
import Meme from '../abis/Meme.json'
import {Form, Button} from 'react-bootstrap'
import './FileUpload.css';
import Data from './Pages/js/dummy.json';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values
const fetch = require('node-fetch')


class FileUpload extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Meme.networks[networkId]
    if(networkData) {
      const contract = web3.eth.Contract(Meme.abi, networkData.address)
      this.setState({ contract })
      const MemeHash = await contract.methods.get().call()
      this.setState({ MemeHash })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      MemeHash: '',
      contract: null,
      web3: null,
      buffer: null,
      account: null
    }
  }

  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    console.log("Submitting file to ipfs...")
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)


      if(error) {
        console.error(error)
        return
      }

    //  fetch('localhost:3001/', { method: 'POST', body: result[0].path})
      //  .then(res => res.json()) // expecting a json response
        //.then(json => console.log(json));

       this.state.contract.methods.set(result[0].hash).send({ from: this.state.account }).then((r) => {
         return this.setState({ MemeHash: result[0].hash })
       })
    })
  }

  render() {
    return (
      <div>

          {/*<a
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={`https://ipfs.infura.io/ipfs/${this.state.MemeHash}`} />
          </a>*/}

            {/*<form onSubmit={this.onSubmit} >
              <input type='file' onChange={this.captureFile} />
              <input type='submit' />
        </form>*/}

            <form onSubmit={this.onSubmit} >
              <input type='file' onChange={this.captureFile}/>
              <div className='submit-button'><Button type='submit'>Submit</Button></div>
            </form>


        </div>

    );
  }
}

export default FileUpload;
