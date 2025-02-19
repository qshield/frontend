import { View } from "react-native";
import CameraScreen from "./components/CameraView/CameraScreen";
import Header from "./components/Header/TopHeader";
import Footer from "./components/Footer/Footer";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: "2%",
        paddingTop: "3%",
        paddingBottom: "3%",
      }}
    >
      <Header></Header>
      <CameraScreen></CameraScreen>
      <Footer></Footer>
    </View>
  );
}
