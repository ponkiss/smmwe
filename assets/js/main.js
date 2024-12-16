var Cmn = {
    onDownBtn(targetElement, className) {
        if (targetElement && typeof className === "string") {
            targetElement.className = className;
        }
    },

    onUpBtn(targetElement, className) {
        if (targetElement && typeof className === "string") {
            targetElement.className = className;
        }
    },

    setLocation(url) {
        if (typeof url === "string") {
            location.href = url;
        }
    },

    switch (switches, pages) {
        const touchClasses = switches.map(() => ({
            touchstart: "",
            touchend: "",
            active: "",
        }));

        this.setBtnClass = function(touchstartClass, touchendClass, activeClass, switchId, onClick) {
            const btn = switches[switchId];
            if (!btn) return;

            touchClasses[switchId] = {
                touchstart: touchstartClass,
                touchend: touchendClass,
                active: activeClass
            };

            btn.addEventListener("touchstart", () => this.updateClass(btn, touchstartClass));
            btn.addEventListener("touchend", () => this.updateClass(btn, touchendClass));
            btn.addEventListener("touchcancel", () => this.updateClass(btn, touchendClass));
            btn.addEventListener("click", () => this.activatePage(btn, activeClass, onClick));
            btn.addEventListener("keyup", (event) => {
                if (event.key === "Enter") this.activatePage(btn, activeClass, onClick);
            });
        };

        this.init = function() {
            switches.forEach((btn, i) => {
                btn.valid = i === 0;
                btn.className = i === 0 ? touchClasses[i].active : touchClasses[i].touchend;
                pages[i][i === 0 ? "show" : "hide"]();
            });
        };

        this.activatePage = function(btn, activeClass, onClick) {
            if (btn.valid) return;

            switches.forEach((sw, i) => {
                sw.valid = sw === btn;
                sw.className = sw === btn ? activeClass : touchClasses[i].touchend;
                pages[i][sw.valid ? "show" : "hide"]();
            });

            if (typeof onClick === "function") onClick();
        };

        this.updateClass = function(element, newClass) {
            if (!element.valid) {
                element.className = newClass;
            }
        };
    },

    handleModernizrFallback() {
        if (!Modernizr.svg) {
            document.querySelectorAll("img").forEach((img) => {
                img.src = img.src.replace(/\.svg/gi, ".png");
            });
        }
    },
};

window.addEventListener("pageshow", () => document.querySelectorAll(".select").forEach((el) => el.classList.remove("select")));
window.addEventListener("hashchange", () => document.querySelectorAll(".select").forEach((el) => el.classList.remove("select")));

document.addEventListener("DOMContentLoaded", () => {
    Cmn.handleModernizrFallback();
});