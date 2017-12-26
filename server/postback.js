import { HTTP } from 'meteor/http';

export const callPostback = (code, clickId) => {
  console.log('callPostback', code);

  const referrer = Referrers.findOne({ code }, {
    fields: { postbackUrl: 1 },
  });

  console.log(referrer);

  if (!referrer)
    return;

  // const postbackUrl = 'http://ad.performance.mobivisits.com/postback?clickid=draftfantasycpa&sum=3500';
  const {
    cpa,
    postbackUrl = 'http://ad.performance.mobivisits.com/postback',
    clickIdParam = Referrer._clickIdParam,
  } = referrer;

  console.log(postbackUrl);

  if (!postbackUrl)
    return;

  const params = {
    [clickIdParam]: clickId,
    sum: cpa,
  };

  console.log(postbackUrl);
  console.log(params);

  HTTP.get(postbackUrl, {
    params,
  }, (error, result) => {
    console.log('response');

    if (error)
      console.error('error');
    else
      console.log('result');
  });
};
