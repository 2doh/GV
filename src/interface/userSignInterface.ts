export interface userSign {
  userMail: string;
  userPass: string;
  userName?: string;
  userPhone?: string;
}

export interface userStateInterface {
  userMail: string;
  userName: string;
  accessToken: string;
  setUserMail: (userId: string) => void;
  setUserName: (userNickName: string) => void;
  setAccessToken: (token: string) => void;
}
