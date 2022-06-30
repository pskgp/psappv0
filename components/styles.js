import { StyleSheet } from 'react-native'
const utils = StyleSheet.create({
    centerHorizontal: {
        alignItems: 'center',
    },
    marginBottom: {
        marginBottom: 20,
    },
    marginBottomBar: {
        marginBottom: 330,
    },
    marginBottomSmall: {
        marginBottom: 10,
    },
    profileImageBig: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
    },
    profileImage: {
        marginRight: 15,
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
    },
    profileImageSmall: {
        marginRight: 15,
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
    },
    searchBar: {
        backgroundColor: 'whitesmoke',
        color: 'grey',
        paddingLeft: 10,
        borderRadius: 8,
        height: 40,
        marginTop: -5
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    padding15: {
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 15,
    },
    padding10Top: {
        paddingTop: 10

    },
    padding10: {
        padding: 10
    },
    margin15: {
        margin: 15
    },
    padding10Sides: {
        paddingRight: 10,
        paddingLeft: 10,
    },
    margin15Left: {
        marginLeft: 15,
    },
    margin15Right: {
        marginRight: 15,
    },
    margin5Bottom: {
        marginBottom: 5,
    },
    backgroundWhite: {
        backgroundColor: 'white',
    },
    borderTopGray: {
        borderTopWidth: 1,
        borderColor: 'lightgrey'
    },
    borderWhite: {
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderColor: 'white'
    },
    buttonOutlined: {
        padding: 8,
        color: 'white',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 8,
        textAlign: 'center',
    },

    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
    btn:{
        // flex: 1,
        // padding:10,
        // flexDirection: 'row',
        // marginTop: 10,
        // marginHorizontal:3,
        // height: 8,
        // backgroundColor: 'white',
        // padding: 15,
        // paddingRight: 10,
        // paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
const navbar = StyleSheet.create({

    image: {
        padding: 20
    },
    custom: {
        marginTop: 30,
        height: 60,
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: 'lightgrey'
    },

    title: {
        fontWeight: '700',
        fontSize: 20//'larger',
    }
})
const container = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        flexDirection: 'row'
    },
    input: {
        flexWrap: "wrap"
    },
    containerPadding: {
        flex: 1,
        padding: 15
    },
    center: {
        flex: 1,
    },
    horizontal: {
        flexDirection: 'row',
        display: 'flex',
    },
    form: {
        flex: 1,
        margin: 25
    },
    profileInfo: {
        padding: 25,
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 'auto',

    },
    formCenter: {
        justifyContent: 'center',
        flex: 1,
        margin: 25
    },
    containerImage: {
        flex: 1 / 3

    },
    image: {
        aspectRatio: 1 / 1,
    },
    fillHorizontal: {
        flexGrow: 1,
        paddingBottom: 0
    },
    imageSmall: {
        aspectRatio: 1 / 1,
        height: 70
    },
    gallery: {

        borderWidth: 1,
        borderColor: 'gray',
    },
    splash: {
        padding: 200,
        height: '100%',
        width: '100%'
    },
    chatRight: {
        margin: 10,
        marginBottom: 10,
        backgroundColor: 'dodgerblue',
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-end'

    },
    chatLeft: {
        margin: 10,
        marginBottom: 10,
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 8,
        alignItems: 'flex-end',
        textAlign: 'right',
        alignSelf: 'flex-start'
    }
})

const form = StyleSheet.create({
    textInput: {
        marginBottom: 10,
        borderColor: 'gray',
        backgroundColor: 'whitesmoke',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8
    },
    bottomButton: {
        alignContent: 'center',
        borderTopColor: 'gray',
        borderTopWidth: 1,
        padding: 10,
        textAlign: 'center',
    },
    roundImage: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2
    }

})

const text = StyleSheet.create({
    center: {
        textAlign: 'center',
    },
    notAvailable: {
        textAlign: 'center',
        fontWeight: '700',//'bolder',
        fontSize: 20//'large',
    },
    profileDescription: {
        fontWeight: '300'
    },
    changePhoto: {
        marginTop: 5,
        color: 'deepskyblue',
    },
    deepskyblue: {
        color: 'deepskyblue',
    },
    username: {
        fontWeight: '600',
        color: 'black',
    },
    name: {
        color: 'grey',
    },
    bold: {
        fontWeight: '700',
    },
    large: {
        fontSize: 20//'large'
    },
    small: {
        fontSize: 10//'large'
    },
    medium: {
        fontSize: 15, //'large'
        marginBottom: 10
    },
    grey: {
        color: 'grey'
    },
    green: {
        color: 'lightgreen'
    },
    white: {
        color: 'white'
    },
    whitesmoke: {
        color: 'whitesmoke'
    }



})
const activityStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#192338",
      paddingVertical: 50,
      position: "relative"
     },
    title: {
      fontSize: 20,
      color: "#fff",
      textAlign: "center",
      marginBottom: 10
    },
    loader: {
      flex: 1, 
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff"
    },
    list: {
      paddingVertical: 5,
      margin: 3,
      flexDirection: "row",
      backgroundColor: "#192338",
      justifyContent: "flex-start",
      alignItems: "center",
      zIndex: -1
    },
    lightText: {
      color: "#f7f7f7",
      width: 200,
      paddingLeft: 15,
      fontSize: 12
     },
    line: {
      height: 0.5,
      width: "100%",
      backgroundColor:"rgba(255,255,255,0.5)"
    },
    icon: {
      position: "absolute",  
      bottom: 20,
      width: "100%", 
      left: 290, 
      zIndex: 1
    },
    numberBox: {
      position: "absolute",
      bottom: 75,
      width: 30,
      height: 30,
      borderRadius: 15,  
      left: 330,
      zIndex: 3,
      backgroundColor: "#e3e3e3",
      justifyContent: "center",
      alignItems: "center"
    },
    number: {fontSize: 14,color: "#000"},
    selected: {backgroundColor: "#FA7B5F"},
    });


const logIn = StyleSheet.create({
        container : {
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: '#FFFFFF'
        }, 
        mailIcon : {
          position: 'absolute',
          left: 20,
        //   right: '6.25%',
          top: 184,
        //   bottom: '18.75%',
          
          // backgroundColor: '#BDBDBD',
        },
        mailInput: {
            position: 'absolute',
          width: 273,
        //   height: 10,
          left: 43,
          top: 174,
          // paddingTop: 10,
          // paddingRight: 15,
          fontSize: 24,
          // color: 'white',
          // fontWeight: '500'
          borderColor: "#20232a",
    borderRadius: 6,
    // backgroundColor: "#61dafb",
        },
        passIcon : {
          position: 'absolute',
          left: 23,
        //   right: '25%',
          top: 229,
        //   bottom: '58.33%',
          
          // backgroundColor: '#BDBDBD',
        },
        passInput: {
        //   position: 'absolute',
          width: 273,
        //   height: 10,
          left: 43,
          top: 219,
          fontSize: 24,
        //   borderStyle: 'solid',
          borderColor:'#F2F2F2',
          borderRadius: 6,
    // backgroundColor: "#61dafb",
          /* Gray 6 */
          
          // borderStyle: '1px solid #F2F2F2'
        },
        textInput: {
          paddingTop: 10,
          paddingRight: 15,
          fontSize: 34,
          // color: 'white',
          fontWeight: '500'
        },
      
        loginHeadText : 
        {
          /* Log In */
      
      
          position: 'absolute',
          width: 71,
          height: 36,
          left: 32,
          top: 50,
      
          // fontFamily: 'Poppins',
          // fontStyle: normal,
          fontWeight: '600',
          fontSize: 24,
      
          /* identical to box height */
      
      
          color: '#000000'
        },
        signInBox : {
          position: 'absolute',
          width: 196,
          height: 42,
          left: 82,
          top: 268,
      
          /* Accent */
      
          backgroundColor: '#FB5252',
          borderRadius: 36
        },
      signInText : {
        //   position: 'absolute',
          width: 50,
          height: 16,
          left: 80,
          top: 12,
      
        //   fontFamily : 'Roboto',
        //   fontStyle: 'normal',
          fontWeight: '600',
          fontSize: 14,
          // lineHeight: 16,
      
        //   color: '#FFFFFF'
        },
        singUp : {
            position: 'absolute',
            width: 200,
            height: 36,
            left: 80,
            // marginRight:50,
            // right: 100,
            top: 315,

            // font-family: 'Poppins';
            // font-style: normal;
            fontWeight: '400',
            fontSize: 8,
            // line-height: 16px;
            /* identical to box height */

            // text-align: center;

            /* Gray 4 */

            color: '#BDBDBD',
            backgroundColor: '#808080',
            borderRadius: 36
        },
        signUpText : {
            padding : 5,
            paddingLeft: 20,
            color : '#000'
        },
        GoogleSignIn : {
            // box: border-box,

            position: 'absolute',
            width: 87,
            height: 40,
            left: 150,
            top: 364,

            /* Gray 5 */

            // border: '1px solid #E0E0E0';
            borderRadius: 7
        }

      
       });
export { container, form, text, utils, navbar,activityStyle,logIn }    