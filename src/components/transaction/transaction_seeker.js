import React, { useState,useEffect} from 'react'
import Web3 from 'web3'
import $ from 'jquery'
import {useSelector} from 'react-redux'
import TruffleContract from '@truffle/contract'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

function SeekerPage(props) {
    const userState = useSelector(state => state.user);
    console.log(props.user)
    const seekerAcc = props.project.project.eth;//Change default value
    const projectNo = 0;//Change the Project number as variable!!!!!!!!!!!
    // const totalRequiredTokens = 10000;//Change this also
    let tokenPrice= 1000000000000000;
    
    const sanctionedDate = props.project.project.sanctionedDate;//Change this

    const web3 = new Web3("http://localhost:7545")
    const loadbc = async (event)=>{
        window.accounts = await web3.eth.getAccounts();
        connectToContract();
        console.log(window.accounts[0])
    }
    const connectToContract = async()=>{
        $.getJSON('/Token.json',(token)=>{
            window.tokenInst = TruffleContract(token)
            console.log("Amaan ba")
            console.log(window.tokenInst)
            window.tokenInst.setProvider("http://localhost:7545")
            window.tokenInst.deployed().then(async(token)=>{
                window.TokenInstance = token
                console.log('Token address is:'+token.address)
                window.totalRequiredTokens = window.TokenInstance.totalrequired(seekerAcc,projectNo)
            })
        })
    }

    //Sets the required amount of tokens for project
    const setRequired = async()=>{
        window.tokenInst.deployed().then(async(token)=>{
            const required_tokens = $('#setRequired').val()
           await token.setRequired(seekerAcc,projectNo,required_tokens,{
               from: seekerAcc,
               
           })
            const numbertest = await token.required(seekerAcc,projectNo);

            console.log("set number is: "+numbertest)
        
    })
}

    const returnMoney = async()=>{
        console.log("Token isnsyasgyas")
        console.log(window.tokenInst)
        window.tokenInst.deployed().then(async(token)=>{
            window.TokenInstance = token;

            //Logic to calculate token price at the end of return
            let timeElapsed = Date.now()-sanctionedDate;
            let diffDays = Math.ceil(timeElapsed / (1000 * 60 * 60 * 24)); 

            tokenPrice = tokenPrice + (diffDays*6881310000000); //1 rupee equivalent
            console.log("tpp ttejoig")
            console.log(typeof(sanctionedDate))
            
            let amount_to_return = window.totalRequiredTokens * tokenPrice
            console.log("amoutn ttejoig")
            console.log(amount_to_return)
            token.payToSmartContract.sendTransaction({
                    from: seekerAcc,
                    to: token.address,
                    value: amount_to_return
                }).then(async()=>{
                    console.log("")
                    let length;
                    let investorsAcc = [];
                    length = await window.TokenInstance.returnRegisterLength.call(seekerAcc,projectNo);
                    for(let i=0;i<length;i++){
                       let investorFromRegister = await window.TokenInstance.investorsRegister(seekerAcc,projectNo,i);
                       investorsAcc.push(investorFromRegister);
                    }

                    //Filters and gives unique addresses
                    let uniqueInvestors = [...new Set(investorsAcc)];
                    console.log(uniqueInvestors)
                    for(let j=0;j<uniqueInvestors.length;j++){
                        let valueContributed = await window.TokenInstance.purchased(seekerAcc,projectNo,uniqueInvestors[j])
                        await window.TokenInstance.payToSeeker(uniqueInvestors[j],(valueContributed),{
                            from: seekerAcc
                        })
                    }                    
                })
            
        })
    }

    useEffect(loadbc,[])
    return(
        
        <div>
            <p style={{fontSize: '20px'}}>Hi {props.user.user.name}, this is your portal to return money back to your investors after the covid wave is over. To return it back to investors along with a certain interest, click <b>Return</b></p>
            
            
            <Button style={{fontSize: '14px',marginLeft: '170px'}} positive id="returnMoney" onClick={returnMoney}>Return</Button>
        </div>
    )
}

export default SeekerPage