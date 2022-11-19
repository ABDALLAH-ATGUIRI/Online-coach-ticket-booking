import axios from "../api/axios";
import useAuth from "./useAuth";
export const useRefreshToken = () => {
  const { setAth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/refech", {
      withCredentials: true
    });
    setAuth((prev) => {

      return { ...prev, accessToken: response.data.accessToken };
    });
  };
  return refresh;
};
