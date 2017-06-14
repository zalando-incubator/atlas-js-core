const cdns = ['mosaic01', 'mosaic02'];
const resolutions = {
  thumbnail: 'pdp-thumb',
  thumbnail_hd: 'thumb_hd',
  small: 'catalog',
  small_hd: 'catalog_hd',
  medium: 'detail',
  medium_hd: 'detail_hd',
  large: 'large',
  large_hd: 'large_hd'
};
const defaultResolutions = ['thumbnail', 'medium', 'large'];

const isImage = (type) => ['IMAGE', 'IMAGE_360'].includes(type);
const isVideo = (type) => ['VIDEO_THUMBNAIL', 'VIDEO_HD', 'VIDEO_LOW'].includes(type);

const createImageItem = (item, cdn, imageResolutions) => {
  const urls = {};

  Object.keys(imageResolutions).forEach(resolutionKey => {
    urls[resolutionKey] = `https://${cdn}.ztat.net/vgs/media/${resolutions[resolutionKey]}/${item.path}`;
  });

  return {
    type: item.type,
    mediaCharacter: item.media_character,
    resolutions: urls
  };
};

const createVideoItem = (item, cdn) => {
  return {
    type: item.type,
    mediaCharacter: item.media_character,
    url: `https://${cdn}.ztat.net/vgs${item.path}`
  };
};

const getImageResolutions = (optsImageResolutions) => {
  const imageResolutions = optsImageResolutions || defaultResolutions;

  return Object.keys(resolutions)
               .filter(key => imageResolutions.includes(key))
               .reduce((finalResolutions, key) => {
                 finalResolutions[key] = resolutions[key];
                 return finalResolutions;
               }, {});
};

const getCdnAndResolutions = (options) => {
  let { cdn, image_resolutions: imageResolutions } = options && options.media
  ? options.media
  : {
    cdn: cdns[0],
    optsImageResolutions: defaultResolutions
  };

  cdn = cdn || cdns[0];

  imageResolutions = getImageResolutions(imageResolutions);

  return { cdn, imageResolutions };
};

export default (json, options) => {
  const { cdn, imageResolutions } = getCdnAndResolutions(options);

  json.images = [];
  json.videos = [];

  if (json.media && json.media.media_items) {
    json.media.media_items.forEach(item => {
      if (isImage(item.type)) {
        json.images.push(createImageItem(item, cdn, imageResolutions));
      } else if (isVideo(item.type)) {
        json.videos.push(createVideoItem(item, cdn));
      }
    });

    delete json.media;
  }
  return json;
};

export {
  isImage,
  isVideo,
  createVideoItem,
  createImageItem,
  getCdnAndResolutions
};
