import InputForm from './components/InputForm.js';
import DailyPieChart from './components/DailyPieChart.js';
import WeeklyBarChart from './components/WeeklyBarChart.js';
import SummaryCard from './components/SummaryCard.js';
import { loadAllData, saveDayData, getTodayKey } from './utils.js';

export default function App() {
  const [data, setData] = React.useState(() => loadAllData());
  const todayKey = getTodayKey();
  if (!data[todayKey]) data[todayKey] = { activities: [] };

  const updateDay = (dayKey, dayObj) => {
    const newData = { ...data, [dayKey]: dayObj };
    setData(newData);
    saveDayData(dayKey, dayObj);
  };

  return React.createElement('div', {className:'app-container'},
    React.createElement('h1', null, 'Time Balance App'),
    React.createElement(InputForm, { dayKey: todayKey, day: data[todayKey], onSave: updateDay }),
    React.createElement(DailyPieChart, { day: data[todayKey] }),
    React.createElement(SummaryCard, { day: data[todayKey] }),
    React.createElement(WeeklyBarChart, { data })
  );
}
