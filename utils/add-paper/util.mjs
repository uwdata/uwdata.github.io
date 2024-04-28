const fmt = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 });

export function $(sel) {
  return document.querySelector(sel);
}

export function $$(sel) {
  return Array.from(document.querySelectorAll(sel));
}

export function set(id, value) {
  if (!value) return;
  $(`#_${id}`).value = value;
}

export function option({ value, label }) {
  const opt = document.createElement('option');
  opt.setAttribute('value', value);
  opt.innerText = label ?? value;
  return opt;
}

export function download(file, text) {
  const blob = new Blob([text], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', file);
  a.dispatchEvent(new MouseEvent('click'));
}

export function dateToParts(date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
}

export function dateString(parts) {
  const [y, m = 1, d = 1] = parts;
  return `${y}-${fmt.format(m)}-${fmt.format(d)}`;
}
