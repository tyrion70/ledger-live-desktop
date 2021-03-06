// @flow

import React, { PureComponent, Fragment } from 'react'

import type { LedgerScriptParams } from 'helpers/common'

import Box from 'components/base/Box'
import Space from 'components/base/Space'
import Input from 'components/base/Input'
import Search from 'components/base/Search'

import SearchIcon from 'icons/Search'
import CrossIcon from 'icons/Cross'

type Props = {
  list: Array<LedgerScriptParams>,
  children: (list: Array<LedgerScriptParams>) => React$Node,
}

type State = {
  query: string,
  focused: boolean,
}

class AppSearchBar extends PureComponent<Props, State> {
  state = {
    query: '',
    focused: false,
  }

  handleChange = (query: string) => this.setState({ query })

  handleFocus = (bool: boolean) => () => this.setState({ focused: bool })

  reset = () => {
    const { input } = this
    this.setState(state => ({ ...state, query: '' }), () => input && input.focus())
  }

  input = null

  render() {
    const { children, list } = this.props
    const { query, focused } = this.state

    const color = focused ? 'black' : 'grey'

    return (
      <Fragment>
        <Input
          innerRef={c => (this.input = c)}
          type="text"
          value={query}
          onChange={this.handleChange}
          onFocus={this.handleFocus(true)}
          onBlur={this.handleFocus(false)}
          placeholder={'Search app'}
          renderLeft={
            <Box pl={3} justify="center">
              <SearchIcon size={16} style={{ color }} />
            </Box>
          }
          renderRight={
            query ? (
              <Box justify="center" cursor="pointer" onClick={this.reset} px={3}>
                <CrossIcon size={16} />
              </Box>
            ) : null
          }
        />
        <Space of={30} />
        <Search
          fuseOptions={{
            threshold: 0.5,
            keys: ['name'],
          }}
          value={query}
          items={list}
          render={items => children(items)}
        />
      </Fragment>
    )
  }
}

export default AppSearchBar
