import React from 'react'
import { render } from 'react-dom'
import Menude from '../../src'
import styled, { css } from 'styled-components'
const matchIdxProp = prop => (...matchers) => o => matchers[o[prop]]
const matchDeepness = matchIdxProp`deepness`
const Wrapper = styled.ul`
  align-items: space-betweeen;

  ${matchDeepness(
    css`
      background-color: red;
    `,
    css`
      background-color: black;
    `
  )};
`
const Item = styled.li`
  ${Wrapper}:hover & {
    display: flex;
  }
  ${matchDeepness(
    css`
      background-color: red;
    `,
    css`
      display: none;
      color: white;
    `,
    css`
      display: none;
      color: white;
    `
  )};
`
const App = () => (
  <Menude
    components={{
      Wrapper,
      Item
    }}
    items={[
      { id: 'Accueil' },
      {
        id: 'Produits',
        childs: [{ id: 'truc', childs: [{ id: 'chose' }] }]
      }
    ]}
  />
)
render(<App />, document.getElementById('root'))
