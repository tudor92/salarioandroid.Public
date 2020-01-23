import analytics from '@react-native-firebase/analytics';

    var trackScreenView = async (screen) => {
        // Set & override the MainActivity screen name
        await analytics().setCurrentScreen(screen, screen);
    }

    var trackEvent = async (eventName, details) => {
        await analytics().logEvent(eventName, {
            id: details,
          });
    }


export {trackScreenView, trackEvent }
