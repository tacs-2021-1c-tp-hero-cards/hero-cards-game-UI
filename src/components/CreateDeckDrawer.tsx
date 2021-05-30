import React, { useState } from "react"
import { AddIcon } from "@chakra-ui/icons"
import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, 
        DrawerHeader, DrawerBody, Stack, Box, FormLabel, Input, InputGroup, DrawerFooter, StackDivider, InputRightElement } from "@chakra-ui/react"
import { CardsGrid } from "../components/CardsGrid"
import { Form, Formik } from "formik"
import { FormField, UnrequiredGenericForm } from "./Form"
import { nonEmpty } from "../commons/InputValidations"
import { CardAttributes } from "./Card"

type DrawerProps = { alignSelf: string }
type Deck = {
    deckName: string,
    cards: CardAttributes[]
}

export function CreateDeckDrawer({ alignSelf }: DrawerProps) {
    const initialRef = React.useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ selectedCards, setSelectedCards ] = useState(cards().filter(card => card.id % 2 === 0))
    const [ availableCards, setAvailableCards ] = useState(checkCards(cards()))

    function setSelected(selected: CardAttributes[]) {
        setSelectedCards(selected.sort((c1, c2) => c1.id - c2.id))
    }

    function setAvailable(available: any[]) {
        setAvailableCards(available)
    }

    function checkCards(cards: CardAttributes[]) {
      const checkedCards = cards.slice().map((card) => ({...card, checked: selectedCards.some(c => c.id === card.id)}))

      return checkedCards
    }

    function openDrawer() {
      // TODO: setear estado inicial del drawer correctamente
      onOpen()
    }

    function onSubmit(deck: Deck) {
        console.log('deck' + deck)
        //onClose()
    }

    function searchCardsByName() {
       // setAvailableCards(cards) //FIXME
    }

    function searchCardById(id: number) { 
      setAvailable(cards) //FIXME

    }

    function updateCard(card: CardAttributes, checked: boolean) {
      if (checked) {
        if (!selectedCards.some((c) => card.id === c.id)) {
          setSelected(selectedCards.concat(card))
        }

      } else {
        const cardIndex = selectedCards.findIndex((c) => card.id === c.id)
        const updatedItems = selectedCards
                              .slice(0, cardIndex)
                              .concat(selectedCards.slice(cardIndex + 1, selectedCards.length))

        setSelected(updatedItems)
      }
    }

    function updateAllCards(checked: boolean) {
      if(checked) {
        let cards = availableCards.filter(card => !selectedCards.some((c) => card.id === c.id))
        setSelected(selectedCards.concat(cards))
      } else {
        let cards = selectedCards.filter(card => !availableCards.some((c) => card.id === c.id))
        setSelected(cards)
      }
    }

    function removeSelectedCard(index: number) {
      let cards = selectedCards.slice()

      let updatedSelectedCards = selectedCards.slice(0, index).concat(cards.slice(index + 1, cards.length))
      let updatedAvailableCards = checkCards(availableCards)

      setSelected(updatedSelectedCards)
      setAvailable(updatedAvailableCards)

    }

    return (
        <Box alignSelf={alignSelf}>
            <Button leftIcon={<AddIcon />} colorScheme='green' onClick={openDrawer} >
                Create
            </Button>
            <Drawer isOpen={isOpen} size='xl' placement="right" onClose={onClose} initialFocusRef={initialRef} >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">
                        Create a new deck
                    </DrawerHeader>

                    <DrawerBody>
                        <Formik initialValues={{deckName: '', cards: Array(0)}} onSubmit={onSubmit}>
                            {(props: any) => 
                                <Form id='createDeck'>
                                    <Stack spacing="24px" divider={<StackDivider />}>
                                        <FormField  id="deckName" 
                                                    validation={nonEmpty} 
                                                    formField={({ field, form }: any) => 
                                                        <UnrequiredGenericForm field={field}
                                                                error={form.errors.deckName}
                                                                touched={form.touched.deckName}
                                                                id='deckName'
                                                                label='Name'
                                                                placeholder='Please enter deck name'
                                                                />} />
                                        
                                        <Stack>
                                            <FormLabel>Search cards</FormLabel>

                                            <InputGroup>
                                                <Input
                                                    type="text"
                                                    id="searchCardsByName"
                                                    placeholder="Please enter card name"
                                                />

                                                <InputRightElement width='5rem'>
                                                    <Button size='md' height='2.35rem' onClick={searchCardsByName}>
                                                        Search
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>

                                            <InputGroup>
                                                <Input
                                                    type="text"
                                                    id="searchCardById"
                                                    placeholder="Please enter card id"
                                                />

                                                <InputRightElement width='5rem'>
                                                    <Button size='md' height='2.35rem' onClick={searchCardById}>
                                                        Search
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                        </Stack>

                                        //TODO bindear items seleccionados al form
                                        
                                        <FormLabel >Available cards</FormLabel>
                                        <CardsGrid  cards={availableCards} 
                                                    withCheckbox={true} 
                                                    updateCard={(card, checked) => updateCard(card, checked)} 
                                                    updateAllCards={(checked) => updateAllCards(checked)} />

                                        <Box>
                                            <FormLabel >Selected cards</FormLabel>
                                            <CardsGrid cards={selectedCards} withButton={true} removeCard={removeSelectedCard} />
                                        </Box>
                                    </Stack>
                                </Form>
                            }
                        </Formik>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Button ref={initialRef} variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" type='submit' form='createDeck'>Create</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}


function cards(): CardAttributes[] {
  let cs = Array(12).fill(0)

  return(cs.map((_, i) => createCard(i)))
}
  
function createCard(id: number): CardAttributes {
  return {
    "id": id,
    "name": "Batman" + id,
    "powerstats": {
      "height": 178,
      "weight": 77,
      "intelligence": 81,
      "speed": 29,
      "power": 63,
      "combat": 90,
      "strength": 40
    },
    "imageUrl": "https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg"
  }
}