import test from 'ava';
import { checkStatus, checkRedirect } from '../atlas_sdk_client';

const successCode = 200;

test('Should return Reponse with success code', t => {
  const response = new Response(null, { status: 200 });

  t.is(checkStatus(response).status, successCode);
});

test('Should throw Error with bad request code', t => {
  const response = new Response(null, { status: 400 });

  try {
    checkStatus(response);
  } catch (e) {
    t.pass('Error occured with bad request');
  }
});

test('Should return redirect Response when Location header is preset', t => {
  const response = new Response(null, { status: 204, headers: { Location: 'redirect' } });

  checkRedirect(response).json().then(json => {
    t.is(json.redirect_url, 'redirect');
  });
});

test('Should return intial Response when no Location header is preset', t => {
  const response = new Response(null, { status: 200 });

  t.is(checkRedirect(response).status, successCode);
});
