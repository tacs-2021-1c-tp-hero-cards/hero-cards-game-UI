import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

type CardsProps = {
    cards: any[]
}

export function CardsGrid({ cards }: CardsProps) {
    return(
        <SimpleGrid minChildWidth="200px" spacing="10px">
            {cards}
        </SimpleGrid>
    )
}