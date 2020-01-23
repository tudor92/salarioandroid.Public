import {StyleSheet, Dimensions, Platform} from 'react-native';
import { AppSizes, AppStyles, AppColors } from '../../theme/';

export default StyleSheet.create({
    theZ:{
        zIndex: 1,
    },
    selectedLocationContainer:{
        width: AppSizes.screen.width * 0.8,
    },
    selectedLocation:{
        color:'#fff',
        textAlign: 'right'
    },
    closeModalText:{
        color: '#fff'
    },
    closeModal: {
        backgroundColor:"rgba(151,217,237,0.9)",
        padding: 12,
        alignItems:'center',
        borderRadius:6,
    },
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
        height: 180,
    },
    paddingHorizontal: {
        width: AppSizes.screen.width,
        marginLeft:AppSizes.screen.width*0.05,
        zIndex: 1111,
    },
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        backgroundColor: 'transparent',
        //padding: 30,
        //marginTop: AppSizes.screen.height * 0.15,
        alignItems: 'center'
    },
    iconSearch: {
        //marginLeft: 10,
        alignItems: 'center',
        alignContent: 'center',
    },
    iconLocation: {
        alignItems: 'center',
        alignContent: 'center',
    },
    searchBar: {
        width: AppSizes.screen.width*0.95,
        //borderWidth: 5,
        borderColor: '#FFFFFF',
       // borderRadius: 5,
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
    background: {
     flex:1,

        // remove width and height to override fixed static size
    },
    logo: {
        width: AppSizes.screen.width * 0.35,
        resizeMode: 'contain',
        height: AppSizes.screen.height * 0.25,
    },
    whiteText: {
        color: '#FFF',
        backgroundColor: 'transparent',
        fontSize: 22,
        fontWeight:"bold",
    },
    customTextTop: {
       marginTop: -AppSizes.screen.width * 0.2,
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
      offlineText: { color: '#fff' },
      searchBarContainer:{
        flexDirection: "row",
        width: window.width,
        padding: 4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#fff",
      },
      searchBarfull: {
        width: AppSizes.screen.width,
        borderBottomWidth: 5,
        borderColor: 'rgba( 255, 255, 255, 0.2)'
    },
    filterContainer:{ flex: 1, flexDirection: 'row', width: AppSizes.screen.width, justifyContent: 'flex-start', borderColor: '#dddddd', backgroundColor: '#f4f4f4',
    borderWidth: 1, position:'absolute', top: 50, paddingLeft:AppSizes.screen.width/16, alignItems: 'center', zIndex: 1111, height: 42},
    carousel:{
        width:AppSizes.screen.width/3.5,
        height: AppSizes.screen.height/6.5,
    },
    carouselSmall:{
        width:AppSizes.screen.width/3,
        height: AppSizes.screen.height/7,
    },
});
