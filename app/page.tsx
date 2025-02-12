'use client'

import withAuth from "@/hocs/withAuth";

const Home = () => {
  return (
    <div className="">
      Xin chào
    </div>
  );
}

const HomeWithAuth = withAuth(Home);
export default HomeWithAuth;