import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { getHabits, logHabit } from './src/api/habits';

export default function App() {
  const [habits, setHabits] = useState<any[]>([]);
  const [habitName, setHabitName] = useState('');

  useEffect(() => {
    getHabits().then(setHabits).catch(console.error);
  }, []);

  const handleLog = async () => {
    if (!habitName.trim()) return;

    await logHabit({
      user_id: 124, // placeholder, make dynamic later
      habit: habitName.trim(),
      timestamp: new Date().toISOString(),
    });

    const updatedHabits = await getHabits();
    setHabits(updatedHabits);
    setHabitName('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habits:</Text>

      {habits.map((habit, index) => (
        <Text key={index}>{habit.name} - {habit.timestamp}</Text>
      ))}

      <TextInput
        style={styles.input}
        placeholder="Enter a new habit"
        value={habitName}
        onChangeText={setHabitName}
      />
      <Button title="Log Habit" onPress={handleLog} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5
  }
});
