import Onboarding from 'react-native-onboarding-swiper';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { container, text, utils, form } from '../components/styles';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View,FlatList,TouchableOpacity,Image,TouchableWithoutFeedback,Keyboard, Alert,ScrollView, KeyboardAvoidingView } from 'react-native';
import { Provider } from 'react-native/Libraries/Text/TextAncestor';
import Activity from '../components/main/Activity';
import GoalsScreen from "./GoalsScreen";
import { activity, configHeader } from '../components/onBoardingStyles';
import { SafeAreaView } from 'react-native';
// import { KeyboardAvoidingView } from 'react-native-web';
export default function OnBoarding(props) {
    const [isWork,setIswork] = useState(false);
    const [isPersonal,setIsPersonal] = useState(false);
    const [isHealth,setIsHealth] = useState(false);
    const [isOthers,setIsOthers] = useState(false);
    const [isValid,setIsValid] = useState(true);
    const activity_buttons = ['work','health','personal','others'];
    const onboardingDefault = {
        "work" : {"activity" :["office", "personalProject"] , "completed":false }, 
        "health" : {"activity" :["workout", "running", "yoga"], "completed":false }, 
        "personal" :{"activity" : ["relationship", "friends", "trip"],  "completed":false }, 
        "others" : {"activity" :["others"],"completed":false }
        };
    const [onboardingdetails,setOnboardingdetails] = useState(onboardingDefault);
    const [currCategory,setCurrCategory] = useState("work");
    // const [config,setConfig] = useState(onboardingdetails[currCategory]["activity"]);
    const [fetchConfig,setFetchConfig] = useState([]);
    const [newActivity,setNewActivity] = useState('');
    const [currActivityList,setCurrActivityList] = useState([]);
    const [finalData,setFinalData] = useState(onboardingDefault);
    useEffect(() => {
        // console.log(this.state);
        firebase.firestore()
            .collection("userConfig")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists){
                    if(snapshot.data() != undefined){
                    if (snapshot.data().activity != undefined){
                        if (snapshot.data().activity.work != undefined){
                            if (snapshot.data().activity.work.completed){
                                setIswork(true);
                                
                            }
                           
                        }
                        if (snapshot.data().activity.health != undefined){
                            if(snapshot.data().activity.health.completed){
                                setIsHealth(true);
                                setCurrCategory("health");
                            }
                        }
                        if (snapshot.data().activity.personal != undefined){
                            if (snapshot.data().activity.personal.completed){
                                setIsPersonal(true);
                                setCurrCategory("personal")
                            }
                           
                        }
                        if (snapshot.data().activity.others != undefined){
                            if (snapshot.data().activity.others.completed){
                                setIsOthers(true);
                                setCurrCategory("others")
                            }
                            
                        }

                    }
                     

                    // setFetchConfig(tasks);
                    // console.log(fetchConfig);

                }
            }
                
                    // fetchUserConfig();
            })
            // setConfig();
            const dummy = []
            for (let data of  onboardingDefault[currCategory]["activity"]){
                const task = {};
                task.activity = data;
                task.selected = true;
                dummy.push(task);
            }
            onboardingDefault[currCategory]["activity"] = dummy;
            setOnboardingdetails(onboardingDefault);
            setCurrActivityList(dummy);
            console.log(onboardingdetails);



    },[])
    const updateActivity = (activity) => {

        // setTimeList([...timeList,id]);

        const dummy = []
            for (let data of  onboardingdetails[currCategory]["activity"]){

               if (data.activity == activity){
                     data.selected=!data.selected;
               }
               dummy.push(data);
            //    console.log(d)
            }
            // onboardingDefault[currCategory]["activity"] = dummy;
            console.log(onboardingdetails[currCategory]["activity"]);
            setOnboardingdetails(onboardingdetails);
            // setCurrActivityList(onboardingdetails[currCategory]["activity"])
            setCurrActivityList(dummy);



    };
    const addItem = (category,itemData) => {
        
        // console.log(activity_buttons);
        var curr_data_vaild = isValid;
        if(itemData.length <1) {
            Alert.alert('cant log emplty :P ');
            curr_data_vaild=false;
            setIsValid(false);
        }
        else{
            setIsValid(true);
        }

        console.log(itemData);
        if (curr_data_vaild){
            const curr_activity = onboardingdetails[category]["activity"]
            const config = [...curr_activity,{"activity" : itemData,"selected":true}]
            // updatedConfig = {...onboardingdetails,category:config}
            onboardingdetails[category]["activity"] = config;
    
            // setCurractivity(itemData);
            // setItemsAmount(itemsAmount + 1);
            // console.log(config);
            const dummy = []
            for (let data of  onboardingdetails[category]["activity"]){
                const task = {};
                console.log(data);
                if(data.activity != undefined) {
                    task.activity = data.activity;
    
                }
                else {
                    task.activity = data;
                }
                task.selected = data.selected;
                dummy.push(task);
            }
            setCurrActivityList(dummy);
        }
      
        // createConfig();
        
      };
      const markDone = () => {

        for (let cat of activity_buttons){
            const dummy = []
            for(let data of onboardingdetails[cat]['activity']){
                // var task = [];
                console.log(data);
                if(data.activity != undefined) {
                    // task = [...task,data.activity]
                    dummy.push(data.activity);
                }
                else {
                    // task.activity = data;
                    dummy.push(data);
                    // task = [...task,data]
                }
                // task.selected = true;
                
            }
            finalData[cat]['activity'] = dummy;

        }
        setFinalData(finalData)

     
         firebase.firestore()
            .collection("userConfig")
            .doc(firebase.auth().currentUser.uid)
            .set({
                // users: [firebase.auth().currentUser.uid, user.uid],
                config: finalData,
                completed : false
                // lastMessageTimestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                fetchUserConfig();
                // props.navigation.navigate('Activity');
                // props.fetchUseractivity()
            })
            props.navigation.navigate('Goals');
    }
    // const createConfig = async() => {
     
    //     await firebase.firestore()
    //         .collection("userConfig")
    //         .doc(firebase.auth().currentUser.uid)
    //         .set({
    //             // users: [firebase.auth().currentUser.uid, user.uid],
    //             config: onboardingdetails,
    //             completed : false
    //             // lastMessageTimestamp: firebase.firestore.FieldValue.serverTimestamp()
    //         }).then(() => {
    //             fetchUserConfig();
    //             // props.fetchUseractivity()
    //         })
    // }
    const  fetchUserConfig = () => {
         firebase.firestore()
            .collection("userConfig")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists){
                    if(snapshot.data() != undefined){
                    const tasks = snapshot.data().config; 
                    console.log(tasks);
                    
                    if (tasks[currCategory]['activity'] != undefined){
                        setFetchConfig(tasks[currCategory]['activity']);
                    }
                    
                    console.log(fetchConfig);

                }
            }
                
                    // fetchUserConfig();
            })

    } 
    const fetchNextCategory = (currCategory) => {

        var nextCat = '';
        if (currCategory=='work'){
            setCurrCategory('health');
            nextCat = 'health';
            // fetchUserConfig();
        }
        if (currCategory=='health'){
            setCurrCategory('personal');
            nextCat = 'personal';
            // fetchUserConfig();
        }
        if (currCategory=='personal'){
            setCurrCategory('others');
            // fetchUserConfig();
            nextCat = 'others';
        }
        if (currCategory=='others'){
            setCurrCategory('work');
            // fetchUserConfig();
            nextCat = 'work';
        }
        const dummy = []
        for (let data of  onboardingdetails[nextCat]["activity"]){
            const task = {};
            console.log(data);
            if(data.activity != undefined) {
                task.activity = data.activity;

            }
            else {
                task.activity = data;
            }
            task.selected = true;
            dummy.push(task);
        }
        onboardingdetails[nextCat]["activity"] = dummy;
        setOnboardingdetails(onboardingdetails);
    //    currActivityList = dummy;
        setCurrActivityList(dummy);
        console.log(onboardingdetails);
        

    }

    return (
    <Provider>
        <View style={activity.allbg}>
        
            <View>
                <Text style={configHeader.header}>Set up time tracking</Text>
                <Text style={configHeader.head1}  >Track {currCategory} Activities</Text>
            </View>

            <View style={activity.container}>
                    <FlatList
                        data={currActivityList}
                        numColumns={3}
                        
                        renderItem={({ item }) => (
                            <TouchableOpacity
                            onPress={ () =>updateActivity(item.activity)}
                            >
                                {console.log(item.selected)}
                                   <View style = {item.selected == true ? activity.selected:activity.list}> 
                                    <Text style = {item.selected == true ? activity.selectedtxt:activity.listtxt}> {item.activity} </Text>   
                                    </View>      
                            </TouchableOpacity>
                               
                                
                            )}
                            keyExtractor={item => item.activity}
                    />
                    
                    {/* {onboardingDefault[currCategory]["activity"].map((item) => (
                        <Button key={item.toString()}  title={item} />
                    ))} */}
                        <View>
                        {/* <ScrollView style={activity.addActivity} onBlur={Keyboard.dismiss}> */}
                        <KeyboardAvoidingView>
                        
                                <TextInput
                                            style={activity.addActivity}
                                            placeholder="Add New Activity"
                                            placeholderTextColor="#000" 
                                            onChangeText={(activity) => setNewActivity(activity)}
                                        />
                            {/* </TouchableWithoutFeedback> */}
                         
                        </KeyboardAvoidingView>
                        {/* </ScrollView> */}
                            <TouchableOpacity onPress={() => addItem(currCategory,newActivity)} style={activity.addData}>
                                <Image source={require('/Users/punitkumar/Documents/psapp/psappv0/assets/addData.png')} />
                            </TouchableOpacity>
                            {currCategory != 'others' && <TouchableOpacity onPress={() => fetchNextCategory(currCategory)} style={activity.next}>
                                                <Image source={require('/Users/punitkumar/Documents/psapp/psappv0/assets/next.png')} />
                    </TouchableOpacity> }
                            

                

                            {currCategory =='others' && 
                            <TouchableOpacity onPress={() =>  markDone()} style={activity.next}>
                            <Image source={require('/Users/punitkumar/Documents/psapp/psappv0/assets/next.png')} />
                            <Text style={{left:-10}}>Mark Done ! </Text>
                            </TouchableOpacity>
                    }

                            <Image style={activity.backImg} source={require('/Users/punitkumar/Documents/psapp/psappv0/assets/backImg.png')}/>
                
                        </View>
                        

                        {/* <Button style={activity.next} onPress={() =>fetchNextCategory(currCategory)} title='Next'/> */}

                    
                            {/* <Button  onPress={() => addItem(currCategory,newActivity)} title='Add Activity' /> */}
                           
            </View>  
            
          
          {/* </ScrollView> */}
          </View>
        </Provider>
    
    )

}