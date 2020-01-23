import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  List,
  ListView,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Button
} from 'react-native'

import { ListItem } from 'react-native-elements'
import debounce from '../vendor/throttle-debounce/debounce'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

export default class AutoSuggest extends Component {
  static propTypes = {
    containerStyles: PropTypes.object,
    clearBtnStyles: PropTypes.object,
    clearBtnVisibility: PropTypes.bool,
    otherTextInputProps: PropTypes.object,
    placeholder: PropTypes.string, // textInput
    placeholderTextColor: PropTypes.string,
    onChangeText: PropTypes.func,
    onChangeTextDebounce: PropTypes.number,
    onItemPress: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    rowTextStyles: PropTypes.object,
    rowWrapperStyles: PropTypes.object,
    textInputStyles: PropTypes.object,
    terms: PropTypes.array

  }

  static defaultProps = {
    terms: [],
    clearBtnVisibility: false,
    placeholder: '',
    textInputStyles: {},
    otherTextInputProps: {},
    onChangeTextDebounce: 200
  }
  getInitialStyles () {
    const { textInputStyles } = this.props
    return {
      rowWrapperStyles: {
        zIndex: 999,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 0,
        paddingRight: 0,
        opacity: 0.8,
        borderTopColor: 'lightgrey',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1
      },
      rowTextStyles: {

      },
      clearBtnStyles: {

      },
      containerStyles: {
        zIndex: 999,
        width: 300,
        backgroundColor: textInputStyles.backgroundColor || 'white'
      },
      textInputStyles: { // textInput Styles
        paddingLeft: 10,
        paddingRight: 5,
        paddingBottom: 2,
        paddingTop: 2, 
        flex: 1,
        alignItems: 'center',
        height: 100
      }
    }
  }
  constructor (props) {
    super(props)
    this.clearTerms = this.clearTerms.bind(this)
    this.searchTerms = this.searchTerms.bind(this)
    this.setCurrentInput = this.setCurrentInput.bind(this)
    this.onItemPress = this.onItemPress.bind(this)
    this.state = {
      TIWidth: null,
      results: [],
      currentInput: null
    }
  }
  componentDidMount () {
    // when user hits the return button, clear the terms
    Keyboard.addListener('keyboardDidHide', () => this.clearTerms())
  }

  getAndSetWidth () {
    this.refs.TI.measure((ox, oy, width, ...rest) => {
      this.setState({ TIWidth: width })
    })
  }
  setCurrentInput (currentInput) {
    this.setState({currentInput})
  }

  clearInputAndTerms () {
    this.refs.TI.clear()
    this.clearTerms()
  }

  clearTerms () { this.setState({results: []}) }

  addAllTerms () { this.setState({results: this.props.terms}) }

  searchTerms (currentInput) {
    this.setState({ currentInput })
    debounce(300, () => {

      var fieldArray = currentInput.split(" ");
      this.getAndSetWidth()
      const findMatch = (term1, term2) => term1.toLowerCase().indexOf(term2.toLowerCase()) > -1
      const sortEntries = (term1, term2) => term1.toLowerCase().indexOf(fieldArray[0].toLowerCase()) - term2.toLowerCase().indexOf(fieldArray[0].toLowerCase())

      const results = this.props.terms.filter(eachTerm => {
        if (findMatch(eachTerm, currentInput)) return eachTerm
      })

      results.sort(sortEntries);

      //check if there are more than 2 inputs
      const inputIsEmpty = !!(currentInput.length <=2) 
      this.setState({results: inputIsEmpty ? [] : results.slice(0,8)}) // if input is empty don't show any results
    })()
  }

  // copy the value back to the input
  onItemPress (currentInput) {
    this.setCurrentInput(currentInput)
    this.clearTerms()
  }

  onSubmitEditing(currentInput)
  {
    this.setCurrentInput(currentInput);
  }

  getCombinedStyles (styleName) {
    let styleObj
    if (typeof this.props.styleName !== 'object') { // this is if its a stylesheet reference
      styleObj = StyleSheet.flatten([this.getInitialStyles()[styleName], this.props[styleName]])
    } else {
      // combine the  initial i.e default styles into one object.
      styleObj = { ...this.getInitialStyles()[styleName], ...this.props[styleName] }
    }
    return styleObj
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "110%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  render () {
    const {
      otherTextInputProps,
      placeholder,
      placeholderTextColor,
      clearBtn,
      clearBtnVisibility,
      onChangeTextDebounce,
      onItemPress
    } = this.props

    const cityIsEntered = (this.props.otherTextInputProps.city >2) 

    return (
      

      <View style={this.getCombinedStyles('containerStyles')}>
      <View
      ref="TIContainer"
      style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TextInput 
              {...otherTextInputProps}
              onSubmitEditing={this.props.onSubmitEditing}
              placeholderTextColor={placeholderTextColor}
              ref="TI"
              spellCheck={false}
              autoCorrect={false}
              underlineColorAndroid='transparent'
              defaultValue={this.state.currentInput}
              onChangeText={(el) => {
                this.searchTerms(el)
                debounce(onChangeTextDebounce, this.props.onChangeText(el))
              }}
              placeholder={placeholder}
              style={this.getCombinedStyles('textInputStyles')}
              />
        </View>
        { cityIsEntered  ?
        <TouchableOpacity >
             <Text>{this.props.otherTextInputProps.city}</Text> 
         </TouchableOpacity>
         :
         <View />
         }
            <FlatList
             //ItemSeparatorComponent={this.renderSeparator}
            keyboardShouldPersistTaps={'handled'}
            data={this.state.results}
            keyExtractor={item => item}
            initialNumToRender={4}
            renderItem={({ item }) => (
              <ListItem
                title={item}
                onPress={() => {
                  this.onItemPress(item)
                  if (onItemPress) onItemPress(item)
                }}
                style={{height:null}}
                titleStyle={{fontSize: 14, marginLeft: 0}}
                containerStyle={{ paddingHorizontal: 0, paddingVertical: 10}}
                titleNumberOfLines={2}
              />
            )}
          />
 

            { clearBtn // for if the user just wants the default clearBtn
              ? <TouchableOpacity onPress={() => this.clearInputAndTerms()}>
                { clearBtn }
              </TouchableOpacity>
            : false }

            { !clearBtn && clearBtnVisibility // for if the user passes a custom btn comp.
              ? <Button style={this.getCombinedStyles('clearBtnStyles')} title="Clear" onPress={() => this.clearInputAndTerms()} />
              : false
            }
    </View>

    )
  }
}

