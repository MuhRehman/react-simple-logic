import firebase from "firebase";

export default class DAL {
  constructor(callbackFunc) {
    var firebaseConfig = {
      apiKey: "AIzaSyBYGl1-d43ZUkbHPMxgAg2r8Rh4RBIy9VY",
      authDomain: "choroid-f14a6.firebaseapp.com",
      databaseURL: "https://choroid-f14a6.firebaseio.com",
      projectId: "choroid-f14a6",
      storageBucket: "choroid-f14a6.appspot.com",
      messagingSenderId: "890137475947",
      appId: "1:890137475947:web:24718e12c77fe404f5aa2e"
    };
    // Initialize Firebase
    this.notify = callbackFunc;

    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.loggedIn = true;
        this.user = user;
        this.notify(true);
      } else {
        this.loggedIn = false;
        this.user = null;
        this.notify(false);
      }
    });
  }

  handleSignIn = (email, password, sucess, failed) => {
    //this.setState({error: '', loading: true});
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(sucess)
      .catch(error => failed(error));
  };

  handleSignUp = (email, password, sucess, failed) => {
    //this.setState({error: '', loading: true});
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(sucess)
      .catch(error => failed(error));
  };

  handleSignOut = (onSuccess, onFail) => {
    firebase
      .auth()
      .signOut()
      .then(onSuccess, onFail);
  };
}
