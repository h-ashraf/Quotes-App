import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Switch } from 'react-native'; // Added Switch import
import axios from 'axios';

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://type.fit/api/quotes');
      const data = response.data;
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];
      setQuote(randomQuote.text);
      setAuthor(randomQuote.author || 'Unknown');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setLoading(false);
    }
  };

  const handleNewQuote = () => {
    setLoading(true);
    fetchQuote();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const containerStyle = {
    ...styles.container,
    backgroundColor: isDarkMode ? '#222' : '#fff',
  };

  const textStyle = {
    ...styles.text,
    color: isDarkMode ? '#fff' : '#000',
  };

  return (
    <View style={containerStyle}>
      <View style={styles.header}>
        <Text style={[styles.headerText, textStyle]}>Inspirational Quotes</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={isDarkMode ? '#fff' : '#000'}
          trackColor={{ true: '#007AFF', false: '#ccc' }}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <>
          <Text style={[styles.quote, textStyle]}>{quote}</Text>
          <Text style={[styles.author, textStyle]}>- {author}</Text>
          <TouchableOpacity onPress={handleNewQuote} style={[styles.button, { backgroundColor: isDarkMode ? '#007AFF' : '#eee' }]}>
            <Text style={[styles.buttonText, { color: isDarkMode ? '#fff' : '#000' }]}>New Quote</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  quote: {
    fontSize: 24,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default App;
