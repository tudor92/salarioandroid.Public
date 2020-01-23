import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import {trackScreenView, trackEvent} from '../../config/analyticsFirebase';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        styles: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.shape({}),
            PropTypes.object,
        ]),
        title: PropTypes.string,
        text: PropTypes.string,
        image: PropTypes.string,
        onPress: PropTypes.func,
    }

    static defaultProps = {
        title: " ",
        text: " ",
    }

    navigateOption = () =>
    {
        trackEvent('MainPageCard', this.props.title);

        this.props.navigation.navigate('DetailsView',
            {
                ...this.props
            })
    }

    render() {

        const obj = this.props;
        const isImageOnly = obj.title == " " ? true : false;
        let title = PropTypes.string;
        let onpressFunction = () =>{};

        if(!isImageOnly)
        {
            onpressFunction = this.navigateOption;
            title = obj.title.length > 19 ? obj.title.slice(0, 19).trim()+'...' : obj.title;
        }

        return (
            
            <View style={obj.styles}>
            <TouchableOpacity onPress={onpressFunction} > 
                {isImageOnly ?
                    <Image
                        source={{ uri: obj.image }}
                        resizeMode='center'
                        style={{ flex: 2, width: obj.styles.width / 1.1 }}
                    />
                    :
                    <View style={{ flex: 2, width: obj.styles.width / 1.2 }}>
                        <Text textBreakStrategy='simple' style={{ fontWeight: 'bold', fontSize: 16, color: "black", textAlign: 'center', paddingTop: 10 }}>{title}</Text>
                    </View>
                }
                {isImageOnly ?
                    <View style={{ height: 1 }}></View>
                    :
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 10 }}>{obj.text}</Text>
                    </View>
                } 
              </TouchableOpacity>    
            </View>


        )
    }

}

