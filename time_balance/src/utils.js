export function loadAllData() {
  try {
    const raw = localStorage.getItem('timebalance:data');
    return raw ? JSON.parse(raw) : {};
  } catch(e){ return {}; }
}

export function saveDayData(dayKey, dayObj) {
  const all = loadAllData();
  const newAll = {...all, [dayKey]: dayObj};
  localStorage.setItem('timebalance:data', JSON.stringify(newAll));
}

export function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

export function summarizeActivities(activities=[]) {
  const categories = {};
  activities.forEach(a => {
    categories[a.category] = (categories[a.category]||0) + Number(a.minutes);
  });
  return categories;
}

export function calcDopamineScore(categories) {
  const Sen = categories.Sen||0;
  const Nauka = categories.Nauka||0;
  const Telefon = categories.Telefon||0;
  const Sport = categories.Sport||0;
  const Rozrywka = categories.Rozrywka||0;
  const score = 50 + Math.min(20, Nauka/180*20) + Math.min(15, Sport/120*15) - Math.min(25, Telefon/360*25);
  return Math.round(Math.max(0, Math.min(100, score)));
}
