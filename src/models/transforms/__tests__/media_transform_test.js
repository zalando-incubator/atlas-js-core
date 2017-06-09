import test from 'ava';
import { createMediaUrl } from '../media_trasform';

test('media_trasform -> createMediaUrl', t => {
  const opts = { resolution: 'large', path: 'LE/22/1N/02/PK/11/LE221N02P-K11@7.jpg' };
  let result = 'https://mosaic01.ztat.net/vgs/media/large/LE/22/1N/02/PK/11/LE221N02P-K11@7.jpg';

  t.is(createMediaUrl('IMAGE', opts), result);

  result = 'https://mosaic01.ztat.net/vgs/comet/LE/22/1N/02/PK/11/VIDEO/LOW_QUALITY/1479494994821.mp4';

  t.is(createMediaUrl('VIDEO', { path: 'comet/LE/22/1N/02/PK/11/VIDEO/LOW_QUALITY/1479494994821.mp4' }), result);
});
