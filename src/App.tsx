import React from 'react'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import Item from './Item.component'
import { withExpansion } from './withExpansion.hoc'

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
export default function App() {
  return (
    <WithExpansion>
      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
      />
    </WithExpansion>
  )
}

const keyExtractor = (key: number) => key.toString()
const renderItem = ({ item }: any) => <Item key={item} item={item} />
const Container = styled.View`
  flex: 1;
`
const WithExpansion = withExpansion(Container)
