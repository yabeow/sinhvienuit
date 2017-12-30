const Entities = require('html-entities').XmlEntities;

export default function (data) {
  return Entities.decode(data);
}
