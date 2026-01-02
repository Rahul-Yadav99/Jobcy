import { useState } from "react";
import { Alert, Button, Modal, Pressable, Text, View } from "react-native";

export default function Index() {
  const click = async () => {
    Alert.alert("data lost", "hi rahul this message form React native")
  }
  const [visible, setVisible] = useState(false)
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="open" onPress={() => setVisible(true)} />
      {/* <Pressable>
        <Text onPress={click}>Click</Text>
      </Pressable> */}
      <Modal
        visible={visible}
        animationType="slide"
        // transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <Text>RAHUL YADAV</Text>
        <Pressable
          onPress={() => setVisible(false)}
          style={{
            backgroundColor: 'deeppink'
          }}
        >
          <Text>Close</Text>
        </Pressable>
      </Modal>
    </View>
  );
}