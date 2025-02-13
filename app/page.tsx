'use client'

import withAuth from "@/hocs/withAuth";

const Home = () => {
  return (
    <h1 className="text-center text-2xl">Website tư vấn</h1>
  );
}

const HomeWithAuth = withAuth(Home);
export default HomeWithAuth;