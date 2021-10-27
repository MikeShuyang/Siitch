import {StyleSheet, Dimensions} from 'react-native';
const DeviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  databaseView: {
    width: 350,
  },
  barTitle: {
    width: 300,
  },
  eachAvatar: {
    paddingRight: 20,
  },
  avatarView: {
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchTab: {
    width: 100,
    height: 70,
  },
  searchInput: {
    borderColor: 'black',
    width: 200,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
  },
  searchFrame: {
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  databaseView: {
    width: 350,
  },
  barTitle: {
    width: 300,
  },
  eachAvatar: {
    paddingRight: 20,
  },
  avatarView: {
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchTab: {
    width: 100,
    height: 70,
  },
  searchInput: {
    borderColor: 'black',
    width: 200,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
  },
  searchFrame: {
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  text: {
    textAlign: 'center',
    fontSize: 17,
    color: 'black',
  },
  bottomtext: {
    position: 'relative',
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
  },
  colflex: {
    paddingTop: 70,
    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'row',
    position: 'relative',
  },
  center: {
    alignItems: 'center',
    //justifyContent: 'center',
  },
  centerearth: {
    right: 190,
    top: 70,
  },
  centerwaterdrops: {
    top: 70,
    left: 190,
  },
  logo: {
    marginTop: '23%',
    width: 250,
    height: 100,
  },
  rankingPage: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  rankingPageImage: {
    width: 65,
    height: 65,
    marginLeft: 40,
  },
  meats: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  meatsImage: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  meatsText: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //alignContent: 'center'
  },
  itemSeparatorStyle:{
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#D3D3D3"
  },
  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10
  },
  calculateLabelTextStyle: {
    color: "#000",
    textAlign: "center",
    width: "99%",
    padding: 10,
    fontSize: 20,
    flexDirection: "row",
    justifyContent:'center',
    alignItems:'center'
  },
  selectLabelTextStyle: {
    color: "#000",
    textAlign: "left",
    width: "99%",
    padding: 15,
    flexDirection: "row",
    justifyContent:'center',
    alignItems:'center'
  },
  placeHolderTextStyle: {
    color: "#D3D3D3",
    paddingTop: 10,
    fontSize: 20,
    textAlign: "center",
    width: "99%",
    flexDirection: "row",
    justifyContent:'center',
    alignItems:'center'
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: "center"
  },
  listTextViewStyle: {
    color: "#000",
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left"
  },
  modalView: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  calculatePickerStyle: {
    alignContent: "center",
    elevation: 3,
    marginTop: 10,
    paddingRight: 25,
    marginBottom: 2,
    height: 50,
    borderWidth: 2,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 20,
    flexDirection: "row",
    width: DeviceWidth * 0.9,
    borderColor: '#80CAFF'
  },
  pickerStyle: {
    elevation:3,
    marginTop: 10,
    paddingRight: 25,
    marginRight: 50,
    marginBottom: 2,
    height: 50,
    borderWidth:2,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 20,
    flexDirection: "row",
    width: DeviceWidth * 0.7,
    borderColor: '#80CAFF',
  },
  bottomBorderLine: {
    borderBottomColor: 'lightgray', 
    borderBottomWidth: 1,
    marginBottom: 20
  },
  textFormatCompare: {
    textAlign: 'center',
    fontSize:20,
  },
  boldTextFormatCompare: {
    textAlign: 'center',
    fontSize:25,
    fontWeight:'bold'
  },
  boldTextFormatBlueCompare: {
    textAlign: 'center',
    fontSize:25,
    fontWeight:'bold',
    color: '#00ADEF'
  },
  boldTextFormatRedCompare: {
    textAlign: 'center',
    fontSize:25,
    fontWeight:'bold',
    color: '#ef0100'
  },
  selectItemText: {
    alignItems: 'center',
    marginTop: 30,
    fontSize: 25,
    fontWeight: '500'
  },
  counterView: {
    borderWidth:1, 
    borderColor: '#0e0f0f', 
    borderRadius:50
  },
});
export {styles};
