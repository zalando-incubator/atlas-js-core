import test from 'ava';
import fs from 'fs';
import path from 'path';

const json = fs.readFileSync(path.join(__dirname, '../../__tests__/data/catalog_service_response.json'), 'utf8');

import mediaTransform, {
  isImage,
  isVideo,
  createVideoItem,
  createImageItem,
  getCdnAndResolutions
} from '../media_trasform';

test('media_transform: check if media type is image', t => {
  t.true(isImage('IMAGE'));
  t.false(isImage('IMAGE_360'));
  t.false(isImage('IMG'));
  t.false(isImage('FOO'));
});

test('media_transform: check if media type is video', t => {
  t.true(isVideo('VIDEO_LOW'));
  t.true(isVideo('VIDEO_HD'));
  t.true(isVideo('VIDEO_THUMBNAIL'));
  t.false(isVideo('VIDEO'));
  t.false(isVideo('FOO'));
});

test('media_transform: check createVideoItem', t => {
  const item = {
    type: 'VIDEO_HD',
    path: 'comet/LE/22/1N/02/PK/11/VIDEO/LOW_QUALITY/1479494994821.mp4',
    media_character: 'UNKNOWN'
  };
  const videoItem = createVideoItem(item, 'mosaic02');

  t.deepEqual(videoItem, {
    type: 'VIDEO_HD',
    mediaCharacter: 'UNKNOWN',
    url: 'https://mosaic02.ztat.net/vgs/comet/LE/22/1N/02/PK/11/VIDEO/LOW_QUALITY/1479494994821.mp4'
  });
});

test('media_transform: check createImageItem', t => {
  const item = {
    type: 'IMAGE',
    path: 'SO/25/4J/00/0C/00/SO254J000-C00@1.1.jpg',
    media_character: 'NON_MODEL'
  };

  const imageItem = createImageItem(item, 'mosaic01', { thumbnail: 'pdp-thumb', medium: 'detail', large: 'large' });

  t.deepEqual(imageItem, {
    type: 'IMAGE',
    mediaCharacter: 'NON_MODEL',
    resolutions: {
      thumbnail: 'https://mosaic01.ztat.net/vgs/media/pdp-thumb/SO/25/4J/00/0C/00/SO254J000-C00@1.1.jpg',
      medium: 'https://mosaic01.ztat.net/vgs/media/detail/SO/25/4J/00/0C/00/SO254J000-C00@1.1.jpg',
      large: 'https://mosaic01.ztat.net/vgs/media/large/SO/25/4J/00/0C/00/SO254J000-C00@1.1.jpg'
    }
  });
});

test('media_transform: getCdnAndResolutions returns default values', t => {
  const { cdn, imageResolutions } = getCdnAndResolutions();

  t.is(cdn, 'mosaic01');
  t.deepEqual(imageResolutions, { thumbnail: 'pdp-thumb', medium: 'detail', large: 'large' });
});

test('media_transform: getCdnAndResolutions returns cdn and default resolutions', t => {
  const { cdn, imageResolutions } = getCdnAndResolutions({
    media: {
      cdn: 'mosaic02'
    }
  });

  t.is(cdn, 'mosaic02');
  t.deepEqual(imageResolutions, { thumbnail: 'pdp-thumb', medium: 'detail', large: 'large' });
});

test('media_transform: getCdnAndResolutions returns custom resolutions and default cdn', t => {
  const { cdn, imageResolutions } = getCdnAndResolutions({
    media: {
      image_resolutions: ['small']
    }
  });

  t.is(cdn, 'mosaic01');
  t.deepEqual(imageResolutions, { small: 'catalog' });
});

test('media_transform: getCdnAndResolutions returns custom resolutions and custom cdn', t => {
  const { cdn, imageResolutions } = getCdnAndResolutions({
    media: {
      cdn: 'mosaic02',
      image_resolutions: ['small']
    }
  });

  t.is(cdn, 'mosaic02');
  t.deepEqual(imageResolutions, { small: 'catalog' });
});

test('media_transform: mediaTransform middleware', t => {
  const tranformedJSON = mediaTransform(JSON.parse(json));

  t.deepEqual(tranformedJSON.images, [
    { type: 'IMAGE',
      mediaCharacter: 'NON_MODEL',
      resolutions: {
        thumbnail: 'https://mosaic01.ztat.net/vgs/media/pdp-thumb/SO/25/4J/00/0C/00/SO254J000-C00@1.1.jpg',
        medium: 'https://mosaic01.ztat.net/vgs/media/detail/SO/25/4J/00/0C/00/SO254J000-C00@1.1.jpg',
        large: 'https://mosaic01.ztat.net/vgs/media/large/SO/25/4J/00/0C/00/SO254J000-C00@1.1.jpg'
      }
    }, {
      type: 'IMAGE',
      mediaCharacter: 'NON_MODEL',
      resolutions: {
        thumbnail: 'https://mosaic01.ztat.net/vgs/media/pdp-thumb/SO/25/4J/00/0C/00/SO254J000-C00@2.1.jpg',
        medium: 'https://mosaic01.ztat.net/vgs/media/detail/SO/25/4J/00/0C/00/SO254J000-C00@2.1.jpg',
        large: 'https://mosaic01.ztat.net/vgs/media/large/SO/25/4J/00/0C/00/SO254J000-C00@2.1.jpg'
      }
    }, {
      type: 'IMAGE',
      mediaCharacter: 'NON_MODEL',
      resolutions: {
        thumbnail: 'https://mosaic01.ztat.net/vgs/media/pdp-thumb/SO/25/4J/00/0C/00/SO254J000-C00@3.1.jpg',
        medium: 'https://mosaic01.ztat.net/vgs/media/detail/SO/25/4J/00/0C/00/SO254J000-C00@3.1.jpg',
        large: 'https://mosaic01.ztat.net/vgs/media/large/SO/25/4J/00/0C/00/SO254J000-C00@3.1.jpg'
      }
    }
  ]);

  t.deepEqual(tranformedJSON.videos, [
    {
      type: 'VIDEO_THUMBNAIL',
      mediaCharacter: 'UNKNOWN',
      url: 'https://mosaic01.ztat.net/vgs/comet/LE/22/1N/02/PK/11/VIDEO/PREVIEW_IMG/1479494993512.jpg'
    }, {
      type: 'VIDEO_HD',
      mediaCharacter: 'UNKNOWN',
      url: 'https://mosaic01.ztat.net/vgs/comet/LE/22/1N/02/PK/11/VIDEO/HD/1479494993512.mp4'
    }
  ]);

  t.is(tranformedJSON.media, undefined);
});
