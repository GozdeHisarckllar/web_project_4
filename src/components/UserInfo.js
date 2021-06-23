class UserInfo {
  constructor({ profileNameSelector, profileSubtitleSelector }) {
    this._profileUserName = document.querySelector(profileNameSelector);
    this._profileSubtitle = document.querySelector(profileSubtitleSelector);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo["name"] = this._profileUserName.textContent;
    this._userInfo["about"] = this._profileSubtitle.textContent;

    return this._userInfo;
  }

  setUserInfo({ name, about }) {
    this._profileUserName.textContent = name;
    this._profileSubtitle.textContent = about;

  }
}

export default UserInfo;
//userName => name   userSubtitle => about