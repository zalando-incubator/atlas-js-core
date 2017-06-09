const DEFAULT_RES = {
  desktop: 'large',
  mobile: 'catalog',
  thumbnail: 'detail'
};

const SUPPORTED_TYPES = [
  'IMAGE',
  'VIDEO_THUMBNAIL',
  'VIDEO_HD',
  'VIDEO_LOW'
];

const DEFAULT_OPTIONS = {
  resolutions: ['desktop', 'mobile', 'thumbnail']
};

const isSupported = (type) => SUPPORTED_TYPES.indexOf(type) !== -1; /* eslint "no-magic-numbers": 0 */

export const createMediaUrl = (type, opts = {}) => {
  const { resolution, path } = opts;

  if (!path) {
    throw new Error('must provide "path"');
  }

  let mediaUrl = '';

  if (type === 'IMAGE') {
    if (!resolution) {
      throw new Error('must provide "resolution"');
    }

    mediaUrl = `media/${resolution}/${path}`;
  } else {
    mediaUrl = path;
  }

  return `https://mosaic01.ztat.net/vgs/${mediaUrl}`;
};

export default (key, value, options) => {
  let { media } = options;

  if (key !== 'media') {
    return;
  }

  if (!media) {
    media = DEFAULT_OPTIONS;
  }

  const { resolutions } = media;

  return value.map((mediaItem) => {
    const newItem = Object.assign({}, mediaItem);
    const path = newItem.path;

    if (!isSupported(newItem.type)) {
      return newItem;
    }

    if (newItem.type.includes('VIDEO')) {
      newItem.path = createMediaUrl('VIDEO', { path });

      return newItem;
    }

    resolutions.forEach((resolution) => {
      const mediaOpts = { resolution: DEFAULT_RES[resolution] || resolution, path };

      newItem[resolution] = createMediaUrl('IMAGE', mediaOpts);
    });

    delete newItem.path;

    return newItem;
  });
};
