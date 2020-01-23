import { AppSizes } from '../../theme/';
import { createStyles, minHeight } from 'react-native-media-queries';
const base = {
    detalii: {
        color: '#00BFFF',
        fontSize: 12, 
        //marginTop: -AppSizes.screen.width * 0.25,
        marginRight: 5,
    },
    salaryRon: {
        color: '#B8B8B8',
        fontSize: 10,
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
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 10,
    },
    role: {
        color: '#000000',
        fontSize: AppSizes.screen.width * 0.035,
        marginTop: 2,
        width: AppSizes.screen.width * 0.5,
        fontWeight:'500',
        marginLeft: 25,
    },
    company: {
        color: '#cccccc',
        fontSize: AppSizes.screen.width * 0.025,
        marginTop: 2,
        width: AppSizes.screen.width * 0.5,
        marginLeft: 25,
    },
    imageView: {
        flexGrow: 1,
        width: AppSizes.screen.width * 0.33,
        borderRadius: 2,
        marginTop: -15,
        marginLeft: -15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        backgroundColor: '#fff',
    },
    cityView: {
        flexGrow: 1,
        paddingVertical: 5,
        width: AppSizes.screen.width * 0.35,
    },
    rowContainer: {
        backgroundColor: '#fff',
        flex: 1,
        alignSelf: 'stretch',
        width: AppSizes.screen.width * 0.85,
        marginRight: 10,
        marginTop: 30,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        marginLeft: 20,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 8 },
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
        width: AppSizes.screen.width * 0.33,
        height: AppSizes.screen.width * 0.22,
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
            width: AppSizes.screen.width * 0.85,
            marginRight: 10,
            marginTop: 40,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: '#fff',
            height: 180,
            marginLeft: 20,
            shadowOpacity: 0.1,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 8 },
        },
        imageView: {
            flexGrow: 1,
            width: 220,
            height: 150,
            borderRadius: 2,
            marginTop: -20,
            marginLeft: -15,
            position: 'absolute',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.4,
            shadowRadius: 5,
        },
        logo: {
            width: 220,
            height: 150,
            borderRadius: 2,
        },
        role: {
            color: '#54A8C4',
            fontSize: AppSizes.screen.width * 0.03,
            marginTop: 2,
            textAlign: 'center',
            width: AppSizes.screen.width * 0.6,
        },
        detalii: {
            color: '#00BFFF',
            fontSize: 16,
        },
        salaryRon: {
            color: '#B8B8B8',
            fontSize: 14,
        },
        salary: {
            color: '#A3A3A3',
            fontSize: 20,
            fontWeight: '600',
            textAlign: 'center',
            marginTop: 5,
        },
        city: {
            flexGrow: 1,
            color: '#A3A3A3',
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 7,
            marginLeft: 10,
            marginTop: 150,
        },
    })
  );