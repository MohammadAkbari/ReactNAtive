import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  Image, 
  Button, 
  Alert, 
  ScrollView } from 'react-native';

import { createStackNavigator} from 'react-navigation';
  
class SampleRemote extends Component {
	
  static navigationOptions = {
    title: 'Sample Remote',
  };
	
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  showAlert = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        this.setState({ items: json });
      })
  }

  render() {
    return (
      <ScrollView>
        <Button title="Press to load data !" onPress={this.showAlert} />
        {
          this.state.items.map((item, index) => (
            <View key={index} style={[styles.text, (index % 2 == 1) && styles.odd, (index % 2 == 0) && styles.even]}>
              <Text>{item.id} - {item.title} - {item.userId}</Text>
            </View>
          ))
        }
      </ScrollView>
    );
  }
}

class SamplePizza extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      count: 100
    };
  }

  showAlert = () => {
    this.state.text;
    var count = parseInt(this.state.text);

    if (count < 10 || count > 1000) {
      Alert.alert('Count must be between 10 and 1000');
    }
    else {
      this.setState({ count: count });
    }
  }

  createTable = (count) => {
    let items = []

    for (let i = 0; i < count; i++) {
      items.push('|-|  ')
    }
    return items
  }

  render() {
    return (
      <View style={{ padding: 10 }}>
        <TextInput keyboardType='numeric'
          style={{ height: 40 }}
          placeholder="Type number!"
          onChangeText={(text) => this.setState({ text })}
        />
        <Button title="Press Me" onPress={this.showAlert} />
        <Text style={{ padding: 10, fontSize: 42 }}>
          {this.createTable(this.state.count)}
        </Text>
      </View>
    );
  }
}


class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowingText: true };

    setInterval(() => {
      this.setState(previousState => {
        return { isShowingText: !previousState.isShowingText };
      });
    }, 1000);
  }

  render() {
    let display = this.state.isShowingText ? this.props.text : ' ';
    return (
      <Text style={{ color: 'red' }}>{display}</Text>
    );
  }
}

class SampleText extends Component {
  render() {
    return (
      <Text>SAMPLE {this.props.title}!</Text>
    );
  }
}

class SampleFlex extends Component {
	
  static navigationOptions = {
    title: 'Sample Flex',
  };
	
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
	
	const { navigate } = this.props.navigation;
	
    return (
      <View style={{ flex: 1 }}>
      <View style={styles.buttomContainer}>
        <View style={styles.button}>
		      <Button title="Go to Scrolling" color="#850986" onPress={() => navigate('Scrolling')} />
        </View>
        <View style={styles.button}>
		      <Button title="Go to Remote" color="#850944" onPress={() => navigate('Remote')} />	
        </View>
      </View>

        <View style={{ flex: 1, backgroundColor: 'powderblue' }}><SampleText title='TOP' /></View>
        <View style={{ flex: 2, backgroundColor: 'skyblue' }}><Blink text="BLINK" /></View>
        <View style={{ flex: 3, backgroundColor: 'steelblue' }}><SampleText title='BOTTOM' /></View>
        <Image source={pic} style={styles.img} />
      </View>
    );
  }
}

class SampleScrollView extends Component {
	
  static navigationOptions = {
    title: 'Sample Scroll View',
  };
	
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <ScrollView>
        <SamplePizza />
      </ScrollView>
    );
  }
}


const App = createStackNavigator({
  Flex: { screen: SampleFlex },
  Scrolling: { screen: SampleScrollView },
  Remote: { screen: SampleRemote },
});


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    flex: 4
  },
  odd: {
    backgroundColor: '#fffe52'
  },
  even: {
    backgroundColor: '#5abaff'
  },
  text: { padding: 20 },
  button: {
    backgroundColor: 'green',
    width: '40%',
    height: 40,
    margin:10
  },
  buttomContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  }
});
