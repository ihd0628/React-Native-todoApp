import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "./color";
import CONSTANT from "./constant";

export default function App() {
  const [category, setCategory] = useState("work");
  const [inputText, setInputText] = useState("");
  const [toDos, setToDos] = useState({});
  const [isLoad, setIsLoad] = useState(true);
  const STORAGE_KEY = "@toDos";

  useEffect(() => {
    loadToDos();
  }, []);

  const onChangeText = (event) => {
    setInputText(event);
  };
  const saveToDos = async (newToDos) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newToDos));
    } catch (error) {
      alert(error);
    }
  };
  const loadToDos = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY);
      setIsLoad(false);
      setToDos(JSON.parse(s) || {});
    } catch (error) {
      alert(error);
    }
  };

  const addTodo = async () => {
    if (inputText === "") return;
    const newToDos = { ...toDos, [Date.now()]: { inputText, category } };
    setInputText("");
    await saveToDos(newToDos);
    setToDos(newToDos);
  };
  const dleleteTodo = async (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm sure",
        onPress: async () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          saveToDos(newToDos);
          setToDos(newToDos);
        },
      },
    ]);
  };

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
        onChangeText={onChangeText}
        onSubmitEditing={addTodo}
        value={inputText}
      />
      <ScrollView>
        {isLoad ? (
          <ActivityIndicator />
        ) : (
          Object.keys(toDos)?.map((key) =>
            toDos[key].category === category ? (
              <View style={styles.toDo} key={key}>
                <Text style={styles.toDoText}>{toDos[key].inputText}</Text>
                <TouchableOpacity
                  onPress={() => {
                    dleleteTodo(key);
                  }}
                >
                  <FontAwesome
                    style={styles.toDoText}
                    name="trash-o"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            ) : null
          )
        )}
      </ScrollView>
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
    marginVertical: 20,
    fontSize: 16,
  },
  toDo: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 15,
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
