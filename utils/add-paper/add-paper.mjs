import {
  $, $$, download, set, option, dateToParts, dateString
} from './util.mjs';

let authorEntries = 0;
let people = null;
let peopleMap = null;

export async function hydrate() {
  // load registered people
  people = await loadPeople();
  peopleMap = people.reduce((m, p) => m.set(p.key, p), new Map);

  // populate people options
  const peopleList = $('#people-list');
  for (const { key } of people) {
    peopleList.appendChild(option({ value: key }));
  }

  // populate author entries
  addAuthorEntry();
  addAuthorEntry();
  addAuthorEntry();

  // populate material entries
  addMaterialEntry();

  // populate default date values
  const today = new Date();
  const date = dateString(dateToParts(today));
  set('year', today.getFullYear());
  set('pub_date', date);
  set('mod_date', date);

  // populate venue options
  const venueList = $('#_venue-list');
  for (const venue of await loadVenues()) {
    venueList.appendChild(option(venue));
  }

  // register add-author
  $('#add-author').addEventListener('click', () => {
    addAuthorEntry();
  });

  // register add-material
  $('#add-material').addEventListener('click', () => {
    addMaterialEntry();
  });

  // register DOI lookup
  $('#lookup').addEventListener('click', () => {
    const doi = doiURL($('#_doi').value);
    lookupDOI(doi);
  });

  // register export methods
  $('#print').addEventListener('click', () => {
    console.log(JSON.stringify(compileJSON(), 0, 2));
  });
  $('#download').addEventListener('click', () => {
    const json = compileJSON();
    download(`${json.web_name}.json`, JSON.stringify(json, 0, 2));
  });
}

async function loadVenues() {
  const resp = await fetch('../../static/venues.json');
  const data = await resp.json();
  return data.map(d => ({
    value: d.nickname,
    label: `${d.fullName} -> ${d.nickname}`
  }));
}

async function loadPeople() {
  const resp = await fetch('../../static/people.json');
  const data = await resp.json();
  data.forEach(d => {
    d.key = d.display_name || `${d.first_name} ${d.last_name}`;
  });
  return data;
}

function addAuthorEntry() {
  const index = ++authorEntries;
  const entry = document.createElement('section');
  entry.innerHTML = `
    <label>Author ${index}</label>
    <input class="_author" list="people-list" type="text" />
  `;
  $('#author-entries').appendChild(entry);
}

function addMaterialEntry() {
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

function compileJSON() {
  const json = newPaper();

  // populate metadata fields
  const prefix = '#metadata > section ';
  const inputs = $$(`${prefix} input, ${prefix} textarea`);
  for (const input of inputs) {
    const name = input.getAttribute('id').slice(1);
    json[name] = input.value;
  }

  // populate author list
  json.authors = $$('input._author')
    .map(el => el.value).filter(d => d)
    .map(key => resolvePerson(key));

  // populate materials list
  json.materials = $$('#material-entries > div').map(el => {
    return {
      name: el.querySelector('._material_type').value,
      link: el.querySelector('._material_link').value
    };
  });

  return json;
}

function resolvePerson(name) {
  const p = peopleMap.get(name);
  if (p) {
    return {
      first_name: p.first_name,
      last_name: p.last_name,
      display_name: p.display_name || undefined,
      url: p.url || undefined
    };
  } else {
    console.warn(`Unrecognized name: ${name}`);
    const parts = name.split(/\s+/);
    return {
      first_name: parts[0],
      last_name: parts.slice(1).join(' ')
    };
  }
}

function doiURL(doi) {
  return !doi ? null
    : doi.startsWith('http') ? doi
    : `https://doi.org/${doi}`; // TODO escaping?
}

export async function lookupDOI(url) {
  const resp = await fetch(url, {
    checkContentType: true,
    method: 'GET',
    headers: {
      Accept: 'application/vnd.citationstyles.csl+json'
    }
  });
  const data = await resp.json();

  // handle title
  const title = data.title + (data.subtitle?.length ? `: ${data.subtitle}` : '');
  set('title', title.replace('&amp;', '&')); // TODO? other HTML escapes?

  // handle date
  const parts = data.published?.['date-parts'];
  if (parts) {
    set('year', parts[0]);
    set('pub_date', dateString(parts));
  }

  set('publisher', data.publisher);
  set('volume', data.volume);
  set('issue', data.issue);

  // TODO?
  // Map authors to known people (given, family, ORCID)
  // Map venues to known venues (container-title)
  // Also try loading data from Semantic Scholar
}

function newPaper() {
  return {
    doi: null,
    web_name: '',
    title: '',
    venue: '',
    year: -1,
    note: '',
    start_page: null,
    end_page: null,
    volume: null,
    issue: null,
    editors: '',
    publisher: '',
    location: '',
    pdf: '',
    abstract: '',
    thumbnail: '',
    figure: '',
    caption: '',
    visible: true,
    pub_date: '',
    mod_date: '',
    authors: [],
    materials: [],
    tags: []
  };
}
