import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PreLoader from "@/components/PreLoader";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    const source = Axios.CancelToken.source();

    const verifyAuth = async () => {
      try {
        const response = await Axios.get("http://localhost:3000/auth/verify", {
          cancelToken: source.token,
        });

        if (response.data.status) {
          navigate("/home");
        } else {
          navigate("/");
        }
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Authentication failed", error);
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => {
      verifyAuth();
    }, 4500);

    return () => {
      source.cancel("Authentication request canceled due to component unmount.");
    };
  }, [navigate]);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <section>
      <div className="wrapper md:px-20 lg:px-40">
        <Navbar />
        <Hero />
      </div>
    </section>
  );
};

export default Home;
