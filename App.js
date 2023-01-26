import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import theme from "./color";
import CONSTANT from "./constant";

export default function App() {
  const [category, setCategory] = useState("work");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setCategory("work");
          }}
        >
          <Text
            style={{
              ...styles.btnText,
              color: category === "work" ? "white" : theme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCategory("life");
          }}
        >
          <Text
            style={{
              ...styles.btnText,
              color: category === "life" ? "white" : theme.grey,
            }}
          >
            Life
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder={
          category === "work"
            ? CONSTANT.WORK_INPUT_MESSAGE
            : CONSTANT.LIFE_INPUT_MESSAGE
        }
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    fontSize: 16,
  },
});
