import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async accountCreate({ name, email, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return await this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("AuthService :: accountCreate :: Error ", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("AuthService :: login :: Error ", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("AuthService :: getCurrentUser :: Error ", error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSession("current");
    } catch (error) {
      console.log("AuthService :: logout :: Error ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
