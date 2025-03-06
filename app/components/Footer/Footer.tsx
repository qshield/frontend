import { useScanStore } from "@/app/store/scanStore";
import React, { Component } from "react";
import { Text, View, TouchableOpacity, Button, Linking } from "react-native";

export default function Footer() {
  const urlCode = useScanStore((s) => s.urlCode);
  const analyzing = useScanStore((s) => s.analyzing); // 분석 state
  const result = useScanStore((s) => s.result);
  // 0 :  피싱 사이트입니다!
  // 1 :  APK 파일 다운로드가 차단되었습니다.
  // 2 : 안전한 사이트입니다
  // 3 : URL을 입력해주세요.

  const resultMessages = [
    "해당 URL은 위험한 사이트로 검증되었습니다. 🚨",
    "APK 파일 다운로드가 차단되었습니다. ⚠️",
    "해당 URL은 안전한 사이트로 검증되었습니다. ⭕️",
    "URL을 입력해주세요.",
  ];

  const openGoogle = () => {
    if (urlCode) {
      const encodedUrl = encodeURIComponent(urlCode);
      Linking.openURL(`https://www.google.com/search?q=${encodedUrl}`).catch(
        (err) => console.error("Error opening Google", err)
      );
    }
  };
  const openChrome = () => {
    if (urlCode) {
      const encodedUrl = encodeURIComponent(urlCode);
      Linking.openURL(`https://www.google.com/search?q=${encodedUrl}`).catch(
        (err) => console.error("Error opening Chrome", err)
      );
    }
  };

  return (
    <View
      style={{
        width: "95%",
        height: "15%",
        flex: 1,
        justifyContent: "center",
      }}
    >
      {analyzing ? (
        <>
          <Text>{resultMessages[result] || ""}</Text>
          <Text>{urlCode}</Text>
          {result === 2 ? (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                gap: 40,
                alignItems: "center",
              }}
            >
              <Button title="구글로 열기" onPress={openGoogle} />
              <Button title="크롬으로 열기" onPress={openChrome} />
            </View>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <View></View>
        </>
      )}
    </View>
  );
}
