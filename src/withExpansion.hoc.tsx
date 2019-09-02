import React, { ComponentType, useState } from 'react'
import styled from 'styled-components/native'
import { ExpansionContext } from './Expansion.context'
import CardExpansion from './Card-Expansion.component'

export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U
type Props = {}
export const withExpansion = <P extends {}>(Component: ComponentType<P>) => {
  const Temp: React.FC<Overwrite<P, Props>> = props => {
    const [dimensions, setDimensions] = useState({
      offsetX: 0,
      offsetY: 0,
      elmHeight: 0,
      elmWidth: 0,
      selected: false
    })
    const { selected, ..._props } = dimensions
    return (
      <Container>
        <ExpansionContext.Provider value={{ dimensions, setDimensions }}>
          <Component {...props} />
          {selected ? <CardExpansion {..._props} /> : null}
        </ExpansionContext.Provider>
      </Container>
    )
  }

  Temp.displayName = `withSubmit(${Component.displayName})`
  return Temp as React.FC<Overwrite<P, Props>>
}

const Container = styled.View`
  flex: 1;
`
