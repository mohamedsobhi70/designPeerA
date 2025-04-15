
document.addEventListener("DOMContentLoaded", () => {
    // hover on box effect
    const boxes = document.querySelectorAll('.hover-box');

    boxes.forEach((box) => {
        const tooltip = box.querySelector('.tooltip');

        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;
        let isHovering = false;

        const updatePosition = () => {
            const ease = 0.25;
            currentX += (targetX - currentX) * ease;
            currentY += (targetY - currentY) * ease;

            tooltip.style.left = `${currentX}px`;
            tooltip.style.top = `${currentY}px`;

            if (isHovering) {
                requestAnimationFrame(updatePosition);
            }
        };

        box.addEventListener('mousemove', (e) => {
            const rect = box.getBoundingClientRect();
            targetX = e.clientX - rect.left + 12;
            targetY = e.clientY - rect.top + 12;

            if (!isHovering) {
                isHovering = true;
                tooltip.style.opacity = '1';
                requestAnimationFrame(updatePosition);
            }
        });

        box.addEventListener('mouseleave', () => {
            isHovering = false;
            tooltip.style.opacity = '0';
        });
    });

    // accordion
    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach((item) => {
        const title = item.querySelector(".accordion-title");
        const desc = item.querySelector(".accordion-desc");
        const icon = item.querySelector("img");

        // Collapse initially
        desc.style.maxHeight = "0px";
        desc.style.overflow = "hidden";
        desc.style.transition = "max-height 0.4s ease";

        title.addEventListener("click", () => {
            const isOpen = item.classList.contains("active");

            // Close all
            accordionItems.forEach((el) => {
                el.classList.remove("active");
                el.querySelector(".accordion-desc").style.maxHeight = "0px";
                el.querySelector("img").src = "assets/images/icons/plus.svg";
            });

            // Open clicked one
            if (!isOpen) {
                item.classList.add("active");
                const scrollHeight = desc.scrollHeight;
                desc.style.maxHeight = scrollHeight + "px";
                icon.src = "assets/images/icons/minus.svg";
            }
        });
    });

    // parallax effect 
    window.addEventListener('scroll', function () {
        if (window.innerWidth > 1024) {
            const videoContainer = document.querySelector('.video-parallax');
            if (!videoContainer) return;

            const scrolled = window.scrollY;
            const speed = 0.15; // Adjust speed here (lower = slower)
            videoContainer.style.transform = `translateY(${-scrolled * speed}%)`;
        }
    });

    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const menuCloseBtn = document.querySelector(".menu-close-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const navLink = document.querySelectorAll(".nav-link");

    navLink.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("show");
            document.querySelector("body").style.overflow = "auto";
        });
    });

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.add("show");
            document.querySelector("body").style.overflow = "hidden";

        });
    }

    if (menuCloseBtn) {
        menuCloseBtn.addEventListener("click", () => {
            mobileMenu.classList.remove("show");
            document.querySelector("body").style.overflow = "auto";
        });
    }


    // header 
    window.addEventListener('scroll', function () {
        const header = document.getElementById('header');
        if (window.scrollY > 400) {
            header.classList.add('stky');
        } else {
            header.classList.remove('stky');
        }
    });


    // pricing table 

    const interviewRange = document.getElementById("interview-range");
    const surveyRange = document.getElementById("survey-range");
    const interviewLabel = document.getElementById("interview-label");
    const surveyLabel = document.getElementById("survey-label");
    const totalPriceEl = document.getElementById("tab-price");
    const recruitCheckbox = document.getElementById("recruit-participants");
    const tabItems = document.querySelectorAll(".tab-item");
    let currentMode = "b2c";

    function getPrices(mode) {
        if (mode === "b2c") {
            return { interview: 20, survey: 30 };
        } else if (mode === "b2b") {
            return { interview: 25, survey: 35 };
        }
    }

    function updateValues() {
        const interviewCount = parseInt(interviewRange.value);
        const surveyCount = parseInt(surveyRange.value);
        const recruitFee = recruitCheckbox.checked ? 1000 : 0;
        const { interview, survey } = getPrices(currentMode);

        const interviewText = interviewCount > 25 ? "I need +25 Interviews" : `I need ${interviewCount} Interviews`;
        const surveyText = surveyCount > 1000 ? "I need +1000 Survey Response" : `I need ${surveyCount} Survey Response`;

        interviewLabel.textContent = interviewText;
        surveyLabel.textContent = surveyText;

        if (interviewCount > 25 || surveyCount > 1000) {
            totalPriceEl.textContent = "Talk to us"
            return;
        }

        const total = (interviewCount * interview) + (surveyCount * survey) + recruitFee;
        totalPriceEl.textContent = total === 0 ? "Talk to us" : `${total} USD`;
    }

    interviewRange.addEventListener("input", updateValues);
    surveyRange.addEventListener("input", updateValues);
    recruitCheckbox.addEventListener("change", updateValues);

    tabItems.forEach(tab => {
        tab.addEventListener("click", () => {
            tabItems.forEach(t => t.classList.remove("active", "bg-white", "text-[#444CE7]", "font-semibold"));
            tab.classList.add("active", "bg-white", "text-[#444CE7]", "font-semibold");
            currentMode = tab.dataset.tab;
            updateValues();
        });
    });

    updateValues();
});
