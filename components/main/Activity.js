import { FontAwesome5 } from '@expo/vector-icons';
// import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TextInput,Button, TouchableOpacity, View } from 'react-native';
// import CachedImage from 'react-native-expo-cached-image';
import { Provider } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { fetchFeedPosts, fetchUserChats, sendNotification } from '../../../redux/actions/index';
import { container, text, utils,activityStyle } from '../styles';
// import { timeDifference } from '../utils';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { fetchUser,fetchUseractivity } from '../../redux/actions/index';
var today = new Date();
let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
import { useDispatch } from 'react-redux';

function Activity(props) {

    const activity_buttons = ['work','health','personal','others'];
    const [curractivity,setCurractivity] = useState(null);
    const [user, setUser] = useState(null);
    const [activity, setActivity] = useState([]);
    const [dummy, setDummy] = useState([]);
    const [input, setInput] = useState("");
    const [textInput, setTextInput] = useState(null);
    const [flatList, setFlatList] = useState(null);
    const [initialFetch, setInitialFetch] = useState(false);
    const [time, setTime] = useState(null);
    const [prevTime, setPrevTime] = useState(null);
    const [timeloading,setTimeloading] = useState(false)
    const [islogged,setIslogged] = useState(false);
    const [onboardingdetails,setOnboardingdetails] = useState({});
    const [availableActivity,setAvailableActivity] = useState([]);
    const [timeList,setTimeList] = useState([]);
    const [dailyloggedData, setDailyloggedData] = useState([]);
    const [userScore,setUserScore] = useState(0);
    const [maxScore,setMaxScore] = useState(0);
    const [goalsConfig,setGoalsConfig] = useState([]);

    const MINUTE_MS = 60000;
    // const dispatch = useDispatch();

        // useEffect(() => {
        //     // dispatch(fetchUseractivity());
        //     setActivity(dummy)
        // }, [dummy])
    const  loadPerMin = () => {
        
        let today = new Date();
        let hour = today.getHours();
        let time = getCurrentTime();
        setTime(time);
        setTimeloading(true);
        console.log(time);
        const loggedData = props.loggedActivity;
        
        // setActivity([]);
        console.log(loggedData);
        const dummyactivity = [];
        for (let i=0;i<=hour;i++){
            let hrs = (i < 10 ? '0' : '') + i;
            let nextHr = i+1;
            let id0 = hrs+ ': 00 - '+hrs+': 15';
            let id1 = hrs+ ': 15 - '+hrs+': 30';
            let id2 = hrs+ ': 30 - '+hrs+': 45';
            let id3 =   hrs+ ': 45 - '+'00: 00';
            if (today.getHours()<23){
                 id3 =   hrs+ ': 45 - '+nextHr+': 00';
               }
     
            // if (data.id == id0 || data.id == id1 || data.id == id2 || data.id == id3){
            //     if (data.id == time){
            //         dummyactivity.push({"id":data.id,"activity":data.activity,"selected":true})
            //     }
            //     else{
            //     dummyactivity.push({"id":data.id,"activity":data.activity,"selected":false})
            //     }
            //     // setDailyloggedData([...dailyloggedData,{"id":data.id,"activity":data.activity,"selected":false}])
            // }
            // else {
            if (i<hour){

            dummyactivity.push({"id":id0,"activity":null,"selected":false})
            dummyactivity.push({"id":id1,"activity":null,"selected":false})
            dummyactivity.push({"id":id2,"activity":null,"selected":false})
            dummyactivity.push({"id":id3,"activity":null,"selected":false})

            }
            else {
                if (today.getMinutes() <15){
                    dummyactivity.push({"id":id0,"activity":null,"selected":false})
                }
                else if(today.getMinutes() <30 && today.getMinutes() >=15 ){
                    dummyactivity.push({"id":id0,"activity":null,"selected":false})
                    dummyactivity.push({"id":id1,"activity":null,"selected":false})
                }
                else if(today.getMinutes() <45 && today.getMinutes() >=30 ){
                    dummyactivity.push({"id":id0,"activity":null,"selected":false})
                    dummyactivity.push({"id":id1,"activity":null,"selected":false})
                    dummyactivity.push({"id":id2,"activity":null,"selected":false})
                    }
                    else{
                    dummyactivity.push({"id":id0,"activity":null,"selected":false})
                    dummyactivity.push({"id":id1,"activity":null,"selected":false})
                    dummyactivity.push({"id":id2,"activity":null,"selected":false})
                    dummyactivity.push({"id":id3,"activity":null,"selected":false})
                    }
            }

                   

             

                //}
            
            // end of hout loop 

        }
        for (let data of loggedData){
            
            for (let val of dummyactivity){
                console.log(data);
                if (data.id == val.id){

                    val.activity=data.activity
                    console.log(val.activity);
                }
                if (val.id == time){
                    val.selected=true;
                    
                }
                else {
                    val.selected=false;
                }
            }
            
        }

        // const dummyactivity1 = Array.from(new Set(dummyactivity));
        
        setActivity(dummyactivity.reverse());
        console.log('len activity = ',dummyactivity.length);
        // console.log('rendering activity : ',activity);
        fetchUserConfig();
        
        setCurractivity(null);
        console.log('creating activity ...');
        if (timeList != null){
            // createActivity();
        }
        console.log('activity logged in firebase !');
        setTimeList([time]);
        console.log(curractivity);
        getUserScore();

        console.log('Logs every minute');
    }
    useEffect(() => {
       loadPerMin();
       
    // const interval = setInterval(() => {
        
    //     console.log('Logs every minute');
    //     console.log(curractivity);
    // }, MINUTE_MS);

    // return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, []);
    setInterval(loadPerMin, 900000);

    const  fetchUserConfig = () => {
        firebase.firestore()
           .collection("userConfig")
           .doc(firebase.auth().currentUser.uid)
           .get()
           .then((snapshot) => {
               if (snapshot.exists){
                   if(snapshot.data() != undefined){
                   const tasks = snapshot.data().config; 

                   const dummyData = []; 
                   const goalsData = [];
                   console.log('config tasks = ',tasks);
                   activity_buttons.map((item) => {


                    if (tasks[item]['activity'] != undefined){
                        // setFetchConfig(tasks[currCategory]['activity']);
                        tasks[item]['activity'].map((val) => {
                            console.log(val);
                            dummyData.push(val);

                            
                        })
                    }
                    Object.keys(tasks[item]['goals']).map(key => {
                        const keygoals = {
                           "id" :key, "goal" : tasks[item]['goals'][key] 
                        }
                        goalsData.push(keygoals);
                    })    
                    
                    // if (tasks[item]['goals'] != undefined){
                    //     // setFetchConfig(tasks[currCategory]['activity']);
                    //     tasks[item]['goals'].map((val) => {
                    //         goalsData.push(val);
                            
                    //     })
                    // }

                   })
                   setAvailableActivity(dummyData);
                   setGoalsConfig(goalsData);
                   
                   
                   
                //    console.log(availableActivity);
                //    console.log(' Goals Config = ', goalsConfig);

               }
           }
               
                   // fetchUserConfig();
           })

     } 
    const getCurrentTime = () => {
      let today = new Date();
      let nextHour = today.getHours()+1;
      let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
      let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    //   let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();

       if (today.getMinutes() <15){
            return hours+ ': 00 - '+hours+': 15';
       }
       else if(today.getMinutes() <30 && today.getMinutes() >=15 ){
        return hours+ ': 15 - '+hours+': 30';
       }
       else if(today.getMinutes() <45 && today.getMinutes() >=30 ){
        return hours+ ': 30 - '+hours+': 45';
       }
       else{
           if (today.getHours()<23){
            return  hours+ ': 45 - '+nextHour+': 00';
           }
           return  hours+ ': 45 - '+'00: 00';
       }

    }

    //logging the selected time slot in firestore
    const addItem = (itemData) => {
        // console.log(activity_buttons);
        console.log(itemData);

        setCurractivity(itemData);
        // setItemsAmount(itemsAmount + 1);
        console.log(curractivity);
        for (let data of activity){
            if (data.selected){
                data.activity = itemData;
            }
        }
        setActivity(activity);  
        setTimeList([time]);
       
        
        console.log(activity);
        createActivity(itemData);
        getUserScore();
      };
      


    const updateActivity = (id) => {

        setTimeList([...timeList,id]);
        for(let data of activity){
        if(data.id==id){
            data.selected=(data.selected==null)?true:!data.selected;
            break;
            
        }
        }
    setActivity(activity);

    };
    const getUserScore = () => {
        var totalScore = 0; 
        var maxScore = 0 ; 
        for (data of goalsConfig){
            for (val of availableActivity){
                if(data.id == val) {
                    if (data['goal']['priority']=='p1'){
                        totalScore+=data['goal']['hours']*40;
                    }
                    else if(data['goal']['priority']=='p2'){
                        totalScore+=data['goal']['hours']*30;
                    }
                    else {
                        totalScore+=data['goal']['hours']*10;
                    }
                }
               
            }
        }
        for (data of activity){
            if(data.activity != null){
                var temp = data.activity;
                for (val of goalsConfig){
                    if( val.id == temp ){
                        if (val['goal']['priority']=='p1'){
                            maxScore+=40;
                        }
                        else if(val['goal']['priority']=='p2'){
                            maxScore+=30;
                        }
                        else {
                            maxScore+=10;
                        }
                    }
                   
                }
            }
        }

        setUserScore(maxScore);
        setMaxScore(totalScore);



    }
    // FlatListItemSeparator = () => <View style={activityStyle.line} />;

    

    const createActivity = (inpActivity = curractivity) => {
        var today = new Date();
        let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
        const timestamp = firebase.firestore.FieldValue.serverTimestamp;
        console.log('timelist : ',timeList);
        
        for (let data of activity){
        if (data.selected){
            // data.activity = curractivity;
        firebase.firestore()
            .collection("activity")
            .doc(firebase.auth().currentUser.uid)
            .collection(date.toString())
            .doc(data.id)
            .set({
                // users: [firebase.auth().currentUser.uid, user.uid],
                activity: inpActivity
                // lastMessageTimestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                setTime(time);
                // setIslogged(true);
                // props.fetchUseractivity();
                // setActivity(props.loggedActivity.reverse());
                // console.log(activity);
                console.log('looged activity : ',curractivity);
                console.log('fetched activity : ',activity);
                // props.fetchUseractivity()
            })
        }
        
    }
    
    }


    return (
        <View style={[container.container, container.alignItemsCenter, utils.backgroundWhite]}>
            <Provider>

                


                < View style={[container.horizontal, utils.padding10, utils.alignItemsCenter, utils.backgroundWhite, utils.borderTopGray]} >
                    {
                        props.currentUser.image == 'default' ?
                            (
                                <Image
                                style={[utils.profileImageSmall]}
                                source={require('/Users/punitkumar/Documents/psapp/psappv0/assets/valueProps/images/dogesh.jpeg')} 
                               
                            />
                                // <FontAwesome5
                                //     style={[utils.profileImageSmall]}
                                //     name="user-circle" size={35} color="black" />

                            )
                            :
                            (
                                <Image
                                    style={[utils.profileImageSmall]}
                                    source={require('/Users/punitkumar/Documents/psapp/psappv0/assets/valueProps/images/img2.png')} 

                                />
                            )
                    }


                    <View >
                       <View ><Text> Current Time : {time}</Text></View> 
                       <View ><Text>Score: {userScore} / {maxScore}</Text></View>
                         

                            
                        {/* < TextInput
                            ref={input => { setTextInput(input) }}
                            value={input}
                            multiline={true}
                            style={[container.fillHorizontal, container.input, container.container]}
                            placeholder='message...'
                            onChangeText={(input) => setInput(input)} /> */}

                      
                    </View>
                    <View style={utils.btn}>
                        {availableActivity.map((item) => (
                            <Button   key={item.toString()} onPress={() => addItem(item)} title={item} />
                        ))}
                         
                        </View>  
                </View >
                <View>
                
                                <Text> Your logged Activity !! </Text>
                            
                    
                    <FlatList
                                data={activity}
                                // ItemSeparatorComponent={FlatListItemSeparator}
                                renderItem={({ item }) => (
                                <TouchableOpacity
                                onPress={ () =>updateActivity(item.id)}
                                >
                                       <View style = {item.selected == true ? activityStyle.selected:activityStyle.list}> 
                                        <Text>{item.id}  :  {item.activity} </Text>   
                                        </View>      
                                </TouchableOpacity>
                                   
                                    
                                )}
                                keyExtractor={item => item.id.toString()}
                                // ItemSeparatorComponent={this.ItemSeparator}
                                // refreshing={this.state.refreshing}
                                // onRefresh={this.handleRefresh}
                     />
                </View>
            </Provider>

        </View >

    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    loggedActivity: store.activityReducer.activity
   

})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUseractivity }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Activity);