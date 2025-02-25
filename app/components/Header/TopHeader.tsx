import { useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";

export default function TopHeader() {
  const [permission, requestPermission] = useCameraPermissions();

  const CameraReq = () => {
    requestPermission(); // 사용자가 허용안하면 안먹힘
  };

  return (
    <View
      style={{
        backgroundColor: "blue",
        width: "95%",
        height: "15%",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <TouchableOpacity onPress={CameraReq}>
        <View>
          <Image source={require("../../../assets/images/camera.png")} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
