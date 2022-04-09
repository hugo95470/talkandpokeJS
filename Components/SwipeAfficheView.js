import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity,ScrollView, FlatList, Text, View, Image, Modal, Animated, PanResponder, Dimensions, ActivityIndicator } from 'react-native';
import { useEffect, useState, useRef } from 'react';

import Context from '../navigation/userContext';
import ImagePourcentage from '../Components/ImagePourcentage';
import { loadTagUtilisateurDescription } from '../service/TagService';


//TO REFACTOR

export default function SwipeAfficheView(props) {

  const context = useContext(Context)

  let [showSuggestion, setShowSuggestion] = useState(false);
  let [suggestion, setSuggestion] = useState("");
  let [suggestionTags, setSuggestionTags] = useState("");
  let [utilisateurTagDescription, setUtilisateurTagDescription] = useState("");
  
  let [count, setCount] = useState(0);

  var [cards, setCards] = useState("");
  let [lastCards, setLastCards] = useState([]);

  //CHARGER LES AFFICHES
  useEffect(() => {
    let mounted = true;

      if(context.utilisateurId != ""){
        fetch(global.apiUrl + 'Affiche/GetSwipeAffiches.php?Nombre=20&TokenUtilisateur=' + context.utilisateurToken)
          .then((response) => response.json())
          .then((data) => {
              setCards(data);
          });
      }
      return () => mounted = false;

  }, [context.utilisateurId]);


  function getAffiches(lastCardId = 0) {
      fetch(global.apiUrl + 'Affiche/GetSwipeAffiches.php?Nombre=1&TokenUtilisateur=' + context.utilisateurToken)
      .then((response) => response.json())
      .then((data) => {
        if((lastCards.find(element => element == data[0].AfficheId) == undefined && data[0].AfficheId != lastCardId) || data[0].AfficheId == 0){
          let newstate = [...cards, ...data]
          setCards(newstate);
        }else{
          getAffiches(lastCardId);
        }
      });            
  }

  var [ position, setPosition ] = useState(false);

  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    setPosition(new Animated.ValueXY());
  }, [])

  var [ state, setState ] = useState(0);

  function loadSuggestion() {
    setCount(count+1)

    if(count >= 4) {
      fetch('https://hugocabaret.onthewifi.com/TalkAndPoke/talkandpokeapi/requetes/Tag/GetUtilisateurTagScoreByUtilisateur.php?TokenUtilisateur=' + context.utilisateurToken + '&Limit=20&Contact=true')
      .then((response) => response.json())
      .then((data) => {
        setSuggestion(data);
      })
      .then(() => {
        fetch('https://hugocabaret.onthewifi.com/TalkAndPoke/talkandpokeapi/requetes/Tag/GetUtilisateurTagScore.php?TokenUtilisateur=' + context.utilisateurToken + '&Limit=8')
        .then((response) => response.json())
        .then(async (dataTags) => {
          setSuggestionTags(dataTags);
          setUtilisateurTagDescription(await loadTagUtilisateurDescription(10, context.utilisateurToken));
        })
        .then(() => {
          setCount(0);
          setShowSuggestion(true);
        });
      });

      

    }    
  }

  const panResponder = PanResponder.create({

    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        { dx: pan.x, dy: pan.y }
      ],
      {useNativeDriver: false}
    ),
    onPanResponderRelease: (evt, gestureState) => {

      //On recup une liste des 5 dernieres affiche passé pour les supprimer au cas ou ils repassent
      let newstate = [...lastCards, ...[cards[state].AfficheId]]
      if(newstate.length > 5)
        newstate.shift()
      setLastCards(newstate);

      if (gestureState.dx > 60) {
        Animated.spring(pan, {
          toValue: { x: 300, y: gestureState.dy },
          speed: 100,
          useNativeDriver: false,
        }).start(() => {
          Animated.timing(pan, {
            toValue: { x: 0, y: 0 },
            duration: 0,
            useNativeDriver: false,
            }).start()
          setState(state +1)

        })

        getAffiches(cards[state].AfficheId)
        loadSuggestion()
        fetch(global.apiUrl + 'Reaction/AddReaction.php?AfficheId=' + cards[state].AfficheId + '&Emotion=like&UtilisateurId=' + context.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken)
      }else if (gestureState.dx < -60) {
        Animated.spring(pan, {
          toValue: { x: -300, y: gestureState.dy },
          speed: 100,
          useNativeDriver: false,
        }).start(() => {
          Animated.timing(pan, 
            {toValue: {x: 0, y: 0}, 
            duration: 0,
            useNativeDriver: false,
          }).start()
          setState(state + 1)

        })
        fetch(global.apiUrl + 'Reaction/AddReaction.php?AfficheId=' + cards[state].AfficheId + '&Emotion=dislike&UtilisateurId=' + context.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken)
        loadSuggestion()
        getAffiches(cards[state].AfficheId)
        //alert("ici l'evennement pour la gauche")

      }else if (gestureState.dy < -60) {
        Animated.spring(pan, {
          toValue: { x: gestureState.dx, y: -300 },
          speed: 100,
          useNativeDriver: false,
        }).start(() => {
          Animated.timing(pan, {
            toValue: { x: 0, y: 0 },
            duration: 0,
            useNativeDriver: false,
            }).start()
          setState(state + 1)
        })
        fetch(global.apiUrl + 'Reaction/AddReaction.php?AfficheId=' + cards[state].AfficheId + '&Emotion=coeur&UtilisateurId=' + context.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken)
        loadSuggestion()
        getAffiches(cards[state].AfficheId)

      }else {
        Animated.spring(pan, {
           toValue: { x: 0, y: 0 },
           friction: 4,
           useNativeDriver: false,
           }).start()
      }
    },
  });

  

  var renderCards = () => {
    if(cards != undefined){
    return Object.entries(cards).map((item, i) => {
      var rotate = pan.x.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: ['-20deg', '0deg', '20deg'],
        extrapolate: 'clamp'
      })
    
      var rotateAndTranslate = {
        transform: [{
          rotate: rotate
        },
        ...pan.getTranslateTransform()
        ]
      }

      var nextCardOpacity = pan.x.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: [1, 0, 1],
        extrapolate: 'clamp'
      })

      var nextCardScale = pan.x.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: [1, 0.8, 1],
        extrapolate: 'clamp'
      })

      if(item[1].AfficheTitre == 'Nouveauté')
        item[1].AfficheTitre = item[1].Titre


      if(i < state){
        return null;
      }
      else if(i == state){
        return (
          <Animated.View
          {...panResponder.panHandlers}
             key={item[1].Identifier}
             style={[pan.getLayout(), styles.box, rotateAndTranslate]}>
                
                
                  <Image
                      style={{
                        flex: 1,
                        height: null,
                        width: null,
                        backgroundColor: '#ddd',
                        resizeMode: "cover",
                        borderRadius: 20,
                      }}
                      source={{uri : item[1].Image}}
                    />

                <TouchableOpacity style={{height: 30, borderRadius: 100, width: 100, backgroundColor: 'lightgrey', position: 'absolute', bottom: 10, left: 10}} onPress={() => props.navigation.push('DetailsOeuvrePage', {AfficheId: item[1].AfficheId, _Image: item[1].Image})}>
                  <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', fontWeight: '700', fontFamily: 'sans-serif-light'}}>Info</Text>
                </TouchableOpacity>

                <View style={{backgroundColor: 'lightgrey', opacity: 0.8, borderBottomLeftRadius: 50, borderTopLeftRadius: 50, height: 70, position: 'absolute', right: 0, bottom: 100}}>
                  <Text style={{fontSize: 25, marginBottom: 'auto', marginTop: 'auto', marginHorizontal: 30, fontFamily: 'sans-serif-light',}}>{item[1].AfficheTitre}</Text>
                </View>
                
                <View style={{transform: [{ rotate: "-10deg" }], backgroundColor: 'lightgrey', opacity: 0.9, borderRadius: 19, maxWidth: 300, padding: 10, position: 'absolute', rotate: 30, left: -10, top: 10}}>
                  <Text style={{fontSize: 16, marginBottom: 'auto', marginTop: 'auto', marginHorizontal: 10, fontSize: 16, fontFamily: 'sans-serif-light',}}>{item[1].Description}</Text>
                </View>
              

            <Animated.View
            {...panResponder.panHandlers}
              style={[pan.getLayout(), styles.box]}
            >
                <Image style={{
                    position: 'absolute',
                    top: 100,
                    transform: [{ rotate: "-30deg" }],
                    left: -180,
                    borderWidth: 1,
                    padding: 10,
                    height: 150,
                    width: 150
                  }} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-up-apple.png'}}/>
            </Animated.View>

            <Animated.View
            {...panResponder.panHandlers}
              style={[pan.getLayout(), styles.box]}
            >
                <Image style={{
                    position: 'absolute',
                    top: 100,
                    transform: [{ rotate: "30deg" }],
                    left: 400,
                    borderWidth: 1,
                    padding: 10,
                    height: 150,
                    width: 150
                  }} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-down-apple.png'}}/>
            </Animated.View>

            <Animated.View
            {...panResponder.panHandlers}
              style={[pan.getLayout(), styles.box]}
            >
                <Image style={{
                    position: 'absolute',
                    top: 700,
                    transform: [{ rotate: "30deg" }],
                    left: 100,
                    borderWidth: 1,
                    padding: 10,
                    height: 150,
                    width: 150
                  }} source={{uri: 'https://i.pinimg.com/originals/17/72/8f/17728faefb1638f17586ea58645b4e7e.png'}}/>
            </Animated.View>
            
          </Animated.View>
        );
      }else{
        return(
        <Animated.View
             key={item[1].Identifier}
             style={[{
              transform: [{ scale: nextCardScale }],
              height: 600, width: 350, padding: 10, position: 'absolute'
              }]}
          >
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                backgroundColor: '#aaa',
                borderRadius: 20,
              }}
              source={{uri : item[1].Image}}
            />
            <View style={{backgroundColor: 'lightgrey', opacity: 0.8, borderBottomLeftRadius: 50, borderTopLeftRadius: 50, height: 70, position: 'absolute', right: 0, bottom: 100}}>
              <Text style={{fontSize: 23, marginBottom: 'auto', marginTop: 'auto', marginHorizontal: 30}}>{item[1].AfficheTitre}</Text>
            </View>
          </Animated.View>
        )
        
      }
       
    }).reverse();
  }else{
    return null;
  }
 };

 let Loading = () => {
   if(cards == ""){
     return (
        <View style={{flexDirection: 'row', backgroundColor: '#eee', elevation: 3, zIndex: 9, borderRadius: 19, width: Dimensions.get('window').width - 42, height: Dimensions.get('window').height - 200, position: 'absolute'}}>
          <Text style={{marginLeft: 'auto', marginRight: 20, marginTop: 'auto', marginBottom: 'auto', fontSize: 22}}>Chargement</Text>
          <ActivityIndicator style={{marginRight: 'auto'}} size="large" color="#FEA52A" />
        </View>
     )
   }else{
     return (
       <View></View>
     )
   }
 }

  let UtilisateurTagDescriptionView = () => {
    let description = "";

    utilisateurTagDescription.forEach(UTD => {
      description = description + UTD.Description + ", ";
    })

    description = description.slice(0, -2);

    return(
      <View>
        <Text>Description : </Text>
        <Text>{description}</Text>
      </View>
    )
  }
 
  var renderItemTag = ({ item }) => {
    return (
    <View style={{marginLeft: 10}}>
      <ImagePourcentage pourcentage={item.Pourcentage} taille={80} image={item.Image} name={item.Tag} showPourcentage={true}/>
    </View>
    )
  }
    


 let SuivantBouton = () => {
  if(cards == ""){
    return (
       <View></View>
    )
  }else{
    return (
      <View style={{ height: 60, left: 180, bottom: -100, zIndex: 10, elevation: 1, position: 'absolute' }}>
        <TouchableOpacity onPress={() => {setState(state + 1); getAffiches()}} style={{backgroundColor: 'lightgrey', padding: 10, borderRadius: 100, paddingHorizontal: 30}}>
          <Text style={{fontSize: 25, fontWeight: '700', fontFamily: 'sans-serif-light'}}>Suivant</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

  return(
    <View style={{ position: 'absolute', right: 18}}>

      <Loading/>
      
      <View style={{ height: 550 }}>
        {renderCards()}
      </View>

      <SuivantBouton/>
      

      {/* SUGGESTION */}
      <Modal animationType="slide" transparent={true} visible={showSuggestion}>
          <View style={styles.background}></View>

          <View style={{zIndex: 100, backgroundColor: '#FFF', borderRadius: 19, marginVertical: 200, width: '90%', margin: '5%', height: '50%'}}>
            
            <View style={{top: -15, left: -15, position: 'absolute', elevation: 3, backgroundColor: '#FFF', padding: 10, borderRadius: 100}}>
              <Text>Suggestion utilisateur</Text>
            </View>

            <View style={{margin: 30, maxWidth: '50%'}}>
              <UtilisateurTagDescriptionView/>
            </View>

            <View style={{position: 'absolute', right: 30, top: 30}}>
                <ImagePourcentage pourcentage={suggestion!=""?suggestion[0].Pourcentage:0} taille={80} image={suggestion!=""?suggestion[0].Image:0} name={suggestion!=""?suggestion[0].Pseudo:0} showPourcentage={true}/>
            </View>

            <View style={{height: '20%'}}>

            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Text style={{borderBottomColor: '#fff', borderRadius: 5, paddingHorizontal: 30, borderBottomWidth: 1}}>Affinitées</Text>
              <Text style={{opacity: 0.2, borderBottomColor: '#fff', borderRadius: 5, paddingHorizontal: 40, borderBottomWidth: 1}}>Photo</Text>
            </View>
            
            <View style={{marginTop: 30, flexDirection: 'row'}}>
              <ScrollView horizontal={true} style={{height: 130, marginTop: 5}} showsHorizontalScrollIndicator={false}>
                <FlatList data={suggestionTags} renderItem={renderItemTag} keyExtractor={item => item.Identifier} numColumns="8"></FlatList>
              </ScrollView>
            </View>

            <View style={{bottom: 30, position: 'absolute', width: '100%', flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => setShowSuggestion(false)} style={{marginLeft: 'auto', marginRight: 'auto', marginVertical: 10, paddingHorizontal: 20}}>
                <Text>Nop</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => props.navigation.navigate('ContactPage', {_profilId: suggestion[0].UtilisateurId, _image: suggestion[0].Image})} style={{marginLeft: 'auto', backgroundColor: '#FEA52A', borderRadius: 19, paddingHorizontal: 20, paddingVertical: 10, marginRight: 'auto'}}>
                <Text>Voir plus 😏</Text>
              </TouchableOpacity>
            </View>
            
          </View>

          
          
      </Modal>

    </View>
  )

}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    opacity: 0.8,
    backgroundColor: '#eee',
    height: '100%',
    zIndex: 100,
    width: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
},
box: {
  width: Dimensions.get('window').width - 42,
  height: Dimensions.get('window').height - 200,
  borderRadius: 4,
  position: 'absolute'
},
})