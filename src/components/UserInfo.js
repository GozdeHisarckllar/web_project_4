class UserInfo {
  constructor({ profileNameSelector, profileSubtitleSelector }) {
    this._profileUserName = document.querySelector(profileNameSelector);
    this._profileSubtitle = document.querySelector(profileSubtitleSelector);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo["userName"] = this._profileUserName.textContent;
    this._userInfo["userSubtitle"] = this._profileSubtitle.textContent;

    return this._userInfo;
  }

  setUserInfo({ userName, userSubtitle }) {
    this._profileUserName.textContent = userName;
    this._profileSubtitle.textContent = userSubtitle;

  }
}

export default UserInfo;
