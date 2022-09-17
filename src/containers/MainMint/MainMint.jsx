import { useState } from 'react';
import {ethers, BigNumber} from "ethers";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import BirbsNFT from '../../BirbsNFT.json'


const birbsNFTAddress = "0xBf94Ed728A25A612BC93a7a87894D24f5BeDE4BB";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(birbsNFTAddress, BirbsNFT.abi, signer);

        
        try {
            const response = await contract.mint(BigNumber.from(mintAmount), {
                value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
            });
            console.log('response', response);
        } catch (error) {
            console.log("error: ",error);
        }
        }
    }

    const handleDecrement = () => {
    
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    
    }

    const handleIncrement = () => {
    
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    
    }

    return (
        <Flex justify="center" align="center" height="100vh" flexDirection="column" paddingBottom="150px">
            <Box width="520px">
            <div>
                <Text fontSize="48px" textShadow="0 5px #000000">birb/eth</Text>
                <Text fontSize="30px" 
                      letterSpacing="-5.5%"
                      fontFamily="VT323"
                      textShadow="0 2px 2px #000000"
                      >Birb is a unique collection of 10.000 NFT birds on the ETH blockchain. Each Birb owner will be granted an access to “The Hollow” - a private Discord server where holders will get exclusive offers and benefits, along with invites to events.
                </Text>
            </div>
            {isConnected ? (
                <div>
                    <Flex align="center" justify="center">
                        <Button 
                            onClick={handleDecrement}
                            backgroundColor="#32CD32"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="White"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            margin="10px"
                            
                        >
                            -
                        </Button>
                        <Input 
                            readOnly
                            fontFamily="inherit"
                            width="100px"
                            height="40px"
                            textAlign="center"
                            paddingLeft="19px"
                            marginTop="10px"
                            type="number" 
                            value={mintAmount} 
                        />
                        <Button 
                            onClick={handleIncrement}
                            backgroundColor="#32CD32"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="White"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            margin="10px"
                            
                        >
                            +
                        </Button>
                    </Flex>
                    <Button 
                            onClick={handleMint}
                            backgroundColor="#32CD32"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="White"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            margin="10px"
                            
                        >Mint</Button>
                </div>
                ) : (
                    <Text
                        marginTop="70px"
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 3px #000000"
                        color="#32CD32"
                    >
                        You must be connected to be able to mint.
                    </Text>
                )}
               
            </Box>
        </Flex> 
    )
}

export default MainMint;
