import React, { useState, useEffect } from 'react';

export default function ThemeToggle(){
  const [theme,setTheme] = useState(localStorage.getItem('theme')||'light');
  useEffect(()=>{
    document.body.classList.remove('light-theme','dark-theme');
    document.body.classList.add(theme+'-theme');
    localStorage.setItem('theme',theme);
  },[theme]);
  return <button className='theme-toggle' onClick={()=>setTheme(theme==='light'?'dark':'light')}>
    {theme==='light'?'Ciemny motyw':'Jasny motyw'}
  </button>;
}
