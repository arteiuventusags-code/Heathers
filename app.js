/*=========================================================
                    CONFIGURACIÓN
=========================================================*/

const CONFIG = {

    loaderDelay: 900,

    curtainTime: 2,

    logoTime: 1.2,

    particles: 70

};


/*=========================================================
                    ELEMENTOS
=========================================================*/

const loader = document.getElementById("loader");

const hero = document.querySelector(".hero");

const welcomeScreen = document.getElementById("welcomeScreen");

const bookScene = document.getElementById("bookScene");

const leftCurtain = document.querySelector(".curtain-left");

const rightCurtain = document.querySelector(".curtain-right");

const logo = document.getElementById("logo");

const particles = document.getElementById("particles");

const programBtn = document.getElementById("programBtn");

const musicBtn = document.getElementById("musicBtn");

const videoBtn = document.getElementById("videoBtn");

const backBtn = document.getElementById("backBtn");

const music = document.getElementById("music");

const videoModal = document.getElementById("videoModal");

const video = document.getElementById("video");

const closeVideo = document.getElementById("closeVideo");


/*=========================================================
                    VARIABLES
=========================================================*/

let musicPlaying = false;

let pageFlip = null;


/*=========================================================
                    PÁGINAS
=========================================================*/

const paginas = [

    "Pags/P1.png",
    "Pags/P2.jpg",
    "Pags/P3.png",
    "Pags/P4.jpg",
    "Pags/P5.png",
    "Pags/P6.jpg"

];


/*=========================================================
                    LOADER
=========================================================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        gsap.to(loader, {

            opacity: 0,

            duration: .8,

            onComplete: () => {

                loader.style.display = "none";

                iniciarIntro();

            }

        });

    }, CONFIG.loaderDelay);

});


/*=========================================================
                    INTRO
=========================================================*/

function iniciarIntro() {

    hero.style.opacity = 1;

    const tl = gsap.timeline();

    tl.to(leftCurtain, {

        x: "-105%",

        duration: CONFIG.curtainTime,

        ease: "power4.inOut"

    }, 0);

    tl.to(rightCurtain, {

        x: "105%",

        duration: CONFIG.curtainTime,

        ease: "power4.inOut"

    }, 0);

    tl.from(logo, {

        opacity: 0,

        scale: .75,

        filter: "blur(18px)",

        duration: CONFIG.logoTime,

        ease: "power3.out"

    }, .7);

    tl.from(".subtitle", {

        opacity: 0,

        y: 25,

        duration: .7

    });

    tl.from(".buttons button", {

        opacity: 0,

        y: 25,

        stagger: .15,

        duration: .5,

        clearProps: "all"

    });

}


/*=========================================================
                    PARTÍCULAS
=========================================================*/

for (let i = 0; i < CONFIG.particles; i++) {

    const p = document.createElement("span");

    p.className = "particle";

    p.style.left = Math.random() * 100 + "%";

    p.style.animationDelay = Math.random() * 10 + "s";

    p.style.animationDuration = 6 + Math.random() * 8 + "s";

    particles.appendChild(p);

}


/*=========================================================
                    MÚSICA
=========================================================*/

musicBtn.addEventListener("click", () => {

    if (!musicPlaying) {

        music.play();

        musicPlaying = true;

        musicBtn.textContent = "Detener música";

    }

    else {

        music.pause();

        music.currentTime = 0;

        musicPlaying = false;

        musicBtn.textContent = "Activar música";

    }

});


/*=========================================================
                    VIDEO
=========================================================*/

videoBtn.addEventListener("click", () => {

    videoModal.style.display = "flex";

    gsap.fromTo(

        videoModal,

        {

            opacity: 0

        },

        {

            opacity: 1,

            duration: .35

        }

    );

});


function cerrarVideo() {

    gsap.to(videoModal, {

        opacity: 0,

        duration: .3,

        onComplete: () => {

            video.pause();

            video.currentTime = 0;

            videoModal.style.display = "none";

        }

    });

}

closeVideo.addEventListener("click", cerrarVideo);

videoModal.addEventListener("click", e => {

    if (e.target === videoModal) {

        cerrarVideo();

    }

});


/*=========================================================
                ANIMACIÓN DEL LOGO
=========================================================*/

gsap.to(logo, {

    scale: 1.03,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut",

    duration: 2.8

});

gsap.to(logo, {

    filter: "drop-shadow(0 0 22px rgba(255,255,255,.35))",

    repeat: -1,

    yoyo: true,

    duration: 2

});

/*=========================================================
                    LIBRO
=========================================================*/

function crearLibro() {

    const book = document.getElementById("book");

    book.innerHTML = "";

    paginas.forEach((pagina) => {

        const page = document.createElement("div");

        page.className = "page";

        page.innerHTML = `
            <img
                src="${pagina}"
                draggable="false"
                loading="lazy"
            >
        `;

        book.appendChild(page);

    });

}


/*=========================================================
            INICIALIZAR PAGEFLIP
=========================================================*/

function iniciarLibro() {

    if (pageFlip != null) {

        pageFlip.update();

        return;

    }

    crearLibro();

    pageFlip = new St.PageFlip(

        document.getElementById("book"),

        {

            width: 420,

            height: 680,

            size: "stretch",

            minWidth: 260,

            maxWidth: 520,

            minHeight: 420,

            maxHeight: 760,

            maxShadowOpacity: .45,

            showCover: true,

            mobileScrollSupport: true,

            usePortrait: true,

            flippingTime: 850,

            drawShadow: true,

            autoSize: true

        }

    );

    pageFlip.loadFromHTML(

        document.querySelectorAll("#book .page")

    );

    setTimeout(() => {

        pageFlip.update();

    }, 120);

    setTimeout(() => {

    asignarEventosVisor();

}, 500);

}


/*=========================================================
            ABRIR PROGRAMA
=========================================================*/

programBtn.addEventListener("click", () => {

    gsap.timeline()

    .to(welcomeScreen, {

        opacity: 0,

        duration: .35

    })

    .set(welcomeScreen, {

        display: "none"

    })

    .set(bookScene, {

        display: "flex",

        opacity: 0

    })

    .to(bookScene, {

        opacity: 1,

        duration: .35,

        onComplete: () => {

            iniciarLibro();

        }

    });

});


/*=========================================================
            REGRESAR
=========================================================*/

backBtn.addEventListener("click", () => {

    gsap.timeline()

    .to(bookScene, {

        opacity: 0,

        duration: .30

    })

    .set(bookScene, {

        display: "none"

    })

    .set(welcomeScreen, {

        display: "flex",

        opacity: 0

    })

    .to(welcomeScreen, {

        opacity: 1,

        duration: .30

    });

});

/*==================================================
                    ZOOM
==================================================*/
/*
const zoomBtn=document.getElementById("zoomBtn");

let zoomActivo=false;

let scale=1;

let posX=0;

let posY=0;

let startX=0;

let startY=0;

let arrastrando=false;

const flipbook=document.getElementById("flipbook");

function actualizarZoom(){

    flipbook.style.transform=

    `translate(${posX}px,${posY}px) scale(${scale})`;

}



zoomBtn.addEventListener("click",()=>{

    zoomActivo=!zoomActivo;

    if(zoomActivo){

        scale=1.8;

        zoomBtn.textContent="❌ Salir del zoom";

        flipbook.classList.add("zoomMode");

    }

    else{

        scale=1;

        posX=0;

        posY=0;

        zoomBtn.textContent="🔍 Zoom";

        flipbook.classList.remove("zoomMode");

    }

    actualizarZoom();

});


flipbook.addEventListener("pointerdown",(e)=>{

    if(!zoomActivo) return;

    arrastrando=true;

    startX=e.clientX-posX;

    startY=e.clientY-posY;

});


window.addEventListener("pointermove",(e)=>{

    if(!arrastrando) return;

    posX=e.clientX-startX;

    posY=e.clientY-startY;

    actualizarZoom();

});


window.addEventListener("pointerup",()=>{

    arrastrando=false;

});

let ultimoToque=0;

flipbook.addEventListener("pointerdown",()=>{

    const ahora=Date.now();

    if(ahora-ultimoToque<300){

        zoomBtn.click();

    }

    ultimoToque=ahora;

});



/*==================================================
                VISOR DE PÁGINA
==================================================*/

const pageViewer = document.getElementById("pageViewer");
const viewerImage = document.getElementById("viewerImage");

const viewerClose = document.getElementById("viewerClose");
const viewerNext = document.getElementById("viewerNext");
const viewerPrev = document.getElementById("viewerPrev");

let paginaActual = 0;

let ultimoTap = 0;


/*==================================================
            ABRIR VISOR
==================================================*/

function abrirPagina(index){

    paginaActual = index;

    viewerImage.src = paginas[paginaActual];

    pageViewer.style.display = "flex";

    gsap.fromTo(pageViewer,
        { opacity: 0 },
        { opacity: 1, duration: .25 }
    );

    gsap.fromTo(viewerImage,
        { scale: .9, opacity: 0 },
        { scale: 1, opacity: 1, duration: .35, ease: "power2.out" }
    );

}


/*==================================================
            CERRAR VISOR
==================================================*/

function cerrarPagina(){

    gsap.to(viewerImage, {
        scale: .9,
        opacity: 0,
        duration: .2
    });

    gsap.to(pageViewer, {
        opacity: 0,
        duration: .25,
        delay: .05,
        onComplete: () => {
            pageViewer.style.display = "none";
        }
    });

}

viewerClose.addEventListener("click", cerrarPagina);


/*==================================================
            CAMBIO DE PÁGINA
==================================================*/

viewerNext.addEventListener("click", () => {

    if (paginaActual < paginas.length - 1) {

        paginaActual++;

        viewerImage.src = paginas[paginaActual];

        gsap.fromTo(viewerImage,
            { opacity: 0, scale: .95 },
            { opacity: 1, scale: 1, duration: .2 }
        );

    }

});


viewerPrev.addEventListener("click", () => {

    if (paginaActual > 0) {

        paginaActual--;

        viewerImage.src = paginas[paginaActual];

        gsap.fromTo(viewerImage,
            { opacity: 0, scale: .95 },
            { opacity: 1, scale: 1, duration: .2 }
        );

    }

});


/*==================================================
        DOBLE TAP (VERSIÓN COMPATIBLE PAGEFLIP)
==================================================*/

let ultimoTapGlobal = 0;

function asignarEventosVisor(){

    const paginasDOM = document.querySelectorAll("#book .page");

    paginasDOM.forEach((page, index) => {

        page.style.cursor = "zoom-in";

        page.addEventListener("pointerup", () => {

            const ahora = Date.now();

            if (ahora - ultimoTapGlobal < 300) {

                abrirPagina(index);

            }

            ultimoTapGlobal = ahora;

        });

    });

}