"use client";
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
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Vara from "vara";

import Image from "next/image";

const Home: React.FC = () => {
  const initialized = useRef(false);
  const [scrollListeners, setScrollListeners] = useState<(() => void)[]>([]);

  const images = [
    "/volunteer-hands.jpg",
    "/volunteer-people.jpg",
    "/love-volunteer.jpeg",
  ];

  const isScrolledIntoView = (elem: HTMLElement) => {
    const rect = elem.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;

    const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;

    return isVisible;
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      const vara = [
        new Vara(
          "#handwritten-1",
          "https://cdn.jsdelivr.net/npm/vara@1.4.0/fonts/Satisfy/SatisfySL.json",
          [
            {
              text: "What we do",
              id: "handwritten-1",
              x: 5,
              y: 5,
            },
          ],
          {
            strokeWidth: 2,
            color: "var(--aqua-dark)",
            duration: 3000,
            fontSize: 50,
            autoAnimation: false,
          }
        ),
      ];

      vara.forEach((v, index) => {
        v.ready(() => {
          const id = `handwritten-${index + 1}`;
          const handleScroll = () => {
            if (
              isScrolledIntoView(document.getElementById(id) as HTMLElement)
            ) {
              v.draw(id);
            }
          };

          window.addEventListener("scroll", handleScroll);
          setScrollListeners((scrollListeners) => {
            scrollListeners.push(() => {
              window.removeEventListener("scroll", handleScroll);
            });
            return scrollListeners;
          });
        });
      });
    }

    return () => {
      scrollListeners.forEach((listener) => listener());
    };
  }, []);

  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
          >
            <h1 className="handwritten">
              Take <span className="hand-underline">ownership</span> of your{" "}
              <span className="hand-underline">community</span>.
            </h1>
            <div style={{ height: 20 }} />
            <p>
              We help you find volunteer opportunities that fit your schedule.
            </p>

            <Link href="/signin">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ width: "min-content" }}
              >
                <Button
                  style={{
                    display: "inline-block",
                    marginTop: 30,
                    width: "min-content",
                  }}
                  variant="outline"
                >
                  Sign Up →
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="container">
        <p id="handwritten-1" className={styles.handwritten} />
        <div className="break" />
        <p>
          Basically, we help you find volunteer opportunities that fit your
          schedule. We know that you're busy and that you want to help out when
          you can. We make it easy for you to find opportunities that fit your
          schedule.
        </p>
      </div>

      <section className={styles.section}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }} // Only animate once, triggers at 20% visibility
          className="p-6 bg-white shadow-lg rounded-lg"
        >
          <div className={`container ${styles.howItWorks}`}>
            <code>HOW IT WORKS</code>
            <div style={{ height: 50 }} />
            <ul className="progressbar">
              <li className="active">Step 1</li>
              <li className="active">Step 2</li>
              <li className="active">Step 3</li>
            </ul>
            <div style={{ height: 25 }} />

            <div className={styles.grid}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white shadow-lg rounded-lg"
              >
                <Card className="">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 20a6 6 0 0 0-12 0" />
                        <circle cx="12" cy="10" r="4" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      Sign Up
                    </CardTitle>
                    <CardDescription>
                      Enter your email below to login to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent></CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white shadow-lg rounded-lg"
              >
                <Card className="">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <path d="M12 17h.01" />
                      </svg>
                      AI Interview
                    </CardTitle>
                    <CardDescription>
                      Check out the volunteering opportunities through the
                      dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent></CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white shadow-lg rounded-lg"
              >
                <Card className="">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-file-user"
                      >
                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                        <path d="M15 18a3 3 0 1 0-6 0" />
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
                        <circle cx="12" cy="13" r="2" />
                      </svg>
                      Apply
                    </CardTitle>
                    <CardDescription>
                      Click on the opportunity that you're interested in and
                      apply
                    </CardDescription>
                  </CardHeader>
                  <CardContent></CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
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
