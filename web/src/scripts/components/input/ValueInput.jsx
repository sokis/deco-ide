/**
 *    Copyright (C) 2015 Deco Software Inc.
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU Affero General Public License, version 3,
 *    as published by the Free Software Foundation.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import React, { Component } from 'react'
import { StylesEnhancer } from 'react-styles-provider'
import pureRender from 'pure-render-decorator'

import CheckboxInput from './CheckboxInput'
import ColorInput from './ColorInput'
import NumberInput from './NumberInput'
import SelectInput from './SelectInput'
import SliderInput from './SliderInput'
import StringInput from './StringInput'
import PrimitiveTypes from '../../constants/PrimitiveTypes'
import { EDIT_WITH, DROPDOWN_OPTIONS } from '../../constants/LiveValueConstants'

const stylesCreator = () => ({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    height: 30,
  },
})

@StylesEnhancer(stylesCreator)
@pureRender
export default class PropertyNumberInput extends Component {

  static propTypes = {
    value: React.PropTypes.any,
    type: React.PropTypes.string.isRequired,
    editWith: React.PropTypes.string,
    onChange: React.PropTypes.func,
    dropdownOptions: React.PropTypes.array,
  }

  static defaultProps = {
    onChange: () => {},
  }

  onChange = (value) => this.props.onChange(value)

  getDropdownOptions(dropdownOptions) {
    if (typeof dropdownOptions === 'string') {
      return DROPDOWN_OPTIONS[dropdownOptions] || []
    } else {
      return dropdownOptions || []
    }
  }

  renderInput() {
    const {value, type, editWith, dropdownOptions} = this.props
    const inputProps = {value, onChange: this.onChange}

    switch (type) {

      case PrimitiveTypes.STRING: {
        switch (editWith) {

          case EDIT_WITH.COLOR_PICKER: {
            return (
              <ColorInput {...inputProps} />
            )
          }

          case EDIT_WITH.DROPDOWN: {
            return (
              <SelectInput
                {...inputProps}
                options={this.getDropdownOptions(dropdownOptions)}
                showValueAsOption={true}
              />
            )
          }

          case EDIT_WITH.INPUT_FIELD: // Fallthrough
          default: {
            return (
              <StringInput {...inputProps} />
            )
          }
        }
      }

      case PrimitiveTypes.NUMBER: {
        return (
          <NumberInput {...inputProps} />
        )
      }

      case PrimitiveTypes.BOOLEAN: {
        return (
          <CheckboxInput {...inputProps} />
        )
      }

      default: {
        return null
      }
    }
  }

  render() {
    const {styles} = this.props

    return (
      <div style={styles.row}>
        {this.renderInput()}
      </div>
    )
  }
}
