import React from "react";
import {
  Alert,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableHighlight,
  LayoutAnimation,
  NativeModules,
  Keyboard,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  BackHandler,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AutoSuggest from "react-native-autosuggest";
import ModalFilterPicker from "react-native-modal-filter-picker";
import NetInfo from "@react-native-community/netinfo";
import TimerMixin from "react-timer-mixin";
import PropTypes from 'prop-types';

import {trackScreenView, trackEvent} from '../../config/analyticsFirebase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findRecom } from '../../redux/actions/findRecommendations';

import { AppSizes, AppStyles } from "../../theme/";
import Spacer from "../../components/Spacer";
import Orase from "../../resources/orase.json";
import Card from "../../components/Card/Card";
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button';

import styles from "./styles";
import { SearchScreen, Logo, whiteBg } from '../constants';



const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);


class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      filteredSearch: "",
      searchText: "",
      isConnected: true,
      xPosition: 0,
      yPosition: 0,
      introVisible: true,
      locationState: "Alege locatia",
      roles:[],
      isFetching: false
    };
  }

  componentWillMount()
  {
    this.props.findRecom("", "");
    this.setState({ isFetching: true });
  }

  componentDidMount() {
    NetInfo.addEventListener(
      this.handleConnectivityChange
    );
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    
    trackScreenView('SearchPage');
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  handleBackPress = () => {
    if (this.state.introVisible == true) {
      BackHandler.exitApp();
    }
    else {
      this.setState({ introVisible: true });
      return true;
    }
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  _onSearchPressed = textInput => {

    Keyboard.dismiss();

    let text = textInput.trim();

    if (this.state.isConnected) {
      if ( text == "" || text == undefined || typeof text === "undefined") {
        Alert.alert(
          "Cautare goala",
          "Nu ai cautat nimic!",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      } else 
      {

        this.props.navigation.navigate("ListJobsView", {
          searchResult: text,
          filteredSearchPage: this.state.filteredSearch
        });
      }
    } else {
      Alert.alert(
        "Nu esti conectat la internet!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  _onAddPressed = () => {
    Keyboard.dismiss();
    this.props.navigation.navigate("AddView");
  };

  onShow = () => {
    this.setState({ visible: true });
  };

  onSelect = filteredSearch => {
    this.setState({
      filteredSearch: filteredSearch,
      visible: false,
      locationState: filteredSearch
    });
  };

  onCancel = () => {
    this.setState({
      visible: false,
      filteredSearch: "",
      locationState:"Alege locatia"
    });
  };

  fetchSugestions (){
    fetch('http://www.devnative.ro/valid.json')
    .then((response) => response.json())
    .then((responseJson) => {
      const jobs = responseJson.Jobs;
      this.setState({ roles: jobs });
    })  
    .catch((error) => {
      console.error(error);
    });
  }

  render() {

    let that = this, listJobs=[], listCompanies = [];

    if(this.state.isFetching == true)
      setInterval(function(){that.setState({isFetching : false})}, 2000);

    let isFetched = this.props.recommendedItems.recommendedItems.latestJobs!=null && this.props.recommendedItems.recommendedItems.latestJobs!=undefined;

    const styleCard = {backgroundColor: "white", height: styles.carousel.height, width:styles.carousel.width, marginRight: 10, marginBottom:10,  alignItems:'center', borderRadius:10, justifyContent:'flex-end', shadowColor: "white", opacity: 0.9,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5};

   if(isFetched)
   {
    listJobs = Array.from(this.props.recommendedItems.recommendedItems.latestJobs, x => {
        return {...x, styles:{...styleCard}, text:x.salary.toString()+" RON/LUNA", title: x.role}; 
    })

    let companies = this.props.recommendedItems.recommendedItems.companies.slice(0, 5);

    listCompanies = Array.from(companies, x => {
      let newobj = {};
      newobj.image= x;
      newobj.styles = styleCard;
      return newobj; 
    })

   }

    if (!this.state.isConnected) {
      return (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
      );
    }

    
    if (this.state.isFetching) {
        return <Loader
        loading={this.state.isFetching} />;
    }
    

    const { visible } = this.state;
    let dataCities = Orase;
    let dataRoles = this.state.introVisible ? [] : this.state.roles;
    var CustomLayoutSpring = {
      duration: 200,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.4,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.4,
      },
    };

    return (
      <ImageBackground
        source={this.state.introVisible ? SearchScreen : whiteBg}
        style={[styles.background]}
        resizeMode= 'cover'
        backgroundColor = '#000000'
      >
        <View style={styles.container}>
        {this.state.introVisible ?
          <Image
            source={Logo}
            style={[styles.logo]}
          />
        :  <Spacer size={1} /> }
        {this.state.introVisible ? <Spacer size={1} /> : <Spacer size={1} />}
        {this.state.introVisible ?
          <View style={styles.searchBar}>
            <View
              style={styles.searchBarContainer}
            >
              <View style={{ flex: 1 }}>
                <TouchableHighlight
                  onPress={() => { this._onSearchPressed(this.state.searchText)}}
                  style={styles.iconSearch}
                >
                  <Icon name="search" size={18} color="#C9C9C9" />
                </TouchableHighlight>
              </View>
              <View style={{ flex: 6 }}>
                <AutoSuggest
                  placeholder="Ce salariu cauti ?"
                  containerStyles={{
                    width: AppSizes.screen.width * 0.65,
                    backgroundColor: "#fff",
                  }}
                  rowWrapperStyles={{
                    width: AppSizes.screen.width * 0.65,
                    backgroundColor: "#fff"
                  }}
                  onItemPress={textEntry => {
                    this.setState({ searchText: textEntry });
                    this._onSearchPressed(this.state.searchText)
                  }}
                  terms={dataRoles}
                  keyboardShouldPersistTaps={"handled"}
                  otherTextInputProps={{ padding : 0 }}
                  onChangeText={(textEntry) => { LayoutAnimation.spring(); this.setState({ searchText: textEntry, xPosition: 0, introVisible: false }); }}//0.18
                  textInputStyles={{ height: 35 }}
                  onSubmitEditing={textEntry =>
                    {
                    this.setState({ searchText: textEntry });
                    this._onSearchPressed(this.state.searchText)
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <TouchableHighlight
                  onPress={this.onShow}
                  style={styles.iconLocation}
                >
                  <Icon name="map-marker" size={18} color="#C9C9C9" />
                </TouchableHighlight>
              </View>
            </View>
              <Spacer size={10} />
                  <Button
                    small
                    raised={false}
                    title={"ADAUGA SALARIU"}
                    onPress={() => this._onAddPressed()}
                    backgroundColor={"rgba(255,255,255,0.5)"}
                    color={'white'}
                  />      
          </View>
            :
            (
              <View style={[styles.searchBarfull, { top: this.state.xPosition }]}>
                <View
                  style={{
                    flexDirection: "row",
                    width: window.width,
                    justifyContent: "space-between",
                    backgroundColor: "#fff",
                  }}
                >
                  <View style={{ flex: 1, alignItems: 'center',  alignContent: 'center'}}>
                    <TouchableWithoutFeedback
                      // activeOpacity={1.0}
                      onPress={() => {
                        Keyboard.dismiss();
                        LayoutAnimation.configureNext(CustomLayoutSpring);
                        TimerMixin.setTimeout(() => {
                          this.setState({ introVisible: true});
                        }, 500);
                      }}
                      style={styles.iconSearch}
                    >
                        <View style={{borderWidth: 15, borderColor:'white'}}>
                      <Icon
                        name="arrow-left"
                        size={20}
                        color={"rgba(220,220,220, 0.9)"}
                      />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  <View style={{ flex: 4 }}>
                    <AutoSuggest
                      placeholder="Ce salariu cauti?"
                      placeholderTextColor={"rgba(220,220,220, 0.9)"}
                      containerStyles={{ width: AppSizes.screen.width * 0.7 }}
                      rowWrapperStyles={{ width: AppSizes.screen.width * 0.7 }}
                      onItemPress={textEntry => {
                        this.setState({ searchText: textEntry });
                        Keyboard.dismiss();
                        this._onSearchPressed(textEntry);
                      }}
                      terms={dataRoles}
                      keyboardType="web-search"
                      otherTextInputProps={{ padding : 55 }}
                      onChangeText={textEntry => {
                        this.setState({ searchText: textEntry });
                        this.fetchSugestions();
                        //LayoutAnimation.spring();
                      
                      }}
                      textInputStyles={{
                        backgroundColor: "transparent",
                        height: 50,
                        fontSize: 17,
                        fontWeight: '400'
                      }}
                      onSubmitEditing={textEntry => {
                        this.setState({ searchText: textEntry });
                        this._onSearchPressed(this.state.searchText);
                      }}
                    />
                  </View>
                  <View style={{ flex: 1, alignItems: 'center',  alignContent: 'center'}}>
                    <TouchableHighlight
                      onPress={() => {
                        this._onSearchPressed(this.state.searchText.toString());
                      }}
                      style={styles.iconLocation}
                    >
                    <View style={{borderWidth: 15, borderColor:'white'}}>
                      <Icon
                        name="search"
                        size={20}
                        color={"rgba(220,220,220, 0.9)"}
                      />
                      </View>
                    </TouchableHighlight>
                  </View>
                  
                </View>
                <View style={styles.filterContainer}>
                <TouchableHighlight
                    onPress={this.onShow}
                    style={styles.iconLocation}
                  >
                   <Icon name="map-marker" size={21} color="#C9C9C9" style={styles.iconLocation} />
                  </TouchableHighlight>
                  <TouchableOpacity onPress={this.onShow}>
                    <TextInput
                      pointerEvents="none"
                      editable={false}
                      placeholder={this.state.locationState}
                      style = {{paddingLeft:AppSizes.screen.width/16+6, fontWeight: '400'}}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    backgroundColor: "white",
                    height: AppSizes.screen.height
                  }}
                />
              </View>
            )}
          <Spacer size={20} />
          <View style={[AppStyles.row, styles.paddingHorizontal]}>
            <View style={[AppStyles.flex2]}>
              <ModalFilterPicker
                visible={visible}
                onSelect={this.onSelect}
                onCancel={this.onCancel}
                options={dataCities}
              />
            </View>
          </View>
          <Spacer size={20} />
          <View style={[AppStyles.row, styles.paddingHorizontal]}>
            <Text
              style={[
                AppStyles.textCenterAligned,
                styles.whiteText
              ]}
            >Exploreaza Salarii Noi</Text>
          </View>
          <Spacer size={15} />
          <View style={[AppStyles.row, styles.paddingHorizontal]}>
            <FlatList
              data={listJobs}
              renderItem={({ item }) => <Card  {...item} navigation={this.props.navigation}/>}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
            />
       {/*
          <Card styles={styleCard} title="Software Engineer" text="3400 RON/LUNA" />
          <Card styles={styleCard} title="Software Engineer" text="3400 RON/LUNA" />
          
       */}
          </View>
          <Spacer size={20} />
          <View style={[AppStyles.row, styles.paddingHorizontal]}>
            <Text
              style={[
                AppStyles.textCenterAligned,
                styles.whiteText
              ]}
            >Companii Populare</Text>
          </View>
          <Spacer size={15} />
          <View style={[AppStyles.row, styles.paddingHorizontal]}>
            <FlatList
              data={listCompanies}
              renderItem={({ item }) => <Card  {...item} />}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

SearchPage.propTypes = {
  recommendedItems: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.recommendedItems.recommendedItems.isFetching,
    recommendedItems: state.recommendedItems,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ findRecom }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

export {SearchPage}; 
