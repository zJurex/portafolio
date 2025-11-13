(() => {
    const root = document.body;

    /* tema claro / oscuro */
    const applyTheme = theme => {
        root.classList.remove("light", "dark");
        root.classList.add(theme);
    };

    const saved = localStorage.getItem("pref-theme");
    if (saved) applyTheme(saved);

    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) {
        themeBtn.onclick = () => {
        const next = root.classList.contains("light") ? "dark" : "light";
        applyTheme(next);
        localStorage.setItem("pref-theme", next);
        };
    }

    /* efecto typed del hero */
    const typedEl = document.getElementById("typed");

    if (typedEl) {
        const phrases = ["Soy Programador", "Soy Game Dev", "Soy Desarrollador", "Soy Creador"];
        let pIndex = 0, cIndex = 0, deleting = false;

        const loop = () => {
        const text = phrases[pIndex];
        cIndex += deleting ? -1 : 1;

        typedEl.textContent = text.slice(0, cIndex);

        if (!deleting && cIndex === text.length) {
            deleting = true;
            setTimeout(loop, 900);
            return;
        }

        if (deleting && cIndex === 0) {
            deleting = false;
            pIndex = (pIndex + 1) % phrases.length;
        }

        setTimeout(loop, deleting ? 55 : 85);
        };

        loop();
    }

    /* modal de proyectos */
    const modal = document.getElementById("projectModal");
    const modalBody = document.getElementById("modalBody");
    const closeBtn = document.querySelector(".modal-close");

    const projectsData = {
        bounce: {
        title: "Bounce Man",
        fields: [
            ["Lenguaje", "C# (Unity)"],
            ["Tipo", "Plataformas 2D"],
            ["Rol", "Programador principal"],
            ["Equipo", "4 personas"],
            ["Descripción", "Juego de plataformas 2D inspirado en Mario Bros."]
        ],
        link: "https://zjurex.itch.io/bounce-man"
        },

        ludopatia: {
        title: "LudopatiaARG",
        fields: [
            ["Lenguaje", "HTML, CSS, JavaScript"],
            ["Tipo", "Web informativa"],
            ["Enfoque", "Accesibilidad, alto contraste"],
            ["Descripción", "Sitio web educativo sobre la ludopatía."]
        ],
        link: "https://github.com/zJurex/LudopatiaARG"
        },

        jordan: {
        title: "JordanMP",
        fields: [
            ["Lenguaje", "HTML, CSS, JavaScript"],
            ["Tipo", "Tienda"],
            ["Enfoque", "Moderno, responsivo"],
            ["Descripción", "Tienda de moda enfocada en Jordan de Nike"]
        ],
        link: "https://jordanmp.netlify.app/"
        }
    };

    /* abrir modal */
    function openModal(key) {
        const p = projectsData[key];
        if (!p) return;

        const details = p.fields
        .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
        .join("");

        modalBody.innerHTML = `
        <h3 style="margin-bottom:10px">${p.title}</h3>
        ${details}
        <a href="${p.link}" class="btn btn-primary" target="_blank" style="margin-top:12px;display:inline-block">Ver Proyecto</a>
        `;

        modal.classList.remove("hidden");
    }

    if (closeBtn) closeBtn.onclick = () => modal.classList.add("hidden");

    document.addEventListener("click", e => {
        const card = e.target.closest(".project-card");
        if (card) openModal(card.dataset.project);
        if (e.target === modal) modal.classList.add("hidden");
    });

    /* animación reveal al hacer scroll */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".card, .section").forEach(el => observer.observe(el));
    })();

    /* modal del minijuego */
    const gameModal = document.getElementById("gameModal");
    const closeGame = document.getElementById("closeGame");

    document.addEventListener("click", e => {
    const card = e.target.closest(".project-card");
    if (card && card.dataset.project === "memotest") {
        gameModal.classList.remove("hidden");
    }
    });

    /* cerrar modal del minijuego */
    closeGame?.addEventListener("click", () => {
        gameModal.classList.add("hidden");
    });
