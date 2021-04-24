import adm from "firebase-admin";

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
  constructor() {
    super();
    this.auth = adm.auth();
  }

  public async verifyToken(idToken: string): Promise<boolean> {
    try {
      await this.auth.verifyIdToken(idToken);
      return true;
    } catch {
      return false;
    }
  }
}

export const FireAdmAuth = new FirebaseAdmAuth();
