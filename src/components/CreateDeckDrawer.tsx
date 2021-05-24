import React, { RefObject } from "react"
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
    const [ availableCards, setAvailableCards ] = React.useState(cards())

    let selectedCards = availableCards.slice(0, availableCards.length / 2) //FIXME

    function onSubmit(deck: Deck) {
        console.log(deck)
        //onClose()
    }

    function searchCardsByName() {
        setAvailableCards(cards()) //FIXME
    }

    function searchCardById() {
        setAvailableCards(cards().slice(0,1)) //FIXME
    }

    return (
        <Box alignSelf={alignSelf}>
            <Button leftIcon={<AddIcon />} colorScheme='green' onClick={onOpen} >
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

                                        //TODO vindear items seleccionados al form
                                        
                                        <FormLabel >Available cards</FormLabel>
                                        <CardsGrid cards={availableCards} withCheckbox={true} withButton={false} />

                                        <Box>
                                            <FormLabel >Selected cards</FormLabel>
                                            <CardsGrid cards={selectedCards} withCheckbox={false} withButton={true} />
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


function cards() {
    return([
      {
        "id": 69,
        "name": "Batman",
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
      },
      {
        "id": 69,
        "name": "Batman",
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
      },
      {
        "id": 69,
        "name": "Batman",
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
      },
      {
        "id": 69,
        "name": "Batman",
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
      },
      {
        "id": 69,
        "name": "Batman",
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
      },
      {
        "id": 69,
        "name": "Batman",
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
      },
      {
        "id": 69,
        "name": "Batman",
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
    ])
  }
  