import { useScanStore } from "@/app/store/scanStore";
import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function Footer() {
  const scanned = useScanStore((s) => s.scanned);
  const urlCode = useScanStore((s) => s.urlCode);
  const analyzing = useScanStore((s) => s.analyzing);

  const buttonhandler = () => {
    console.log("회색버튼 클릭");
  };
  return (
    <View
      style={{
        backgroundColor: "blue",
        width: "95%",
        height: "15%",
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      {analyzing ? (
        <>
          <Text>해당 URL은 안전한 사이트로 검증되었습니다.⭕</Text>
          <Text>{urlCode}</Text>
          <Text>들어가기</Text>
        </>
      ) : (
        <TouchableOpacity
          onPress={buttonhandler}
          style={{ backgroundColor: "gray", width: "20%", height: "90%" }}
        >
          <View>
            <Text>왼쪽 버튼</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
