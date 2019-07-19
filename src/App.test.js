import React from 'react'
import App from './App'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
jest.mock('./__mocks__/getItem')

Enzyme.configure({ adapter: new Adapter() })

describe('App', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<App debug />)
    expect(component).toMatchSnapshot()
  })
})
