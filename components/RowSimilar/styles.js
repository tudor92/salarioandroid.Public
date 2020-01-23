import { AppSizes } from '../../theme/';
import { createStyles, minHeight } from 'react-native-media-queries';

const base = {
    rightArrow:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    detalii: {
        color: '#00BFFF',
        fontSize: 12,
    },
    salaryRon: {
        color: '#B8B8B8',
        fontSize: 10,
    },
    salary: {
        color: '#A3A3A3',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 5,
    },
    city: {
        color: '#A3A3A3',
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 7,
        marginLeft: 10,
        marginTop: 76,
    },
    role: {
        color: '#54A8C4',
        marginTop: 6,
        textAlign: 'center',
        fontSize: AppSizes.screen.width * 0.03,
       // width: AppSizes.screen.width * 0.35,
    },
    imageView: {
        width: 85,
        height: 60,
        borderRadius: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,  
    },
    rowContainer: {
        backgroundColor: '#fff',
        flex: 1,
        alignSelf: 'stretch',
        width: AppSizes.screen.width * 0.75,
        marginRight: 10,
        marginTop: 20,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        height: 70,
        marginLeft: 5,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 8 },
        marginBottom:20,      
    },
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
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
    logo: {
        width: 85,
        height: 60,
        borderRadius: 2,
    },
  };
   
  export default styles = createStyles(
    base,
    // override styles only if screen height is less than 500
    minHeight(1000, {
        rowContainer: {
            backgroundColor: '#fff',
            flex: 1,
            alignSelf: 'stretch',
            width: AppSizes.screen.width * 0.7,
            marginRight: 10,
            marginTop: 20,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: '#fff',
            height: 140,
            marginLeft: 5,
            shadowOpacity: 0.1,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 8 },
            marginBottom:20,
        },
        detalii: {
            color: '#00BFFF',
            fontSize: 12,
        },
        salaryRon: {
            color: '#B8B8B8',
            fontSize: 12,
        },
        salary: {
            color: '#A3A3A3',
            fontSize: 16,
            fontWeight: '600',
            textAlign: 'center',
            marginTop: 5,
        },
        city: {
            color: '#A3A3A3',
            fontSize: 14,
            fontWeight: '600',
            marginBottom: 7,
            marginLeft: 10,
            marginTop: 76,
        },
        role: {
            color: '#54A8C4',
            marginTop: 6,
            textAlign: 'center',
            fontSize: AppSizes.screen.width * 0.04,
            width: AppSizes.screen.width * 0.5,
        },
        imageView: {
            width: 140,
            height: 110,
            borderRadius: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.4,
            shadowRadius: 5,  
        },
        image: {
            width: 217,
            height: 138,
        },
        logo: {
            width: 140,
            height: 110,
            borderRadius: 2,
        },
    })
  );