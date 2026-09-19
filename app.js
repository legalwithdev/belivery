/* ============ data ============ */
var CATEGORIES = ["Electronics","Mobiles","Vehicles","Furniture","Fashion","Books","Home","Sports","Others"];
var EMOJIS = { "Electronics":"🎧", "Mobiles":"📱", "Vehicles":"🛵", "Furniture":"🪑", "Fashion":"👕", "Books":"📚", "Home":"🍳", "Sports":"🏏", "Others":"📦" };
var CAT_EMOJI_EXTRA = ["💻","⌚","🚲","🛋️","👟","✏️","🧺","⚽","🎁"];

var SEED = [
  {id:1, title:"Honda Activa 2019, 12,000 km", price:45000, cat:"Vehicles", cond:"Good", city:"Jaipur", phone:"98XXXXXX01", emoji:"🛵", desc:"Single owner, insurance valid, serviced regularly. RC ready.", own:false, demo:true, ts:Date.now()-86400000},
  {id:2, title:"iPhone 12, 64GB, blue", price:28500, cat:"Mobiles", cond:"Like new", city:"Delhi", phone:"98XXXXXX02", emoji:"📱", desc:"Battery health 89%. Charger + cover included.", own:false, demo:true, ts:Date.now()-86400000*2},
  {id:3, title:"Wooden study table", price:3200, cat:"Furniture", cond:"Used", city:"Lucknow", phone:"98XXXXXX03", emoji:"🪑", desc:"Sheesham wood, 4 saal purana but mazboot. Khud pick-up karna hoga.", own:false, demo:true, ts:Date.now()-86400000*3},
  {id:4, title:"JBL headphones, wireless", price:2100, cat:"Electronics", cond:"Good", city:"Pune", phone:"98XXXXXX04", emoji:"🎧", desc:"Bass strong, charging cable included. 1.5 saal used.", own:false, demo:true, ts:Date.now()-86400000},
  {id:5, title:"UPSC preparation books (set of 12)", price:1500, cat:"Books", cond:"Like new", city:"Patna", phone:"98XXXXXX05", emoji:"📚", desc:"NCERT + standard reference set. Kuch highlights he, baaki clean.", own:false, demo:true, ts:Date.now()-86400000*4},
  {id:6, title:"Bajaj mixer grinder 750W", price:1800, cat:"Home", cond:"Good", city:"Indore", phone:"98XXXXXX06", emoji:"🍳", desc:"2 jars, chal raha he perfectly. Shifting ke wajah se bech raha hoon.", own:false, demo:true, ts:Date.now()-86400000},
  {id:7, title:"Kirana monthly combo — aata, chawal, dal", price:1450, cat:"Home", cond:"New", city:"Banda", phone:"98XXXXXX07", emoji:"🧺", desc:"Banda ke local kirana se fresh monthly ration combo. Sirf Banda city me delivery.", own:false, demo:true, ts:Date.now()-86400000},
  {id:8, title:"Hercules cycle, 26 inch", price:2400, cat:"Vehicles", cond:"Good", city:"Banda", phone:"98XXXXXX08", emoji:"🚲", desc:"Banda city me hi delivery. Brakes naye lagwaye he, tyres theek haalat me.", own:false, demo:true, ts:Date.now()-86400000*2},
  {id:9, title:"Kadhai-patele set, steel", price:850, cat:"Home", cond:"Used", city:"Banda", phone:"98XXXXXX09", emoji:"🍳", desc:"2 saal used, bilkul theek haalat me. Civil Lines area se.", own:false, demo:true, ts:Date.now()-86400000},
  {id:10, title:"Shuddh desi ghee, 1 kg (doodh se)", price:650, cat:"Home", cond:"New", city:"Atarra", phone:"98XXXXXX10", emoji:"🧺", desc:"Atarra ke gaon ka doodh, ghar pe pakaya ghee. Banda district me delivery.", own:false, demo:true, ts:Date.now()-86400000}
];

function load(k, fallback){
  try{ var v = JSON.parse(localStorage.getItem(k)); return Array.isArray(v) && v.length ? v : fallback; }
  catch(e){ return fallback; }
}
var products = load("belivery_products_v3", SEED);
var orders = load("belivery_orders", []);
function save(){ localStorage.setItem("belivery_products_v3", JSON.stringify(products)); localStorage.setItem("belivery_orders", JSON.stringify(orders)); }
save();


/* ============ i18n ============ */
var LANG = (function(){
  var saved = localStorage.getItem("belivery_lang");
  if(saved === "hi" || saved === "en") return saved;
  return "hi";
})();
var I18N = {
hi:{
"search_ph":"प्रोडक्ट खोजें… (मोबाइल, कुर्सी, किताब)",
"loc_change":"बदलें","loc_detect":"लोकेशन पता करें","loc_searching":"लोकेशन ढूँढ रहे हैं…",
"loc_sheet_title":"अपनी लोकेशन",
"loc_sheet_sub":"लाइव लोकेशन से ऐप ख़ुद आपके शहर के नाम पर सेट हो जाएगी — जैसे बांदा पर “बांदा Delivery”।",
"loc_detect_btn":"लाइव लोकेशन से पता करें",
"loc_all_btn":"सब जगह — सारी लिस्टिंग दिखाएँ",
"loc_sheet_note":"ऑटो-डिटेक्ट के लिए ब्राउज़र को लोकेशन की अनुमति चाहिए। काम न करे तो नीचे लिस्ट से चुन लें।",
"t_no_geo":"इस ब्राउज़र में लोकेशन सपोर्ट नहीं है",
"t_loc_set":"लोकेशन सेट: ",
"t_loc_no_town":"शहर नहीं मिल पाया — लिस्ट से चुनें",
"t_loc_fail":"लोकेशन सर्विस से कनेक्ट नहीं हुआ — लिस्ट से चुनें",
"t_loc_denied":"लोकेशन की अनुमति नहीं मिली — लिस्ट से चुनें",
"tag_all":"खरीदो · बेचो · लोकल",
"title_all":"बेलिवरी — अपने शहर में ख़रीदें और बेचें",
"title_place":" Delivery — अपने शहर में ख़रीदें और बेचें",
"hero_sub_all":"अपना प्रोडक्ट मुफ़्त में लिस्ट करें, या पास के लोगों से ख़रीदें — सब कुछ आपके शहर में।",
"hero_sub_place":" का अपना मार्केटप्लेस — यहीं की दुकानें, यहीं के लोग, यहीं की डिलीवरी। powered by belivery",
"hero_h1":"अपना प्रोडक्ट बेचो,<br>या पास के लोगों से <em>ख़रीदो</em>।",
"hero_cta":"+ मुफ़्त में प्रोडक्ट बेचें",
"fresh":"नई लिस्टिंग",
"empty_city":" में अभी कोई लिस्टिंग नहीं है।<br>पहली लिस्टिंग आप बनाओ — बेचें टैब में जाएँ!",
"empty_all":"कुछ नहीं मिला।<br>दूसरा शब्द ट्राई करें, या अपना प्रोडक्ट लिस्ट करें।",
"badge_own":"आपकी लिस्टिंग",
"kv_cond":"हालत","kv_cat":"श्रेणी","kv_loc":"लोकेशन","kv_seller":"संपर्क",
"kv_contact_sub":"Belivery — ऑर्डर व डिलीवरी",
"verif_demo":"",
"seller_you":"आप ख़ुद","seller_demo":"लोकल सेलर","seller_local":"लोकल सेलर",
"btn_call":"कॉल करें","btn_buy":"अभी ख़रीदें — ऑर्डर दें",
"sheet_note":"ऑर्डर के लिए Belivery को WhatsApp या Call करें — डिलीवरी घर तक।",
"t_order_ok":"ऑर्डर दर्ज हुआ — ऑर्डर टैब में देखें",
"t_form_missing":"फ़ॉर्म में कुछ जानकारी बाकी है",
"t_listed":"लिस्टिंग लाइव हो गई — मेरे विज्ञापन में देखें",
"empty_ads":"आपकी कोई लिस्टिंग नहीं है।<br>बेचें टैब पर जाकर पहला प्रोडक्ट लिस्ट करें।",
"st_live":"लाइव","btn_delete":"हटाएँ",
"t_confirm_del":"यह लिस्टिंग हटानी है?","t_deleted":"लिस्टिंग हटा दी गई",
"empty_orders":"अभी कोई ऑर्डर नहीं।<br>किसी प्रोडक्ट पर “अभी ख़रीदें” दबाएँ।",
"st_placed":"ऑर्डर दिया",
"ago_today":"आज","ago_yday":"कल","ago_days":" दिन पहले",
"cond_new":"नया","cond_likenew":"बिल्कुल नया जैसा","cond_good":"अच्छा","cond_used":"इस्तेमाल किया हुआ",
"sell_h2":"अपना प्रोडक्ट बेचें",
"sell_sub":"कोई फ़ीस नहीं, कोई commission नहीं — सीधे customer आपसे मिलेगा।",
"f_title":"प्रोडक्ट का नाम","f_price":"कीमत (₹)","f_cat":"श्रेणी","f_cond":"हालत","f_city":"शहर",
"f_phone":"दुकान का फ़ोन (सिर्फ़ Belivery देखेगी)",
"f_photo":"फ़ोटो <small>&mdash; आइकन चुनें</small>",
"f_desc":"विवरण <small>(वैकल्पिक)</small>",
"ph_title":"जैसे: होंडा एक्टिवा 2019, 12,000 km","ph_price":"जैसे: 45000","ph_city":"जैसे: बांदा",
"ph_phone":"10 अंक का मोबाइल नंबर","ph_desc":"प्रोडक्ट के बारे में कुछ लिखें…",
"err_title":"प्रोडक्ट का नाम लिखना ज़रूरी है","err_price":"कीमत 0 से ज़्यादा होनी चाहिए",
"err_city":"शहर लिखना ज़रूरी है","err_phone":"10 अंक का सही मोबाइल नंबर लिखें",
"submit":"लिस्ट करें — मुफ़्त",
"my_listings":"मेरी लिस्टिंग","my_orders":"मेरे ऑर्डर",
"nav_browse":"ब्राउज़","nav_sell":"बेचें","nav_ads":"मेरे विज्ञापन","nav_orders":"ऑर्डर",
"menu_home":"होम","menu_sell":"नयी लिस्टिंग बनाएँ","menu_ads":"मेरे विज्ञापन","menu_orders":"मेरे ऑर्डर",
"menu_about":"Belivery के बारे में","menu_contact":"संपर्क करें","menu_install":"ऐप इंस्टॉल करें","menu_share":"शेयर करें","menu_lang":"भाषा बदलें",
"about_body":"Belivery आपके शहर का अपना बाज़ार है — यहाँ दुकानें अपने प्रोडक्ट मुफ़्त लिस्ट करती हैं, और आप पास के लोगों से ख़रीदते हैं। ऑर्डर WhatsApp पर, डिलीवरी घर तक। (बीटा — कोई फ़ीस नहीं, कोई commission नहीं।)",
"already_installed":"ऐप पहले से इंस्टॉल है ✓",
"install_text":"📱 Belivery ko app jaisa install karo — ek tap me khulegi",
"install_ios":"📱 Install karne ke liye: Share (⌗) → “Add to Home Screen” dabao",
"install_btn":"Install",
"ai_title":"Belivery AI — बुद्धमति दोस्त",
"ai_body":"नमस्ते! 🤖 मैं Belivery AI हूँ — अभी तैयार हो रहा हूँ। तब तक कोई भी सवाल हो तो WhatsApp पर पूछो — हम जवाब देंगे।",
"ai_close":"बंद करो",
"foot_mono":"belivery™ · v5.4",
"footer_note":"बीटा संस्करण — सारा डेटा आपके ब्राउज़र में सेव होता है, कहीं अपलोड नहीं होता। कोई असली पेमेंट नहीं होता।"
},
en:{
"search_ph":"Search products… (mobile, chair, book)",
"loc_change":"change","loc_detect":"Detect location","loc_searching":"Finding location…",
"loc_sheet_title":"Your location",
"loc_sheet_sub":"With live location, the app sets itself to your town’s name — e.g. in Banda it becomes “Banda Delivery”.",
"loc_detect_btn":"Auto-detect from live location",
"loc_all_btn":"Everywhere — show all listings",
"loc_sheet_note":"Auto-detect needs browser location permission. If it doesn’t work, pick from the list.",
"t_no_geo":"Location is not supported in this browser",
"t_loc_set":"Location set: ",
"t_loc_no_town":"Couldn’t find your town — pick from the list",
"t_loc_fail":"Couldn’t reach the location service — pick from the list",
"t_loc_denied":"Location permission denied — pick from the list",
"tag_all":"buy · sell · local",
"title_all":"belivery — Buy & Sell Near You",
"title_place":" Delivery — Buy & Sell Near You",
"hero_sub_all":"List your product for free, or buy from people near you — all in your city.",
"hero_sub_place":"’s own marketplace — local shops, local people, local delivery. powered by belivery",
"hero_h1":"Sell your product,<br>or <em>buy</em> from people near you.",
"hero_cta":"+ List your product — free",
"fresh":"Fresh listings",
"empty_city":" has no listings yet.<br>Be the first — open the Sell tab!",
"empty_all":"Nothing found.<br>Try another keyword, or list your own product.",
"badge_own":"Your ad",
"kv_cond":"Condition","kv_cat":"Category","kv_loc":"Location","kv_seller":"Contact",
"kv_contact_sub":"Belivery — orders & delivery",
"verif_demo":"",
"seller_you":"You","seller_demo":"Local seller","seller_local":"Local seller",
"btn_call":"Call","btn_buy":"Buy Now — place order",
"sheet_note":"To order, WhatsApp or call Belivery — home delivery.",
"t_order_ok":"Order noted — see the Orders tab",
"t_form_missing":"Some fields are missing",
"t_listed":"Listing is live — see My Ads",
"empty_ads":"You have no listings yet.<br>Go to the Sell tab and list your first product.",
"st_live":"Live","btn_delete":"Delete",
"t_confirm_del":"Delete this listing?","t_deleted":"Listing deleted",
"empty_orders":"No orders yet.<br>Tap Buy Now on any product.",
"st_placed":"Order placed",
"ago_today":"Today","ago_yday":"Yesterday","ago_days":" days ago",
"cond_new":"New","cond_likenew":"Like new","cond_good":"Good","cond_used":"Used",
"sell_h2":"Sell your product",
"sell_sub":"No fees, no commission — customers reach you directly.",
"f_title":"Product name","f_price":"Price (₹)","f_cat":"Category","f_cond":"Condition","f_city":"City",
"f_phone":"Shop phone (only Belivery sees this)",
"f_photo":"Photo <small>&mdash; pick an icon</small>",
"f_desc":"Description <small>(optional)</small>",
"ph_title":"e.g. Honda Activa 2019, 12,000 km","ph_price":"e.g. 45000","ph_city":"e.g. Jaipur",
"ph_phone":"10-digit mobile number","ph_desc":"Write something about the product…",
"err_title":"Product name is required","err_price":"Enter a price greater than 0",
"err_city":"City is required","err_phone":"Enter a valid 10-digit mobile number",
"submit":"List it — Free",
"my_listings":"My listings","my_orders":"My orders",
"nav_browse":"Browse","nav_sell":"Sell","nav_ads":"My Ads","nav_orders":"Orders",
"menu_home":"Home","menu_sell":"New listing","menu_ads":"My ads","menu_orders":"My orders",
"menu_about":"About Belivery","menu_contact":"Contact us","menu_install":"Install app","menu_share":"Share","menu_lang":"Change language",
"about_body":"Belivery is your city's own marketplace — local shops list their products for free, and you buy from people near you. Order on WhatsApp, delivery to your home. (Beta — no fees, no commission.)",
"already_installed":"App already installed ✓",
"install_text":"📱 Install Belivery like an app — opens in one tap",
"install_ios":"📱 To install: tap Share (⌗) → “Add to Home Screen”",
"install_btn":"Install",
"ai_title":"Belivery AI — smart helper",
"ai_body":"Namaste! 🤖 I am Belivery AI — getting ready to launch. Till then, ask anything on WhatsApp — we answer there.",
"ai_close":"Close",
"foot_mono":"belivery™ · v5.4",
"footer_note":"Beta version — all data is stored in your own browser and never uploaded. No real payments."
}
};
function T(k){ var v = I18N[LANG][k]; return v === undefined ? (I18N.hi[k] || k) : v; }
var CAT_LABELS = {
  "All":{hi:"सब",en:"All"}, "Electronics":{hi:"इलेक्ट्रॉनिक्स",en:"Electronics"},
  "Mobiles":{hi:"मोबाइल",en:"Mobiles"}, "Vehicles":{hi:"वाहन",en:"Vehicles"},
  "Furniture":{hi:"फ़र्नीचर",en:"Furniture"}, "Fashion":{hi:"फ़ैशन",en:"Fashion"},
  "Books":{hi:"किताबें",en:"Books"}, "Home":{hi:"घर",en:"Home"},
  "Sports":{hi:"खेल",en:"Sports"}, "Others":{hi:"अन्य",en:"Others"}
};
var COND_LABELS = {
  "New":{hi:"नया",en:"New"}, "Like new":{hi:"बिल्कुल नया जैसा",en:"Like new"},
  "Good":{hi:"अच्छा",en:"Good"}, "Used":{hi:"इस्तेमाल किया हुआ",en:"Used"}
};
function catLabel(c){ return (CAT_LABELS[c] && CAT_LABELS[c][LANG]) || c; }
function condLabel(c){ return (COND_LABELS[c] && COND_LABELS[c][LANG]) || c; }
function applyLang(){
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach(function(el){ el.textContent = T(el.getAttribute("data-i18n")); });
  document.querySelectorAll("[data-i18n-html]").forEach(function(el){ el.innerHTML = T(el.getAttribute("data-i18n-html")); });
  document.querySelectorAll("[data-i18n-ph]").forEach(function(el){ el.placeholder = T(el.getAttribute("data-i18n-ph")); });
  $("langBtn").textContent = (LANG === "hi") ? "EN" : "हिं";
  var sel = $("in-cat");
  for(var i = 0; i < sel.options.length; i++){ sel.options[i].textContent = catLabel(sel.options[i].value); }
  renderChips(); updateBranding(); updateLocLabel(); renderGrid(); renderMyAds(); renderOrders();
}
function setLang(l){ LANG = l; localStorage.setItem("belivery_lang", l); applyLang(); }
function toggleLang(){ setLang(LANG === "hi" ? "en" : "hi"); }

/* ============ helpers ============ */
function $(id){ return document.getElementById(id); }
function rupees(n){ return "₹" + Number(n).toLocaleString("en-IN"); }
function toast(msg){
  var t = $("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(function(){ t.classList.remove("show"); }, 2400);
}
function timeAgo(ts){
  var d = Math.floor((Date.now()-ts)/86400000);
  if(d<=0) return T("ago_today");
  if(d===1) return T("ago_yday");
  return d + T("ago_days");
}

/* ============ navigation ============ */
function go(view){
  document.querySelectorAll(".view").forEach(function(v){ v.classList.remove("active"); });
  $("view-"+view).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(function(b){
    b.classList.toggle("active", b.getAttribute("data-nav")===view);
  });
  window.scrollTo(0,0);
  var fab = $("aiFab"); if(fab) fab.classList.toggle("hidden", view!=="browse");
  if(view==="browse") renderGrid();
  if(view==="ads") renderMyAds();
  if(view==="orders") renderOrders();
  if(view==="sell" && selCity.type!=="all" && !$("in-city").value){
    $("in-city").value = selCity.name;
  }
}

/* ============ location branding ============ */
var DISTRICTS = {
  "Banda":  {state:"UP", towns:["Banda","Atarra","Baberu","Naraini"]},
  "Jhansi": {state:"UP", towns:["Jhansi","Mauranipur"]},
  "Kanpur": {state:"UP", towns:["Kanpur","Bilhaur","Ghatampur"]},
  "Jaipur": {state:"Rajasthan", towns:["Jaipur","Chomu","Chaksu"]}
};
function loadSel(){
  var s = localStorage.getItem("belivery_place");
  if(!s || s==="all") return {type:"all"};
  var p = s.split("|");
  return {type:"place", name:p[0], state:p[1]||""};
}
function saveSel(){ localStorage.setItem("belivery_place", selCity.type==="place" ? selCity.name+"|"+selCity.state : "all"); }
var selCity = loadSel();

function setSelPlace(name, state){
  selCity = {type:"place", name:name, state:state||""};
  saveSel(); updateBranding(); updateLocLabel(); renderGrid();
}
function setSelAll(){
  selCity = {type:"all"};
  saveSel(); updateBranding(); updateLocLabel(); renderGrid();
}

function updateLocLabel(){
  var l = $("locLabel");
  if(selCity.type==="all") l.textContent = T("loc_detect");
  else l.textContent = selCity.name + (selCity.state ? ", " + selCity.state : "");
}

function openLocSheet(){
  var s = $("sheet");
  var html = '<div class="grab"></div><h3 style="font-size:18px;font-weight:800">' + T("loc_sheet_title") + '</h3>' +
    '<p style="font-size:13px;color:var(--text-dim);margin:6px 0 14px">' + T("loc_sheet_sub") + '</p>' +
    '<div class="action-row" style="flex-direction:column;gap:8px">' +
    '<button class="btn primary wide" onclick="detectLocation()">' + T("loc_detect_btn") + '</button>' +
    '<button class="btn wide" onclick="setSelAll();closeSheet()">' + T("loc_all_btn") + '</button>';
  Object.keys(DISTRICTS).forEach(function(d){
    DISTRICTS[d].towns.forEach(function(t){
      html += '<button class="btn wide" onclick="setSelPlace(\'' + t + '\',\'' + DISTRICTS[d].state + '\');closeSheet()">' + escapeHtml(t) + ', ' + d + ' (' + DISTRICTS[d].state + ')</button>';
    });
  });
  html += '</div><div class="close-note">' + T("loc_sheet_note") + '</div>';
  s.innerHTML = html;
  $("overlay").classList.add("open");
}

function detectLocation(){
  if(!navigator.geolocation){ toast(T("t_no_geo")); return; }
  $("locLabel").textContent = T("loc_searching");
  navigator.geolocation.getCurrentPosition(function(pos){
    var lat = pos.coords.latitude, lon = pos.coords.longitude;
    fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + lat + "&lon=" + lon + "&accept-language=en")
      .then(function(r){ return r.json(); })
      .then(function(data){
        var a = (data && data.address) || {};
        var town = a.town || a.village || a.city || a.city_district || a.county;
        if(town){ setSelPlace(town, a.state || ""); toast(T("t_loc_set") + town); }
        else { updateLocLabel(); toast(T("t_loc_no_town")); }
      })
      .catch(function(){ updateLocLabel(); toast(T("t_loc_fail")); });
  }, function(){
    updateLocLabel(); toast(T("t_loc_denied"));
  }, {timeout:10000});
}

function updateBranding(){
  var logo = $("appLogo"), tag = $("appTagline"), sub = $("heroSub");
  if(selCity.type === "place"){
    logo.innerHTML = '<span class="b1">' + escapeHtml(selCity.name) + '</span> Delivery';
    tag.textContent = "powered by belivery";
    document.title = selCity.name + T("title_place");
    sub.textContent = selCity.name + (selCity.state ? " (" + selCity.state + ")" : "") + T("hero_sub_place");
  } else {
    logo.innerHTML = '<span class="b1">be</span>liv<span class="b1">ery</span><sup style="font-size:9px;font-weight:600">™</sup>';
    tag.textContent = T("tag_all");
    document.title = T("title_all");
    sub.textContent = T("hero_sub_all");
  }
}

/* ============ browse ============ */
var activeCat = "All";
var query = "";

function renderChips(){
  var el = $("chips");
  el.innerHTML = "";
  ["All"].concat(CATEGORIES).forEach(function(c){
    var b = document.createElement("button");
    b.className = "chip" + (c===activeCat ? " active":"");
    b.textContent = catLabel(c);
    b.onclick = function(){ activeCat = c; renderChips(); renderGrid(); };
    el.appendChild(b);
  });
}

function filtered(){
  return products.filter(function(p){
    var okCat = activeCat==="All" || p.cat===activeCat;
    var okCity = selCity.type==="all" || p.city===selCity.name;
    var q = query.trim().toLowerCase();
    var okQ = !q || (p.title+" "+p.city+" "+p.cat).toLowerCase().indexOf(q) > -1;
    return okCat && okQ && okCity;
  }).slice().sort(function(a,b){ return b.ts - a.ts; });
}

function renderGrid(){
  var list = filtered();
  var g = $("productGrid");
  $("hero").style.display = (list.length===0) ? "none" : "block";
  g.innerHTML = "";
  if(!list.length){
    g.innerHTML = '<div class="empty" style="grid-column:1/-1">' + (selCity.type!=="all" ? escapeHtml(selCity.name) + T("empty_city") : T("empty_all")) + '</div>';
    return;
  }
  list.forEach(function(p, i){
    var c = document.createElement("div");
    c.className = "card"; c.style.animationDelay = Math.min(i*40, 320) + "ms";
    c.innerHTML =
      '<div class="thumb" style="'+(p.img?("background-image:url('"+p.img+"')"):"")+'">'+(p.img?"":p.emoji)+'</div>'+
      '<div class="body">'+
        (p.own?'<span class="badge-own">'+T("badge_own")+'</span>':'')+
        '<div class="price">'+rupees(p.price)+'</div>'+
        '<div class="title">'+escapeHtml(p.title)+'</div>'+
        '<div class="meta">'+escapeHtml(p.city)+' &middot; '+timeAgo(p.ts)+'</div>'+
      '</div>';
    c.onclick = function(){ openSheet(p.id); };
    g.appendChild(c);
  });
}

function escapeHtml(s){ var d=document.createElement("div"); d.textContent=s; return d.innerHTML; }

$("searchInput").addEventListener("input", function(e){ query = e.target.value; renderGrid(); });

/* ============ product sheet ============ */
function closeSheet(){ $("overlay").classList.remove("open"); }
function openSheet(id){
  var p = products.find(function(x){ return x.id===id; });
  if(!p) return;
  var s = $("sheet");
  var waMsg = (LANG === "hi")
    ? "नमस्ते! मुझे belivery पर '" + p.title + "' (" + rupees(p.price) + ") ऑर्डर करना है। (शहर: " + p.city + ")"
    : "Hi! I'd like to order '" + p.title + "' (" + rupees(p.price) + ") on belivery. (City: " + p.city + ")";
  var wa = "https://wa.me/918013968142?text=" + encodeURIComponent(waMsg);
  var tel = "tel:+918013968142";
  s.innerHTML =
    '<div class="grab"></div>'+
    '<div class="thumb" style="'+(p.img?("background-image:url('"+p.img+"')"):"")+'">'+(p.img?"":p.emoji)+'</div>'+
    '<div class="price">'+rupees(p.price)+'</div>'+
    '<h3>'+escapeHtml(p.title)+'</h3>'+
    '<div class="kv"><div class="k">'+T("kv_cond")+'</div><div class="v">'+escapeHtml(condLabel(p.cond))+'</div></div>'+
    '<div class="kv"><div class="k">'+T("kv_cat")+'</div><div class="v">'+escapeHtml(catLabel(p.cat))+'</div></div>'+
    '<div class="kv"><div class="k">'+T("kv_loc")+'</div><div class="v">'+escapeHtml(p.city)+'</div></div>'+
    '<div class="kv"><div class="k">'+T("kv_seller")+'</div><div class="v">+91 XXXXXXXXXX<small>'+T("kv_contact_sub")+'</small></div></div>'+
    (p.desc?('<div class="desc">'+escapeHtml(p.desc)+'</div>'):'')+
    '<div class="action-row">'+
      '<a class="btn" href="'+tel+'">'+T("btn_call")+'</a>'+
      '<a class="btn" href="'+wa+'" target="_blank" rel="noopener">WhatsApp</a>'+
    '</div>'+
    '<div class="action-row"><button class="btn primary wide" onclick="buyNow('+p.id+')">'+T("btn_buy")+'</button></div>'+
    '<div class="close-note">' + T("sheet_note") + '</div>';
  $("overlay").classList.add("open");
}

function buyNow(id){
  var p = products.find(function(x){ return x.id===id; });
  if(!p) return;
  orders.unshift({ id: Date.now(), pid: p.id, title: p.title, price: p.price, emoji: p.img?"":p.emoji, city: p.city, ts: Date.now(), status: "placed" });
  save();
  closeSheet();
  toast(T("t_order_ok"));
  go("orders");
}


/* ============ AI assistant sheet (v5.2) ============ */
function openAI(){
  var s = $("sheet");
  var waMsg = (LANG === "hi")
    ? "नमस्ते Belivery! मुझे मदद चाहिए।"
    : "Hi Belivery! I need some help.";
  var wa = "https://wa.me/918013968142?text=" + encodeURIComponent(waMsg);
  s.innerHTML =
    '<div class="grab"></div>'+
    '<div class="thumb" style="height:110px;font-size:46px">🤖</div>'+
    '<h3 style="text-align:center">'+T("ai_title")+'</h3>'+
    '<div class="desc" style="text-align:center">'+T("ai_body")+'</div>'+
    '<div class="action-row" style="flex-direction:column">'+
      '<a class="btn primary wide" href="'+wa+'" target="_blank" rel="noopener">WhatsApp</a>'+
      '<button class="btn wide" onclick="closeSheet()">'+T("ai_close")+'</button>'+
    '</div>';
  $("overlay").classList.add("open");
}

/* ============ sell form ============ */
(function initForm(){
  var sel = $("in-cat");
  CATEGORIES.forEach(function(c){
    var o = document.createElement("option"); o.value=c; o.textContent=catLabel(c); sel.appendChild(o);
  });
  var pick = $("emojiPick");
  var all = [];
  CATEGORIES.forEach(function(c){ all.push(EMOJIS[c]); });
  all = all.concat(CAT_EMOJI_EXTRA);
  var selected = EMOJIS[CATEGORIES[0]];
  all.forEach(function(e){
    var b = document.createElement("button");
    b.type="button"; b.textContent = e;
    if(e===selected) b.classList.add("selected");
    b.onclick = function(){
      selected = e;
      pick.querySelectorAll("button").forEach(function(x){ x.classList.remove("selected"); });
      b.classList.add("selected");
    };
    pick.appendChild(b);
  });
  pick._get = function(){ return selected; };

  $("sellForm").addEventListener("submit", function(ev){
    ev.preventDefault();
    var title = $("in-title").value.trim();
    var price = parseInt($("in-price").value, 10);
    var city = $("in-city").value.trim();
    var phone = $("in-phone").value.replace(/\D/g,"");
    var ok = true;
    function mark(fid, bad){ var f=$(fid); f.classList.toggle("invalid", bad); if(bad) ok=false; }
    mark("f-title", title.length<3);
    mark("f-price", !(price>0));
    mark("f-city", city.length<2);
    mark("f-phone", phone.length!==10);
    if(!ok){ toast(T("t_form_missing")); return; }

    products.unshift({
      id: Date.now(),
      title: title, price: price,
      cat: $("in-cat").value, cond: $("in-cond").value,
      city: city, phone: phone,
      emoji: pick._get(),
      desc: $("in-desc").value.trim(),
      own: true, demo: false, img: "",
      ts: Date.now()
    });
    save();
    this.reset();
    pick.querySelectorAll("button").forEach(function(x,i){ x.classList.toggle("selected", i===0); });
    selected = EMOJIS[CATEGORIES[0]];
    toast(T("t_listed"));
    go("browse");
  });
})();

/* ============ my ads ============ */
function renderMyAds(){
  var box = $("myAdsList");
  var mine = products.filter(function(p){ return p.own; });
  if(!mine.length){
    box.innerHTML = '<div class="empty">' + T("empty_ads") + '</div>';
    return;
  }
  box.innerHTML = "";
  mine.forEach(function(p){
    var d = document.createElement("div");
    d.className = "order-card";
    d.innerHTML =
      '<div class="o-emoji">'+(p.img?"":p.emoji)+'</div>'+
      '<div class="o-main"><div class="o-title">'+escapeHtml(p.title)+'</div>'+
      '<div class="o-sub">'+rupees(p.price)+' &middot; '+escapeHtml(p.city)+' &middot; '+timeAgo(p.ts)+'</div></div>'+
      '<span class="status listed">'+T("st_live")+'</span>'+
      '<button class="btn danger" style="flex:none;padding:8px 12px" onclick="removeAd('+p.id+')">'+T("btn_delete")+'</button>';
    box.appendChild(d);
  });
}
function removeAd(id){
  if(!confirm(T("t_confirm_del"))) return;
  products = products.filter(function(p){ return p.id!==id; });
  save(); renderMyAds(); toast(T("t_deleted"));
}

/* ============ orders ============ */
function renderOrders(){
  var box = $("ordersList");
  if(!orders.length){
    box.innerHTML = '<div class="empty">' + T("empty_orders") + '</div>';
    return;
  }
  box.innerHTML = "";
  orders.forEach(function(o){
    var d = document.createElement("div");
    d.className = "order-card";
    d.innerHTML =
      '<div class="o-emoji">'+(o.emoji||"📦")+'</div>'+
      '<div class="o-main"><div class="o-title">'+escapeHtml(o.title)+'</div>'+
      '<div class="o-sub">'+rupees(o.price)+' &middot; '+escapeHtml(o.city)+' &middot; '+timeAgo(o.ts)+'</div></div>'+
      '<span class="status placed">'+T("st_placed")+'</span>';
    box.appendChild(d);
  });
}


/* ============ menu drawer (v5.4) ============ */
function openMenu(){
  $("menuOverlay").classList.add("open");
  $("menuDrawer").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeMenu(){
  $("menuOverlay").classList.remove("open");
  $("menuDrawer").classList.remove("open");
  document.body.style.overflow = "";
}
function menuGo(view){ closeMenu(); go(view); }
function contactBelivery(){
  closeMenu();
  var waMsg = (LANG === "hi") ? "नमस्ते Belivery! मुझे आपसे बात करनी है।" : "Hi Belivery! I would like to talk.";
  window.open("https://wa.me/918013968142?text=" + encodeURIComponent(waMsg), "_blank", "noopener");
}
function openAbout(){
  closeMenu();
  var s = $("sheet");
  s.innerHTML =
    '<div class="grab"></div>'+
    '<div class="thumb" style="height:100px;font-size:44px">🏪</div>'+
    '<h3 style="text-align:center"><span style="color:var(--accent)">be</span>liv<span style="color:var(--accent)">ery</span></h3>'+
    '<div class="desc" style="text-align:center">'+T("about_body")+'</div>'+
    '<div class="action-row"><button class="btn primary wide" onclick="closeSheet()">'+T("ai_close")+'</button></div>';
  $("overlay").classList.add("open");
}
function menuInstall(){
  var standalone = false;
  try { standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true; } catch(err){}
  if(standalone){ closeMenu(); toast(T("already_installed")); return; }
  if(deferredPrompt){ closeMenu(); installApp(); }
  else {
    closeMenu();
    var s = $("sheet");
    s.innerHTML =
      '<div class="grab"></div>'+
      '<div class="thumb" style="height:100px;font-size:44px">📲</div>'+
      '<h3 style="text-align:center">'+T("install_btn")+'</h3>'+
      '<div class="desc" style="text-align:center">'+T("install_ios")+'</div>'+
      '<div class="action-row"><button class="btn primary wide" onclick="closeSheet()">'+T("ai_close")+'</button></div>';
    $("overlay").classList.add("open");
  }
}
function shareBelivery(){
  closeMenu();
  var shareText = (LANG === "hi")
    ? "Belivery — अपने शहर का अपना बाज़ार 🏪 यहाँ से ख़रीदो और बेचो: "
    : "Belivery — your city's own marketplace 🏪 buy & sell locally: ";
  var url = "https://belivery.netlify.app";
  if(navigator.share){
    navigator.share({ title: "Belivery", text: shareText, url: url }).catch(function(){});
  } else {
    var wa = "https://wa.me/?text=" + encodeURIComponent(shareText + url);
    window.open(wa, "_blank", "noopener");
  }
}

/* ============ PWA install (v5.3) ============ */
var deferredPrompt = null;
function showInstallBar(mode){
  var bar = $("installBar");
  if(!bar) return;
  if(localStorage.getItem("belivery_install_dismissed")) return;
  var standalone = false;
  try { standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true; } catch(err){}
  if(standalone) return;
  bar.classList.remove("hidden");
  if(mode === "ios"){
    $("installText").textContent = T("install_ios");
    $("installBtn").style.display = "none";
  } else {
    $("installText").textContent = T("install_text");
    $("installBtn").style.display = "";
  }
}
window.addEventListener("beforeinstallprompt", function(e){
  e.preventDefault();
  deferredPrompt = e;
  showInstallBar("android");
});
window.addEventListener("appinstalled", function(){
  $("installBar").classList.add("hidden");
  deferredPrompt = null;
});
function installApp(){
  if(!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(function(){ deferredPrompt = null; });
}
function dismissInstall(){
  $("installBar").classList.add("hidden");
  localStorage.setItem("belivery_install_dismissed", "1");
}
(function detectIOSInstall(){
  var ua = window.navigator.userAgent;
  var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if(isIOS) setTimeout(function(){ showInstallBar("ios"); }, 1500);
})();
if("serviceWorker" in navigator){
  window.addEventListener("load", function(){
    navigator.serviceWorker.register("sw.js").catch(function(){});
  });
}

/* ============ init ============ */
applyLang();
if(!localStorage.getItem("belivery_place") && !localStorage.getItem("belivery_loc_asked")){
  localStorage.setItem("belivery_loc_asked","1");
  detectLocation();
}
