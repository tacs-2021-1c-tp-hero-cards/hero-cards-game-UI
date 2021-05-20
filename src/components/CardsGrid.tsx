import { Box, Checkbox, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { Card, CardAttributes } from "./Card";

type CardsProps = {
    cards: CardAttributes[]
}

export function CardsGrid({ cards }: CardsProps) {
    const [checkedItems, setCheckedItems] = React.useState(cards.map(() => false))

    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked

    return(
        <Box>
            <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) => setCheckedItems(cards.map(() => e.target.checked))}>
                Select all cards
            </Checkbox>

            <SimpleGrid minChildWidth="200px" spacing="10px">
                {cards.map(
                    (card, index) => 
                        <Card   attributes={card}
                                checkbox={
                                <Checkbox   hidden={true} 
                                            isChecked={checkedItems[index]}
                                            onCheck={(e: any) => setCheckedItems(
                                                checkedItems.slice(0, index)
                                                    .concat([e.target.checked])
                                                    .concat(checkedItems.slice(-1, index))
                                                )}/>
                            } />
                )}
            </SimpleGrid>
        </Box>
    )
}