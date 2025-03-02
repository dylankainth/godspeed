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
import { useSession } from "next-auth/react";

import Image from "next/image";

const Home: React.FC = () => {
  const { data: session } = useSession();

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

            <Link
              href={session ? "/dashboard" : "/signin"}
              style={{ display: "inline-block", outline: 0 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ width: "min-content" }}
              >
                {!session ? (
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
                ) : (
                  <Button
                    style={{
                      display: "inline-block",
                      marginTop: 30,
                      width: "min-content",
                    }}
                    variant="outline"
                  >
                    Dashboard →
                  </Button>
                )}
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      <div
        className="container"
        style={{
          fontSize: "1.1rem",
        }}
      >
        <p id="handwritten-1" className={styles.handwritten} />
        <div className="break" />
        <p>
          We all want to make a difference in our community, but{" "}
          <strong>
            it can be hard to find opportunities that fit your schedule
          </strong>
          . At the same time, organizations are often in need of a pair of hands
          in <strong>very short notice</strong>.
        </p>
        <div className="break" />
        <p>
          <strong>
            We will connect you with local organizations who need urgent help on
            the same day, so you can start volunteering right away.
          </strong>{" "}
          You can volunteer for a few hours a week or a few hours a month. It's
          up to you.
        </p>
        <div className="break" />
        <p>
          <strong>
            <code>Good for you, good for your community.</code>
          </strong>
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
            <div style={{ height: 20 }} />
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
                      and create an account, then proceed to the AI Interview.
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
                      Our AI will ask you a few questions to understand your
                      interests.
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
                      Check out the opportunities and apply to the ones you
                      like.
                    </CardDescription>
                  </CardHeader>
                  <CardContent></CardContent>
                </Card>
              </motion.div>
            </div>

            <div style={{ height: 10 }} />

            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: 10, marginLeft: "auto" }}
              >
                <line x1="10" x2="14" y1="2" y2="2" />
                <line x1="12" x2="15" y1="14" y2="11" />
                <circle cx="12" cy="14" r="8" />
              </svg>
              <p>within 24 hours</p>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Link
            href={session ? "/dashboard" : "/signin"}
            style={{ display: "block", margin: "0 auto" }}
          >
            <Button variant="outline">
              {session ? "Dashboard →" : "Sign Up →"}
            </Button>
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100px"
            height="100px"
            viewBox="0 0 100 100"
            version="1.1"
            fill="currentColor"
            style={{ marginTop: 10, marginRight: 60 }}
          >
            <g id="surface1">
              <path d="M 98.875 28.472656 C 95.050781 19.261719 88.796875 11.269531 85.839844 1.539062 C 85.320312 -0.0234375 82.714844 -0.71875 82.019531 1.019531 C 77.847656 10.75 71.59375 19.609375 68.636719 29.863281 C 68.117188 31.773438 70.722656 33.6875 72.113281 31.949219 C 74.199219 29.34375 76.632812 27.257812 79.0625 24.824219 C 78.714844 39.769531 79.0625 54.710938 76.457031 69.480469 C 75.066406 77.476562 73.15625 86.511719 67.421875 92.59375 C 60.472656 99.890625 51.78125 93.289062 47.960938 86.511719 C 44.660156 80.601562 38.925781 55.058594 27.457031 63.921875 C 20.679688 69.132812 18.941406 76.257812 16.855469 84.078125 C 16.335938 86.335938 15.464844 88.421875 14.421875 90.332031 C 10.425781 97.804688 5.214844 85.640625 5.039062 82.6875 C 4.691406 76.777344 6.429688 70.699219 7.820312 64.964844 C 8.34375 63.226562 5.734375 62.53125 5.039062 64.269531 C 1.914062 72.433594 -2.429688 86.335938 5.039062 93.460938 C 11.644531 99.542969 17.203125 95.546875 19.808594 88.421875 C 21.546875 83.730469 28.152344 57.664062 35.796875 69.828125 C 40.835938 77.820312 42.226562 87.378906 48.308594 94.851562 C 52.652344 100.0625 60.472656 101.28125 66.554688 98.671875 C 73.851562 95.371094 76.980469 85.640625 78.890625 78.691406 C 83.582031 61.3125 83.582031 42.546875 83.0625 24.648438 C 87.230469 27.429688 91.921875 30.035156 96.613281 31.773438 C 98.527344 32.296875 99.570312 29.863281 98.875 28.472656 Z M 76.285156 22.21875 C 78.542969 17.351562 81.324219 12.488281 83.753906 7.621094 C 86.363281 13.703125 89.664062 19.089844 92.792969 24.996094 C 89.140625 22.738281 85.667969 20.132812 81.671875 19.609375 C 80.800781 19.4375 80.105469 19.957031 79.757812 20.652344 C 78.542969 20.828125 77.328125 21.347656 76.285156 22.21875 Z M 76.285156 22.21875 " />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Home;
