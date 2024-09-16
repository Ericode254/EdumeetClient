import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const Home = () => {
  const backgroundStyles = {
    backgroundColor: "#101820"
  };

  return (
    <div style={backgroundStyles}>
      <Navbar />
        <Card className="h-screen flex flex-col justify-center items-center bg-{#101820} border-none">
          <CardHeader>
            <CardTitle className="text-yellow-400 text-2xl">Edumeet</CardTitle>
            <CardDescription className="text-white text-lg">Welcome to Edumeet, a platform that will keep you in the loop with all the events taking place within your university </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="bg-indigo-500 hover:bg-red-400"> Meets </Button>
          </CardFooter>
        </Card>
    </div>
  )
}

export default Home
