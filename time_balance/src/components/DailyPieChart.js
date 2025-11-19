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

export default function DailyPieChart({ day }) {
  React.useEffect(() => {
    const categories = summarizeActivities(day.activities || []);
    const labels = Object.keys(categories);
    const dataValues = Object.values(categories);
    const colors = labels.map(l=>COLORS[l] || '#ccc');

    const ctx = document.getElementById('chartDay').getContext('2d');
    if (!ctx) return;
    if (window.myChart) window.myChart.destroy();

    window.myChart = new Chart(ctx, {
      type: 'pie',
      data: { labels, datasets: [{ data: dataValues, backgroundColor: colors }] },
      options: { 
        responsive: true,
        animation: { duration: 1000, easing: 'easeOutQuart' },
        plugins: { legend: { position: 'right' } } 
      }
    });
  }, [day.activities]);

  return React.createElement('div', null,
    React.createElement('h2', null, 'Wykres dzienny'),
    React.createElement('canvas',{id:'chartDay',width:300,height:300})
  );
}
