import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, Image, SafeAreaView, Dimensions } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { Header } from "../../../components";
import styles from "./styles";
import { AvatarItem } from "../../../components";
import { logoutUserService } from "../../../redux/services/user";
import {
  fetchImageData,
  fetchMoreImageData
} from "../../../redux/actions/fetch";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, ListItem, Button, Icon } from 'react-native-elements'

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  //   fetchImageData: (page?: number, limit?: number) => void;
  //   fetchMoreImageData: (page?: number, limit?: number) => void;
  //   imageData: any;
  //   loading: boolean;
}

// interface itemProp {
//   item: any;
// }

// interface State {
//   page: number;
//   limit: number;
// }

class HomeScreen extends Component<Props> {
  static navigationOptions = {
    title: "İkon Eğitim",

    headerStyle:{
      backgroundColor:'#fff' ,
      height:80
     
    },
    headerTitleStyle:{
      fontWeight: 'bold',
      marginTop:25,
      textAlign: 'center',
      alignSelf: 'center',
      flexGrow:1,
      color:'#666666',
      font:'Roboto'
    },
    

  }
  //   constructor(props: Props) {
  //     super(props);
  //     this.state = {
  //       page: 1,
  //       limit: 20
  //     };
  //   }

  componentDidMount() {
    // const { fetchImageData } = this.props;
    // const { page, limit } = this.state;
    // fetchImageData(page, limit);
  }

  //   handleLogout = () => {
  //     const { navigation } = this.props;
  //     logoutUserService().then(() => {
  //       navigation.navigate("AuthStack");
  //     });
  //   };
  renderSeparator = () => {
    return (
      <View
        style={{

          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "7%",
          marginRight: "7%"
        }}
      />
    );
  };


  render() {

    // const { navigation, imageData, fetchMoreImageData, loading } = this.props;
    // const { page, limit } = this.state;
    return (

      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}

          // style={{flexGrow:0}}
          data={[{ key: '1' },
          { key: '2' },
          { key: '2' }, { key: '2' },
          { key: '2' }

          ]}
          keyExtractor={item => item.key}
          renderItem={({ item }) =>
 
              <Card
                title='HELLO WORLD'
                image={require('../../../assets/edu-1.jpg')}>
                <Text style={{ marginBottom: 10 }}>
                  İstatistik eğitimine ulaşabilirsiniz
                  </Text>
                  <View style={{flexDirection:'row'}}>

              <View style={{flex:1}}></View>
                <Button 
              
                  onPress={() => this.props.navigation.navigate('App')}
                  buttonStyle={{ borderRadius: 0,  flex:1, width:200,  marginBottom: 0, backgroundColor:'#FF3019',  alignContent:'flex-end' }}
                  title='Detayı Göster' />
                         </View>
              </Card>
   
          }

        />
      </View>
    );
  }
}

// const mapStateToProps = (state: any) => ({
//   imageData: state.data,
//   loading: state.loading
// });

// function bindToAction(dispatch: any) {
//   return {
//     fetchImageData: (page?: number, limit?: number) =>
//       dispatch(fetchImageData(page, limit)),
//     fetchMoreImageData: (page?: number, limit?: number) =>
//       dispatch(fetchMoreImageData(page, limit))
//   };
// }

export default connect(

)(HomeScreen);
