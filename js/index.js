import Api from "./api.js";
const api = new Api();
let quantityOfUsers = 1;
let USERS = [];
const row_users = document.querySelector("#row_users");
console.log(row_users);
const getUsers = async user_id => {
  const users = await api.getData(user_id);
  return users;
};
const getGender = gender => {
  if (gender === "male") {
    return `<span class="badge blue white-text">${gender}<span/>`;
  } else {
    return `<span class="badge pink white-text">${gender}<span/>`;
  }
};
const getButton = (gender) => {
  if (gender==='male') {
    return `<a href="#" class="waves-effect waves-light btn-small blue"
                  >Go</a
                >`;
  }else{
    return `<a href="#" class="waves-effect waves-light btn-small pink"
                  >Go</a
                >`;
  }
}
const createTemplateUser = (user, index) => {
  return `
            <div class="card-panel hoverable">
              <div class="card-image row valign-wrapper">
                <img
                  class="circle col s3 m6"
                  src="${user.image}"
                />
                <span class="card-title col s9 flow-text"
                  >${user.nameTitle} ${user.firstName} ${user.lastName}</span
                >
              </div>
              <div class="card-content">
                <p class="flow-text">
                  Information ${getGender(user.gender)}
                </p>
              </div>
              <div class="card-action">
                <ul class="collapsible popout shadow_0 ">
                  <li>
                    <div class="collapsible-header">
                      <i class="material-icons">perm_identity</i>Personal Information
                    </div>
                    <div class="collapsible-body">
                      <span class="d_block"><span class="about__info">Email: </span>${
                        user.email
                      }</span>
                      <span class="d_block"><span class="about__info">Phone: </span>${
                        user.phone
                      }</span>
                      <span class="d_block"><span class="about__info">Cell: </span>${
                        user.cell
                      }</span>
                      <span class="d_block"><span class="about__info">Username: </span>${
                        user.username
                      }</span>
                    </div>
                  </li>
                  <li>
                    <div class="collapsible-header">
                      <i class="material-icons">place</i>Location
                    </div>
                    <div class="collapsible-body">
                      <span class="d_block"><span class="about__info">Street: </span>${
                        user.location.street
                      }</span>
                      <span class="d_block"><span class="about__info">City: </span>${
                        user.location.city
                      }</span>
                      <span class="d_block"><span class="about__info">State: </span>${
                        user.location.state
                      }</span>
                      <span class="d_block"><span class="about__info">Postcode: </span>${
                        user.location.postcode
                      }</span>
                      <span class="d_block"><span class="about__info">Timezone: </span>${
                        user.location.timezone
                      }</span>
                    </div>
                  </li>
                </ul>
                <div class="f-center">
                ${getButton(user.gender)}
                </div>
              </div>
            </div>
  `;
  // return template;
};

const chargeUser = async (init, limit) => {
  for (let i = init; i <= limit; i++) {
    try {
      if (i >= 28) {
        break;
      }
      const userInfo = await getUsers(i);
      USERS.push(userInfo);
      render();
    } catch (error) {
      i++;
    } finally {
    }
  }
};
const cleanParent = el => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};
const render = () => {
  cleanParent(row_users);
  const docFrag = document.createDocumentFragment();
  USERS.flat(1).forEach((user, index) => {
    const row = document.createElement("div");
    row.setAttribute("class", "col s12 m6 l4");
    console.log(user);
    row.innerHTML = createTemplateUser(user, index);
    docFrag.appendChild(row);
  });

  row_users.appendChild(docFrag);

  M.Collapsible.init(document.querySelectorAll(".collapsible"), {
    accordion: true
  });
};
(async () => {
  await chargeUser(quantityOfUsers, quantityOfUsers + 5);
  quantityOfUsers += 6;
})();
document.getElementById("more").addEventListener("click", async e => {
  await chargeUser(quantityOfUsers, quantityOfUsers + 5);
  if (quantityOfUsers >= 28) {
    M.toast({ html: "There aren't more users", classes: "red" });
  }
  quantityOfUsers += 6;
});
// console.log(getDat());
