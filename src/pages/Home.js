import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput as Input,
  TouchableOpacity
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

export function Home() {

  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState([]);

  function handleAddNewSkill() {
    const skillAlreadyExists = mySkills.find(skill => skill === newSkill);

    if(skillAlreadyExists || !newSkill) return;

    setMySkills([...mySkills, newSkill]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Eric</Text>

      <Input
        style={styles.input}
        placeholder="Insert a new skill"
        placeholderTextColor="#444"
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkill}/>

      <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>

      {mySkills.map((skill, index) => (
        <SkillCard skill={skill} key={index}/>
      ))}
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
  }
})