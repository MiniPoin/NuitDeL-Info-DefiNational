const video = document.getElementById('video');
video.controls = false; /* Désactive les contrôles natifs dès le début */
const playBtn = document.getElementById('playBtn');
const volumePercentage = document.getElementById('volume-percentage');
let isTrackingMouse = true;
volumePercentage.style.display = "none";

// Lecture forcée de la vidéo (sans pause possible)
playBtn.addEventListener('click', function() {
    isTrackingMouse = true;
    if (video.paused) {
        video.play();
    }
    volumePercentage.style.display = "block";
    document.addEventListener('mousemove', function(e) {
        if (!isTrackingMouse) return;
            volumePercentage.style.left = (e.clientX+10) + 'px';
            volumePercentage.style.top = (e.clientY+10) + 'px';
            video.volume = (((e.clientX + e.clientY) % 100) / 100);
            volumePercentage.textContent = Math.round(video.volume * 100) + '%';
            console.log(video.volume);
    });

});


// Suivi du curseur et ajustement du volume

// Désactive le suivi avec la touche "Q"
document.addEventListener('keydown', function(event) {
    if (event.key.toUpperCase() === "Q") {
        //
        isTrackingMouse = false;
        console.log("Suivi du curseur désactivé !");
        volumePercentage.style.display = "none";
    }
});

// Empêche l'utilisateur de cliquer ailleurs que sur l'input ou le bouton
document.addEventListener('click', function(e) {
    if (e.target !== volumePercentage && e.target !== playBtn && e.target !== video) {
        e.preventDefault();
        volumePercentage.focus();
    }
});