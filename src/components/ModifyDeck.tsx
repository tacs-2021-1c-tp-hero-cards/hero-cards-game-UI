import React, { useState } from "react"
import { CloseIcon } from "@chakra-ui/icons"
import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, 
        DrawerHeader, DrawerBody, Stack, Box, FormLabel, DrawerFooter, 
        StackDivider, Checkbox, SimpleGrid, IconButton, Text, CircularProgress, Center, Tooltip } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { FormField, UnrequiredGenericForm } from "./Form"
import { isNonEmpty, nonEmpty } from "../commons/InputValidations"
import { Card, CardAttributes, isInvalidCard } from "./Card"
import { DeckData, UpdatedDeck } from "./Deck"
import Collection from "../commons/Collections"
import { ServerConnector } from "../BackendConnector"
import { SubmitableInput } from "./SubmitableInput"
import { RedirectProps, ToastProps, TokenProps, withRedirect, withToast, withTokenValidation, withReload, 
        ReloadProps } from "../commons/BehaviorAddOns"
import { customToast, SubmitDataErrorToast } from "../commons/Toast"
import { EditIcon } from "./icons"

type InnerProps = { alignSelf?: string, deck: DeckData, buttonWidth?: string, buttonSize?: string, fontSize?: string }
type DrawerProps = RedirectProps & TokenProps & ToastProps & ReloadProps & InnerProps

type CheckedCardAttributes = CardAttributes & { checked: boolean }

export function ModifyDeck(props: InnerProps) { return( withRedirect(props) (withTokenValidation) (withToast) (withReload) (ModifyDeckContent) )}

function ModifyDeckContent({ 
        alignSelf, 
        deck, 
        buttonWidth,
        buttonSize,
        fontSize, 
        renderWithTokenValidation, 
        redirect, 
        toast, 
        reload 
    }: DrawerProps) {

    const initialRef = React.useRef(null)
    
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [ isLoading, setIsLoading ] = useState(true)
    const [ modifyLoading, setModifyLoading ] = useState(false)
    const [ searchByNameLoading, setSearchByNameLoading ] = useState(false)
    const [ searchByIdLoading, setSearchByIdLoading ] = useState(false)
    
    const [ selectedCards, setSelectedCards ] = useState(Collection.wrap(deck.cards))
    const [ availableCards, setAvailableCards ] = useState(Collection.empty<CheckedCardAttributes>())

    let allChecked = availableCards.filter(card => !isInvalidCard(card)).all(card => card.checked)
    let isIndeterminate = availableCards.any(card => card.checked) && !allChecked


    function setSelected(selected: Collection<CardAttributes>) {
        setSelectedCards(selected.sortBy((c1, c2) => c1.id - c2.id))
    }

    function setAvailable(available: Collection<CheckedCardAttributes>) {
        setAvailableCards(available.sortBy((c1, c2) => c1.id - c2.id))
    }

    function checkCards(cards: Collection<CheckedCardAttributes>, baseCards?: Collection<CardAttributes>): Collection<CheckedCardAttributes> {
        const selected = baseCards ?? selectedCards
        const checkedCards = cards.map(card => ({...card, checked: selected.any(c => c.id === card.id)}))

        return checkedCards
    }

    function openDrawer() {
        setIsLoading(true)

        ServerConnector.getCards(
            (cards) => {
                setIsLoading(false)
                setAvailable(checkCards(Collection.wrap(cards).filter(c => !isInvalidCard(c))))
            },
            (error) => {
                console.log(error)
                setIsLoading(false)
                setAvailable(Collection.empty())
            }
        )

        onOpen()
    }

    function closeDrawer() {
        setAvailable(Collection.empty())
        setSelected(Collection.empty())
        onClose()
    }

    function onSubmit({ deckName }: any) {
        if (selectedCards.isEmpty()) {
            toast(customToast('Empty deck', 'warning', 'Deck cannot be empty, you must select some cards'))
        } else {
            const updatedDeck: UpdatedDeck = {
                id: deck.id,
                deckName: deckName,
                deckCards: selectedCards.map(c => c.id).collection
            }
            setModifyLoading(true)
            
            ServerConnector.updateDeck(
                updatedDeck,
                (data) => { 
                    setModifyLoading(false)
                    closeDrawer()
                    redirect(`/decks/${data.id}`)
                    reload()
                },
                (error) => { 
                    setModifyLoading(false)
                    toast(SubmitDataErrorToast)
                }
            )
        }
    }

    function searchCardsByName(name: string) {
        setSearchByNameLoading(true)
        setIsLoading(true)

        ServerConnector.getCardByName(
            name,
            (cards) => {
                setSearchByNameLoading(false)
                setIsLoading(false)
                setAvailable(checkCards(Collection.wrap(cards)))
            },
            (error) => {
                setSearchByNameLoading(false)
                setIsLoading(false)
                setAvailable(Collection.empty())
            }
        )
    }

    function searchCardById(id: string) {
        setSearchByIdLoading(true)
        setIsLoading(true)

        ServerConnector.getCardById(
            id,
            (card) => {
                setSearchByIdLoading(false)
                setIsLoading(false)
                setAvailable(checkCards(Collection.from(card)))
            },
            (error) => {
                setSearchByIdLoading(false)
                setIsLoading(false)
                setAvailable(Collection.empty())
            }
        )
    }

    function updateSelectedCard(card: CheckedCardAttributes) {
      if (card.checked) {
        if (!selectedCards.any((c) => card.id === c.id)) {
          setSelected(selectedCards.add(card))
        }

      } else {
        const cardIndex = selectedCards.findIndex(c => card.id === c.id)
        const updatedItems = selectedCards.remove(cardIndex!)

        setSelected(updatedItems)
      }
    }

    function updateAllCards(checked: boolean) {
      if(checked) {
        let cards = availableCards.filter(card => !selectedCards.any(c => card.id === c.id) && !isInvalidCard(card))
        setSelected(selectedCards.concat(cards))

      } else {
        let cards = selectedCards.filter(card => !availableCards.any(c => card.id === c.id))
        setSelected(cards)
      }

      setAvailable(availableCards.map(card => ({...card, checked: checked})))
    }

    function removeSelectedCard(index: number) {
      let updatedSelectedCards = selectedCards.remove(index)

      setAvailable(checkCards(availableCards, updatedSelectedCards))
      setSelected(updatedSelectedCards)
    }

    function updateCheckedItems(index: number, checked: boolean) {
        const card = availableCards.get(index)!
        const updatedCard = {...card, checked: checked}
        const cards = availableCards.replace(index, updatedCard)

        setAvailable(cards)
        updateSelectedCard(updatedCard)
    }

    function content() {
        return (
            <Box alignSelf={alignSelf}>
                <Button leftIcon={<EditIcon />} colorScheme='teal' onClick={openDrawer} width={buttonWidth!} size={buttonSize} fontSize={fontSize}>
                    Modify
                </Button>
                <Drawer isOpen={isOpen} size='xl' placement="right" onClose={closeDrawer} initialFocusRef={initialRef} >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth="1px">
                            Modify deck
                        </DrawerHeader>
    
                        <DrawerBody>
                            <Formik initialValues={{ deckName: deck.name }} onSubmit={onSubmit} >
                                {(props: any) => 
                                    <Form id='modifyDeck'>
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
    
                                                <SubmitableInput    id='searchCardsByName' 
                                                                    placeHolder='Please enter card name' 
                                                                    buttonLabel='Search'
                                                                    label='Search cards by name' 
                                                                    isValid={isNonEmpty}
                                                                    onSubmit={searchCardsByName}
                                                                    isLoading={searchByNameLoading} />
    
    
                                                <SubmitableInput    id='searchCardsById' 
                                                                    placeHolder='Please enter card id' 
                                                                    buttonLabel='Search'
                                                                    label='Search card by id' 
                                                                    isValid={isNonEmpty}
                                                                    onSubmit={searchCardById}
                                                                    isLoading={searchByIdLoading} />
                                                
                                            </Stack>
    
                                            
                                            <Stack>
                                                <FormLabel>Available cards</FormLabel>
    
                                                { 
                                                    isLoading ? 
                                                    
                                                    <Center>
                                                        <CircularProgress isIndeterminate color="green.300" />  
                                                    </Center> :
                                                    
                                                    availableCards.isEmpty() ? 
    
                                                        <Text fontStyle='italic' fontSize='sm'>
                                                            No cards to show. Use search boxes above to find some results.
                                                        </Text> :
                                                        
                                                        <Stack>
                                                            <Checkbox 
                                                                isChecked={allChecked}
                                                                isIndeterminate={isIndeterminate}
                                                                onChange={(e) => updateAllCards(e.target.checked)}>
                                                                Select all cards
                                                            </Checkbox>
    
                                                            <SimpleGrid minChildWidth="200px" spacing="10px">
                                                                {availableCards.map(
                                                                    (card, index) => 
                                                                        isInvalidCard(card) ?
                                                                            <Tooltip hasArrow label='Invalid card' bgColor='red.500' placement='auto'>
                                                                                <Box><Card key={index} attributes={card}/></Box>
                                                                            </Tooltip> : 

                                                                            <Card   key={index}
                                                                                    attributes={card}
                                                                                    addOn={
                                                                                        <Checkbox   disabled={isInvalidCard(card)}
                                                                                                    isChecked={availableCards.get(index)!.checked}
                                                                                                    onChange={(e: any) => updateCheckedItems(index, e.target.checked)}/>
                                                                                        } />
                                                                    ).collection}
                                                            </SimpleGrid>
                                                        </Stack>
                                                }
                                            </Stack>
    
                                            <Stack>
                                                <FormLabel >Selected cards</FormLabel>
    
                                                {
                                                    selectedCards.isEmpty() ? 
    
                                                        <Text fontStyle='italic' fontSize='sm'>
                                                            No cards selected. Add some cards to see them here.
                                                        </Text> :
    
                                                        <SimpleGrid minChildWidth="200px" spacing="10px">
                                                            {selectedCards.map(
                                                                (card, index) => {
                                                                        return <Card    key={index}
                                                                                        attributes={card} 
                                                                                        addOn={
                                                                                            <IconButton size='xs' colorScheme="red" aria-label="Remove card" 
                                                                                                        icon={<CloseIcon />} 
                                                                                                        onClick={() => removeSelectedCard(index)}/>
                                                                                        } />
                                                                }).collection}
                                                        </SimpleGrid>
                                                }
                                            </Stack>
    
                                        </Stack>
                                    </Form>
                                }
                            </Formik>
                        </DrawerBody>
    
                        <DrawerFooter borderTopWidth="1px">
                            <Button ref={initialRef} variant="outline" mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue" type='submit' form='modifyDeck'  isLoading={modifyLoading} loadingText="Modifying">Modify</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Box>
        )
    }

    return(renderWithTokenValidation(content))
}
