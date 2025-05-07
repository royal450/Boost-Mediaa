import {
    initializeApp as a
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
    getDatabase as e,
    ref as t,
    get as i
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import {
    getAuth as r,
    onAuthStateChanged as s
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

let firebaseConfig = {
    apiKey: "AIzaSyBuioOF7DCq-qIoa1D6ZyZbrAVeGjbfv3Y",
    authDomain: "daily-campaign-king.firebaseapp.com",
    databaseURL: "https://daily-campaign-king-default-rtdb.firebaseio.com",
    projectId: "daily-campaign-king",
    storageBucket: "daily-campaign-king.appspot.com",
    messagingSenderId: "1089692268059",
    appId: "1:1089692268059:web:eddde94901436202576abe",
    measurementId: "G-6PXV3B5322"
},
app = a(firebaseConfig),
db = e(app),
auth = r(app);

const fetchBalance = async (a) => {
    try {
        let e = await i(t(db, `RoyalWinUserDataBase/${a}/balance`));
        return parseFloat(e.val() || 0).toFixed(2);
    } catch (r) {
        console.error("Error fetching balance:", r);
        return "Error";
    }
};

const formatBalance = (a) => {
    if (a === "Error" || a === "Login First!") return a;
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(parseFloat(a));
};

const updateBalanceDisplay = (a) => {
    let e = formatBalance(a);
    document.getElementById("balanceDisplay").textContent = e;
};

window.refreshBalance = async () => {
    let a = auth.currentUser;
    if (!a) {
        updateBalanceDisplay("Login First!");
        return;
    }
    document.getElementById("balanceDisplay").textContent = "₹...";
    let e = await fetchBalance(a.uid);
    updateBalanceDisplay(e);
    let t = document.getElementById("balanceDisplay");
    t.classList.add("refreshing");
    setTimeout(() => t.classList.remove("refreshing"), 500);
};

s(auth, async (a) => {
    if (a) await refreshBalance();
    else updateBalanceDisplay("Login First!");
});
