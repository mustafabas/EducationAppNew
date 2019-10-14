import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,

  View,
  RefreshControl, ViewProps, FlatList, TouchableOpacity, Image, Dimensions, ActivityIndicator, WebView
} from 'react-native';
import { Text, Button } from "react-native-elements";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import {
  SafeAreaView
} from 'react-navigation'
import { Input, FloatingLabelInput, LessonSection } from "../../../components";
import stylesNew from "../../AuthScreens/Login/styles";
import DeviceInfo from 'react-native-device-info';
import { NavigationScreenProps, NavigationScreenProp, NavigationScreenComponent, NavigationStackScreenOptions } from 'react-navigation'
import { Header } from 'react-native-elements';
import { CourseHomeListData } from '../../../redux/actions/course/homeAction';
import { ICourseItem } from '../../../models/course/coruseItem';
import { AppState } from '../../../redux/store'
import HTML from 'react-native-render-html';

interface NavStateParams {
  someValue: string
}
 interface Props {
  navigationScreen: NavigationScreenComponent<{}>;
  navigation: NavigationScreenProp<any, any>;
  courses: ICourseItem[];
  CourseHomeListData : () => void;
  loading: boolean;

};



const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT ;

var HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
var hasNotchTmp = false

DeviceInfo.hasNotch().then(hasNotch => {

  if (hasNotch) {
    hasNotchTmp = hasNotch

    HEADER_SCROLL_DISTANCE -= 30
  }
})
class App extends Component<Props, {}> {
  constructor(props: any) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
      position: 0
    };
  }

  static navigationOptions = (
    screenProps: NavigationScreenProps
  ) => {
    return {

      headerStyle: {
        // height : screenProps.navigation.getParam('headerHeight'),
        // backgroundColor:'#d67676'
      },
      header: null
    }
  }

  componentDidMount() {

  }

  componentWillMount() {
    this.props.CourseHomeListData();
  }

  _increaseCount = (pos: number) => {
    this.setState({ position: pos })

  };
_GetCourses(){
  if(this.props.loading){
    return (<ActivityIndicator></ActivityIndicator>)
  };
}

  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
      console.log("courselist", this.props.courses);
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const textOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 200],
      extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 1],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [hasNotchTmp ? 0 : 0, 0, hasNotchTmp ? 20 : 5],
      extrapolate: 'clamp',
    });



    return (
      <SafeAreaView style={
        styles.fill}>

        {/* <View style={{backgroundColor: '#772ea2'}}>
        {/* <MyStatusBar backgroundColor="black" barStyle="light-content" /> */}

        <StatusBar barStyle="light-content" backgroundColor="green" />


        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}

          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}
        >



          <View >

            {this._GetCourses()}
            <FlatList
              // contentContainerStyle={{margin:10}}
              numColumns={1}
              style={{ marginTop: 300 }}
              // style={{flexGrow:0}}
              data={this.props.courses}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) =>
                <View
                  style={{
                    alignItems: 'center', margin: 15, padding: 10, paddingTop: 10, paddingVertical: 25,
                    elevation: 5,
                    shadowColor: '#969696', backgroundColor: 'white',
                    shadowOffset: { width: 3, height: 3 },
                    shadowOpacity: .5,
                    borderRadius: 5
                  }}>
                  <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 20, fontWeight: '700', paddingBottom: 10 }}>{item.name}</Text>
                  <View style={{ width: '100%', height: 1, backgroundColor: '#d67676' }}></View>
                  <HTML html={item.content} style={{ fontFamily: 'Roboto-Regular', marginTop: 10, textAlign: 'center', paddingBottom: 10, fontSize: 16 }}></HTML>

                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Button buttonStyle={{ backgroundColor: '#db5c6b' }} title="Sepete Ekle"  containerStyle={{ flex:0.5 }} titleStyle={{ fontFamily: 'Roboto-Regular', fontSize: 15, marginLeft: 7 }} icon={<Icon name="basket" color="white" />} />
                    <View style={{flex:0.5, flexDirection:'row', justifyContent:'flex-end'}}>
                    <Text style={{fontSize:25, fontWeight:'700', flex:0.6}}>{item.displayPrice} TL</Text>
                    <TouchableOpacity style={{alignContent:'flex-end', justifyContent:'flex-end'}} onPress={()=>this.props.navigation.navigate("CourseDetail",{
              courseItem:item 
            })} >
                      <Icon name="eye" color='#db5c6b' style={{ marginTop: 4, flex:0.2 }} size={25} />

                    </TouchableOpacity>
                    </View>
                  </View>
                </View>


              }

            />

            <Text style={{textAlign:'center', fontSize:20, fontFamily:'Roboto-Regular'}}>veya Tüm Kursu 375 TL'ye</Text>
            <Button buttonStyle={{ backgroundColor: '#db5c6b' }} title="Sepete Ekle" containerStyle={{ width: '70%', alignSelf: 'center', marginBottom: 10 }} titleStyle={{ fontFamily: 'Roboto-Regular', fontSize: 15, marginLeft: 7 }} icon={<Icon name="basket" color="white" />} />

          </View>
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={{ uri: 'https://www.ikonegitim.com/Upload/Icerik/a94e4b85-4371-4744-91eb-b636dd7bf6e1.png' }}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ]
            },
          ]}
        >
          <Header backgroundColor="#d67676"
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'SPPSS EĞİTİMİ', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
          />
          {/* <Text style={styles.title}>Title</Text> */}
        </Animated.View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#d67676',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    borderWidth: 0,

  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: undefined,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -15,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 25,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {

    backgroundColor: 'red'
  },
});


const mapStateToProps = (state: AppState) => ({
  courses: state.home.courses,
  loading: state.home.loading
})

function bindToAction(dispatch: any) {
  return {
    CourseHomeListData: () =>
      dispatch(CourseHomeListData())

  };
}


export default connect(mapStateToProps, bindToAction)(App);