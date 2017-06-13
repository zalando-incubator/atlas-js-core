const cdns = ['mosaic01', 'mosaic02'];
const defaultResolutions = ['catalog', 'detail', 'large'];

const isImage = (type) => ['IMAGE', 'IMAGE_360'].includes(type);
const isVideo = (type) => ['VIDEO_THUMBNAIL', 'VIDEO_HD', 'VIDEO_LOW'].includes(type);

const createImageItem = (item, cdn, resolutions) => {
  const urls = {};

  resolutions.forEach(resolution => {
    urls[resolution] = `https://${cdn}.ztat.net/vgs/media/${resolution}/${item.path}`;
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

const getCdnAndResolutions = (options) => {
  let { cdn, image_resolutions: imageResolutions } = options && options.media
  ? options.media
  : {
    cdn: cdns[0],
    imageResolutions: defaultResolutions
  };

  cdn = cdn || cdns[0];
  imageResolutions = imageResolutions || defaultResolutions;
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
      } else {
        throw Error(`Unsupported type ${item.type}`);
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
