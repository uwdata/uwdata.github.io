import { dateString, ensureAuthorEntries, set, setValue } from './util.mjs';

const URL_PREFIX = 'https://doi.org/';

function doiURL(doi) {
  return !doi ? null
    : doi.startsWith('http') ? doi
    : `${URL_PREFIX}${doi}`; // TODO escaping?
}

function cleanDOI(value) {
  return value.startsWith(URL_PREFIX)
    ? value.slice(URL_PREFIX.length)
    : value;
}

export async function doiLookup(doi, { people, venues }) {
  const url = doiURL(doi);
  const resp = await fetch(url, {
    checkContentType: true,
    method: 'GET',
    headers: {
      Accept: 'application/vnd.citationstyles.csl+json'
    }
  });
  if (resp.status !== 200) {
    alert(`Lookup failure for ${url}`);
    return;
  }
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

  // Try to resolve container-title to venue id
  if (data['container-title']) {
    const { score, venue } = findVenue(venues, data['container-title']);
    if (score > 0) {
      set('venue', venue.value);
    }
  }

  // Try to resolve listed authors to known people
  if (data.author) {
    ensureAuthorEntries(data.author.length);
    data.author.forEach((author, i) => {
      const { score, person } = findPerson(people, author.family, author.given);
      if (score > 0) {
        setValue(`._author[data-index="${i+1}"]`, person.key);
      }
    });
  }

  // Also try loading data from Semantic Scholar
  const { abstract } = await loadS2Data(doi);
  if (abstract) {
    set('abstract', abstract);
  }
}

async function loadS2Data(doi, fields=['abstract', 'tldr']) {
  const s2Paper = `https://api.semanticscholar.org/graph/v1/paper`;
  const id = `DOI:${cleanDOI(doi)}`;
  const url = `${s2Paper}/${id}?fields=${fields.join(',')}`;
  const resp = await fetch(url);
  if (resp.status !== 200) {
    return {};
  }
  return await resp.json();
}

// Soft match against venue names
function findVenue(venues, name) {
  let score = 0;
  let venue = null;
  for (const v of venues) {
    const s = stringSim(name, v.name);
    if (s > score) {
      score = s;
      venue = v;
    }
  }
  return { venue, score };
}

// Must match family name exactly, soft match on given name
function findPerson(people, family, given) {
  let score = 0;
  let person = null;
  for (const p of people) {
    if (family === p.last_name) {
      const g = stringSim(given, p.first_name);
      if (g > score) {
        score = g;
        person = p;
      }
    }
  }
  return { person, score };
}

// Adapted from https://github.com/stephenjjbrown/string-similarity-js/
// MIT License: https://github.com/stephenjjbrown/string-similarity-js/blob/master/LICENSE.md
function stringSim(str1, str2, k = 2, caseSensitive = false) {
  if (!str1 || !str2 ) return 0;

	if (!caseSensitive) {
		str1 = str1.toLowerCase();
		str2 = str2.toLowerCase();
	}

	if (str1.length < k || str2.length < k)
		return 0;

	const map = Object.create(null);
	for (let i = 0; i < str1.length - (k - 1); i++) {
		const substr1 = str1.substr(i, k);
		map[substr1] = (map[substr1] ?? 0) + 1;
	}

	let match = 0;
	for (let j = 0; j < str2.length - (k - 1); j++) {
		const substr2 = str2.substr(j, k);
		const count = map[substr2] || 0;
		if (count > 0) {
			map[substr2] = count - 1;
			match++;
		}
	}

	return (match * 2) / (str1.length + str2.length - ((k - 1) * 2));
}
