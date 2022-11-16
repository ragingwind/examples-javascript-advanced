function autocomplete(input, delay, handler) {
  const context = {
    tid: null,
  }

  function handleInput() {
    if (context.tid) {
      clearTimeout(context.tid);
      context.tid = null;
    }

    context.tid = setTimeout(() => {
      context.tid = null;
      handler(input.value);
    }, delay);
  }

  input.addEventListener('input', handleInput);
}