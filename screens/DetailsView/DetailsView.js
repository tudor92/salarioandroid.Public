import React from 'react';
import { Text, View, Image, ScrollView, BackHandler, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { Divider } from 'react-native-elements';
import Speedometer from 'react-native-speedometer-chart';
import TimerMixin from 'react-timer-mixin';
import DeviceInfo from 'react-native-device-info';
import { AirbnbRating } from 'react-native-ratings';
import ListSimilar from '../../components/ListSimilar/ListSimilar';
import Loader from '../../components/Loader/Loader';
import styles from './styles';

import {trackScreenView, trackEvent} from '../../config/analyticsFirebase';

export default class DetailsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            age: this.props.navigation.state.params.salary,
            role: this.props.navigation.state.params.role,
            maxSalary: 20000,
            minSalary: 0,
            averageSalary: 0,
            rating: 2,
            noRates: 1,
            voted: false,
            isLoading: true,
            itemsDataSource: [],
            data: {
                labels: [],
                datasets: [{
                    data: []
                }]
            }
        }

        this.itemsRef = this.getRef().child('salaries');
        this.updateQTY = this.updateQTY.bind(this);
        this.updateRating = this.updateRating.bind(this);

    }

    getRef() {
        return firebaseApp.database().ref();
    }

    componentWillMount() {
        this.getItems(this.itemsRef);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        this.defaultRating();

        let time = this.props.navigation.state.params.timestamp;
        let date = new Date(time);
        let formatted = date.toLocaleDateString(); 

        let rating = this.props.navigation.state.params.rating;
        this.setState({timestamp: formatted,rating: rating});

        let title = this.props.navigation.state.params.role.toString();
        let company = this.props.navigation.state.params.company.toString();

        trackEvent('Role', title);
        trackEvent('Company', company);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    checkDevice () {
        const uniqueId = DeviceInfo.getUniqueID();
      }
    
      updateQTY() {
        return this.currentQTY()
          .then(noRates => firebaseApp.database().ref('salaries/'+this.props.navigation.state.params.id).update({noRates}));
      }
      
      async currentQTY(){
        const snapshot = await firebaseApp.database().ref('salaries/'+this.props.navigation.state.params.id).once('value');
        this.setState({
            newRates: snapshot.val().noRates + 1,
          });
        return snapshot.val().noRates + 1;
      }

      updateRating() {
        return this.currentRating()
          .then(rating => firebaseApp.database().ref('salaries/'+this.props.navigation.state.params.id).update({rating}));
      }
      
      async currentRating(){
        const snapshot = await firebaseApp.database().ref('salaries/'+this.props.navigation.state.params.id).once('value');
        const media = snapshot.val().rating / this.state.newRates;
        this.setState({
          newRating: media,
        });
        return snapshot.val().rating + this.state.rating;
      }
    
      async defaultRating(){
        const snapshot = await firebaseApp.database().ref('salaries/'+this.props.navigation.state.params.id).once('value');
        const media = Math.ceil(snapshot.val().rating / snapshot.val().noRates) ;
        this.setState({
          newRating: media,
        });
      }
    
    
      ratingCompleted(rating) {
        this.setState({
          voted: true,
          rating: rating
        });
    
        this.updateQTY();
        this.updateRating();
    
        this.defaultRating();
        alert("Multumim pentru feedback!");
    }

    getItems(itemsRef) {
        var searchTextRole = this.props.navigation.state.params.role;
        var sum = 0;

        if (searchTextRole == "") { }
        else {
            itemsRef.orderByChild('role').on('value', (snap) => {
                items = [];
                snap.forEach((child) => {
                    if (child.val().role.toUpperCase().indexOf(searchTextRole.toUpperCase()) > -1 )
                    {
                        items.push({
                            accepted: child.val().accepted,
                            id: child.key,
                            title: child.val().title,
                            role: child.val().role,
                            category: child.val().category,
                            avatar: child.val().avatar,
                            salary: child.val().salary,
                            city: child.val().city,
                            company: child.val().company,
                            experience: child.val().experience,
                            bonus: child.val().bonus,
                            tickets: child.val().tickets,
                        });
                        sum+=parseInt(child.val().salary);
                    }
                });
               var forChart = items.map(function (a) { return a.salary; });

                items.sort((term1, term2) => parseInt(term1.salary) - parseInt(term2.salary));

                this.setState({
                    itemsDataSource: items,
                    datasets: forChart
                });

            });

            TimerMixin.setTimeout(() => {
                if (this.state.itemsDataSource.length === 1) {
                    this.setState({
                        maxSalary: parseInt(this.state.itemsDataSource[0].salary),
                        minSalary: parseInt(this.state.itemsDataSource[0].salary),
                        averageSalary: parseInt(this.state.itemsDataSource[0].salary),
                        isLoading: false
                    });
                }
                this.setState({
                    maxSalary: parseInt(this.state.itemsDataSource[this.state.itemsDataSource.length - 1].salary),
                    minSalary: parseInt(this.state.itemsDataSource[0].salary),
                    averageSalary: sum/this.state.itemsDataSource.length,
                    isLoading: false
                });

                //all variables are computed - > remove the current item from the list

                let filteredArray = this.state.itemsDataSource.filter(item => item.id.toString() != this.props.navigation.state.params.id.toString())

                this.setState({
                    itemsDataSource: filteredArray
                });

            }, 1500);
        }


    }
    render() {

        const isLoading = this.state.isLoading;
        var boolValue = this.props.navigation.state.params.tickets.toString() == 'true' ? 'da' : 'nu';

        if (isLoading) {
            return <Loader
                loading={this.state.isLoading} />;
        }

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.companyImage}>
                    <Image
                        source={{ uri: this.props.navigation.state.params.avatar }}
                        style={[styles.logo]}
                        resizeMode='center'
                    />
                </View>
                <View style={styles.detailsContainer}>
                    <LinearGradient colors={['#eeeeee', '#f4f4f4', '#fff']} style={styles.linearGradient}>
                        <View style={styles.firstT}>
                            <Icon name="map-marker" size={18} color="#B8B8B8" />
                            <Text style={styles.thumbsText}>
                                {this.props.navigation.state.params.city}
                            </Text>
                        </View>
                        <View style={styles.secondT}>
                            <Icon name="briefcase" size={18} color="#B8B8B8" />
                            <Text style={styles.thumbsText}>
                                {this.props.navigation.state.params.salary}
                            </Text>
                            <Text style={styles.smallText}>RON/luna</Text>
                        </View>
                        <View style={styles.thirdT}>
                            <Icon name="calendar" size={18} color="#B8B8B8" />
                            <Text style={styles.thumbsText}>
                                {this.props.navigation.state.params.experience}
                            </Text>
                            <Text style={styles.smallText}>ani</Text>
                        </View>
                    </LinearGradient>
                    <Text style={styles.roleText}>
                        {this.props.navigation.state.params.role}
                    </Text>
                    <Text style={styles.companyText}>
                        {this.props.navigation.state.params.company}
                    </Text>
                    <View style={styles.contentDetails}>
                        <Text style={styles.bonusText}>
                            <Icon name="plus-circle" size={14} color="#B8B8B8" />
                            <Text style={styles.boldText}> Bonus:</Text>{" "}
                            {this.props.navigation.state.params.bonus}
                        </Text>
                        <Text style={styles.bonusText}>
                            <Icon name="info-circle" size={14} color="#B8B8B8" />
                            <Text style={styles.boldText}> Alte informatii:</Text>{" "}
                            {this.props.navigation.state.params.details}
                        </Text>
                        <Text style={styles.bonusText}>
                            <Icon name="info-circle" size={14} color="#B8B8B8" />
                            <Text style={styles.ticketsText}> Tichete masa:</Text>{" "}
                            <Text style={styles.boldText}>
                                {boolValue.toUpperCase()}
                            </Text>
                        </Text>
                        <Text style={styles.bonusText}>
                            <Icon name="clock-o" size={14} color="#B8B8B8" />
                            <Text style={styles.ticketsText}> Data postarii: </Text>
                                <Text>
                                    {this.state.timestamp}
                                </Text>
                        </Text>
                    </View>
                    <View style={styles.sliderView}>
                    <AirbnbRating
                    count={3}
                    reviews={["Nereal", "Credibil", "Real"]}
                    defaultRating={this.state.newRating}
                    size={20}
                    isDisabled={this.state.voted ? true : false}
                    onFinishRating={(rating) => this.ratingCompleted(rating)}
                    />
                    </View>
                    <Divider style={styles.dividerBar} />

                    <Text style={styles.roleText}>
                        Interval salarial
                </Text>
                    <Text style={styles.companyText}>
                        In comparatie cu salariile similare
                </Text>
                    <View style={styles.sliderView}>
                        <Speedometer
                            value={Number(this.props.navigation.state.params.salary)}
                            totalValue={Number(this.state.maxSalary)}
                            size={250}
                            outerColor="#d3d3d3"
                            internalColor="#cccccc"
                            showText
                            text="din maxim"
                            textStyle={{ color: 'grey' }}
                            showLabels
                            labelStyle={{ color: 'grey' }}
                            showPercent
                            percentStyle={{ color: 'grey' }}
                        />
                    </View>
                    <Divider style={styles.dividerBar} />
                    <Text style={styles.roleText}>
                        Salarii similare
                </Text>
                    <ListSimilar salaryRole={this.props.navigation.state.params.role} navigation={this.props.navigation}
                        firebaseData={this.state.itemsDataSource} />
                </View>
            </ScrollView>
        );
    }
}