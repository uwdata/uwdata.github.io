import {
  $, $$, addAuthorEntry, addMaterialEntry, dateString, dateToParts,
  download, option, set, slugify
} from './util.mjs';
import { doiLookup } from './doi-lookup.mjs';

let venues = null;
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
  venues = await loadVenues();
  const venueList = $('#_venue-list');
  for (const venue of venues) {
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
    doiLookup($('#_doi').value, { people, venues, addAuthorEntry });
  });

  // register export methods
  $('#print').addEventListener('click', previewJSON);
  $('#copy').addEventListener('click', async () => {
    const json = previewJSON();
    if (json) {
      await navigator.clipboard.writeText(json);
      alert('Copied JSON data to clipboard.');
    }
  });
  $('#download').addEventListener('click', () => {
    const json = compileJSON();
    if (json) {
      download(`${json.web_name}.json`, JSON.stringify(json, 0, 2));
    }
  });
}

async function loadVenues() {
  const resp = await fetch('../../static/venues.json');
  const data = await resp.json();
  return data.map(d => ({
    value: d.nickname,
    label: `${d.fullName} -> ${d.nickname}`,
    name: d.fullName
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

function previewJSON() {
  const data = compileJSON();
  const json = JSON.stringify(data, 0, 2);
  if (data) {
    $('#preview').innerText = json;
    return json;
  }
  return '';
}

function compileJSON() {
  const slug = slugify($('#_web_name').value || $('#_title').value);
  if (!slug) {
    alert('Missing web name! The web name field is required.');
    return null;
  }
  const json = newPaper(slug);

  // populate metadata fields
  const prefix = '#metadata > section ';
  const inputs = $$(`${prefix} input, ${prefix} textarea`);
  for (const input of inputs) {
    const name = input.getAttribute('id').slice(1);
    json[name] = input.value;
  }
  json.web_name = slug;

  // populate figure data
  const caption = $('#_caption').value;
  if (caption) {
    json.caption = caption;
  } else {
    json.figure = '';
  }

  // populate author list
  json.authors = $$('input._author')
    .flatMap(el => el.value || [])
    .map(key => resolvePerson(key));

  // populate materials list
  json.materials = $$('#material-entries > div').flatMap(el => {
    const name = el.querySelector('._material_type').value;
    const link = el.querySelector('._material_link').value;
    return name && link ? { name, link } : [];
  });

  // format tags
  const tags = (json.tags ?? '')
    .toLowerCase()
    .split(/\s+|,|\s+,\s+/g) // split on space or comma
    .map(s => s.replace(/[^\w]+/g, '')) // letters only
    .filter(x => x);
  json.tags = Array.from(new Set(tags)); // dedupe

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

function newPaper(slug) {
  return {
    doi: null,
    web_name: slug,
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
    pdf: '<<REPLACE WITH LINK TO PDF>>',
    abstract: '',
    thumbnail: `images/thumbs/${slug}.png`,
    figure: `images/figures/${slug}.png`,
    caption: '',
    visible: true,
    pub_date: '',
    mod_date: '',
    authors: [],
    materials: [],
    tags: []
  };
}
