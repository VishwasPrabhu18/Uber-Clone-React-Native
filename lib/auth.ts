import * as Linking from "expo-linking";
import * as SecureStore from 'expo-secure-store';
import { fetchAPI } from './fetch';

export const authTokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      await SecureStore.deleteItemAsync(key);
      console.log(error);      
      return null;
    }
  },

  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.log("SaveToken Error:" + error);
      return;
    }
  }
}

export const googleOAuth = async (startOAuthFlow: any) => {
  try {
    const { createdSessionId, signUp, setactive } = await startOAuthFlow({
      redirectUrl: Linking.createURL("/(root)/(tabs)/home", {scheme: "uber"})
    });

    if (createdSessionId) {
      if (setactive) {
        await setactive!({ session: createdSessionId });

        if (signUp.createdUserId) {
          await fetchAPI("/(api)/user", {
            method: "POST",
            body: JSON.stringify({
              name: `${signUp.firstName} ${signUp.lastName}`,
              email: signUp.emailAddress,
              clerkId: signUp.createdUserId,
            })
          });
        }

        return {
          success: true,
          code: "success",
          message: "You have successfully authenticated"
        };
      }
    }

    return {
      success: false,
      code: "success",
      message: "An error occured"
    }
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      code: error.code,
      message: error?.errors[0]?.longMessage
    }
  }
}