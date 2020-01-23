import React from 'react';
import { Text, View, TouchableOpacity,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';


export default class RowSimilar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsView', 
            { 
                ...this.props
            //id: this.props.id, role: this.props.role, avatar: this.props.avatar, city: this.props.city, 
            //experience: this.props.experience, salary: this.props.salary, 
            //company: this.props.company, bonus: this.props.bonus, details: this.props.details, tickets: this.props.tickets, rating:this.props.rating, noRates: this.props.noRates  
            })} style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.imageView}>
                    <Image
                        source={{ uri: this.props.avatar }}
                        resizeMode='center'
                        style={[styles.logo]}
                    />
                </View>
                <View style={{ flexGrow: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={styles.role} numberOfLines={2}>
                            {this.props.role}
                        </Text>
                        <View style={{}}>
                                <Text style={styles.salary}>
                                    <Icon name="briefcase" size={16} color="#C9C9C9" /> {this.props.salary} <Text style={styles.salaryRon}>RON/luna</Text>
                                </Text>
                            </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        );
    }
}