import React, { Component, Fragment } from 'react'
import './styles.css'
import P from 'prop-types'

const item = { id: P.string.isRequired, childs: P.arrayOf(P.shape(item)) }

class Menude extends Component {
  static propTypes = {
    components: P.exact({
      Wrapper: P.func.isRequired,
      Item: P.func.isRequired
    }).isRequired,
    items: P.arrayOf(P.shape(item)).isRequired
  }

  renderChilds = (childs, deepness = 0) => {
    const {
      components: { Wrapper, Item }
    } = this.props
    return childs.map(({ id, childs, ...itemProps }) => (
      <Fragment key={id}>
        <Item {...itemProps} deepness={deepness}>
          {id}
        </Item>
        {childs &&
          childs.length > 0 && (
            <Wrapper deepness={deepness + 1}>
              {this.renderChilds(childs, deepness + 1)}
            </Wrapper>
          )}
      </Fragment>
    ))
  }
  render() {
    const {
      components: { Wrapper }
    } = this.props
    return <Wrapper deepness={0}>{this.renderChilds(this.props.items)}</Wrapper>
  }
}

export default Menude
