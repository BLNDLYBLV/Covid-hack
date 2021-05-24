import React, { useState,useEffect} from 'react'
import ApiService from '../../api.service'
import Web3 from 'web3'
import $ from 'jquery'
import {useSelector} from 'react-redux'
import styles from './transaction.module.css'

import { Button, Header, Image, Modal } from 'semantic-ui-react'

import TruffleContract from '@truffle/contract'

function Investor(props) {
    const userState = useSelector(state => state.user);
    const [providerAcc,setProviderAcc] = useState('');
    const [isBuyAllowed,setBuy] = useState(true);
    const [isWithdrawAllowed,setWithdraw] = useState(true);
    const [tokensPurchased,setTP] = useState('');
    const [tokensRequired,setTRfunc] = useState('')
    

    const web3 = new Web3("http://localhost:7545")
    const seekerAcc = props.project.project.eth;//Change default value
    console.log("Seeker acc:"+seekerAcc)
    const investorAcc = props.user.user.eth;
    const projectNo = 0;//Change the Project number as variable!!!!!!!!!!!
    
    
    const tokenPrice= 1000000000000000;
    
    const setBuyFunc = async()=>{
        const requiredTokens = await window.TokenInstance.required(seekerAcc,projectNo)
        if(requiredTokens==0){
            setBuy(false);
        } else {
            setBuy(true);
        }
        setTRfunc(Number(requiredTokens));
        setWithdrawFunc();
    }

    const setWithdrawFunc = async()=>{
        const purchased = await window.TokenInstance.purchased(seekerAcc,projectNo,investorAcc);
        if(purchased==0){
            setWithdraw(false);
        } else {
            const requiredTokens = await window.TokenInstance.required(seekerAcc,projectNo)
            if(requiredTokens==0){
                setWithdraw(false);
            } else {
                setWithdraw(true);
            }
        }
        setTP(Number(purchased))
    }
    
    const loadbc = async (event)=>{
        window.accounts = await web3.eth.getAccounts();
        await connectToContract();
    
        console.log(window.accounts[0])
    }
    
    const connectToContract = async()=>{
        $.getJSON('/Token.json',(token1)=>{
           window.tokenInst =TruffleContract(token1);
           console.log("inga paaru")
           console.log(window.tokenInst)
           window.tokenInst.setProvider("http://localhost:7545")
            window.tokenInst.deployed().then(async(token)=>{
                window.TokenInstance = token
                window.totalRequiredTokens = await window.TokenInstance.totalrequired(seekerAcc,projectNo)
                setBuyFunc();
            })
        })
        
    }
    window.required_tokens = 1000;
    useEffect(loadbc,[])

    const buy = async ()=>{
        let noOfTokens = $("#amount").val();
        let inWei = String($("#amount").val() * tokenPrice);
        window.required_tokens = await window.TokenInstance.required(seekerAcc,projectNo);
         //Change this for sureeeeeee
        if(noOfTokens<=window.required_tokens){
            console.log("no probs")
            await window.TokenInstance.payToSmartContract.sendTransaction({
                from: investorAcc,
                to: window.TokenInstance.address,
                value: inWei
            })
            await window.TokenInstance.changeVariables(investorAcc,seekerAcc,projectNo,noOfTokens,{
                from: investorAcc
            });
            
            console.log(window.required_tokens)
        if(noOfTokens==(window.required_tokens)){

            await window.TokenInstance.payToSeeker(seekerAcc,(window.totalRequiredTokens),{
                from: seekerAcc
            })

            console.log("Transfered ether to seeker account from smart contract")
        }
        window.required_tokens-=noOfTokens;
        } else{
            console.log("Enter lesser value")
        }
        let pur1 = await window.TokenInstance.purchased(seekerAcc,projectNo,investorAcc);
        setTP(Number(pur1))

        let mr1 = await window.TokenInstance.required(seekerAcc,projectNo)
        setTRfunc(Number(mr1))
    }

    const withdraw = async()=>{
        const moreRequired = await window.TokenInstance.required(seekerAcc,projectNo)
        console.log(Number(moreRequired))
        if(moreRequired==0){
            console.log("Sorry cannot withdraw, the project has been sanctioned")
        } else{
            let purchased = await window.TokenInstance.purchased(seekerAcc,projectNo,investorAcc);
            console.log(Number(purchased))
            if(purchased!=0){
                purchased=purchased
                await window.TokenInstance.payToSeeker(investorAcc,Number(purchased),{
                    from:investorAcc
                })
                await window.TokenInstance.withdraw(investorAcc,seekerAcc,projectNo,{
                    from:investorAcc
                });
            }
            else{
                console.log("Sorry you cannot withdraw ether as investment=0")
            }
            
        }

        let pur = await window.TokenInstance.purchased(seekerAcc,projectNo,investorAcc);
        setTP(Number(pur))

        let mr = await window.TokenInstance.required(seekerAcc,projectNo)
        setTRfunc(Number(mr))
    }

    // const b = ()=>{
    //     let from = String($('#from').val());
    //     let to = '0xDaB7fB54d970616C6ec84e4C8ae99e156353Df20';
    //     let inWei = String(1000000000000000*($('#amount').val()))
    //     console.log("This was asked for: "+$("#amount").val())

       

    //     web3.eth.sendTransaction({
    //         from: '0x7C4eA2E2A8E55b0722a848A7aDc0F333C37dc0B8',
    //         to: '0x5977fcAef22349da76D57ad25589004229F9227B',
    //         value: '1000000000000000000'
    //     })
    //     .then((receipt)=>{
    //         console.log(receipt)
    //         window.tokenInst.deployed().then(async(token)=>{
    //             window.TokenInstance=token
    //             // window.TokenInstance.buy(from,to,1,Number($('#amount').val()),{
    //             //     from: from,
    //             //     gas: 50000
    //             // })

    //             console.log(token.address)
    //             // window.TokenInstance.payToSmartContract.sendTransaction({
    //             //     from: '0x5E253684E865ec34291E3595B39079114AE36539',
    //             //     to: token.address,
    //             //     value: '1000000000000000000'
    //             // }).then(()=>{
    //             //     console.log("Otha nadakuthu")
    //             // })
                
    //             window.TokenInstance.payToSeeker('0x5E253684E865ec34291E3595B39079114AE36539',{
    //                 from:'0x5E253684E865ec34291E3595B39079114AE36539',
    //                 gas: 50000
    //             }).then((receipt)=>{
    //                 console.log("nadanthuchu")
    //             })

    //             // let purchase = await window.TokenInstance.purchased(to,1,from);
    //             // console.log("20 was expected and got: "+purchase)
    //         })
               
    // })}
    return(
        <div>
            <ul>
                <li style={{fontSize: '20px'}}>Tokens owned: {tokensPurchased}</li>
            </ul>
            <ul>
                <li style={{fontSize: '20px'}}>Tokens required: {tokensRequired}</li>
            </ul>
            <p style={{fontSize: '18px'}}>Please enter the amount of tokens you wish to purchase</p>
            <span style={{fontSize: '20px'}}>Amount:  </span><input style={{marginTop: '10px',fontSize:'20px'}}  className={styles.fieldIn} id="amount"></input>
            <div style={{float:'right', marginRight: '300px'}}>
            <Button positive  onClick={buy} style={{display:isBuyAllowed?'block':'none'}}>Buy</Button>
            </div>
            <p style={{fontSize: '18px',marginTop:'20px'}}>Would you like to withdraw the investment you have made? If yes click withdraw</p>
            <div>
            <Button color="orange" style={{marginLeft:'150px'}} onClick={withdraw}>Withdraw</Button>
            </div>
            
        </div>
    )
}

export default Investor