import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput as Input,
  FlatList,
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: String;
}

export function Home() {

  const [newSkill, setNewSkill] = useState<String>('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGretting] = useState('');

  function handleAddNewSkill() {

    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    }

    const skillAlreadyExists = mySkills.find(skill => skill.name === data.name);

    if (skillAlreadyExists || !newSkill) return;

    setMySkills([...mySkills, data]);
  }

  const greetings = {
    morning: 'Good morning',
    afternoon: 'Good afternoon',
    evening: 'Good evening'
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if(currentHour <= 12) {
      setGretting(greetings.morning);
    } else if(currentHour > 12 && currentHour < 18 ) {
      setGretting(greetings.afternoon);
    } else {
      setGretting(greetings.evening);
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Eric</Text>
      <Text style={styles.greetings}>{greeting}</Text>

      <Input
        style={styles.input}
        placeholder="Insert a new skill"
        placeholderTextColor="#444"
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkill} />

      <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard skill={item.name} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: 15,
    marginTop: 30,
    borderRadius: 8
  },
  greetings: {
    color: '#fff'
  }
})