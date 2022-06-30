import { StyleSheet } from 'react-native'
import {Dimensions} from 'react-native';

const configHeader = StyleSheet.create({

   header :  {
       position: 'absolute',
    width: 328,
    height: 23,
    left: 120,
    top: 22,
    
    /* Title - 15 */
    
    // font-family: 'Poppins';
    // font-style: normal;
    fontWeight: '500',
    fontSize: 15,
    // line-height: 22,
    /* identical to box height */
        
    color: '#000000',
    backgroundColor: '#fff'
},
head1 : {
    position: 'absolute',
    width: 328,
    height: 35,
    left: 80,
    top: 113,
    
    /* Title - 15 */
    
    // font-family: 'Poppins';
    // font-style: normal;
    fontWeight: '700',
    fontSize: 23,
    // line-height: 22,
    /* identical to box height */
        
    color: '#000000',
    backgroundColor: '#fff'
}
    

});

const activity = StyleSheet.create({
    container : {
        top : 200,
        left : 5,
        // right:10,
        width : Dimensions.get('window').width-5,
        backgroundColor: '#fff'

    },

    selected : {
        // top : 5,
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
        backgroundColor: '#F2F2F2',
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
            
        color: '#F2F2F2',
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
    addActivity : {
        position : 'relative',
        top : 100,
        left : 30,
        width: 306,
        height: 50,
        borderRadius : 8,
        


/* True White */

    backgroundColor: '#F2F2F2'
    }, 
    addData : {
        position : 'relative',
        top : 60,
        left : 350,
        // right: 50,
        padding: 6
    },

    next : {
        position : 'relative',
        top : 160, 
        left : 160,
        resizeMode: 'contain',
        width : '20%',
        height : '10%',
        borderRadius:30

       
    }, 
    backImg : {
        // flex: 1,

        top : 220, 
        // left : 160,
        width : Dimensions.get('window').width,
        height : 120,
        zIndex : 8
    },
    allbg : {
        backgroundColor: '#fff'
    },
    none : {
        width : '0%', 
        height : '0%', 
        // display : 'none'
    },
    done : {
        position : 'absolute',
        top : 360, 
        left : 160,
        // resizeMode: 'contain',
        // width : '20%',
        // height : '10%',
        borderRadius:30
    }

});
export { configHeader,activity }    