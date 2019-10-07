import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,Image, SafeAreaView ,Dimensions} from "react-native";
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
        header: null 
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
          marginRight:"7%"
        }}
      />
    );
  };


  render() {
      
    // const { navigation, imageData, fetchMoreImageData, loading } = this.props;
    // const { page, limit } = this.state;
    return (
        
      <View style={styles.container}>

        <FlatList horizontal pagingEnabled

            style={{flexGrow:0}}
          data={[{key : '1'},
          {key:'2'},
         
        ]}
          keyExtractor={item => item.key}
          renderItem={({ item }) => 
                <View style={{height:250}} ><Image style={{height:250,width: Dimensions.get('window').width}}  source={require('../../../assets/edu-1.jpg')} /></View>
          }

        />
       
       <FlatList  
        ItemSeparatorComponent = {this.renderSeparator}

            // style={{flexGrow:0}}
          data={[{key : '1'},
          {key:'2'},
          {key:'2'},{key:'2'},
          {key:'2'}

        ]}
          keyExtractor={item => item.key}
          renderItem={({ item }) => 
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('App')}
                 style={{height:250,alignItems:'center',marginTop:10,marginBottom:10}}>

                    <Image style={{height:250,width: "90%",borderRadius:10}}  source={require('../../../assets/edu-1.jpg')} />
                    

                   </TouchableOpacity>
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
