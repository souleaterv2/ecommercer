import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { FirebaseCollections } from "./types";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  measurementId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  messagingSenderId: process.env.MEASUREMENT_ID,
};

class FirebaseApi {
  private app: firebase.app.App;
  constructor() {
    if (!firebase.apps.length) {
      this.app = firebase.initializeApp(firebaseConfig);
    }
  }

  protected GetAuth() {
    return firebase.auth();
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
  constructor() {
    super();
    this.facebookAuth = new firebase.auth.GoogleAuthProvider();
    this.googleAuth = new firebase.auth.FacebookAuthProvider();
  }

  public async createNewUserWithEmailAndPassword(
    email: string,
    password: string,
    name?: string
  ): Promise<void> {
    const auth = this.GetAuth();
    const response = await auth.createUserWithEmailAndPassword(email, password);

    await response.user.updateProfile({
      displayName: name,
    });
  }

  public async LogInWihtGoogle(): Promise<void> {
    const auth = this.GetAuth();
    await auth.signInWithPopup(this.googleAuth);
  }

  public async LogInWithFacebook(): Promise<void> {
    const auth = this.GetAuth();
    await auth.signInWithPopup(this.facebookAuth);
  }
}

export const db = new FireDatabase();
export const auth = new FireAuth();
