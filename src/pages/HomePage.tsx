import React from 'react'
import { Stack, Image } from "@chakra-ui/react"
import { MainHeader } from '../components/MainHeader'


export default function HomePage() {

  return (
    <Stack spacing='1px'>
      
      <MainHeader />

      <Stack direction='row' spacing='1px'>
        <Stack spacing='1px'>

          <Image src={'https://pressover.news/wp-content/uploads/2019/04/dc-marvel.jpg'} borderRadius='7px' fit='cover' width='120rem'/>

        </Stack>

      </Stack>

    </Stack>
  )
}

