import React from 'react';
import { Text, TextInput, View, ScrollView, Alert, TouchableOpacity, BackHandler } from 'react-native';
import { Switch } from 'react-native-switch';
import ModalSelector from 'react-native-modal-selector';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import { Button } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NetInfo from "@react-native-community/netinfo";
import Orase from "../../resources/orase.json";
import styles from './styles';
import { addJob } from '../../redux/actions/addSalary';

import { AppSizes, AppStyles, AppColors } from '../../theme/';

class AddView extends React.Component {
  constructor(props) {
    super(props);
    this.tasksRef = this.getRef().child('salaries');
    this.state = {
      avatar: "",
      roleState: "",
      companyState: "",
      salaryState: "",
      cityState: "",
      bonus: "",
      accepted: false,
      tickets: false,
      experience: '',
      rolecompany: '',
      detailsState: '',
      isConnected: true,
      visible: false,
      buttonValue: 'Alege orasul'
    }
  }


  onChangeExp(text) {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
    }
    this.setState({ experience: newText })
  }

  getRef() {
    return firebaseApp.database().ref();
  }
  componentDidMount() {
    NetInfo.addEventListener(
      this.handleConnectivityChange
    );
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
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
    this.props.navigation.goBack();
    return true;
  }

  _addTask() {
    if (this.state.isConnected) {
      var str1 = this.state.companyState;
      var str2 = this.state.roleState;
      var avt = 'https://firebasestorage.googleapis.com/v0/b/salario-57bf3.appspot.com/o/Screen%20Shot%202019-05-16%20at%2021.04.46.png?alt=media&token=76a35af3-90e1-42f4-ae44-aed6b7cd08e5';
      var res = str1.concat(str2);
      res = res.replace(/\s/g, '');

      if (this.state.roleState == "") {
        Alert.alert(
          '',
          'Nume job invalid',
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        )
      }
      else if (this.state.companyState == "") {
        Alert.alert(
          '',
          'Nume companie invalid',
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        )
      }
      else if (this.state.salaryState == "" || this.state.salaryState == "0" || this.state.salaryState.match(/[a-z]/i)) {
        Alert.alert(
          '',
          'Salariu invalid',
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        )
      }
      else if (this.state.cityState == "") {
        Alert.alert(
          '',
          'Nume oras invalid',
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        )
      }
      else if (this.state.experience == "") {
        Alert.alert(
          '',
          'Te rugam sa completezi experienta',
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        )
      }
      else {
        this.props.addJob(false, avt, this.state.roleState, this.state.companyState, this.state.salaryState, this.state.cityState, this.state.bonus,
          this.state.tickets, this.state.experience, this.state.detailsState, res);
        this.setState({
          roleState: "", companyState: "", salaryState: "", cityState: "", bonus: false, experience: "", detailsState: "",
          rolecompany: "", tickets: false, accepted: false
        });
        alert("Salariu adaugat cu succes!");
      }
    } else {
      Alert.alert(
        'Nu esti conectat la internet!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
    }
  }

  onCancel = () => {
    this.setState({
      visible: false
    });
  }

  onPressDropdown = () => {
    this.setState({
      visible: true
    });
  }


  render() {
    let dataCities = Orase;
    const visible = this.state.visible;
    let index = 0;
    const data = [
      { key: index++, section: true, label: 'Ani Experienta' },
      { key: index++, label: '<1 an' },
      { key: index++, label: '1-2 ani' },
      { key: index++, label: '2-3 ani' },
      { key: index++, label: '3-4 ani' },
      { key: index++, label: '4-5 ani' },
      { key: index++, label: '5-7 ani' },
      { key: index++, label: '7-10 ani' },
      { key: index++, label: '10+ ani' },
    ];

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>

          <View style={styles.fumiStyle}>
            <Fumi
              label={'Numele jobului'}
              iconClass={FontAwesomeIcon}
              iconName={'briefcase'}
              iconColor={'#f95a25'}
              iconSize={20}
              onChangeText={(text) => this.setState({ roleState: text })}
              value={this.state.roleState}
            />
          </View>
          <View style={styles.fumiStyle}>
            <Fumi
              label={'Numele companiei'}
              iconClass={FontAwesomeIcon}
              iconName={'building'}
              iconColor={'#f95a25'}
              iconSize={20}
              value={this.state.companyState}
              onChangeText={(text) => this.setState({ companyState: text })}
            />
          </View>
          <View style={styles.fumiStyle}>
            <Fumi
              label={'Salariul net pe luna'}
              iconClass={FontAwesomeIcon}
              iconName={'money'}
              iconColor={'#f95a25'}
              iconSize={20}
              value={this.state.salaryState}
              onChangeText={(text) => this.setState({ salaryState: text })}
            />
          </View>

          <View style={styles.fumiStyleDetails}>
            <Fumi
              label={'Alte detalii'}
              multiline={true}
              numberOfLines={4}
              iconClass={FontAwesomeIcon}
              iconName={'info-circle'}
              iconColor={'#f95a25'}
              iconSize={20}
              value={this.state.detailsState}
              onChangeText={(text) => this.setState({ detailsState: text })}
            />
          </View>

          <View style={styles.labelContainer}>

            <View style={styles.labelStyle}>
              <Text style={styles.labelStyleText}>
                Oras
   </Text>
            </View>
            <View style={styles.dropdown}>

              <TouchableOpacity
                style={styles.buttonDrop}
                onPress={this.onPressDropdown}
              >
                <Text style={styles.buttonDropText}> {this.state.buttonValue}</Text>
              </TouchableOpacity>
              <ModalFilterPicker
                visible={visible}
                onSelect={(text) => this.setState({ cityState: text, visible: false, buttonValue: text })}
                onCancel={this.onCancel}
                options={dataCities}
              />
            </View>
          </View>


          <View style={styles.labelContainer}>

            <View style={styles.labelStyle}>
              <Text style={styles.labelStyleText}>
                Tichete de masa
   </Text>
            </View>


            <Switch
              onValueChange={(value) => this.setState({ tickets: value })}
              value={this.state.tickets}
              disabled={false}
              activeText={'DA'}
              inActiveText={'NU'}
              borderColor={'#D9D9D9'}
              backgroundActive={'#5DC2E8'}
              backgroundInactive={'gray'}
              circleActiveColor={'#DEDEDE'}
              circleInActiveColor={'#DEDEDE'} />
          </View>

          <View style={styles.fumiStyle}>
            <Fumi
              label={'Bonus pe an'}
              iconClass={FontAwesomeIcon}
              iconName={'gift'}
              iconColor={'#f95a25'}
              iconSize={20}
              value={this.state.bonus}
              onChangeText={(text) => this.setState({ bonus: text })}
            />
          </View>

          <View style={styles.labelContainer}>

            <View style={styles.labelStyle}>
              <Text style={styles.labelStyleText}>
                Experienta
              </Text>
            </View>

            <ModalSelector
              data={data}
              initValue="Alege experienta"
              onChange={(option) => { this.setState({ experience: option.label }) }}>

              <TextInput
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 7, height: 30, width: AppSizes.screen.width * 0.5, textAlign: 'center' }}
                editable={false}
                placeholder="Alege experienta"
                value={this.state.experience} />

            </ModalSelector>
          </View>

          <View style={[styles.buttonStyle]}>
            <Button
              raised
              icon={{ name: 'send' }}
              backgroundColor='#5DC2E8'
              title='ADAUGA'
              onPress={() => this._addTask()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ addJob }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddView);
