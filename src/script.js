const video = document.getElementById('video');
        video.controls = false; /* Désactive les contrôles natifs dès le début */
        const playBtn = document.getElementById('playBtn');
        const input = document.getElementById('floating-input');
        let isTrackingMouse = true;

        // Lecture forcée de la vidéo (sans pause possible)
        playBtn.addEventListener('click', function() {
            isTrackingMouse = true;
            if (video.paused) {
                video.play();
            }
        });

        // Suivi du curseur et ajustement du volume
        document.addEventListener('mousemove', function(e) {
            if (!isTrackingMouse) return;
            input.style.left = e.clientX + 'px';
            input.style.top = e.clientY + 'px';
            video.volume = (e.clientX / window.innerWidth); // Volume entre 0 et 1
        });

        // Désactive le suivi avec la touche "Q"
        document.addEventListener('keydown', function(event) {
            if (event.key.toUpperCase() === "Q") {
                isTrackingMouse = false;
                console.log("Suivi du curseur désactivé !");
            }
        });

        // Empêche l'utilisateur de cliquer ailleurs que sur l'input ou le bouton
        document.addEventListener('click', function(e) {
            if (e.target !== input && e.target !== playBtn && e.target !== video) {
                e.preventDefault();
                input.focus();
            }
        });