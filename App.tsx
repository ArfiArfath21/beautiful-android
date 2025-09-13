// App.tsx
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, Button, View, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function Home() {
  const [name, setName] = useState("Arfi");
  const [count, setCount] = useState(0);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const data = Array.from({ length: count }, (_, i) => ({
    id: String(i),
    label: `Item ${i + 1}`,
  }));

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <View style={{ flex: 1, padding: 28, gap: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>Hello, {name} 👋</Text>

        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <TextInput
            ref={inputRef}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            style={{ flex: 1, borderWidth: 1, borderColor: "#ddd", padding: 12, borderRadius: 8 }}
          />
          <Button title="+1" onPress={() => setCount((c) => c + 1)} />
        </View>

        <Text>Count: {count}</Text>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" }}>
              <Text>{item.label}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Home />
    </SafeAreaProvider>
  );
}
