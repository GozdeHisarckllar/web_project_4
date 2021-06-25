class UserInfo {
  constructor({ profileNameSelector, profileSubtitleSelector, 
  profileAvatarSelector }) {
    this._profileUserName = document.querySelector(profileNameSelector);
    this._profileSubtitle = document.querySelector(profileSubtitleSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
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

  setUserAvatar({ avatar }) {
    this._profileAvatar.style.backgroundImage = `url(${avatar})`;
  }
}

export default UserInfo;