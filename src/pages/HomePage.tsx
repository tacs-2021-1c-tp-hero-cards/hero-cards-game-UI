import React from 'react'
import { Stack, Image, Button, StackDivider, SimpleGrid } from "@chakra-ui/react"
import { redirect } from '../commons/Redirect'
import { MainHeader } from '../components/MainHeader'
import { RedirectableComponent, RedirectableState } from '../components/RedirectableComponent'
import { Card } from '../components/Card'
import { CardsGrid } from '../components/CardsGrid'


export class HomePage extends RedirectableComponent<{}, RedirectableState> {

  constructor(props: any) {
    super(props)
    this.state = {
      shouldRedirect: false,
      redirectTo: ''
    }
  }

  content() {
    return <Stack spacing='1px'>
      
      <MainHeader page={this} />

      <Stack direction='row' spacing='1px'>

        <Stack padding='4'
               bg='gray.200'
               borderRadius='7px'
               minW='200px'
               divider={<StackDivider borderColor='gray.500' />}>

          <Button colorScheme="orange"
                  variant="solid"
                  textColor='gray.700'
                  onClick={() => redirect('/logIn', this)}>
            Log In
          </Button>
          
          <Button colorScheme="orange"
                  variant="solid"
                  textColor='gray.700'
                  onClick={() => redirect('/signUp', this)}>
            Sign Up
          </Button>

        </Stack>

        <Stack spacing='1px'>

          <Image src={'https://pressover.news/wp-content/uploads/2019/04/dc-marvel.jpg'} borderRadius='7px' />

        </Stack>

      </Stack>

      <CardsGrid cards={lala()}/>
    </Stack>
  }
}


function lala() {
  return([
    Card({
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
    }),
    Card({
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
    }),
    Card({
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
    })
  ])
}