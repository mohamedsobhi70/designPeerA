
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



    // tabs 
    const tabs = document.querySelectorAll(".tab-item");
    const price = document.getElementById("tab-price");
  
    const tabData = {
      b2c: {
        price: "2500 USD",
      },
      b2b: {
        price: "3500 USD",
      }
    };
  
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const selected = tab.dataset.tab;
        const data = tabData[selected];
        price.textContent = data.price;
      });
    });
});
