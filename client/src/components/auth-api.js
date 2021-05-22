import axios from "axios";

const signin = async (user) => {
  const result = await axios.post("/users/signin", user);
  return result;
};

const signup = async (user) => {
  const result = await axios.post("/users/signup", user);
  return result;
};

const hasSignned = async () => {
  const result = await axios.get("users/hassign");
  return result;
};

const signout = async () => {
  const result = await axios.get("users/signout");
  return result;
};

export { signin, signup, hasSignned, signout };
