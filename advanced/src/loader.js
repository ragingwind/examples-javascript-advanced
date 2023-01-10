function importScriptAll(scriptSrcs) {
  return scriptSrcs.map(src => {
    return new Promise(resolve => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      document.head.appendChild(s);
    });
  });
}