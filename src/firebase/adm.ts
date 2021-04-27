import adm from "firebase-admin";
import { User } from "next-auth";

class FirebaseAdm {
  private app: adm.app.App;
  constructor() {
    if (!adm.apps.length) {
      try {
        this.app = adm.initializeApp({
          credential: adm.credential.applicationDefault(),
        });
      } catch {
        console.log("Erro em iniciar adm-sdk");
      }
    }
  }
}

class FirebaseAdmAuth extends FirebaseAdm {
  private auth: adm.auth.Auth;
  private storage: adm.storage.Storage;
  constructor() {
    super();
    this.auth = adm.auth();
    this.storage = adm.storage();
  }

  public async verifyToken(idToken: string): Promise<boolean> {
    try {
      await this.auth.verifyIdToken(idToken);
      return true;
    } catch {
      return false;
    }
  }

  public async updateProfileImage(userID: string, photoURL: string) {
    this.auth.updateUser(userID, {
      photoURL,
    });
  }
}

export const FireAdmAuth = new FirebaseAdmAuth();
