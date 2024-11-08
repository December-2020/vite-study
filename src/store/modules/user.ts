import { defineStore } from "pinia";
import { getToken, setToken, removeToken } from "@/utils/user";

const useUser = defineStore("user", {
  state: () => ({
    userToken: getToken() ?? "",
  }),
  
  actions: {
    login(token: string) {
      setToken(token);
      this.userToken = token;
    },
    logout() {
      removeToken();
      this.userToken = "";
    },
  },
});

export default useUser;
