import React from 'react'
import { GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'

type Positions = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type Props = {
  onPress?: (event: GestureResponderEvent) => void
  position?: Positions
  children: React.ReactNode
}
const AFAB: React.FC<Props> = ({
  children,
  onPress,
  position = 'bottom-right'
}) => {
  return (
    <Container position={position}>
      <Button onPress={onPress}>{children}</Button>
    </Container>
  )
}

const where = ({ position }: { position: Positions }) => {
  switch (position) {
    case 'top-left':
      return `top: 5; left: 5;`
    case 'top-right':
      return `top: 5; right: 5;`
    case 'bottom-left':
      return `bottom: 5; left: 5;`
    default:
      return `bottom: 5; right: 5;`
  }
}
/**
 * This circle in circle fixes, jagged edges of a
 * border in a circle
 */
const Container = styled.View<{ position: Positions }>`
  position: absolute;
  ${where}
  height: 60;
  width: 60;
  border-radius: 50;
  background: white;
  padding: 2px;
`
const Button = styled.TouchableOpacity`
  background: hsla(228, 11%, 28%, 1);
  border-radius: 40;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export default React.memo(AFAB)
