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
import NavbarIcon from "@/app/components/NavbarIcon";
import Link from "next/link";

import Image from "next/image";

const Home: React.FC = () => {
  const images = [
    "/volunteer-hands.jpg",
    "/volunteer-people.jpg",
    "/love-volunteer.jpeg",
  ];

  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <h1 className="handwritten">
            Take <span className="hand-underline">ownership</span> of your{" "}
            <span className="hand-underline">community</span>.
          </h1>
          <p>
            We help you find volunteer opportunities that fit your schedule.
          </p>
          <Link href="/signin">
            <Button variant="outline">Sign Up →</Button>
          </Link>
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

      <section className={styles.section}>
        <div className={`container ${styles.howItWorks}`}>
          <code>HOW IT WORKS</code>
          <div style={{height: 50}} />
          <ul className="progressbar">
            <li className="active">Step 1</li>
            <li className="active">Step 2</li>
            <li className="active">Step 3</li>
          </ul>
          <div style={{height: 25}} />

          <div className={styles.grid}>
            <Card className="">
              <CardHeader>
                <CardTitle className="text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
                  Sign Up
                </CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle className="text-2xl">AI Interview</CardTitle>
                <CardDescription>
                  Check out the volunteering opportunities through the dashboard
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle className="text-2xl">Apply</CardTitle>
                <CardDescription>
                  Click on the opportunity that you're interested in and apply
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>

          {/* <div className="break" />
          <div className="flex flex-col md:flex-row gap-4"> 
            <Card className="flex-1 min-w-0">
              <CardHeader>
                <CardTitle className="text-2xl">1. Sign Up</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
            <Card className="flex-1 min-w-0">
              <CardHeader>
                <CardTitle className="text-2xl">2. Dashboard</CardTitle>
                <CardDescription>
                  Check out the volunteering opportunities through the dashboard
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
            <Card className="flex-1 min-w-0">
              <CardHeader>
                <CardTitle className="text-2xl">3. Apply</CardTitle>
                <CardDescription>
                  Click on the opportunity that you're interested in and apply
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card> */}
          {/* </div> */}
        </div>
      </section>

      <div className="container" style={{ maxWidth: 750 }}>
{/*         <Carousel>
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index} className="basis-1/2">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center">
                      <img
                        src={src}
                        alt={`Image showing ${
                          index === 0
                            ? "volunteer hands"
                            : index === 1
                            ? "volunteer people"
                            : "love and volunteering"
                        }`}
                        className="object-cover object-center w-full h-full"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel> */}
      </div>
    </div>
  );
};

export default Home;
