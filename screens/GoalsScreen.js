import Onboarding from 'react-native-onboarding-swiper';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { container, text, utils, form } from '../components/styles';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View,Image, TouchableOpacity,FlatList,StyleSheet, Pressable } from 'react-native';
import { Provider } from 'react-native/Libraries/Text/TextAncestor';
import Activity from '../components/main/Activity';
import { ScrollView } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import Main from '../components/Main';
import { configHeader, goal, target } from '../components/style/goalsStyle';
import { activity } from '../components/onBoardingStyles';
import Modal from "react-native-modal";

export default function Goals(props) {
    const [isWork,setIswork] = useState(false);
    const [isPersonal,setIsPersonal] = useState(false);
    const [isHealth,setIsHealth] = useState(false);
    const [isOthers,setIsOthers] = useState(false);
    const [onboardingdetails,setOnboardingdetails] = useState({});
    const [currCategory,setCurrCategory] = useState("work");
    const [goals,setGoals] = useState({});
    const [priority,setPriority] = useState('low')
    const [hour,setHour] = useState(1)
    const [workList,setWorkList] = useState([]);
    const [healthList,setHealthList] = useState([]);
    const [personalList,setPersonalList] = useState([]);
    const [othersList,setOthersList] = useState([]);
    // const [goal,setGoal] = useState({});
    // flag for shortlisting the activities for goal setup  
    const [selectGoals,setSelectGoals] = useState(false);
    const [buckets,setBuckets] = useState([]);
    const [modalVisible,setModalVisible] = useState(false);
        

    // const [config,setConfig] = useState(onboardingdetails[currCategory]["activity"]);
    const [fetchConfig,setFetchConfig] = useState([]);
    const [newActivity,setNewActivity] = useState('');
    const select_hrs = [1,2,3,4,5,6,7,8,9,10,11,12];
    const [selectPriority,setSelectPriority] = useState([{priority:'low',selected:false},{priority:'medium',selected:false},{priority:'high',selected:false}]);
    const [isLoading,setIsLoading] = useState(false);
    const [catSelector,setCatSelector] = useState({'work':false,'health':false,'personal':false,'others':false})
    useEffect(() => {
        // console.log(this.state);
        firebase.firestore()
        .collection("userConfig")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists){
                if(snapshot.data() != undefined){
                const tasks = snapshot.data().config; 
                // console.log(tasks);
                // setOnboardingdetails(tasks);
                
                if (tasks[currCategory]['activity'] != undefined){
                    // setFetchConfig(tasks[currCategory]['activity']);
                }
                var buckets = Object.keys(tasks);
                console.log('buckets = ',buckets);
                console.log('tasks = ',tasks);
                for (let item of buckets){
                    const dummy = []
                    // tasks[item]['activity'].map((data) => (
                    for (let data of  tasks[item]["activity"]){
                        console.log('object data = ', data)
                        const task = {};
                        task.activity = data;
                        task.selected = false;
                        dummy.push(task);
                    }
                    tasks[item]["activity"] = dummy;
                    if (item == 'work') {
                        setWorkList(dummy);
                    }
                    if (item == 'health'){
                        setHealthList(dummy);
                    }
                    if (item == 'personal'){
                        setPersonalList(dummy);
                    }
                    if (item == 'others'){
                        setOthersList(dummy);
                    }
        
                   
                }
                setBuckets(buckets);
                console.log('tasks = ',tasks)
                setOnboardingdetails(tasks);
                
                
                // console.log(fetchConfig);

            }
        }
        setIsLoading(true);
            
                // fetchUserConfig();
        })
        const temp = [];
        for (let data of selectPriority) {
                if (data.priority =='low') {
                    data.selected = true;
                }
                else{
                    data.selected = false;
                }
                temp.push(data);
        }
        setSelectPriority(temp);
       
            // setConfig();

        
        



    },[])
    const addItem = (category,itemData) => {
        
        // console.log(activity_buttons);

        console.log(itemData);

        const curr_activity = onboardingdetails[category]["activity"]
        const config = [...curr_activity,itemData]
        // updatedConfig = {...onboardingdetails,category:config}
        onboardingdetails[category]["activity"] = config;

        // setCurractivity(itemData);
        // setItemsAmount(itemsAmount + 1);
        // console.log(config);
        createConfig();
        
      };
      const markDone = () => {
        onboardingdetails["work"]["completed"] = true;
        onboardingdetails["personal"]["completed"] = true;
        onboardingdetails["health"]["completed"] = true;
        onboardingdetails["others"]["completed"] = true;
        console.log(firebase.auth().currentUser.uid);
         firebase.firestore()
            .collection("userConfig")
            .doc(firebase.auth().currentUser.uid)
            .set({
                // users: [firebase.auth().currentUser.uid, user.uid],
                config: onboardingdetails,
                completed : true
                // lastMessageTimestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                fetchUserConfig();

                props.navigation.navigate('Main');
                // props.fetchUseractivity()
            })
    }
    const createConfig = async() => {
     
        await firebase.firestore()
            .collection("userConfig")
            .doc(firebase.auth().currentUser.uid)
            .set({
                // users: [firebase.auth().currentUser.uid, user.uid],
                config: onboardingdetails,
                completed : false
                // lastMessageTimestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                fetchUserConfig();
                // props.fetchUseractivity()
            })
    }
    const  fetchUserConfig = () => {
         firebase.firestore()
            .collection("userConfig")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists){
                    if(snapshot.data() != undefined){
                    const tasks = snapshot.data().config; 
                    // console.log(tasks);
                    setOnboardingdetails(tasks);
                    
                    if (tasks[currCategory]['activity'] != undefined){
                        setFetchConfig(tasks[currCategory]['activity']);
                    }
                    
                    // console.log(fetchConfig);

                }
            }
                
                    // fetchUserConfig();
            })

    } 
  
    const showActivity = (item) => {
        catSelector[item]  = !catSelector[item];
        setCatSelector(catSelector);
        console.log(catSelector);
        if (item=='work'){
            setIswork(!isWork);

        }
        if (item == 'health'){
            setIsHealth(!isHealth);
        }
        if (item == 'personal'){
            setIsPersonal(!isPersonal);
        }
        if (item == 'others'){
            setIsOthers(!isOthers);
        }


    };
    const updateActivity = (currCategory,activity) => {

        // setTimeList([...timeList,id]);

        const dummy = []
            for (let data of  onboardingdetails[currCategory]["activity"]){

               if (data.activity == activity){
                     data.selected=!data.selected;
               }
               dummy.push(data);
            //    console.log(d)
            }
            onboardingdetails[currCategory]["activity"] = dummy;

            console.log(onboardingdetails[currCategory]["activity"]);
            setOnboardingdetails(onboardingdetails);
            if (currCategory=='work') {
                setWorkList(dummy);
            }
            if (currCategory == 'health') {
                setHealthList(dummy);
            }
            if (currCategory == 'personal') {
                setPersonalList(dummy);
            }
            if (currCategory == 'others') {
                setOthersList(dummy);
            }
            // setCurrActivityList(onboardingdetails[currCategory]["activity"])
            // setCurrActivityList(dummy);



    };
    const toggleActivityView = (data) => {
        // var cat 
        
            { isPersonal && onboardingdetails[data] !=undefined  && 
                <FlatList
                data={onboardingdetails[data]['activity']}
                numColumns={3}
                
                renderItem={({ item }) => (
                    <TouchableOpacity
                    onPress={ () =>updateActivity(data,item.activity)}
                    >
                        {/* {console.log('curr selection flag = ',catSelector[data])} */}
                        <View style = {item.selected == true ? activity.selected:activity.list}> 
                            <Text style = {item.selected == true ? activity.selectedtxt:activity.listtxt}> {item.activity} </Text>   
                            </View>      
                    </TouchableOpacity>
                    
                        
                    )}
                    keyExtractor={item => item.activity}
            />
            }
        
        
        
    }; 
    const MarkSelectionFlag = () => {
        console.log(selectGoals);

        setSelectGoals(true);
    };
    const updateGoal = (cat,activity) => {
        if (goals.hours != undefined){
            onboardingdetails[cat]['goals'] = {}
            onboardingdetails[cat]['goals'][activity]=goals;
            setOnboardingdetails(onboardingdetails);
            setGoals({});
            setModalVisible(false);
            setHour(1);
            setPriority('low');
            for (let data of selectPriority){
                if(data.priority == 'low'){
                    data.selected= true;
                }
                else {
                    data.selected = false;
                }
            }
            setSelectPriority(selectPriority);
        }
        console.log('details after updating target = ',onboardingdetails);
           
    };
    const updateHours = (type) => {
        if (type=='add'){
            setHour(hour+1);
        }
        else {
            if (hour>=1){
                setHour(hour-1);
            }
           
        }
        goals['hours'] = hour;
        goals['priority'] = priority;
        setGoals(goals);
        console.log(goals);
    };
    const updatePriority = (type) => {
        for (let data of selectPriority){
            if(data.priority == type){
                data.selected= !data.selected;
            }
        }
        setSelectPriority(selectPriority);
        
        setPriority(type);
        goals['hours'] = hour;
        goals['priority'] = type;
        setGoals(goals);
    };
    const showModal = () => {
        setModalVisible(true);
    } 
    if (!isLoading){
        return (
            <View>
                
            </View>
        )

    }

    if(!selectGoals) {
        
        return (
        <View>
            <Provider>

            <ScrollView nestedScrollEnabled={true}> 
                   
   
                <View style ={goal.container}>
                    <View>
                        <TouchableOpacity onPress={() => MarkSelectionFlag()}> 
                          <Text  style={goal.next}>Next</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                              
                        <Text style={configHeader.header}>Select Goals</Text>
                        <Text style={configHeader.para1}>Activities where you have a goal in term of minimum time spent</Text>
                        
                           
                       
                        {/* <Button onPress={setGoalTarget} style={goal.next} title='Next'/> */}
                    </View>
                    

                        <View>
                        {/* Rendering Work */}

                            
                            <View style={goal.goalBox}>
                                <Image style={goal.catImg} source ={require('/Users/punitkumar/Documents/psapp/psappv0/assets/personal.png')}/> 
                                <Text style={goal.cat}>Work</Text>
                                <TouchableOpacity onPress={() =>showActivity('work')}>
                                    <Image style={goal.plusView} source={require('/Users/punitkumar/Documents/psapp/psappv0/assets/moreBack.png')} />
                                    {isWork == false ? <View><Text style = {goal.plusIcon} >+</Text></View>: null}
                                    {isWork == true  ? <View><Text style = {goal.plusIcon} >-</Text></View>:null}
                                </TouchableOpacity>
                                {/* {}  */}

                                {isWork && onboardingdetails['work'] !=undefined  && 
                                <View> 
                                    
                                <FlatList
                                    data={workList}
                                    numColumns={3}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                        onPress={ () =>updateActivity('work',item.activity)}
                                        >
                                            { item.selected  &&   <View style = {goal.selected}> 
                                                <Text style = {item.selected == true ? goal.selectedtxt:goal.listtxt}>{item.activity}</Text>   
                                                <Text style = {goal.minusIcon}>x</Text>
                                                </View>  }
                                                
                                        </TouchableOpacity>
                                        
                                            
                                        )}
                                        keyExtractor={item => item.activity}
                                        listMode="SCROLLVIEW"
                                />
                                <View style={{
                                            borderBottomColor: 'black',
                                            borderBottomWidth: StyleSheet.hairlineWidth,
                                        }}></View>
                                <FlatList
                                    data={workList}
                                    numColumns={3}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                        onPress={ () =>updateActivity('work',item.activity)}
                                        >
                                            { !item.selected && <View style = {goal.list}> 
                                                <Text style = {goal.listtxt}>{item.activity}</Text>   
                                                </View>  }    
                                        </TouchableOpacity>
                                        
                                            
                                        )}
                                        keyExtractor={item => item.activity}
                                        listMode="SCROLLVIEW"
                                />
                                </View>
                                }
                                
                            </View>
                           
                            <View style={goal.goalBox}>
                                <Image style={goal.catImg} source ={require('/Users/punitkumar/Documents/psapp/psappv0/assets/health.png')}/> 
                                <Text style={goal.cat}> Health</Text>
                                <TouchableOpacity onPress={() =>showActivity('health')}>
                                    <Image style={goal.plusView} source={require('/Users/punitkumar/Documents/psapp/psappv0/assets/moreBack.png')} />
                                    {!isHealth ? <Text style = {goal.plusIcon} >+</Text>:null}
                                    {isHealth ? <Text style = {goal.plusIcon} >-</Text>:null}                              
                                </TouchableOpacity>
                                {/* {}  */}
                                {isHealth && onboardingdetails['health'] !=undefined  && 
                                    <View> 
                                    
                                        <FlatList
                                        data={healthList}
                                        numColumns={3}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                            onPress={ () =>updateActivity('health',item.activity)}
                                            >
                                                {/* {console.log('curr selection flag = ',catSelector[data])} */}
                                                { item.selected  &&   <View style = {goal.selected}> 
                                                    <Text style = {item.selected == true ? goal.selectedtxt:goal.listtxt}>{item.activity}</Text>   
                                                    <Text style = {goal.minusIcon}>x</Text>
                                                    </View>  }
                                                    
                                            </TouchableOpacity>
                                            
                                                
                                            )}
                                            keyExtractor={item => item.activity}
                                            listMode="SCROLLVIEW"
                                        />
                                        <View style={{
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                                }}></View>
                                        <FlatList
                                            data={healthList}
                                            numColumns={3}
                                            renderItem={({ item }) => (
                                            <TouchableOpacity
                                            onPress={ () =>updateActivity('health',item.activity)}
                                            >
                                                {/* {console.log('curr selection flag = ',catSelector[data])} */}
                                                { !item.selected && <View style = {goal.list}> 
                                                    <Text style = {goal.listtxt}>{item.activity}</Text>   
                                                    </View>  }    
                                            </TouchableOpacity>
                                            
                                                
                                            )}
                                            keyExtractor={item => item.activity}
                                            listMode="SCROLLVIEW"
                                    />
                                    </View>
                                }
                                
                            </View>
                            <View style={goal.goalBox}>
                                <Image style={goal.catImg} source ={require('/Users/punitkumar/Documents/psapp/psappv0/assets/personal.png')}/> 
                                <Text style={goal.cat}> Personal </Text>
                                <TouchableOpacity onPress={() =>showActivity('personal')}>
                                    <Image style={goal.plusView} source={require('/Users/punitkumar/Documents/psapp/psappv0/assets/moreBack.png')} />
                                    <View>
                                    {!isPersonal ? <Text style = {goal.plusIcon} >+</Text>:null}
                                    {isPersonal ? <Text style = {goal.plusIcon} >-</Text>:null}    
                                    </View>                                    
                                </TouchableOpacity>
                              
                                { isPersonal && onboardingdetails['personal'] !=undefined  && 
                                   <View> 
                                    
                                   <FlatList
                                   data={personalList}
                                   numColumns={3}
                                   renderItem={({ item }) => (
                                       <TouchableOpacity
                                       onPress={ () =>updateActivity('personal',item.activity)}
                                       >
                                           { item.selected  &&   <View style = {goal.selected}> 
                                               <Text style = {item.selected == true ? goal.selectedtxt:goal.listtxt}>{item.activity}</Text>   
                                               <Text style = {goal.minusIcon}>x</Text>
                                               </View>  }
                                               
                                       </TouchableOpacity>
                                       
                                           
                                       )}
                                       keyExtractor={item => item.activity}
                                       listMode="SCROLLVIEW"
                                   />
                                   <View style={{
                                               borderBottomColor: 'black',
                                               borderBottomWidth: StyleSheet.hairlineWidth,
                                           }}></View>
                                   <FlatList
                                       data={personalList}
                                       numColumns={3}
                                       renderItem={({ item }) => (
                                       <TouchableOpacity
                                       onPress={ () =>updateActivity('personal',item.activity)}
                                       >
                                           {/* {console.log('curr selection flag = ',catSelector[data])} */}
                                           { !item.selected && <View style = {goal.list}> 
                                               <Text style = {goal.listtxt}>{item.activity}</Text>   
                                               </View>  }    
                                       </TouchableOpacity>
                                       
                                           
                                       )}
                                       keyExtractor={item => item.activity}
                                       listMode="SCROLLVIEW"
                               />
                               </View>
                                }
                                
                            </View>
                            <View style={goal.goalBox}>
                                <Image style={goal.catImg} source ={require('/Users/punitkumar/Documents/psapp/psappv0/assets/health.png')}/> 
                                <Text style={goal.cat}> Others </Text>
                                <TouchableOpacity onPress={() =>showActivity('others')}>
                                    <Image style={goal.plusView} source={require('/Users/punitkumar/Documents/psapp/psappv0/assets/moreBack.png')} />
                                    <View>
                                    {!isOthers ? <Text style = {goal.plusIcon} >+</Text>:null}
                                    {isOthers ? <Text style = {goal.plusIcon} >-</Text>:null}      
                                    </View>                                  
                                     </TouchableOpacity>
                                {/* {}  */}
                                { isOthers && onboardingdetails['others'] !=undefined  && 
                                  <View> 
                                    
                                  <FlatList
                                  data={othersList}
                                  numColumns={3}
                                  renderItem={({ item }) => (
                                      <TouchableOpacity
                                      onPress={ () =>updateActivity('others',item.activity)}
                                      >
                                          {/* {console.log('curr selection flag = ',catSelector[data])} */}
                                          { item.selected  &&   <View style = {goal.selected}> 
                                              <Text style = {item.selected == true ? goal.selectedtxt:goal.listtxt}>{item.activity}</Text>   
                                              <Text style = {goal.minusIcon}>x</Text>
                                              </View>  }
                                              
                                      </TouchableOpacity>
                                      
                                          
                                      )}
                                      keyExtractor={item => item.activity}
                                      listMode="SCROLLVIEW"
                                  />
                                  <View style={{
                                              borderBottomColor: 'black',
                                              borderBottomWidth: StyleSheet.hairlineWidth,
                                          }}>
                                          </View>
                                  <FlatList
                                      data={othersList}
                                      numColumns={3}
                                      renderItem={({ item }) => (
                                      <TouchableOpacity
                                      onPress={ () =>updateActivity('others',item.activity)}
                                      >
                                          {!item.selected && <View style = {goal.list}> 
                                              <Text style = {goal.listtxt}>{item.activity}</Text>   
                                              </View> }    
                                      </TouchableOpacity>
                                      
                                          
                                      )}
                                      keyExtractor={item => item.activity}
                                      listMode="SCROLLVIEW"
                              />
                              </View>
                                }
                                
                            </View>
                         {/* ))} */}
                        </View>
                        {/* } */}
                  

                </View>
                </ScrollView>
            </Provider>
            </View>
        )

    }

    
    return (
        <Provider>
           
           <View style ={goal.container}>
                    <View>
                        {/* <TouchableOpacity onPress={() => MarkSelectionFlag()}> 
                          <Text  style={goal.next}>Next</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View>
                    <Image style={target.targetImg} source ={require('/Users/punitkumar/Documents/psapp/psappv0/assets/personal.png')}/>       
                        <Text style={configHeader.header}>Set Target and Priorities</Text>
                        <Text style={target.para1}> Set a time target for today for each activity along with the priority.</Text>
                        
                           
                       
                        {/* <Button onPress={setGoalTarget} style={goal.next} title='Next'/> */}
                    </View>
                    <View style ={goal.goalBox}>
                        {buckets.map((data) => (
                            <View>
                                <FlatList 
                                    data={onboardingdetails[data]['activity']}
                                    numColumns={1}
                                    renderItem={({ item }) => (
                                            <View style = {target.list}>
                                            {/* {console.log('curr selection flag = ',catSelector[data])} */}
                                            {item.selected  &&   <View > 
                                                <Text style = {target.targetxt}>{item.activity}</Text>   
                                               
                                                
                                                    { onboardingdetails[data]['goals'] == undefined && <View>  
                                                        <TouchableOpacity onPress={() =>showModal()}>
                                                             <Text  style={target.next}>+ Add Target</Text>
                                                        </TouchableOpacity> 
                                                        </View>  
                                                    }
                                                    { onboardingdetails[data]['goals'] != undefined && <View>  

                                                        <TouchableOpacity onPress={() =>showModal()}>
                                                             <Text  style={target.next}>{onboardingdetails[data]['goals'][item.activity]['priority']}</Text>
                                                             <Text  style={target.next1}>{onboardingdetails[data]['goals'][item.activity]['hours']} hrs</Text>
                                                        </TouchableOpacity> 
                                                        </View>  
                                                    }

                                                    <Modal   isVisible={modalVisible}     >
                                                            <View style={target.modal}>
                                                            <Text style = {target.targetxt}>{item.activity}</Text>   
                                                            <TouchableOpacity onPress={() => updateGoal(data,item.activity)}>
                                                                  <Text  style={target.next}>update</Text>
                                                            </TouchableOpacity>
                                                                <View>
                                                                    <Text style={target.setTime}>Set timing</Text>
                                                                    <TouchableOpacity onPress={() =>updateHours('add')}>
                                                                        <Image style={target.plusView} source={require('/Users/punitkumar/Documents/psapp/psappv0/assets/moreBack.png')} />
                                                                        <Text style = {target.plusIcon} >+</Text>
                                                                    </TouchableOpacity>  
                                                                    <Text style={target.hour}>{hour}</Text>
                                                                    <TouchableOpacity onPress={() =>updateHours('minus')}>
                                                                        <Image style={target.minusView} source={require('/Users/punitkumar/Documents/psapp/psappv0/assets/moreBack.png')} />
                                                                         <Text style = {target.minusIcon} >-</Text>
                                                                    </TouchableOpacity>  

                                                                </View>
                                                                   
                                                                <View>
                                                                    <Text>Select Priority</Text>
                                                                        <FlatList
                                                                            data={selectPriority}
                                                                            numColumns={3}
                                                                            renderItem={({ item }) => (
                                                                            <TouchableOpacity
                                                                            onPress={ () =>updatePriority(item.priority)}
                                                                            >
                                                                                  {/* <Text style = {goal.listtxt}>{item.priority}</Text>    */}
                                                                                {!item.selected && <View style = {goal.list}> 
                                                                                    <Text style = {goal.listtxt}>{item.priority}</Text>   
                                                                                    </View> } 
                                                                                     { item.selected  &&   <View style = {goal.selected}> 
                                                                                        <Text style = {item.selected == true ? goal.selectedtxt:goal.listtxt}>{item.priority}</Text>   
                                                                                        </View>  }
                                                                                    
                                                                            </TouchableOpacity>
                                                                            
                                                                                
                                                                            )}
                                                                            keyExtractor={itm => itm.activity}
                                                                            listMode="SCROLLVIEW"
                                                                    />
                                                                </View>
                                                            </View>

                                                        </Modal>

                                                        
                                                        </View>
                                                    
                                                    
                                                 }
                                                
                                            </View>
                                            
                                        
                                            
                                        )}
                                        keyExtractor={item => item.activity}
                                        listMode="SCROLLVIEW"
                                />
                            </View>
                        ))}

                    </View>
            </View>
        </Provider>
    )

    // return (
    //     <Provider>
            {/* <ScrollView> */}
{/* 
<View style={utils.btn}>
        <Text> Add Goals for  : {currCategory} </Text>
        {onboardingdetails[currCategory]["activity"].map((item) => {
            console.log(onboardingdetails);
            return (
                <View>
                <Button key={item.toString()} title={item} />  
                <SelectDropdown
                data={select_priority}
                onSelect={(selectedItem, index) => {
                    if (goals[item]== undefined){
                        goals[item] = {}
                    }
                    setPriority(selectedItem);
                    goals[item]['priority'] = priority;
                    goals[item]['hours'] = hour;
                    console.log(goals);
                    onboardingdetails[currCategory]['goals'] = goals;
                    setOnboardingdetails(onboardingdetails);
                    // onboardingdetails[currCategory]['goals'][item]['priority'] = selectedItem
                    // setOnboardingdetails
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
            />
            <SelectDropdown
                data={select_hrs}
                onSelect={(selectedItem, index) => {
                    if (goals[item]== undefined){
                        goals[item] = {}
                    }
                    setHour(selectedItem);
                    
                    goals[item]['priority'] = priority;
                    goals[item]['hours'] = hour;
                    console.log(goals);
                    onboardingdetails[currCategory]['goals'] = goals;
                    setOnboardingdetails(onboardingdetails);
                    // onboardingdetails[currCategory]['goals'][item]['hours'] = selectedItem
                    // setOnboardingdetails
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
            />
        </View>
            )
        }
        )}
        
               
                <Button  onPress={() => createConfig()} title='Add Goals' />
                <Button onPress={() =>fetchNextCategory(currCategory)} title='Next'/>
        </View>  

          <View>
            <Text>Your current chosen Goals</Text>
            
            {onboardingdetails[currCategory]["activity"].map((item) => 
            {
                if (onboardingdetails[currCategory]["goals"] != undefined){
                    return (
                        <View>
                        
                        <Button  key={item.toString()}  title={item} />
                        
                        </View>
                        
                    ) 
                }
                else{
                    return (
                        <View>
                            <Button  key={item.toString()}  title={item} />
                        </View>
                    )
                }
                

            }
            )}
       
          </View>

          <View>
          <Button  onPress={() => markDone()} title='Done' />
          </View> */}
          {/* </ScrollView> */}
        {/* </Provider>
    
    ) */}

}