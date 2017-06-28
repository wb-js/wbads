// trim, toLower, convert diacritics, remove special chars, convert 1-n spaces to '-'
function sanitize(thing) {
  return thing.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\s,-]/gi, '')
    .replace(/-+/g, '-');
}

export default function processTargeting(thing) {
  if (Array.isArray(thing)) {
    return thing.map(item => sanitize(item.toString()));
  } else {
    return sanitize(thing.toString());
  }

  return null;
}
