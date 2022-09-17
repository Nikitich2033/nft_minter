import React from "react";
import { Box, Button, Flex, Image, Link, Spacer } from "@chakra-ui/react";
import Twitter from "../../assets/social-media-icons/twitter_32x32.png";


const NavBar = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount(){
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            })

            setAccounts(accounts);
        }
    }

    return (
        <Flex justify="space-between" align="center" padding="30px">
            <Flex justify="space-around" width='40%' padding="0 75px">
                <Link href="https://twitter.com/birbweb3">
                    <Image src={Twitter} boxSize="42px" margin="0 15px" />
                </Link>
            </Flex>

            <Flex justify="space-around" width='40%' padding="30px">
                <Box margin="0 15px">About</Box>
                <Spacer/>
                <Box margin="0 15px">Mint</Box>
                <Spacer/>
                <Box margin="0 15px">Team</Box>
                <Spacer/>
                { isConnected ? (
                <Box margin="0 15px">Connected</Box>
                ) : (
                <Button 
                    onClick={connectAccount}
                    backgroundColor="blue.500"
                    borderRadius="5px"
                    boxShadow="0px 2px 2px 1px #0F0F0F"
                    color="Black"
                    cursor="pointer"
                    fontFamily="inherit"
                    padding="15px"
                    margin="0 15px"
                >
                    Connect
                </Button>
                )}
            </Flex>
            

            

        </Flex>

    )
}
export default NavBar;