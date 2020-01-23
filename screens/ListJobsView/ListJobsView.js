import React from 'react';
import { Text, FlatList, View, TouchableHighlight, BackHandler, ImageBackground } from 'react-native';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {trackScreenView, trackEvent} from '../../config/analyticsFirebase';

import Row from '../../components/Row/Row';
import Spacer from '../../components/Spacer';
import Orase from "../../resources/orase.json";
import Loader from '../../components/Loader/Loader';
import styles from './styles';
import { fetchFirebase } from '../../redux/actions/fetchFirebase';
import { filterJob } from '../../redux/actions/filterJob';
import { sideBg } from '../constants';


FlatListItemSeparator = () => <View style={styles.line} />;

class ListJobsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Useless Placeholder',
      collapsed: true,
      cityState: "",
      companyState: "",
      filteredSearch: "",
      visible: false,
      sorted: false,
    }
  }

  onCancel = () => {
    this.setState({
      visible: false,
      collapsed: true,
    });
  }

  componentDidMount() {
    NetInfo.addEventListener(
      this.handleConnectivityChange
    );
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    var searchText = this.props.navigation.state.params.searchResult.toString();
    trackEvent('Searched', searchText );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  }

  componentWillMount() {

    var searchText = this.props.navigation.state.params.searchResult.toString();
    var filteredSearchPage = this.props.navigation.state.params.filteredSearchPage.toString();
    this.props.fetchFirebase(searchText, filteredSearchPage);
  }

  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed, visible: true, filteredSearch: "" });
  }

  _startSorting = filteredSearch => {
    this.props.items.items.sort(this.dynamicSort("salary"));
  };

  _startSortingReverse = filteredSearch => {
    this.props.items.items.sort(this.dynamicSort("salary")).reverse();
  };

  dynamicSort(property) {
    this.setState({
      filteredSearch: "",
      visibleModal: null,
      refresh: !this.state.refresh
    });
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property]*1 < b[property]*1) ? -1 : (a[property]*1 > b[property]*1) ? 1 : 0;
      return Number(result * sortOrder);
    }
  }


  _filterCity = (filteredSearch) => {
    this.setState({
      filteredSearch: filteredSearch,
      visible: false,
      collapsed: !this.state.collapsed,
    })
    this.props.navigation.state.params.filteredSearchPage = filteredSearch;

    var searchText = this.props.navigation.state.params.searchResult.toString();
    this.props.filterJob(searchText, filteredSearch);
  }

  renderModalContent = () => (
    <ImageBackground
      source={sideBg}
      style={[styles.background]}
    >
      <View style={styles.content}>
        <View style={styles.buttonsContainer}>
          <TouchableHighlight onPress={this._startSorting}>
            <View style={[styles.headerSort, styles.firstButton]}>
              <Icon name="sort-asc" size={18} color="#000" />
              <Text style={styles.headerTextSort}>Salariu</Text>
              <Text style={styles.headerTextSort}>Ascendent</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._startSortingReverse}>
            <View style={[styles.headerSort, styles.secondButton]}>
              <Icon name="sort-desc" size={18} color="#000" />
              <Text style={styles.headerTextSort}>Salariu</Text>
              <Text style={styles.headerTextSort}>Descendent</Text>
            </View>
          </TouchableHighlight>

        </View>
        <View style={styles.closeButton}>
          <TouchableHighlight onPress={() => this.setState({ visibleModal: null })}>
            <View style={[styles.closeButtonT, styles.secondButton]}>
              <Text style={styles.headerTextSort}>Inchide</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </ImageBackground>
  );
  render() {
    const isFetching = this.props.isFetching;
    const visible = this.state.visible;
    const filteredAssets = this.state.filteredSearch
      ? this.props.items.items.filter(asset => asset.city == this.state.filteredSearch)
      : this.props.items.items;
    const firebaseData = filteredAssets;

    let dataCities = Orase;
    if (isFetching) {
      return <Loader
        loading={this.props.isFetching} />;
    }

    if (firebaseData.length === 0) {
      return <View style={styles.containerNoResult}>
        <Text>Nu am gasit nimic care sa contina: <Text style={styles.noResult}>{this.props.navigation.state.params.searchResult}</Text></Text>
      </View>
    }

    return (
      <View style={styles.container}>
        <View style={styles.filter}>
          <TouchableHighlight onPress={this._toggleExpanded}>
            <View style={styles.header}>
              <View style={{ flex: 2 }}>
                <Text style={{ letterSpacing: 1, fontSize: 12 }}>{firebaseData.length} rezultate</Text>
              </View>
              <View style={{ flex: 3, flexDirection: "row", justifyContent: 'flex-end' }}>
                <Icon name="filter" size={18} color="#fff" />
                <Text style={styles.headerText}>Filtrare</Text>
                <Icon name="angle-down" size={18} color="#fff" />
              </View>
            </View>
          </TouchableHighlight>
          <Spacer size={10} />

          <Collapsible collapsed={this.state.collapsed} align="center">
            <View style={styles.content}>
              <View style={styles.dropdown}>
                <ModalFilterPicker
                  visible={visible}
                  onSelect={this._filterCity}
                  onCancel={this.onCancel}
                  options={dataCities}
                />
              </View>
            </View>
          </Collapsible>
        </View>


        <View>
          <FlatList
            data={firebaseData}
            renderItem={({ item }) => <Row key={item.id} {...item} navigation={this.props.navigation} />}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state.refresh}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            ListHeaderComponent={()=>(
              <TouchableHighlight >
              <View style={{flexDirection: "row", height: 30,  justifyContent: 'center' }}>
                <TouchableHighlight onPress={this._startSorting}>
                <Icon name="caret-down" size={36} color="black" />
                </TouchableHighlight>
                <Text style={styles.headerText}>        </Text>
                <TouchableHighlight onPress={this._startSortingReverse}>
                <Icon name="caret-up" size={36} color="black" />
                </TouchableHighlight>
              </View>
            </TouchableHighlight>
            )}
          />
         

        </View>
      </View>
    );
  }
}

ListJobsView.propTypes = {
  items: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    isFetching: state.items.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ fetchFirebase, filterJob }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListJobsView);
