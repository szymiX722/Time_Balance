import { summarizeActivities, calcDopamineScore } from '../utils.js';

export default function SummaryCard({ day }) {
  const categories = summarizeActivities(day.activities || []);
  const score = calcDopamineScore(categories);

  return React.createElement('div', {className:'summary-card'},
    React.createElement('h3', null, 'Dopamine Score: ' + score)
  );
}
