const savedTheme = localStorage.getItem("kemoTheme");

if(savedTheme){
    document.body.setAttribute("data-theme", savedTheme);
}
let cart = JSON.parse(localStorage.getItem("kemoCart")) || [];

function saveCart() {
    localStorage.setItem("kemoCart", JSON.stringify(cart));
}

// 1. تطبيق الدارك مود المحفوظ فوراً لمنع حدوث وميض أبيض عند تحميل الصفحة
if (localStorage.getItem("kemoDarkMode") === "enabled") {
    document.body.classList.add("dark-mode");
} else {
    document.body.classList.remove("dark-mode");
}
/* ================= SEARCH ================= */

const searchData = [

{
keywords:[

// ---------- WATCHES ----------

// English
"watch","watches","watchs","smart watch","smart watches",
"wrist watch","clock","luxury watch","men watch",
"women watch","sport watch","digital watch",
"analog watch","timepiece","chronograph","casio",
"burei","classic watch","fashion watch","gift watch",
"Reloj de pulsera", "Reloj inteligente", "Reloj de lujo", "Reloj deportivo", "Reloj analógico",

// العربية
"ساعة","ساعات","ساعة يد","ساعة ذكية","ساعات ذكية",
"ساعة رجالي","ساعة حريمي","ساعة رياضية",
"ساعة رقمية","ساعة كلاسيك","ساعات فاخرة",
"كرونوجراف","وقت","اكسسوار ساعة","سوار ساعة",
"كاسيو","بوراي",

// Français
"montre","montres","montre intelligente",
"montre homme","montre femme","montre sport",
"montre numérique","montre analogique",
"montre de luxe","chronographe",
"bracelet montre","temps","casio",

// Italiano
"orologio","orologi","orologio intelligente",
"orologio uomo","orologio donna",
"orologio sportivo","orologio digitale",
"orologio analogico","orologio di lusso",
"cronografo","tempo","casio",

// Deutsch
"uhr","uhren","armbanduhr","smartuhr",
"herrenuhr","damenuhr","sportuhr",
"digitaluhr","analoguhr","luxusuhr",
"chronograph","zeit","casio",

// 日本語
"時計","腕時計","スマートウォッチ",
"デジタル時計","アナログ時計",
"高級時計","メンズ時計",
"レディース時計","クロノグラフ",
"ウォッチ","時間"

],
page:"watches.html"
},

{
keywords:[

// ---------- BAGS ----------

// English
"bag","bags","handbag","backpack","travel bag",
"school bag","leather bag","wallet bag",
"shoulder bag","crossbody","luggage",
"suitcase","accessory","accessories",

// العربية
"شنطة","شنط","حقيبة","حقائب",
"شنطة سفر","حقيبة سفر","شنطة مدرسة",
"شنطة جلد","شنطة كتف","شنطة يد",
"باك","حقيبة ظهر","اكسسوار","اكسسوارات",

// Français
"sac","sacs","sac à dos","sac de voyage",
"sac à main","sac en cuir","valise",
"accessoire","accessoires",

// Italiano
"borsa","borse","zaino",
"borsa da viaggio","borsa in pelle",
"valigia","accessorio","accessori",

// Deutsch
"tasche","taschen","rucksack",
"reisetasche","ledertasche",
"koffer","zubehör",

// 日本語
"バッグ","かばん","旅行バッグ",
"リュック","革バッグ",
"スーツケース","アクセサリー"

],
page:"bags.html"
},

{
keywords:[

// ---------- WORLD CUP ----------

// English
"world cup","worldcup","football","soccer",
"fifa","football products","soccer products",
"fan","fans","jersey","cup",
"Llavero de fútbol", "Cartera de cuero", "Accesorios de lujo", "Cartera para tarjetas", "Cinturón de cuero",

// العربية
"كأس العالم","كاس العالم",
"كرة","كرة القدم","فيفا",
"منتجات كأس العالم","منتخب",
"مشجع","كورة",
"Copa del mundo",
    "Trofeo de la copa mundial", "Camiseta de fútbol", "Accesorios de fútbol", "Recuerdos de la copa",

// Français
"coupe du monde","football",
"fifa","supporter","maillot",

// Italiano
"coppa del mondo","calcio",
"fifa","tifoso","maglia",

// Deutsch
"weltmeisterschaft","fußball",
"fussball","fifa","fan","trikot",

// 日本語
"ワールドカップ","サッカー",
"FIFA","ユニフォーム",
"ファン","応援"

],
page:"World Cup Products.html"
},

{
keywords:[

// ---------- ANOTHER PRODUCTS ----------

// English
"another","another products",
"new products","leather products",
"boots","boot","shoes","belt",
"belts","card holder","gift",
"Botas de fútbol", "Zapatos deportivos", "Botas de cuero", "Calzado de moda", "Botas para hombre",
"Otros productos", "Nuevos productos", "Productos de cuero", "Botas", "Calzado", "Zapatos", "Cinturón", "Cinturones", "Cartera de tarjetas", "Regalo", "Artículos de regalo", "Accesorios varios", "Colección diversa", "Productos de moda", "Estilo casual", "Calidad premium", "Diseño exclusivo", "Oferta especial", "Edición limitada", "Productos destacados",

// العربية
"منتجات أخرى","منتجات جديدة",
"منتجات جلد","بوت",
"حذاء","أحذية","حزام",
"أحزمة","حافظة بطاقات","هدية",

// Français
"autres produits","nouveaux produits",
"produits en cuir","bottes",
"chaussures","ceinture",
"porte-cartes",

// Italiano
"altri prodotti","nuovi prodotti",
"prodotti in pelle","stivali",
"scarpe","cintura",
"porta carte",

// Deutsch
"andere produkte","neue produkte",
"lederprodukte","stiefel",
"schuhe","gürtel",
"kartenetui",

// 日本語
"その他の商品","新商品",
"革製品","ブーツ",
"靴","ベルト",
"カードケース"

],
page:"Another Products.html"
}

];


function searchProducts(){

    const input = document.getElementById("search").value
        .toLowerCase()
        .trim();

    if(!input) return;

    for(const item of searchData){

        for(const word of item.keywords){

            const key = word.toLowerCase();

            if(key.includes(input) || input.includes(key)){
                window.location.href = item.page;
                return;
            }

        }

    }
    
    showSearchMessage(t("product-not-found"));

}
/* ================= CATEGORY FILTER ================= */

function loadPageProducts() {

    const pageCategory = document.body.dataset.category;
    const products = document.querySelectorAll(".product");

    if (!products.length) return;

    products.forEach(product => {

        const productCategory = product.dataset.category;

        if (!pageCategory) {
            product.style.display = "block";
            return;
        }

        product.style.display =
            (productCategory === pageCategory) ? "block" : "none";
    });
}
/* ================= INIT ================= */

window.addEventListener("load", () => {
    updateCartCounter();
    loadPageProducts();
});

/* ================= CATEGORY CLICK ================= */

document.querySelectorAll(".cat").forEach((cat, index) => {

    const pages = [
        "watches.html",
        "bags.html",
        "World Cup Products.html",
        "Another Products.html"
    ];

    cat.addEventListener("click", () => {
        window.location.href = pages[index];
    });

});

/* ================= ADD PRODUCT ================= */

function addNewProduct() {

    let name = document.getElementById("productName").value;
    let price = document.getElementById("productPrice").value;

const category = document.getElementById("productCategory").value;

    let productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.setAttribute("data-category", category);

    productDiv.innerHTML = `
        <img src="product.jpg">
        <h3>${name}</h3>
        <p>${t("new-product")}</p>
        <div class="price">
            <span class="new-price">${price}$</span>
        </div>
        <div class="product-category">${category}</div>
        <button onclick="addToCart('${name}',${price})">اضغط هنا لشراء المنتج</button>
    `;

document.querySelector(".products").appendChild(productDiv);
}

const discoverBtn = document.getElementById("discoverBtn");

if (discoverBtn) {

    discoverBtn.addEventListener("click", function () {

        // الرجوع لأعلى الصفحة
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        // بعد انتهاء الـ Scroll تبدأ الإضاءة
        setTimeout(function () {

            const order = [
    t("watches"),
    t("world-cup-products"),
    t("another-products"),
    t("special-products")
];

            order.forEach(function (text, index) {

                const link = Array.from(document.querySelectorAll(".category-title"))
                    .find(el => el.textContent.trim() === text);

                if (!link) return;

                setTimeout(function () {

                    link.classList.add("highlight");

                    setTimeout(function () {
                        link.classList.remove("highlight");
                    }, 1200);

                }, index * 450);

            });

        }, 1000);

    });

}

/* ===== FIX HOME FAVORITE SCROLL ===== */

window.addEventListener("load",()=>{

    if(window.location.hash){

        setTimeout(()=>{

            const target = document.querySelector(window.location.hash);

            if(target){

                window.scrollTo({
                    top: target.offsetTop - 120,
                    behavior:"smooth"
                });

            }

        },800);

    }

});

/* ================= REMOVE ALL FAVORITES ================= */

/* ================= REMOVE ALL FAVORITES (FIXED) ================= */

// 1. عند الضغط على زر مسح الكل: يتم إظهار نافذة التأكيد فقط
function removeAllFavorites() {
    const confirmBox = document.getElementById("confirmDelete");
    if (confirmBox) {
        confirmBox.style.display = "flex";
    }
}

// 2. عند الضغط على زر "تأكيد الحذف" داخل النافذة: يتم مسح البيانات وتحديث الصفحة
function confirmDeleteFavorites() {
    favorites = []; // تفريغ المصفوفة
    localStorage.removeItem("kemoFavorites"); // حذفها من الذاكرة
    
    closeConfirmDelete(); // إغلاق النافذة
    loadFavorites();      // إعادة تحميل القائمة الفارغة لعرضها للمستخدم
    
    // تحديث رسالة القائمة الفارغة إذا كان العنصر موجوداً
    const emptyHint = document.getElementById("emptyFavorites");
    if (emptyHint) {
        emptyHint.style.display = "block";
    }
}

// 3. عند الضغط على إلغاء: يتم إغلاق النافذة
function closeConfirmDelete() {
    const confirmBox = document.getElementById("confirmDelete");
    if (confirmBox) {
        confirmBox.style.display = "none";
    }
}

/* ================= LIGHTBOX ================= */

window.addEventListener("DOMContentLoaded", function () {

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-lightbox");

    if (!lightbox || !lightboxImg || !closeBtn) return;

    document.querySelectorAll(".product img").forEach(function (img) {

        img.style.cursor = "zoom-in";

        img.onclick = function () {
            lightboxImg.src = this.getAttribute("src");
            lightbox.style.display = "flex";
        };

    });

    closeBtn.onclick = function () {
        lightbox.style.display = "none";
    };

    lightbox.onclick = function (e) {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    };

});

function goToCategory(category){

    const pages = {
    [t("watches")]:"watches.html",
    [t("world-cup-products")]:"World Cup Products.html",
    [t("another-products")]:"Another Products.html"
};

    if(pages[category]){
        window.location.href = pages[category];
    }

}

const searchInput = document.getElementById("search");

if(searchInput){

    searchInput.addEventListener("keypress", function(e){

        if(e.key === "Enter"){
            searchProducts();
        }

    });

}
function scrollToProducts(){

    const firstProduct = document.querySelector(".product");

    if(firstProduct){
        firstProduct.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

}
/*========== LOADER ==========*/

window.addEventListener("load",function(){

    const loader=document.getElementById("loader");

    if(loader){

        setTimeout(function(){

            loader.classList.add("hide");

        },700);

    }

});

const backToTop = document.getElementById("backToTop");

if(backToTop){

    backToTop.addEventListener("click", function(){

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
/* ==========================================================================
   🎨 THEME & 🌙 DARK MODE DUAL-BUTTON (LONG PRESS SYSTEM)
   ========================================================================== */

const themeToggle = document.querySelector(".theme-toggle");
const themeBox = document.querySelector(".theme-box");
const themeOptions = document.querySelectorAll(".theme-option");

if (themeToggle && themeBox) {
    let pressTimer;
    let isLongPress = false;

    // فحص الحالة المحفوظة في الذاكرة لتحديد وضع الزرار عند تحميل الصفحة
    const isDarkVersionActive = localStorage.getItem("kemoButtonMode") === "darkVersion";
    if (isDarkVersionActive) {
        themeToggle.classList.add("dark-version-active");
        // تحديث شكل الزرار حسب حالة الدارك مود الفعلية
        if (localStorage.getItem("kemoDarkMode") === "enabled") {
            themeToggle.innerHTML = "☀️";
        } else {
            themeToggle.innerHTML = "🌙";
        }
    } else {
        themeToggle.innerHTML = "🎨";
    }

    // --- 1. التعامل مع الضغط المطول (Long Press) ---
    
    // عند بدء الضغط بالماوس أو اللمس على الهواتف
    const startPress = (e) => {
        isLongPress = false;
        pressTimer = setTimeout(() => {
            isLongPress = true;
            triggerLongPressEffect();
        }, 1000); // مدة الضغط المطول: ثانية واحدة
    };

    // عند ترك الضغط أو الخروج من الزرار
    const cancelPress = () => {
        clearTimeout(pressTimer);
    };

    themeToggle.addEventListener("mousedown", startPress);
    themeToggle.addEventListener("touchstart", startPress, { passive: true });

    themeToggle.addEventListener("mouseup", cancelPress);
    themeToggle.addEventListener("mouseleave", cancelPress);
    themeToggle.addEventListener("touchend", cancelPress);

    // دالة التحويل اللحظي بين وضعي (Themes) و (Dark Version) بالضغط المطول
    function triggerLongPressEffect() {
        // إغلاق قائمة الثيمات فوراً إذا كانت مفتوحة
        themeBox.classList.remove("active");
        
        // تفعيل حركة اهتزاز خفيفة وتأثير بصري للتحول
        themeToggle.classList.add("switching-anim");
        
        setTimeout(() => {
            const isCurrentlyDarkVersion = themeToggle.classList.toggle("dark-version-active");
            
            if (isCurrentlyDarkVersion) {
                // التحول إلى وضع التحكم بالدارك مود
                localStorage.setItem("kemoButtonMode", "darkVersion");
                if (document.body.classList.contains("dark-mode")) {
                    themeToggle.innerHTML = "☀️";
                } else {
                    themeToggle.innerHTML = "🌙";
                }
            } else {
                // العودة لوضع اختيار الثيمات العادي
                localStorage.setItem("kemoButtonMode", "themes");
                themeToggle.innerHTML = "🎨";
            }
            themeToggle.classList.remove("switching-anim");
        }, 200); // سرعة الأنيميشن
    }

    // --- 2. التعامل مع الضغط العادي (Normal Click) ---
    themeToggle.addEventListener("click", function(e) {
        e.stopPropagation();

        // إذا كان الضغط عبارة عن ضغطة مطولة، تجاهل كليك العادي تماماً
        if (isLongPress) {
            isLongPress = false;
            return;
        }

        // أ. إذا كان الزر في وضع (Dark Version Mode)
        if (themeToggle.classList.contains("dark-version-active")) {
            const isDark = document.body.classList.toggle("dark-mode");
            
            if (isDark) {
                localStorage.setItem("kemoDarkMode", "enabled");
                // حركة انتقال سلسة للنص
                themeToggle.style.opacity = "0";
                setTimeout(() => {
                    themeToggle.innerHTML = "☀️";
                    themeToggle.style.opacity = "1";
                }, 150);
            } else {
                localStorage.setItem("kemoDarkMode", "disabled");
                themeToggle.style.opacity = "0";
                setTimeout(() => {
                    themeToggle.innerHTML = "🌙";
                    themeToggle.style.opacity = "1";
                }, 150);
            }
        } 
        // ب. إذا كان الزر في الوضع الطبيعي العادي (Themes Mode)
        else {
            themeBox.classList.toggle("active");
        }
    });

    // إغلاق قائمة الألوان عند الضغط في أي مكان خارجها
    document.addEventListener("click", function() {
        themeBox.classList.remove("active");
    });

    themeBox.addEventListener("click", function(e) {
        e.stopPropagation();
    });
}

/* ================= CHANGE THEME ================= */

themeOptions.forEach(option => {

    option.addEventListener("click", function(){

        const theme = this.dataset.theme;

        document.body.setAttribute("data-theme", theme);

        localStorage.setItem("kemoTheme", theme);


        if(themeBox){
            themeBox.classList.remove("active");
        }

    });

});
/* ===== FIX SEARCH SCROLL ===== */

const search = document.getElementById("search");

if(search){

    search.addEventListener("focus", function(){

        const x = window.scrollX;
        const y = window.scrollY;

        setTimeout(function(){

            window.scrollTo(x, y);

        }, 0);

    });

}
/* ================= THEME AUTO BORDER ================= */

function updateThemeBorder(){

    const styles = getComputedStyle(document.body);

    const primaryColor = styles.getPropertyValue("--primary").trim();

    document.documentElement.style.setProperty(
        "--theme-border",
        primaryColor
    );

}


updateThemeBorder();


document.querySelectorAll(".theme-option").forEach(option=>{

    option.addEventListener("click",()=>{

        setTimeout(()=>{

            updateThemeBorder();

        },50);

    });

});
/* 
/* KEEP HEADER POSITION WHEN SEARCH OPENS */

const searchFix = document.getElementById("search");

if(searchFix){

    searchFix.addEventListener("focus",function(){

        setTimeout(()=>{

            window.scrollTo({
                top:0,
                behavior:"instant"
            });

        },300);

    });

}
function showSearchMessage(text){

    const old=document.getElementById("searchMessage");

    if(old){
        old.remove();
    }


    const msg=document.createElement("div");

    msg.id="searchMessage";

    msg.innerHTML=`🔍 <b>${text}</b><br>
${t("try-another-search")}
    `;


    msg.style.position="fixed";
    msg.style.top="110px";
    msg.style.left="50%";
    msg.style.transform="translateX(-50%)";

    msg.style.background="var(--card)";
    msg.style.color="var(--text)";

    msg.style.borderLeft="5px solid var(--primary)";

    msg.style.padding="15px 22px";
    msg.style.borderRadius="15px";

    msg.style.boxShadow="0 10px 30px rgba(0,0,0,.18)";

    msg.style.textAlign="center";
    msg.style.fontSize="14px";

    msg.style.zIndex="9999";

    msg.style.animation="searchMsgShow .4s ease";
    msg.style.width="320px";
    msg.style.maxWidth="90%";

    document.body.appendChild(msg);


    setTimeout(()=>{

        msg.style.opacity="0";
        msg.style.transform="translateX(-50%) translateY(-20px)";

        setTimeout(()=>{
            msg.remove();
        },500);

    },3000);

}
window.addEventListener("pageshow", function () {
    window.scrollTo(0, 0);
});
document.addEventListener("DOMContentLoaded",()=>{

    const removeBox = document.querySelector(".remove-all-glass");

    if(removeBox){

        document.body.appendChild(removeBox);

    }

});
document.querySelectorAll(".share-btn, .home-share-btn").forEach(btn => {

    btn.addEventListener("click", function(){

        let product = this.parentElement;

        if(!product){
            alert(t("product-not-found"));
            return;
        }

        let id = product.id;

        let link = window.location.origin + 
                   window.location.pathname + 
                   "#" + id;

        navigator.clipboard.writeText(link)
        .then(()=>{

            this.innerHTML = "✓";

            setTimeout(()=>{

                this.innerHTML = "🔗";

            },1500);

        });

    });

});

/* ================= CUSTOMIZE YOUR VIEW (FIXED) ================= */

document.addEventListener("DOMContentLoaded", () => {

    const viewButton = document.getElementById("viewButton");
    const viewMenu = document.getElementById("viewMenu");
    const productsContainer = document.querySelector(".products");

    if (!viewButton || !viewMenu || !productsContainer) return;

    // حفظ الترتيب الأصلي لعناصر الصفحة عند فتحها لأول مرة (مهم جداً للـ default)
    const originalProducts = [...productsContainer.querySelectorAll(".product")];

    viewButton.onclick = () => {
        viewMenu.classList.toggle("active");
    };

    document.querySelectorAll("#viewMenu div").forEach(item => {

        item.onclick = () => {
            
            // تحقق إذا كنا في صفحة المفضلة
            if (document.body.classList.contains("category-page") && document.getElementById("favoritesList")) {
                
                // جلب النسخة الأصلية المستقرة من المفضلة كـ لستة مؤقتة للترتيب
                let localFavs = JSON.parse(localStorage.getItem("kemoFavorites") || "[]");
                
                switch(item.dataset.sort) {
                    case "low":
                        localFavs.sort((a, b) => (a.price || 0) - (b.price || 0));
                        break;
                    case "high":
                        localFavs.sort((a, b) => (b.price || 0) - (a.price || 0));
                        break;
                    case "az":
                        localFavs.sort((a, b) => a.name.localeCompare(b.name));
                        break;
                    case "default":
                        // في الـ default نجلب الترتيب الأصلي المخزن بدون تعديل
                        localFavs = JSON.parse(localStorage.getItem("kemoFavorites") || "[]");
                        break;
                }
                
                // إعادة بناء الهيكل وعرض المنتجات بالترتيب الجديد بدون مسح الأصل من السيرفر/الذاكرة
                productsContainer.innerHTML = "";
                if (localFavs.length > 0) {
                    localFavs.forEach(favItem => {
                        productsContainer.innerHTML += `
                        <div class="product" data-price="${favItem.price || 0}" onclick="location.href='${favItem.link}'">
                            <img src="${favItem.image}">
                            <h3>${favItem.name}</h3>
                            <button class="remove-fav"
                            onclick="event.stopPropagation();removeFavorite('${favItem.name}')">
                            ${t("remove-favorite")}
                            </button>
                        </div>`;
                    });
                }
                
            } else {
                // الكود الخاص بباقي الصفحات (الرئيسية والأقسام الأخرى) التي تحتوي على أسعار ظاهرة
                let products = [...productsContainer.querySelectorAll(".product")];

                switch(item.dataset.sort){
                    case "low":
                        products.sort((a,b)=>{
                            const priceA = parseFloat(a.querySelector(".price, .new-price").innerText.replace(/[^0-9.]/g,"")) || 0;
                            const priceB = parseFloat(b.querySelector(".price, .new-price").innerText.replace(/[^0-9.]/g,"")) || 0;
                            return priceA - priceB;
                        });
                        break;
                    case "high":
                        products.sort((a,b)=>{
                            const priceA = parseFloat(a.querySelector(".price, .new-price").innerText.replace(/[^0-9.]/g,"")) || 0;
                            const priceB = parseFloat(b.querySelector(".price, .new-price").innerText.replace(/[^0-9.]/g,"")) || 0;
                            return priceB - priceA;
                        });
                        break;
                    case "az":
                        products.sort((a,b)=> a.querySelector("h3").innerText.localeCompare(b.querySelector("h3").innerText));
                        break;
                    case "default":
                        products = [...originalProducts];
                        break;
                }

                products.forEach(product=>{
                    productsContainer.appendChild(product);
                });
            }

            viewMenu.classList.remove("active");
        };

    });

});
/* ================= HOME THEME HINT PER VISIT ================= */

window.addEventListener("load",()=>{

    // الصفحة الرئيسية فقط
    if(!document.body.classList.contains("home-page")) return;

    // يظهر مرة واحدة في نفس الزيارة
    if(sessionStorage.getItem("themeHintShown")) return;


    setTimeout(()=>{

        const hint = document.createElement("div");

        hint.id = "themeHint";

        hint.innerHTML = t("theme-hint");


        // نفس خصائص الكود الأول
        hint.style.position = "fixed";
        hint.style.bottom = "350px";
        hint.style.right = "20px";
        hint.style.zIndex = "9999";
        hint.style.display = "block";


        document.body.appendChild(hint);


        // حفظ أنه ظهر في الزيارة الحالية
        sessionStorage.setItem("themeHintShown","true");


        setTimeout(()=>{

            hint.remove();

        },12000);


    },3000);

});

// ============================

let currentLanguage = localStorage.getItem("language") || "en";

function t(key){
    if(translations[currentLanguage] && translations[currentLanguage][key]){
        return translations[currentLanguage][key];
    }

    if(translations.en && translations.en[key]){
        return translations.en[key];
    }

    return key;
}

function setLanguage(lang){

    if(!translations[lang]) return;

    currentLanguage = lang;

    localStorage.setItem("language", lang);

    applyLanguage();
}

function applyLanguage(){

    document.documentElement.lang = currentLanguage;

    document.body.dir = currentLanguage === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-lang]").forEach(el=>{

        const key = el.dataset.lang;

        el.innerHTML = t(key);

    });
    

    // هذا الكود يربط الـ input في HTML بملف الترجمة translations.js
const searchInput = document.getElementById("search");
if (searchInput) {
    const key = searchInput.getAttribute("data-lang-placeholder");
    if (key && t(key)) {
        searchInput.placeholder = t(key);
    }
}


    document.querySelectorAll("[data-title]").forEach(el=>{

        const key = el.dataset.title;

        el.title = t(key);

    });

    document.querySelectorAll("[data-value]").forEach(el=>{

        const key = el.dataset.value;

        el.value = t(key);

    });

}
// أضف هذا الكود في نهاية ملف script.js


window.addEventListener("DOMContentLoaded", applyLanguage);

/* ================= FAVORITES ================= */
let favorites = JSON.parse(localStorage.getItem("kemoFavorites")) || [];

function saveFavorites() {
    localStorage.setItem("kemoFavorites", JSON.stringify(favorites));
}

function addFavorite(button) {
    const product = button.closest(".product");
    if (!product) return;

    const id = product.id;
    const name = product.querySelector("h3").innerText;
    const image = product.querySelector("img").getAttribute("src");
    const priceElement = product.querySelector(".new-price") || product.querySelector(".price");
    const price = priceElement ? priceElement.innerText : "";
    const page = location.pathname.split("/").pop();

    const index = favorites.findIndex(item => item.id === id);

    if (index > -1) {
        // حالة الحذف من المفضلة
        favorites.splice(index, 1);
        button.innerHTML=t("add");
        button.classList.remove("active");
    } else {
        // حالة الإضافة للمفضلة
        favorites.push({
            id: id,
            name: name,
            image: image,
            price: price,
            link: page + "#" + id
        });
        button.innerHTML=t("added");
        button.classList.add("active");

        if(!sessionStorage.getItem("favToastShown")){

     showFavToast(t("fav-toast"));

    sessionStorage.setItem("favToastShown","true");

}
        
    }
    // سحبنا دالة الحفظ لتكون خارج الـ if/else لضمان عملها في كل الحالات
    saveFavorites();
}

// ... باقي كود دالة loadFavorites و event listeners كما هو في ملفك ...

document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(".product").forEach(product => {

        const button = product.querySelector(".fav-btn");

        if (!button) return;

        const id = product.id;

        if (favorites.some(item => item.id === id)) {

            button.innerHTML=t("added");

            button.classList.add("active");

        } else {

            button.innerHTML=t("add");

            button.classList.remove("active");

        }

    });

});

function openFavorites() {
    window.location.href = "favorites.html";
}

function loadFavorites() {

    const list = document.getElementById("favoritesList");

    if (!list) return;

    list.innerHTML = "";

    if (favorites.length === 0) {

        return;
        
    }

    favorites.forEach(item => {

        list.innerHTML += `
        <div class="product" onclick="location.href='${item.link}'">

            <img src="${item.image}">

            <h3>${item.name}</h3>

            <p>${item.price}</p>

            <button class="remove-fav"
onclick="event.stopPropagation();removeFavorite('${item.id}')">

${t("remove-favoritet")}

</button>

        </div>
        `;

    });
const emptyMessage = document.getElementById("emptyFavorites");

if(favorites.length > 0){
    emptyMessage.style.display = "none";
}else{
    emptyMessage.style.display = "block";
}
}

function removeAllFavorites() {
    document.getElementById("confirmDelete").style.display = "flex";
}

function confirmDeleteFavorites() {
    favorites = [];
    localStorage.removeItem("kemoFavorites");
    saveFavorites();
    closeConfirmDelete();
    loadFavorites();
}

function closeConfirmDelete() {
    document.getElementById("confirmDelete").style.display = "none";
}

window.addEventListener("DOMContentLoaded", loadFavorites);

function removeFavorite(id){

    favorites = favorites.filter(item => item.id !== id);

    saveFavorites();

    loadFavorites();


    const empty = document.getElementById("emptyFavorites");

    if(empty){

        empty.style.display =
        favorites.length === 0 ? "block" : "none";

    }

}
/*toast*/
function showFavToast(text){

    const old = document.getElementById("favToast");

    if(old){
        old.remove();
    }

    const toast = document.createElement("div");

    toast.id = "favToast";

    toast.innerHTML = `❤️ ${text}`;


    toast.style.position = "fixed";
    toast.style.top = "120px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";

    toast.style.zIndex = "99999";

    toast.style.background = "var(--card)";
    toast.style.color = "var(--text)";
    toast.style.border = "2px solid var(--primary)";
    toast.style.borderRadius = "15px";
    toast.style.padding = "15px 25px";
    toast.style.boxShadow = "0 10px 30px rgba(0,0,0,.2)";
    toast.style.textAlign = "center";


    document.body.appendChild(toast);


    setTimeout(()=>{

        toast.remove();

    },3000);

}