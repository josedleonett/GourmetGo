import HeaderDisplay from "../display/HeaderDisplay";
import { useCookies } from 'react-cookie';

const HeaderContainer = () => {
  
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const accessToken = cookies.token

  return <HeaderDisplay accessToken={accessToken} />;
};

export default HeaderContainer;
