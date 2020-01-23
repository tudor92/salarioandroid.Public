import {StyleSheet, Dimensions, Platform} from 'react-native';
const { width, height } = Dimensions.get('window');
import { AppSizes, AppStyles, AppColors } from '../../theme/';


export default StyleSheet.create({
    containerNoResult:{
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
        backgroundColor: '#fcfbfc',
      },
      noResult:{
        fontWeight: '500',
      },
      result:{
        fontSize: 14,
        fontWeight: '500',
        color: '#cccccc',
      },
      preResult:{
        fontSize: 14,
        fontWeight: '300',
        color: '#cccccc',
      },
      resultContainer:{
        position: 'absolute',
        top: 30,
        left:22
      },
      description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
      },
      container: {
        padding: 10,
        paddingTop:0,
        paddingBottom: 50,
        alignItems: 'center',
        flex:1,
        backgroundColor: '#f4f4f4',
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
      buttonStyle: {
        width: AppSizes.screen.width * 0.8,
        marginTop: 20,
        marginLeft: AppSizes.screen.width * 0.1,
        marginRight: AppSizes.screen.width * 0.1
      },
      fumiStyle: {
        width: AppSizes.screen.width * 0.8,
        height: 80
      },
      fumiStyleDetails: {
        width: AppSizes.screen.width * 0.8,
        height: 80
      },
      header: {
        backgroundColor: '#f4f4f4',
        paddingLeft: 15,
        paddingRight: 15,
        width: AppSizes.screen.width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderColor: '#dddddd',
        borderWidth: 1,
        height: AppSizes.screen.height*0.04,
        alignItems: 'center'
      },
      headerText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#cccccc',
        paddingLeft: 5,
        paddingRight: 5,
      },
      headerSort: {
        // padding: 8,
        margin:10,
        width: AppSizes.screen.width * 0.24,
        height: AppSizes.screen.width * 0.24,
        // width: AppSizes.screen.width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        borderColor: "rgba(255,255,255,0.7)",
        borderWidth: 1,
        borderRadius: 5
      },
      headerTextSort: {
        fontSize: 12,
        fontWeight: '500',
        color: '#000',
  
      },
      firstButton: {
        backgroundColor: 'rgba(255,255,255,0.7)',
      },
      secondButton: {
        backgroundColor: 'rgba(255,255,255,0.7)',
      },
      background: {
        height: AppSizes.screen.height,
        width: AppSizes.screen.width*0.65,
        marginLeft: AppSizes.screen.width*0.35,
       },
      dropdown: {
        width: AppSizes.screen.width * 0.8,
        marginLeft: AppSizes.screen.width * 0.1,
        marginRight: AppSizes.screen.width * 0.1,
        marginLeft: AppSizes.screen.width*0.35,
      },
      content: {
        // backgroundColor: 'rgba(255,255,255,0.5)',
        backgroundColor: 'transparent',
        paddingTop: 80,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: AppSizes.screen.height,
        width: AppSizes.screen.width*0.65,
        // marginLeft: AppSizes.screen.width*0.35,
      },
      buttonsContainer: {
        flexDirection: "row",
      },
      contentTitle: {
        fontSize: 20,
        marginBottom: 12,
      },
      filterButtons:{
        // backgroundColor: 'rgba(89,85,255,0.5)',

      },
      closeButton: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: 20,
        alignItems: 'center'
      },
      closeButtonT: {
        margin:8,
        height: 40,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        borderColor: "rgba(255,255,255,0.7)",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,0.7)',
        width: AppSizes.screen.width * 0.4
      },
      line: {
        height: 0.5,
        width: "100%",
        backgroundColor:"rgba(255,255,255,0.5)"
      }
});