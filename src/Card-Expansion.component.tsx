import React, { useState, useEffect, useContext, useCallback } from 'react'
import styled from 'styled-components/native'
import { Animated, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import FAB from './FAB.component'
import { ExpansionContext } from './Expansion.context'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

type Props = {
  offsetX: number
  offsetY: number
  elmHeight: number
  elmWidth: number
}
const CardExpansion: React.FC<Props> = ({
  offsetX,
  offsetY,
  elmHeight,
  elmWidth
}) => {
  const { dimensions, setDimensions } = useContext(ExpansionContext)
  const animatedValue = useAnimate()
  const interpolate = translate(animatedValue)
  // start shrinked down
  const initialScaleX = elmWidth / SCREEN_WIDTH
  const initialScaleY = elmHeight / SCREEN_HEIGHT
  /**
   * scaling is centered, so middle x and middle y of the screen
   * when scaling down, there is a remainder to each side which is
   * equivalent to the oposite scale, so if scale is .3, then remainder is .7 * width
   * since it is centered, remainder is equal on each side, so thats why its divided by 2
   * lastly the offset, is to correctly position it to where the element was.
   */
  const translateX = interpolate([
    offsetX - (SCREEN_WIDTH * (1 - initialScaleX)) / 2,
    0
  ])
  const translateY = interpolate([
    offsetY - (SCREEN_HEIGHT * (1 - initialScaleY)) / 2,
    0
  ])
  const scaleX = interpolate([initialScaleX, 1])
  const scaleY = interpolate([initialScaleY, 1])
  const animated = {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    transform: [{ translateX }, { translateY }, { scaleX }, { scaleY }],
    opacity: interpolate([0, 1])
  }
  const onPress = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 1000
    }).start(() => setDimensions({ ...dimensions, selected: false }))
  }, [animatedValue])

  return (
    <Expansion as={Animated.View} style={animated as any}>
      <FAB position="top-left" onPress={onPress as any}>
        <Ionicons name="md-close" color="white" size={32} />
      </FAB>
    </Expansion>
  )
}

const useAnimate = () => {
  const [animatedValue] = useState(new Animated.Value(0))
  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1
    }).start()
  }, [])
  return animatedValue
}

const translate = (animatedValue: Animated.Value) => (outputRange: number[]) =>
  animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange
  })

const Expansion = styled.View`
  /* VERY IMPORTANT, else when expanding it will displace Component from withExpansion */
  position: absolute;
  background: blue;
`
export default CardExpansion
