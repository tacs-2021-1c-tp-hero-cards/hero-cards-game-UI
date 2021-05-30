import { CloseIcon } from "@chakra-ui/icons";
import { Box, Checkbox, IconButton, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { Card, CardAttributes } from "./Card";

type CardsProps = {
    cards: Card[],
    removeCard?: (index: number) => void,
    updateCard?: (card: CardAttributes, checked: boolean) => void,
    updateAllCards?: (checked: boolean) => void,
    withCheckbox?: boolean,
    withButton?: boolean
}

type Card = CardAttributes & {
    checked?: boolean
}

export function CardsGrid({ 
                            cards, 
                            removeCard = () => {}, 
                            updateCard = () => {}, 
                            updateAllCards = () => {}, 
                            withCheckbox = false, 
                            withButton = false 
                        }: CardsProps) {

    const [checkedItems, setCheckedItems] = React.useState(cards.map(card => card.checked))

    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked

    function updateCheckedItems(index: number, checked: boolean) {
        let items = checkedItems.map((value, i) => i === index ? checked : value)

        setCheckedItems(items)
        updateCard(cards[index], checked)
    }

    function updateAllCheckedItems(checked: boolean) {
        setCheckedItems(cards.map(() => checked))

        updateAllCards(checked)
    }

    return(
        <Box>
            <Checkbox 
                hidden={!withCheckbox}
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) => updateAllCheckedItems(e.target.checked)}>
                Select all cards
            </Checkbox>

            <SimpleGrid minChildWidth="200px" spacing="10px">
                {cards.map(
                    (card, index) => {
                        if(withCheckbox) {
                            return <Card    attributes={card}
                                            addOn={
                                                <Checkbox   isChecked={checkedItems[index]}
                                                            onChange={(e: any) => updateCheckedItems(index, e.target.checked)}/>
                                                        } />
                        } else if(withButton) {
                            return <Card    attributes={card} 
                                            addOn={
                                                <IconButton size='xs' colorScheme="red" aria-label="Remove card" 
                                                            icon={<CloseIcon />} 
                                                            onClick={() => removeCard(index)}/>
                                            } />
                        } else 
                            return <Card attributes={card} />
                    })}
            </SimpleGrid>
        </Box>
    )
}