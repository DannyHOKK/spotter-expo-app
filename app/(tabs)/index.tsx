import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const { user } = useAuth();
  return (
    <SafeAreaView>
      <View>
        <Text>index</Text>
        <Text>{user?.email}</Text>
      </View>
    </SafeAreaView>
  );
};

export default index;
