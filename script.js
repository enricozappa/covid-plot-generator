const submitButton = document.querySelector('#submit');
const monthInput = document.querySelector('#month');
const dayInput = document.querySelector('#day');
const nameInput = document.querySelector('#name');
const colorInput = document.querySelector('#color');
const dayError = document.querySelector('#day-error');
const nameError = document.querySelector('#name-error');

// Plot Parts
// =============================
const plotMonths = [
    'da un laboratorio cinese',
    'dall\'esercito americano',
    'dai poteri forti',
    'da Bill Gates',
    'dagli scienziati',
    'dalla Russia',
    'dalla Nasa',
    'dalla Merkel',
    'dalla Lega',
    'dal Vaticano',
    'dai rettiliani',
    'dalle lobby gay'
]

const plotDays = [
    'distrarci dalle prove inconfutabili che la terra è piatta',
    'decimare la popolazione mondiale',
    'accrescere i propri interessi economici',
    'distruggere l\'Italia',
    'finanziare il terrorismo internazionale',
    'far fallire il mercato',
    'creare una specie ibrida',
    'far passare inosservato il 5G',
    'riportare in auge la civiltà perduta di Atlantide',
    'l\'evoluzione della specie',
    'avere accesso ai nostri dati',
    'arricchire Big Pharma',
    'riportarci sulla retta via',
    'indebolire il movimento 5 Stelle',
    'rendere la vaccinazione obbligatoria',
    'difendere la Russia',
    'abolire il reddito di cittadinanza',
    'provare l\'esistenza degli alieni',
    'usare i maiali come cavie',
    'farci diventare atei',
    'promuovere l\'ideologia gender',
    'costringerci a collaborare con loro',
    'vendere gli smartphone che ci controllano',
    'attaccare la Cina',
    'eliminare i pesi morti',
    'controllare le menti',
    'non farci sapere la verità sull\'11 Settembre',
    'testare armi chimiche',
    'far arricchire le ONG',
    'metterci gli uni contro gli altri',
    'aumentare l\'utilizzo di pesticidi'
]

const plotNames = {
    'a': 'le scie chimiche',
    'b': 'il buco nell\'ozono',
    'c': 'il pensiero',
    'd': 'la webcam dei nostri computer',
    'e': 'le radiazioni del 5G',
    'f': 'i migranti',
    'g': 'i topi',
    'h': 'l\'acqua non potabile',
    'i': 'le particelle di metalli pesanti',
    'j': 'i raggi UV',
    'k': 'la sodomia',
    'l': 'la forza gravitazionale',
    'm': 'i vaccini',
    'n': 'i microchip che ci hanno impiantato',
    'o': 'i ragni violino',
    'p': 'gli OGM',
    'q': 'le parole del premier',
    'r': 'i farmaci da banco',
    's': 'gli insetti robotici',
    't': 'le catastrofi naturali',
    'u': 'il vento solare',
    'v': 'la fibra ottica',
    'w': 'la visione de La Casa di Carta',
    'x': 'la fissione nucleare',
    'y': 'il ciclo del carbonio',
    'z': 'la stretta di mano'
}

const plotColors = [
    'l\'ha detto Burioni alla TV',
    'l\'ha detto mio cugino che lavora nel settore',
    'è logico che sia così',
    'non puoi provare che non sia così',
    'conosco qualcuno con gli agganci',
    'ho parlato con Dio',
    'me l\'ha detto Padre Pio in sogno',
    'le prove non lasciano alcun dubbio',
    'ho letto un articolo al riguardo',
    'lo dicono anche i medici',
    'gli Egizi l\'avevano predetto'
]

// Sanitize Text
// =============================
let sanitizedText = "";

function sanitize(element) {
    sanitizedText = element.replace(/\s+/g, '').replace(/[^\w\s]/gi, '').replace(/[0-9]/g, '');
}

// Generate Plot
// =============================
const plotContent = document.querySelector('.plot-content');

function generatePlot() {
    let month = monthInput.value;
    let day = dayInput.value;
    let name = nameInput.value;
    let color = colorInput.value;

    if (name) {
        sanitize(name);
        sanitizedText = sanitizedText.toLowerCase();
        name = sanitizedText[0];
    }

    plotContent.innerHTML = `Il coronavirus è stato creato ${plotMonths[month]} per ${plotDays[day - 1]}. Si trasmette attraverso ${plotNames[name]}. Io lo so perché ${plotColors[color]}.`
    showPlot(day, name);
}

// Show Plot
// =============================
const form = document.querySelector('.form');
const plot = document.querySelector('.plot');
const closeIcon = document.querySelector('#close-icon');
const plotMessage = document.querySelector('.plot-message');


function showPlot(num, str) {
    plotMessage.style.opacity = '0';
    dayError.style.opacity = "0";
    nameError.style.opacity = "0";

    if (num < 1 || num > 31 || Number.isInteger(num) === false) {
        dayError.style.opacity = "1";
    }
    if (!str) {
        nameError.style.opacity = "1";
    }
    if ((num > 0 && num < 32) && str.length) {
        dayError.style.opacity = "0";
        nameError.style.opacity = "0";
        form.style.display = "none";
        plot.style.display = "flex";
    }
}

function hidePlot() {
    form.style.display = "flex";
    plot.style.display = "none";
}

// Cookies Banner
// =============================
const banner = document.querySelector('.banner');
const bannerButton = document.querySelector('#banner-dismiss');

function loadBanner() {
    if (localStorage.biscottoDelGomblotto) {
        banner.style.display = "none";
    }
}

function saveCookies() {
    localStorage.setItem('biscottoDelGomblotto', true);
    banner.style.display = "none";
}

// Copy plot into clipboard
// =============================
const buttonCopy = document.querySelector('#plot-button');

function copyText() {
    plotContent.focus();
    plotContent.select();
    document.execCommand('copy');
    buttonCopy.focus();
    plotMessage.style.opacity = '1';
}

bannerButton.addEventListener('click', saveCookies);
submitButton.addEventListener('click', generatePlot);
closeIcon.addEventListener('click', hidePlot);
buttonCopy.addEventListener('click', copyText);

loadBanner();
