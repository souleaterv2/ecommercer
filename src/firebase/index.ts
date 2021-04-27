import uniqid from "uniqid";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import jsCookies from "js-cookie";

import { User } from "../@Types";

import { FirebaseCollections, UpdateUserProfileParans } from "./types";

const firebaseConfig = {
  apiKey: "AIzaSyB27rPucLSTJTrp5I2vyUnPqKlGwvyNjCc",
  authDomain: "stylesup.firebaseapp.com",
  projectId: "stylesup",
  storageBucket: "stylesup.appspot.com",
  messagingSenderId: "79708434918",
  appId: "1:79708434918:web:69f579513987baa627a627",
  measurementId: "G-X7RJL660VG",
};

class FirebaseApi {
  private app: firebase.app.App;
  constructor() {
    if (!firebase.apps.length) {
      this.app = firebase.initializeApp(firebaseConfig);
    }
  }
}

class FireDatabase extends FirebaseApi {
  private db: firebase.firestore.Firestore;
  constructor() {
    super();
    this.db = firebase.firestore();
  }

  public async getCollection<T>(collection: FirebaseCollections): Promise<T[]> {
    const dbResponse = await this.db.collection(collection).get();

    const docs = dbResponse.docs.map((doc) => doc.data());
    return docs as T[];
  }

  public async query<T>(
    collection: FirebaseCollections,
    key: string,
    opStr: firebase.firestore.WhereFilterOp,
    value: string
  ): Promise<T[]> {
    const response = await this.db
      .collection(collection)
      .where(key, opStr, value)
      .get();

    if (!response.empty) {
      const docs = response.docs.map((doc) => doc.data());
      return docs as T[];
    }

    return [];
  }
}

class FireAuth extends FirebaseApi {
  private googleAuth: firebase.auth.GoogleAuthProvider;
  private facebookAuth: firebase.auth.FacebookAuthProvider;

  private auth: firebase.auth.Auth;
  private db: firebase.firestore.Firestore;

  constructor() {
    super();
    this.facebookAuth = new firebase.auth.FacebookAuthProvider();
    this.googleAuth = new firebase.auth.GoogleAuthProvider();
    this.db = firebase.firestore();
    this.auth = firebase.auth();
  }

  public ConvertToUserCollection(user: firebase.User): User {
    return {
      displayName: user.displayName,
      email: user.email,
      id: user.uid,
      photoURL: user.photoURL,
    };
  }

  private async checkUser(user: firebase.User) {
    const response = await this.db
      .collection("users")
      .where("id", "==", user.uid)
      .get();

    if (response.empty) {
      await this.db.collection("users").add(this.ConvertToUserCollection(user));
    }
  }

  public async createNewUserWithEmailAndPassword(
    email: string,
    password: string,
    name: string
  ): Promise<void> {
    const response = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    await response.user.updateProfile({
      displayName: name,
    });

    await this.auth.currentUser.sendEmailVerification();

    this.checkUser(response.user);
  }

  public async LogInWihtGoogle(): Promise<void> {
    const response = await this.auth.signInWithPopup(this.googleAuth);

    this.checkUser(response.user);
  }

  public async LogInWithFacebook(): Promise<void> {
    const response = await this.auth.signInWithPopup(this.facebookAuth);

    this.checkUser(response.user);
  }

  public async LogInWithEmalAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password": {
          throw new Error("Wrong password");
        }
        case "auth/user-not-found": {
          throw new Error("User not found");
        }
        default: {
          throw new Error(`Uncatch erro => ${error.message}`);
        }
      }
    }
  }
  public async whachUser(cb: (user: firebase.User | null) => void) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        cb(user);
        return;
      }
      cb(null);
    });
  }

  public async GetUser(): Promise<firebase.User | null> {
    const user = this.auth.currentUser;

    return user;
  }
  public async LogOut() {
    await this.auth.signOut();
  }
}

class FireUserManager extends FirebaseApi {
  private auth: firebase.auth.Auth;
  private phoneAuth: firebase.auth.PhoneAuthProvider;
  private storage: firebase.storage.Storage;

  constructor() {
    super();
    this.auth = firebase.auth();
    this.phoneAuth = new firebase.auth.PhoneAuthProvider();
    this.storage = firebase.storage();
  }

  public async UpdateUserProfile(
    prans: UpdateUserProfileParans = {
      displayName: null,
      email: null,
      phoneNumber: null,
    }
  ) {
    if (prans.displayName) {
      await this.auth.currentUser.updateProfile({
        displayName: prans.displayName,
      });
    }

    if (prans.email) {
      await this.auth.currentUser.updateEmail(prans.email);
    }
  }

  public async clearUserCookies() {
    [
      "StylesUP:cart",
      "StylesUP:wishlist",
      "token",
      "StylesUP:currentPage",
    ].forEach((cookie) => jsCookies.remove(cookie));
  }

  public async uploadProfileImage(userID: string, file: any, fileName: string) {
    const id = uniqid();
    try {
      await this.storage
        .ref(`/users/${userID}/profile_images/${id}-${fileName}`)
        .put(file);

      return this.storage
        .ref(`users/${userID}/profile_images/${id}-${fileName}`)
        .getDownloadURL();
    } catch (e) {
      console.log("uploadProfileFunction =>", e);
    }
  }
}
export const db = new FireDatabase();
export const auth = new FireAuth();
export const userManager = new FireUserManager();
