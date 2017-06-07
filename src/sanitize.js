// trim, toLower, convert diacritics, remove special chars, convert 1-n spaces to '-'
function sanitize(thing) {
  return thing.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s,]/gi, '')
    .replace(/\s+/g, '-');
}

export default function processTargeting(thing) {
  if (typeof thing !== 'string' && !Array.isArray(thing)) {
    return null;
  }

  if (typeof thing === 'string') {
    return sanitize(thing);
  } else if (Array.isArray(thing)) {
    return thing.map(item => sanitize(item));
  }

  return null;
}
