import React, { useEffect } from "react";
import { useRecoilState, RecoilRoot, atom, selector } from "recoil";

export const isLoggedIn = atom({
  key: "isLoggedIn",
  default: false,
});

function Auth(props) {
  const [isLogin, setLogin] = useRecoilState(isLoggedIn);
  useEffect(() => {
    if (sessionStorage.getItem("token")) setLogin(true);
  }, []);
  return <>{props.children}</>;
}

function RecoilRootStore(props) {
  return (
    <RecoilRoot>
      <Auth> {props.children}</Auth>
    </RecoilRoot>
  );
}

export default RecoilRootStore;
