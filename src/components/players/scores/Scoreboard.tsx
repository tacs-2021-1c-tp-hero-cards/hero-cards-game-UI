import { Center, Stack, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import React from "react";
import Collection from "../../../commons/Collections";
import { ScoredUser, UserScorePreview } from "./UserScore";

type ScoreboardProps = {
    data: ScoredUser[]
}

export default function Scoreboard({ data }: ScoreboardProps) {

    const scores = Collection.wrap(data)

    return (
        <Stack fontSize='xl' spacing='3rem' boxSize='full'>

            <Center fontSize='4xl' fontWeight='bold'>Scoreboard</Center>

            <Stack padding='1rem' backgroundColor='gray.200' borderRadius='1rem'>
                <Table variant='striped' colorScheme='blackAlpha'>
                    <Tbody>
                        { 
                            scores.map( (score, index) => 
                                <Tr key={index} width='40rem'>
                                    <Td borderRadius='0.5rem' key={index}>
                                        <UserScorePreview score={score} />
                                    </Td>
                                </Tr>
                            ).collection
                        } 
                    </Tbody>
                </Table>
            </Stack>

        </Stack>
    )
}