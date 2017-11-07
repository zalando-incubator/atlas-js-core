const CDNS = ['mosaic01', 'mosaic02'];
const AVAILABLE_RESOLUTIONS = {
  thumbnail: 'pdp-thumb',
  thumbnail_hd: 'thumb_hd',
  small: 'catalog',
  small_hd: 'catalog_hd',
  medium: 'detail',
  medium_sd: 'pdp-gallery',
  medium_hd: 'detail_hd',
  large: 'large',
  large_hd: 'large_hd'
};
const DEFAULT_RESOLUTIONS = ['thumbnail', 'medium', 'large'];

const isImage = (type) => ['IMAGE', 'IMAGE_PARTNER'].indexOf(type) !== -1;
const isVideo = (type) => ['VIDEO_THUMBNAIL', 'VIDEO_HD', 'VIDEO_LOW'].indexOf(type) !== -1;

const createImageItem = (item, cdn, imageResolutions) => {
  const urls = {};

  Object.keys(imageResolutions).forEach(resolutionKey => {
    urls[resolutionKey] = `https://${cdn}.ztat.net/vgs/media/${AVAILABLE_RESOLUTIONS[resolutionKey]}/${item.path}`;
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
    url: `https://${cdn}.ztat.net/vgs/${item.path}`
  };
};

const getImageResolutions = (optsImageResolutions) => {
  const imageResolutions = optsImageResolutions || DEFAULT_RESOLUTIONS;

  return Object.keys(AVAILABLE_RESOLUTIONS)
    .filter(key => imageResolutions.indexOf(key) !== -1) /* eslint no-magic-numbers: [0] */
    .reduce((finalResolutions, key) => {
      finalResolutions[key] = AVAILABLE_RESOLUTIONS[key];
      return finalResolutions;
    }, {});
};

const getCdnAndResolutions = (options) => {
  const defaultOptions = {
    cdn: CDNS[0],
    optsImageResolutions: DEFAULT_RESOLUTIONS
  };

  let { cdn, image_resolutions: imageResolutions } = (options && options.media) || defaultOptions;

  cdn = cdn || defaultOptions.cdn;

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
