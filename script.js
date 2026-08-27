/* =========================================================
   MIKOLA PORTFOLIO — JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ==================== SCROLL REVEAL ==================== */

    const revealElements = document.querySelectorAll(
        ".section__heading, .project, .service-card, " +
        ".personal-project__content, .personal-project__stats, " +
        ".about__content, .about__technologies, " +
        ".testimonial__card, .contact"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    revealElements.forEach((element) => {
        element.classList.add("reveal");

        revealObserver.observe(element);
    });


    /* ==================== STAGGER PROJECTS ==================== */

    const projectCards = document.querySelectorAll(".project");

    projectCards.forEach((card, index) => {

        card.style.setProperty(
            "--reveal-delay",
            `${index * 80}ms`
        );

    });


    /* ==================== CUSTOM CURSOR ==================== */

    const isTouchDevice =
        window.matchMedia("(pointer: coarse)").matches;

    if (!isTouchDevice) {

        const cursor = document.createElement("div");
        const cursorDot = document.createElement("div");

        cursor.className = "custom-cursor";
        cursorDot.className = "custom-cursor-dot";

        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);

        let mouseX = 0;
        let mouseY = 0;

        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

        });


        function animateCursor() {

            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();


        const interactiveElements = document.querySelectorAll(
            "a, button, .project__image, .service-card"
        );

        interactiveElements.forEach((element) => {

            element.addEventListener("mouseenter", () => {
                cursor.classList.add("cursor-hover");
            });

            element.addEventListener("mouseleave", () => {
                cursor.classList.remove("cursor-hover");
            });

        });

    }


    /* ==================== PROJECT CARD TILT ==================== */

    if (!isTouchDevice) {

        const cards = document.querySelectorAll(
            ".project__image"
        );

        cards.forEach((card) => {

            card.addEventListener("mousemove", (event) => {

                const rect = card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -2;

                const rotateY =
                    ((x - centerX) / centerX) * 2;

                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform =
                    "perspective(1000px) rotateX(0) rotateY(0)";

            });

        });

    }


    /* ==================== HEADER ON SCROLL ==================== */

    const header = document.querySelector(".header");

    let lastScrollY = window.scrollY;

    window.addEventListener(
        "scroll",
        () => {

            const currentScrollY = window.scrollY;

            if (currentScrollY > 50) {
                header.classList.add("header--scrolled");
            } else {
                header.classList.remove("header--scrolled");
            }

            if (
                currentScrollY > lastScrollY &&
                currentScrollY > 300
            ) {
                header.classList.add("header--hidden");
            } else {
                header.classList.remove("header--hidden");
            }

            lastScrollY = currentScrollY;

        },
        {
            passive: true
        }
    );


    /* ==================== ACTIVE NAV ==================== */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".nav a"
    );

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const id = entry.target.id;

                navLinks.forEach((link) => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        `#${id}`
                    ) {
                        link.classList.add("active");
                    }

                });

            });

        },
        {
            threshold: 0.25
        }
    );


    sections.forEach((section) => {
        sectionObserver.observe(section);
    });


    /* ==================== SMOOTH ANCHOR ==================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* ==================== MAGNETIC BUTTONS ==================== */

    if (!isTouchDevice) {

        const magneticButtons =
            document.querySelectorAll(
                ".button--primary, .header__button"
            );

        magneticButtons.forEach((button) => {

            button.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    button.style.transform =
                        `translate(${x * 0.12}px,
                                   ${y * 0.12}px)`;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "translate(0, 0)";

                }
            );

        });

    }


    /* ==================== CONSOLE ==================== */

    console.log(
        "%cMikola — Web Developer",
        "font-size: 18px; font-weight: bold;"
    );

    console.log(
        "%cBuilding digital experiences.",
        "font-size: 12px;"
    );

});