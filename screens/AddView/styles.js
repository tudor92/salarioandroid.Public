import {StyleSheet, Dimensions, Platform} from 'react-native';
const { width, height } = Dimensions.get('window');
import { AppSizes, AppStyles, AppColors } from '../../theme/';


export default StyleSheet.create({
    buttonStyle:{
        width: AppSizes.screen.width * 0.8,
        marginTop:20,
      },
      container: {
        //padding: 30,
        //marginTop: 30,
        height: AppSizes.screen.height * 1.2,
        alignItems: 'center'
      },
      labelStyleText: {
        fontSize: 16,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        color: '#696969',
        marginTop: 3,
      },
      labelContainer: {
        flexDirection: 'row',
        width: AppSizes.screen.width * 0.8,
        justifyContent: 'space-between',
        height: 50,
        marginTop: 10,
        backgroundColor: '#fff',
        padding: 10,
      },
      dropdown: {
        width: AppSizes.screen.width * 0.6,
        height: 80,
      },
      buttonDrop: {
        backgroundColor: 'rgba(0,0,0, 0.4)',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0, 0.4)',
      },
      buttonDropText: {
        color: '#fff'
      },
      fumiStyle: {
        width: AppSizes.screen.width * 0.8,
        height: AppSizes.screen.height * 0.1,
      },
      fumiStyleDetails: {
          width: AppSizes.screen.width * 0.8,
          height: 80
        },
        description: {
          marginBottom: 20,
          fontSize: 18,
          textAlign: 'center',
          color: '#656565'
        },
        container: {
          padding: 10,
          alignItems: 'center',
          height: AppSizes.screen.height,
          backgroundColor: '#fcfbfc',
        },
        flowRight: {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'stretch',
        },
        searchInput: {
          height: 36,
          padding: 4,
          marginRight: 5,
          flexGrow: 1,
          fontSize: 18,
          borderWidth: 1,
          borderColor: '#48BBEC',
          borderRadius: 8,
          color: '#48BBEC',
        },
        image: {
          width: 217,
          height: 138,
        },
        offlineContainer: {
            backgroundColor: '#b52424',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            width: AppSizes.screen.width,
            position: 'absolute',
            top: 30
          },
          offlineText: { color: '#fff' }
});