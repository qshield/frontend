import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert, Linking } from "react-native";
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import { useScanStore } from "@/app/store/scanStore";
import axios from "axios";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraReady, setCameraReady] = useState(false);

  const urlCode = useScanStore((state) => state.urlCode);
  const scanned = useScanStore((state) => state.scanned);
  const setScanned = useScanStore((state) => state.setScanned);
  const setUrlCode = useScanStore((state) => state.setUrlCode);
  const setAnalyzing = useScanStore((s) => s.setAnalyzing);

  useEffect(() => {
    console.log("Camera Permission: ", permission);

    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleOpenSettings = () => {
    Linking.openSettings(); // 앱의 설정 페이지로 이동하기
  };

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}>
          카메라 접근 권한이 거부되었습니다. 설정에서 권한을 허용해주세요.
        </Text>
        <Button onPress={handleOpenSettings} title="설정으로 가기" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    // 스캔 돼었을때
    if (scanned) return; // 중복 스캔 방지
    setScanned(true);
    setUrlCode(data);
  };

  const analysisHandle = async () => {
    await axios.post("http://localhost:8080", { url: urlCode }).then((res) => {
      console.log(res);
    });
    setAnalyzing(true);
    setTimeout(() => {
      setScanned(false); // 다시 스캔 가능하도록 초기화
    }, 3000);
  };

  return (
    // 허용된 카메라 뷰
    <View style={styles.cameraContainer}>
      <CameraView
        style={{ flex: 1, width: "100%", height: "100%" }}
        onCameraReady={() => setCameraReady(true)}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        {cameraReady && scanned && (
          <View style={styles.overlay}>
            <Button title="분석하기" onPress={analysisHandle}></Button>
          </View>
        )}
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "55%",
  },
  cameraContainer: {
    width: "95%",
    flexGrow: 1,
    minHeight: "55%",
  },
  camera: { flex: 1 },
  overlay: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  text: { color: "#fff" },
});
