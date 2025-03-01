import { Button } from "./components/ui/button";
import styles from "./home.module.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";

const Home: React.FC = () => {
  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <h1>
            Take <div className="handwritten">ownership</div> of your{" "}
            <div className="handwritten">community</div>.
          </h1>
          <p>
            We help you find volunteer opportunities that fit your schedule.
          </p>
          <Button variant="outline">Sign Up →</Button>
        </div>
      </section>

      <div className="container">
        <code>ABOUT US</code>
        <div className="break" />
        <p>
          Basically, we help you find volunteer opportunities that fit your
          schedule. We know that you're busy and that you want to help out when
          you can. We make it easy for you to find opportunities that fit your
          schedule.
        </p>
      </div>

      <div className={`container ${styles.howItWorks}`}>
        <code>HOW IT WORKS</code>
        <div className="break" />
        <div className="flex gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">1. Sign Up</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">1. Sign Up</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">1. Sign Up</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 750 }}>
        <Carousel>
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/2">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
