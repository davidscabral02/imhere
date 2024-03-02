import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import { Participant } from '../../components/Participant';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  function handleParticipantAdd(name: string) {
    if (participants.includes(name)) {
      return Alert.alert(
        'Participant repeated',
        'This participant was already added'
      );
    }

    setParticipants((prevState) => [...prevState, inputValue]);
    setInputValue('');
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remove', `Remove participant, ${name}?`, [
      {
        text: 'Yes',
        onPress: () => {
          setParticipants((prevState) =>
            prevState.filter((participant) => participant !== name)
          );
        },
      },
      { text: 'No', style: 'cancel' },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>My Particular Event</Text>
      <Text style={styles.eventDate}>February 26, 2024</Text>
      <View style={styles.form}>
        <TextInput
          value={inputValue}
          placeholder="Participant name"
          placeholderTextColor="#6b6b6b"
          onChangeText={setInputValue}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => handleParticipantAdd(inputValue)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={(item) => item}
        data={participants}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => {
              handleParticipantRemove(item);
            }}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmpty}>Empty list!</Text>
        )}
      />
    </View>
  );
}
