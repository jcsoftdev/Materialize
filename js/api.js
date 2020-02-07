class Api {
  constructor() {}
  getData = async (id) => {
    if (id>0) {
      return await (
        await fetch("https://n161.tech/api/dummyapi/user/"+id)
      ).json();
    }else{

      return await (
        await fetch("https://n161.tech/api/dummyapi/user")
        ).json();
    }
  };
}
export default Api;
