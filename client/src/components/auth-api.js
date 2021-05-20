import axios from "axios";

const signin = async (user) => {
  const result = await axios.post("/users/signin", user);
  return result;
};

const signup = async (user) => {
  const result = await axios.post("/users/signup", user);
  return result;
};

export { signin, signup };
