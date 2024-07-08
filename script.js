function smooth() {
    gsap.registerPlugin(ScrollTrigger);
  
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
  
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
  
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
  }
  
  smooth();
  
  function loading() {
    document.addEventListener("DOMContentLoaded", function() {
      const counter1 = document.querySelector(".counter-1");
      const counter2 = document.querySelector(".counter-2");
      const counter3 = document.querySelector(".counter-3");
  
      // Animate counter1 to move to "1"
      gsap.to(counter1, {
        y: -counter1.clientHeight, // move to the top
        duration: 2,
        delay: 4,
        ease: "power2.inOut",
        onComplete: function() {
          // After counter1 animation completes, update its text content to "1"
          counter1.querySelector(".num").textContent = "1";
        }
      });
  
      // Set counter2 and counter3 to end with "0"
      setCounterToEndWithZero(counter2);
      setCounterToEndWithZero(counter3);
  
      // Animate loader fading out
      gsap.to(".loading-screen", {
        opacity: 0,
        duration: 1,
        delay: 7,
        onComplete: function() {
          // Hide the loader after fading out
          document.querySelector(".loading-screen").style.display = "none";
        }
      });
    });
  
    // Additional animations (assuming these are other animations for your loader)
    gsap.to(".digit", {
      top: "-150px",
      stagger: {
        amount: 0.25,
      },
      delay: 6,
      duration: 1,
      ease: "power4.inOut",
    });
    gsap.from(".loader1", {
      width: 0,
      duration: 6,
      ease: "power2.inOut",
    });
    gsap.from(".loader2", {
      width: 0,
      delay: 1.9,
      duration: 2,
      ease: "power2.inOut",
    });
    gsap.to(".loader", {
      background: "none",
      delay: 6,
      duration: 0.1,
    });
    gsap.to(".loader1", {
      rotate: 90,
      y: -50,
      duration: 0.5,
      delay: 6
    });
    gsap.to(".loader2", {
      x: -75,
      y: 75,
      duration: 0.5,
    }, "<");
    gsap.to(".loader", {
      scale: 40,
      duration: 1,
      delay: 7,
      ease: "power2.inOut"
    });
    gsap.to(".loader", {
      rotate: 45,
      y: 700,
      x: 2000,
      duration: 1,
      delay: 7,
      ease: "power2.inOut",
    });
  }
  
  // Function to set counter digits to end with "0"
  function setCounterToEndWithZero(counter) {
    const numElements = counter.querySelectorAll(".num");
    const numHeight = numElements[0].clientHeight;
    const totalDistance = (numElements.length - 1) * numHeight;
  
    gsap.to(counter, {
      y: -totalDistance,
      duration: 5, // Adjust duration as needed
      ease: "power2.inOut",
      onComplete: function() {
        // Set all digits to "0"
        numElements.forEach(num => {
          num.textContent = "0";
        });
      }
    });
  }
  
  loading();

  
  