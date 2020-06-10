let body = document.body;
let url = window.location.toString();
let now = new Date ();
const loader = document.getElementById('cube-loader');
const stopLoader = () => {
  loader.classList.add('hidden');
};

let getName = (url) => {
	let urlMas = url.split('username=');
	let name = urlMas[1];
	if(name == undefined) {
		name = 'Inna1996';
 	}
 	return name;
}

let name = getName(url);
let getDate = new Promise((resolve, reject) => {
	setTimeout(() => now ? resolve(now) : reject('Не определенно'), 3000);
});
let getInfo  = fetch('https://api.github.com/users/' + name);

Promise.all([getInfo, getDate])
 .then(([request, date]) => {
	 requestInfo = request;
	 requestDate = date;
 })
 .then(res => requestInfo.json())
 .then(showUserInfo => {
   let userAvatar  = showUserInfo.avatar_url;
   let userName  = showUserInfo.login;
   let userDescription = showUserInfo.bio;
   let userLink  = showUserInfo.html_url;
 if(name)  {
   let addName = () => {
    let userTitleElement = document.createElement('h1');
    userTitleElement.innerHTML = userName
    body.appendChild(userTitleElement);
  };

   let addDescription = () => {
    let userDescriptionElement = document.createElement('p');
    userDescriptionElement.innerHTML = userDescription
    body.appendChild(userDescriptionElement);
  };

   let addFoto = () => {
    let userAvatarElement = document.createElement('img');
    userAvatarElement.src = userAvatar;
    let newString = document.createElement('br');
    body.appendChild(userAvatarElement);
    body.appendChild(newString);
  };

   let addLink = () => {
    let userLinkElement = document.createElement('a');
    let text = document.createTextNode('Profile');
    userLinkElement.href = userLink;
    userLinkElement.innerHTML = ('Profile');
    body.appendChild(userLinkElement);
  };

  let addDate = () => {
		let date =  document.createElement('p');
		date.innerHTML = now;
		body.appendChild(date);
	}
	 loader.style.display = 'none';
   addName();
   addDescription();
   addFoto();
   addLink();
	 addDate();
	 stopLoader();
 }
 else {
	 alert('Пользователь не найден')
 }
 })
 .catch(err => alert(err + "Информация о пользователе не доступна"));
