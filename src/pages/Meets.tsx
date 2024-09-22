import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Meets = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3000/auth/verify")
      .then((response) => {
        if (!response.data.status) {
          toast.error(response.data.message);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/"); // Navigate to home on error
      });
  }, [navigate]);

  const fetchData = async () => {
    try {
      const response = await Axios.get<Event[]>("http://localhost:3000/events/cards");
      setEvents(response.data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("Error fetching events.");
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

  useEffect(() => {
    toast.promise(fetchData(), {
      loading: 'Loading events',
      success: 'Events loaded successfully',
      error: 'Error when loading events please refresh or check your network',
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-screen p-5">
        <div className="flex flex-wrap gap-4">
          {loading ? (
            <p>loading........</p>
          ) : (
            events.length > 0 ? (
              events.map((event) => (
                <Card
                  key={event._id}
                  title={event.title}
                  description={event.description}
                  image={event.image}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  speaker={event.speaker}
                />
              ))
            ) : (
              <p>No events available.</p>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Meets;
