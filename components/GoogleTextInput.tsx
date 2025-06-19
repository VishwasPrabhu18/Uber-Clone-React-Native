import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";
import { Image, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {

  return (
    <View className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}>
      <GooglePlacesAutocomplete
        placeholder='Where you want to go?'
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "Where do you want to go?"
        }}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || 'white',
            fontSize: 16,
            fontWeight: "600",
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || 'white',
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          }
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry?.location.lat!,
            longitude: details?.geometry?.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: googlePlacesApiKey,
          language: 'en',
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        enablePoweredByContainer={false}
        predefinedPlaces={[]}
        autoFillOnNotFound={false}
        currentLocation={false}
        currentLocationLabel="Current location"
        debounce={200}
        disableScroll={false}
        enableHighAccuracyLocation={true}
        fetchDetails={true}
        filterReverseGeocodingByTypes={[]}
        GooglePlacesDetailsQuery={{}}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          type: 'restaurant',
        }}
        GoogleReverseGeocodingQuery={{}}
        isRowScrollable={true}
        keyboardShouldPersistTaps="always"
        listHoverColor="#ececec"
        listUnderlayColor="#c8c7cc"
        listViewDisplayed="auto"
        keepResultsAfterBlur={false}
        minLength={0}
        nearbyPlacesAPI="GooglePlacesSearch"
        numberOfLines={1}
        onFail={(e) => { console.warn('Google Place Failed : ', e) }}
        onNotFound={() => { }}
        onTimeout={() => console.warn('google places autocomplete: request timeout')}
        predefinedPlacesAlwaysVisible={false}
        suppressDefaultStyles={false}
        textInputHide={false}
        timeout={20000}
        isNewPlacesAPI={false}
        fields="*"
      />
    </View>
  );
};

export default GoogleTextInput;