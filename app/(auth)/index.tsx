import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [userInfo, setUserInfo] = useState({});

  GoogleSignin.configure({
    webClientId:
      "951699356369-e3tfu189adfpkfjf73bh58nt34dj7g5j.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
    scopes: ["email", "profile"], // what API you want to access on behalf of the user, default is email and profile
    offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
    iosClientId:
      "951699356369-ve77irls7r4n8i69nk18ejrg3usg06dl.apps.googleusercontent.com", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      console.log(response);
      console.log("hi");
      if (isSuccessResponse(response)) {
        setUserInfo(response.data);
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="color-slate-800">{userInfo?.user?.email}</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          signIn();
        }}
      />
    </View>
  );
}
