import React from 'react';
import { View, FlatList} from 'react-native';

import styles from './styles';
import RowSimilar from '../RowSimilar/RowSimilar';

export default class ListSimilar extends React.Component {
    constructor(props) {
        super(props);
      }

  render() {
       function objectLength(obj) {
        var result = 0;
        for(var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            result++;
          }
        }
        return result;
      }

    const countItems = objectLength(this.props.firebaseData);
      
    if(countItems > 2)
      {var firebaseData = this.props.firebaseData.length > 5 ? this.props.firebaseData.slice(0,4) : this.props.firebaseData;}
    else
     { var firebaseData = this.props.firebaseData; }

    return (
        <View style={styles.container}>
         <FlatList
            data={firebaseData}
            renderItem={({item}) => <RowSimilar key={item.id} {...item} navigation={this.props.navigation} />}
            keyExtractor={(item, index) => index}
          />
      </View>
    );
  }
}