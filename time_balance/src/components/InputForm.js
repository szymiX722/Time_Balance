export default function InputForm({ dayKey, day, onSave }) {
  const [category, setCategory] = React.useState('Nauka');
  const [value, setValue] = React.useState(30);
  const [unit, setUnit] = React.useState('min'); // minuty lub godziny

  const categories = ['Sen','Nauka','Telefon','Sport','Rozrywka','Praca','Jedzenie','Przerwy'];

  function totalMinutesUsed() {
    return (day.activities || []).reduce((sum, a) => sum + a.minutes, 0);
  }

  function addActivity(e) {
    e.preventDefault();
    const minutes = unit === 'min' ? Number(value) : Number(value) * 60;
    const remaining = 1440 - totalMinutesUsed();
    if (minutes > remaining) {
      alert(`Nie możesz dodać więcej niż ${remaining} minut!`);
      return;
    }
    const newAct = { category, minutes };
    const newDay = { ...day, activities: [...(day.activities||[]), newAct] };
    onSave(dayKey, newDay);
    setValue(Math.min(30, remaining));
  }

  function editActivity(index, newValue, newUnit) {
    const minutes = newUnit === 'min' ? Number(newValue) : Number(newValue)*60;
    const newDay = { ...day };
    const totalExcludingCurrent = totalMinutesUsed() - newDay.activities[index].minutes;
    if (minutes + totalExcludingCurrent > 1440) {
      alert(`Nie możesz przekroczyć 1440 minut w ciągu dnia!`);
      return;
    }
    newDay.activities[index].minutes = minutes;
    onSave(dayKey, newDay);
  }

  return React.createElement('div', null,
    React.createElement('form', { onSubmit: addActivity },
      React.createElement('select', { value: category, onChange: e=>setCategory(e.target.value) },
        categories.map(c=>React.createElement('option',{key:c,value:c},c))
      ),
      React.createElement('input',{type:'number',value:value,onChange:e=>setValue(e.target.value),min:1}),
      React.createElement('select',{value:unit,onChange:e=>setUnit(e.target.value)},
        React.createElement('option',{value:'min'},'min'),
        React.createElement('option',{value:'h'},'godz')
      ),
      React.createElement('button',{type:'submit'},'Dodaj')
    ),
    React.createElement('div', {style:{marginTop:'10px'}},
      day.activities.map((act,index)=>
        React.createElement('div', {key:index, style:{display:'flex', justifyContent:'space-between', marginBottom:'5px', alignItems:'center'}},
          React.createElement('span', null, act.category + ': ' + act.minutes + ' min'),
          React.createElement('input', {
            type:'number',
            value:act.minutes,
            min:1,
            style:{width:'60px'},
            onChange:e=>editActivity(index,e.target.value, 'min')
          })
        )
      )
    )
  );
}
