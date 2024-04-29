const fmt = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 });

export function $(sel) {
  return document.querySelector(sel);
}

export function $$(sel) {
  return Array.from(document.querySelectorAll(sel));
}

export function set(id, value) {
  if (!value) return;
  setValue(`#_${id}`, value);
}

export function setValue(sel, value) {
  $(sel).value = value;
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

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\d+/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^-\w]+/g, '')
    .slice(0, 50)
    .replace(/-$/, '');
}

export function addAuthorEntry() {
  const index = $$(`input._author`).length + 1;
  const entry = document.createElement('section');
  entry.innerHTML = `
    <label>Author ${index}</label>
    <input data-index="${index}" class="_author" list="people-list" type="text" />
  `;
  $('#author-entries').appendChild(entry);
}

export function addMaterialEntry() {
  const entry = document.createElement('div');
  entry.innerHTML = `
    <section>
      <label>Type</label>
      <input class="_material_type" list="material-list" type="text" />
    </section>
    <section>
      <label>Link</label>
      <input class="_material_link" type="text" />
    </section>
  `;
  $('#material-entries').appendChild(entry);
}

export function ensureAuthorEntries(n) {
  const diff = n - $$(`input._author`).length;
  for (let i = 0; i < diff; ++i) {
    addAuthorEntry();
  }
}
