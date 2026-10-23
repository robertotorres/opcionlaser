import logo from '../assets/images/opcionlaser.png';

import bettyBoopVideo from '../assets/videos/betty-boop.mp4';
import callOfDutyVideo from '../assets/videos/call-of-duty.mp4';
import carinVideo from '../assets/videos/carin.mp4';
import colibriVideo from '../assets/videos/colibri.mp4';
import hermosilloVideo from '../assets/videos/hermosillo.mp4';
import jordanVideo from '../assets/videos/jordan.mp4';
import kobeBryantVideo from '../assets/videos/kobe-bryant.mp4';
import naranjerosVideo from '../assets/videos/naranjeros.mp4';
import nirvanaVideo from '../assets/videos/nirvana.mp4';
import ohtaniVideo from '../assets/videos/ohtani.mp4';
import patriotsVideo from '../assets/videos/patriots.mp4';
import puebloYaquiVideo from '../assets/videos/pueblo-yaqui.mp4';
import sanJudasVideo from '../assets/videos/san-judas.mp4';
import yankeesVideo from '../assets/videos/yankees.mp4';

const imageFiles = Object.entries(import.meta.glob('../assets/images/*.{jpeg,jpg}', {
  eager: true,
  import: 'default',
})).map(([path, src]) => {
  const filename = path.split('/').at(-1);
  const basename = filename.replace(/\.(jpeg|jpg)$/i, '');

  return { filename, basename, src };
}).filter(({ filename }) => filename !== 'opcionlaser.jpeg');

const toCamelCase = (value) => value.replace(/-([a-z0-9])/g, (_, character) => character.toUpperCase());

const images = Object.fromEntries(imageFiles.map(({ basename, src }) => [toCamelCase(basename), src]));

const imageGroups = imageFiles.reduce((groups, image) => {
  const groupName = image.basename.replace(/-\d+$/, '');
  groups[groupName] ??= [];
  groups[groupName].push(image);
  return groups;
}, {});

Object.values(imageGroups).forEach((group) => {
  group.sort((first, second) => {
    const firstVariant = Number(first.basename.match(/-(\d+)$/)?.[1] ?? 0);
    const secondVariant = Number(second.basename.match(/-(\d+)$/)?.[1] ?? 0);
    return firstVariant - secondVariant;
  });
});

const videos = {
  bettyBoop: bettyBoopVideo,
  callOfDuty: callOfDutyVideo,
  carin: carinVideo,
  colibri: colibriVideo,
  hermosillo: hermosilloVideo,
  jordan: jordanVideo,
  kobeBryant: kobeBryantVideo,
  naranjeros: naranjerosVideo,
  nirvana: nirvanaVideo,
  ohtani: ohtaniVideo,
  patriots: patriotsVideo,
  puebloYaqui: puebloYaquiVideo,
  sanJudas: sanJudasVideo,
  yankees: yankeesVideo,
};

export const mediaData = {
  logo,
  images,
  imageGroups,
  videos,
};