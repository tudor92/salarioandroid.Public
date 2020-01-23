import { AppSizes } from '../../theme/';
import { createStyles, minHeight } from 'react-native-media-queries';

const base = {
    ticketStyleTest:{
        color: '#fff',
        fontSize: 11,
        lineHeight: 12,
    },
    ticketStyle:{
        backgroundColor: '#75c698',
        width: 40,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10,
        borderWidth:1,
        borderColor: '#75c698',
    },
    leftText: {
        fontSize: 12,
        color: '#54A8C4',
        marginLeft: 5,
        marginRight: 5,
    },
    rightText: {
        fontSize: 12,
        color: '#54A8C4',
        marginLeft: 5,
        marginRight: 5,
    },
    sliderView: {
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop:10
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
    containerSlider: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: "stretch",
        justifyContent: "center"
      },
    boldText: {
        fontWeight: '600',
    },
    ticketsText:{
        fontWeight: '600',
        lineHeight: 22,
        justifyContent: "center",
    },
    bonusText: {
        color: '#B8B8B8',
        fontSize: 12,
        marginLeft:12,
        marginTop: 5,
        justifyContent: "center",
    },
    dividerBar: {
        backgroundColor: '#efefef',
        marginBottom: 10,
        marginTop: 10,
        width: AppSizes.screen.width * 0.85,    
    },
    contentDetails:{
        marginTop: 12,
        width: AppSizes.screen.width * 0.6,
        justifyContent: "center",
    },
    containerChart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop:60,
      },
    companyText:{
        color: '#B8B8B8',
        fontSize: 14,
        marginLeft:10,
    },
    linearGradient: {
        flexDirection:'row',
        // backgroundColor: '#000',
        // justifyContent: 'space-between',
        //height: 70,
        borderBottomColor:'#f4f4f4',
        borderBottomWidth:1,
      },
    smallText: {
        color: '#B8B8B8',
        fontSize: 10,
    },
    thumbsText:{
        color: '#A3A3A3',
        fontSize: 20,
        fontWeight: '600',
    },
    thumbsContainer:{
        // flex:1,
        flexDirection:'row',
        // backgroundColor: '#000',
        // justifyContent: 'space-between',
        height: 80,
        borderBottomColor:'#f4f4f4',
        borderBottomWidth:1,
    },
    firstT:{
        alignItems:'center',
        // width:80,
        marginTop:8,
        marginBottom: 8,
        flexDirection: 'column',
        borderRightWidth: 1,
        borderRightColor: '#f4f4f4',
        flexGrow:1,
        backgroundColor: 'rgba(52, 52, 52, 0)',
    },
    secondT:{
        alignItems:'center',
        // width:80,
        marginTop:8,
        marginBottom: 8,
        borderRightWidth: 1,
        borderRightColor: '#f4f4f4',
        flexDirection: 'column',
        flexGrow:1,
        backgroundColor: 'rgba(52, 52, 52, 0)',
    },
    thirdT:{
        alignItems:'center',
        // width:80,
        flexGrow:1,
        marginTop:8,
        marginBottom: 8,
        flexDirection: 'column',
        backgroundColor: 'rgba(52, 52, 52, 0)',
    },
    detailsContainer:{
        width: AppSizes.screen.width * 0.85,
        backgroundColor: '#fff',
        marginTop:-20,
    },
    roleText: {
        marginBottom: 5,
        fontSize: 22,
        fontWeight: '600',
        color: '#54A8C4',
        marginTop:10,
        marginLeft:10,
    },
    container: {
        padding: 30,
        paddingBottom: 0,
        marginTop: -30,
        alignItems: 'center'
    },
    logo: {
        width: AppSizes.screen.width,
        height: 160,
    },
  }


  export default styles = createStyles(
    base,
    minHeight(1000, {
        logo: {
            width: AppSizes.screen.width,
            height: 300,
        },
    })
  );