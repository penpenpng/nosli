import { error } from '@sveltejs/kit';
import { nip19 } from 'nostr-tools';
import { browser } from '$app/environment';
import type { PageLoad } from './$types';
import RxNostrClient from '$lib/services/RxNostrClient';
import * as settings from '$lib/services/settings';

export const load = (async ({ params }) => {
  let pubkey: string;
  try {
    pubkey = nip19.decode(params.id).data;
  } catch {
    throw error(404, 'Not Found &#128148;');
  }

  if (typeof pubkey !== 'string') {
    throw error(500, 'Internal Server Error &#129327;');
  }

  let client: RxNostrClient;
  if (browser) {
    client = new RxNostrClient({ relays: settings.defaultRelays });
  }

  return {
    client,
    pubkey
  };
}) satisfies PageLoad;
