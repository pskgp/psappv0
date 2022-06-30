import { StyleSheet } from 'react-native'
import {Dimensions} from 'react-native';

const configHeader = StyleSheet.create({

    header :  {
        position: 'absolute',
     width: 113,
     height: 27,
     left: 15,
     top: 5,
     
     /* Title - 15 */
     
     // font-family: 'Poppins';
     // font-style: normal;
     fontWeight: '600',
     fontSize: 18,
     // line-height: 22,
     /* identical to box height */
         
     color: '#000000',
    //  backgroundColor: '#ffffff'
 },
 para1 : {
     position: 'absolute',
     width: 328,
     height: 42,
     left: 16,
     top: 80,
     
     /* Title - 15 */
     
     // font-family: 'Poppins';
     // font-style: normal;
     fontWeight: '500',
     fontSize: 14,
     // line-height: 22,
     /* identical to box height */
         
     color: '#000000',
    //  backgroundColor: '#fff'
 }
     
 
 });

 const goal = StyleSheet.create({
    container : {
        // top : 10,
        left : 5,
        // right:10,
        width : Dimensions.get('window').width-5,
        backgroundColor: '#fff',
        height :  Dimensions.get('window').height + 100

    },
    goalBox : {
        width: 328,
        // height: 74,
        left: 16,
        top: 120,
        // padding : 10,
        // bottom: 10,
        justifyContent: 'space-between',
        marginBottom: 10,
        borderRadius : 20, 
        backgroundColor : '#F2F2F2'
    },
    plusView : {
        width: 42,
        height: 42,
        left: 268,
        top: -38,
        borderRadius : 8, 
        backgroundColor : '#F2F2F2'

    },
    plusIcon : {
        width : 9,
        height : 18,
        top : -68,
        left : 284,
        color : '#fff'
    }, 
    cat : {
            width : 59,
            height : 21,
            top : -10,
            left : 83
    },
    catImg : {
        width : 48,
        height : 48,
        top : 12,
        left : 11,
        borderRadius : 8,

    },
    selected : {
        // top : ,
        width: Dimensions.get('window').width/3 -5,
        height: 50,
        padding:5,
        // paddingTop:5,
        // paddingRight:5,
        /* Title - 15 */
        
        // font-family: 'Poppins';
        // font-style: normal;
        // fontWeight: '600',
        // fontSize: 16,
        // line-height: 22,
        /* identical to box height */
            
        backgroundColor: '#343434',
        borderRadius: 36

    },
    finalselected : {
        width: Dimensions.get('window').width/3 -5,
        height: 50,
        padding:5,
        // paddingTop:5,
        // paddingRight:5,
        /* Title - 15 */
        
        // font-family: 'Poppins';
        // font-style: normal;
        // fontWeight: '600',
        // fontSize: 16,
        // line-height: 22,
        /* identical to box height */
            
        backgroundColor: '#343434',
        borderRadius: 36
    },

    list : {
        width: Dimensions.get('window').width/3 -5,
        height: 50,
        // left: 16,
        // top: 113,
        
        /* Title - 15 */
        
        // font-family: 'Poppins';
        // font-style: normal;
        // fontWeight: '700',
        // fontSize: 23,
        // line-height: 22,
        /* identical to box height */
        borderColor : '#343434',    
        backgroundColor: '#FFFFFF',
        borderRadius: 36
    },
    selectedtxt : {
        width: 60,
        height: 19,
        left: 25,
        top: 15,
        // padding: 10,
        /* Title - 15 */
        
        // font-family: 'Poppins';
        // font-style: normal;
        fontWeight: '400',
        fontSize: 11,
        // line-height: 22,
        /* identical to box height */
            
        color: '#FFFFFF',
        // borderRadius: 36
    },
    listtxt : {
        width: 60,
        height: 19,
        left: 25,
        top: 15,
        /* Title - 15 */
        
        // font-family: 'Poppins';
        // font-style: normal;
        fontWeight: '400',
        fontSize: 11,
        // line-height: 22,
        /* identical to box height */
            
        color: '#343434',
        // borderRadius: 36
    },
    minusIcon : {
        width : 9,
        height : 18,
        top : -7,
        left : 95,
        color : '#fff'
    },
    boxSpace : {
        marginTop : 10,
        height : 20,
        width : Dimensions.get('window').width,
        backgroundColor : '#fff'
    },
    next : {
        /* Next */


        // position: 'absolute',
        top: 25,
        width: 37,
        height: 24,
        left: 308,
        top: 26,


        fontWeight: '600',
        /* identical to box height */


        /* Accent */

        color: '#FB5252',

    }
    

 });

const target = StyleSheet.create({
    container : {
        // top : 10,
        left : 5,
        // right:10,
        width : Dimensions.get('window').width-5,
        backgroundColor: '#fff',
        height :  Dimensions.get('window').height 

    },
    para1 : {
        position: 'absolute',
        width: 328,
        height: 42,
        left: 16,
        top: 80,
        
        /* Title - 15 */
        
        // font-family: 'Poppins';
        // font-style: normal;
        fontWeight: '400',
        fontSize: 10,
        // line-height: 22,
        /* identical to box height */
            
        color: '#000000',
        backgroundColor : '#F2F2F2'

       //  backgroundColor: '#fff'
    },
    targetImg :{
        left : 230,
        top : 150
    },
    targetxt : {
        width: 60,
        height: 19,
        left: 25,
        top: 35,
        /* Title - 15 */
        
        // font-family: 'Poppins';
        // font-style: normal;
        fontWeight: '400',
        fontSize: 14,
        // line-height: 22,
        /* identical to box height */
            
        color: '#343434',
    },
    setTime : {
        width: 60,
        height: 19,
        left: 25,
        top: 85,
        /* Title - 15 */
        
        // font-family: 'Poppins';
        // font-style: normal;
        fontWeight: '400',
        fontSize: 14,
        // line-height: 22,
        /* identical to box height */
            
        color: '#343434',
    },
    list : {
        width: Dimensions.get('window').width/4 -5,
        height: 50,
        // left: 16,
        // top: 113,
        
        /* Title - 15 */
        
        // font-family: 'Poppins';
        // font-style: normal;
        // fontWeight: '700',
        // fontSize: 23,
        // line-height: 22,
        /* identical to box height */
        borderColor : '#343434',    
        // backgroundColor: '#FFFFFF',
        borderRadius: 36
    },
    next : {
        top: 10,
        width: 120,
        height: 15,
        left: 210,
        // top: 26,


        fontWeight: '400',
        /* identical to box height */


        /* Accent */

        color: '#FB5252',
    },
    minusView : {
        width: 42,
        height: 42,
        left: 155,
        top: -32,
        borderRadius : 8, 
        backgroundColor : '#F2F2F2'

    },
    minusIcon : {
        width : 9,
        height : 18,
        top : -62,
        left : 165,
        color : '#fff'
    }, 
    modal : {
        position: 'absolute',
        width: 360,
        height: 361,
        left: 0,
        top: 359,

        backgroundColor: '#FFFFFF'
    },
    next1 : {
        top: 10,
        width: 120,
        height: 15,
        left: 260,
        // top: 26,


        fontWeight: '400',
        /* identical to box height */


        /* Accent */

        color: '#FB5252',
    },
    plusView : {
        width: 42,
        height: 42,
        left: 280,
        top: 40,
        borderRadius : 8, 
        backgroundColor : '#F2F2F2'

    },
    plusIcon : {
        width : 9,
        height : 18,
        top : 10,
        left : 290,
        color : '#fff'
    }, 
    hour : {
        top: 10,
        width: 120,
        height: 15,
        left: 235,
        // top: 26,


        fontWeight: '400',
        /* identical to box height */


        /* Accent */
    }
 });
 export { configHeader, goal , target  }    