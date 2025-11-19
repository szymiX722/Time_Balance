import { summarizeActivities } from '../utils.js';

const COLORS = {
  Sen:'#6EE7B7',
  Nauka:'#60A5FA',
  Telefon:'#F472B6',
  Sport:'#FBBF24',
  Rozrywka:'#F472B6',
  Praca:'#34D399',
  Jedzenie:'#A78BFA',
  Przerwy:'#F97316'
};

export default function WeeklyBarChart({ data }) {
  React.useEffect(() => {
    // 6 dni poprzednich + dzisiaj
    function get7Days() {
      const days = [];
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dayStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        days.push(dayStr);
      }
      return days;
    }

    const last7 = get7Days();
    const labels = last7.map(d => d.split('-').slice(2,3)[0] + '-' + d.split('-')[1]);

    const allCategories = Object.keys(COLORS);
    const categoryTotals = {};
    allCategories.forEach(cat => categoryTotals[cat] = []);

    last7.forEach(date => {
      const dayData = data[date]?.activities || [];
      const dayCats = summarizeActivities(dayData);
      allCategories.forEach(cat => {
        categoryTotals[cat].push(dayCats[cat] || 0);
      });
    });

    const datasets = allCategories.map((cat)=>({
      label: cat,
      data: categoryTotals[cat],
      backgroundColor: COLORS[cat]
    }));

    const ctx = document.getElementById('chartWeek')?.getContext('2d');
    if (!ctx) return;
    if (window.weekChart) window.weekChart.destroy();

    window.weekChart = new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets },
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        animation: { duration: 1000, easing: 'easeOutQuart' },
        scales: { y: { beginAtZero: true } }
      }
    });
  }, [data]);

  return React.createElement('div', null,
    React.createElement('h2', null, 'Wykres tygodniowy'),
    React.createElement('canvas',{id:'chartWeek',width:350,height:250})
  );
}
