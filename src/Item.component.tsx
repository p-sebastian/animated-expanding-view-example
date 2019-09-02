import React, { useRef, useCallback, useContext } from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import { ExpansionContext } from './Expansion.context'

const Item: React.FC<{ item: string }> = ({ item }) => {
  const { setDimensions } = useContext(ExpansionContext)
  const ref = useRef<View>(null)

  const onPress = useCallback(() => {
    ref.current!.measure((x, y, elmWidth, elmHeight, offsetX, offsetY) =>
      setDimensions({
        elmHeight,
        elmWidth,
        offsetX,
        offsetY,
        selected: true
      })
    )
  }, [ref])
  return (
    <Container ref={ref}>
      <Button onPress={onPress as any}>
        <ItemText>Item: {item}</ItemText>
      </Button>
    </Container>
  )
}

const Container = styled.View`
  height: 100;
  /* use margins instead of padding, else you'll need to remove it from elm size */
  margin-left: 10;
  margin-right: 10;
  margin-bottom: 10;
`
const Button = styled.TouchableOpacity`
  background: red;
  flex: 1;
`
const ItemText = styled.Text``

export default React.memo(Item)
