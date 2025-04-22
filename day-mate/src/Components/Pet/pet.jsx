import { useState, useEffect } from "react";
import owlAnimation from "../../assets/Animals/owl.gif";
import akitaIdle from "../../assets/Animals/akita_idle_8fps.gif";
import akitaWalk from "../../assets/Animals/akita_walk_fast_8fps.gif";
import akitaRun from "../../assets/Animals/akita_run_8fps.gif";
import akitaLie from "../../assets/Animals/akita_lie_8fps.gif";
import akitaSwipe from "../../assets/Animals/akita_swipe_8fps.gif";
import akitaWithBall from "../../assets/Animals/akita_with_ball_8fps.gif";
import dogAnimation from "../../assets/Animals/dog.gif";

const Pet = () => {
  const [currentAnimation, setCurrentAnimation] = useState(akitaIdle);
  const [position, setPosition] = useState(10);
  const [owlPosition, setOwlPosition] = useState(50);
  const [dogPosition, setDogPosition] = useState(30);

  const animations = [
    { gif: akitaRun, duration: 3000, moveSpeed: 0.8 },
    { gif: akitaLie, duration: 2500, moveSpeed: 0 },
    { gif: akitaSwipe, duration: 1800, moveSpeed: 0 },
    { gif: akitaWithBall, duration: 3000, moveSpeed: 0 },
    { gif: akitaWalk, duration: 3500, moveSpeed: 0.4 },
  ];

  const dogAnimations = [
    { duration: 4000, moveSpeed: 0.3 },
    { duration: 2000, moveSpeed: 0 },
  ];

  useEffect(() => {
    let currentIndex = 0;
    let moveInterval;
    let animationTimeout;

    const startNextAnimation = () => {
      const currentAnim = animations[currentIndex];
      setCurrentAnimation(currentAnim.gif);

      if (currentAnim.moveSpeed > 0) {
        moveInterval = setInterval(() => {
          setPosition((prev) => {
            const next = prev + currentAnim.moveSpeed;
            return next > 75 ? 10 : next;
          });
        }, 16);
      }

      animationTimeout = setTimeout(() => {
        if (moveInterval) clearInterval(moveInterval);
        currentIndex = (currentIndex + 1) % animations.length;
        startNextAnimation();
      }, currentAnim.duration);
    };

    startNextAnimation();

    return () => {
      if (moveInterval) clearInterval(moveInterval);
      if (animationTimeout) clearTimeout(animationTimeout);
    };
  }, []);

  useEffect(() => {
    const owlInterval = setInterval(() => {
      setOwlPosition((prev) => {
        const next = prev + Math.sin(Date.now() / 1000) * 0.5;
        return Math.max(0, Math.min(100, next));
      });
    }, 16);

    return () => clearInterval(owlInterval);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    let moveInterval;
    let animationTimeout;

    const startNextDogAnimation = () => {
      const currentAnim = dogAnimations[currentIndex];

      if (currentAnim.moveSpeed > 0) {
        moveInterval = setInterval(() => {
          setDogPosition((prev) => {
            const next = prev + currentAnim.moveSpeed;
            return next > 90 ? 5 : next;
          });
        }, 16);
      }

      animationTimeout = setTimeout(() => {
        if (moveInterval) clearInterval(moveInterval);
        currentIndex = (currentIndex + 1) % dogAnimations.length;
        startNextDogAnimation();
      }, currentAnim.duration);
    };

    startNextDogAnimation();

    return () => {
      if (moveInterval) clearInterval(moveInterval);
      if (animationTimeout) clearTimeout(animationTimeout);
    };
  }, []);

  return (
    <section className="sm:flex hidden items-end w-[42%] rounded-2xl shadow-md h-[70%] px-3 pt-2 overflow-hidden custom-whiteLess-bg relative">
      <div
        className="absolute top-2"
        style={{
          left: `${owlPosition}%`,
        }}
      >
        <img
          src={owlAnimation}
          alt="Owl Animation"
          className="w-16 h-16 object-contain"
        />
      </div>

      <div
        className="absolute bottom-5"
        style={{
          left: `${dogPosition}%`,
        }}
      >
        <img
          src={dogAnimation}
          alt="Dog Animation"
          className="w-25 h-25 object-contain"
        />
      </div>

      <div
        className="absolute"
        style={{
          left: `${position}%`,
        }}
      >
        <img src={currentAnimation} alt="Virtual Pet" className="w-12 h-8" />
      </div>
    </section>
  );
};

export default Pet;
