import { CloseIcon } from "@chakra-ui/icons";
import { Box, Checkbox, IconButton, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { Card, CardAttributes } from "./Card";

type CardsProps = {
    cards: CardAttributes[],
    withCheckbox: boolean,
    withButton: boolean
}

export function CardsGrid({ cards, withCheckbox, withButton }: CardsProps) {
    const [checkedItems, setCheckedItems] = React.useState(cards.map(() => false))

    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked

    function updateCheckedItems(index: number, checked: boolean) {
        let items = checkedItems.slice()

        return  items.map((value, i) => i === index ? checked : value)
    }

    return(
        <Box>
            <Checkbox 
                hidden={!withCheckbox}
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) => setCheckedItems(cards.map(() => e.target.checked))}>
                Select all cards
            </Checkbox>

            <SimpleGrid minChildWidth="200px" spacing="10px">
                {cards.map(
                    (card, index) => {
                        if(withCheckbox) {
                            return <Card    attributes={card}
                                            addOn={
                                                <Checkbox   isChecked={checkedItems[index]}
                                                            onChange={(e: any) => setCheckedItems(updateCheckedItems(index, e.target.checked))}/>
                                                        } />
                        } else if(withButton) {
                            return <Card    attributes={card} 
                                            addOn={
                                                <IconButton size='xs' colorScheme="red" aria-label="Remove card" 
                                                            icon={<CloseIcon />} 
                                                            onClick={() => {}}/> //FIXME completar onClick
                                            } />
                        } else 
                            return <Card attributes={card} />
                    })}
            </SimpleGrid>
        </Box>
    )
}