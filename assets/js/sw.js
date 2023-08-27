const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/assets/vectors/block.svg',
    '/assets/vectors/block-break.svg',
    '/assets/vectors/block-empty.svg',
    '/assets/vectors/block-hard.svg',
    '/assets/vectors/block-ques.svg',
    '/assets/vectors/box-coin.svg',
    '/assets/vectors/bush.svg',
    '/assets/vectors/bush-cloud.svg',
    '/assets/vectors/bush-cloud-large.svg',
    '/assets/vectors/bush-cloud-med.svg',
    '/assets/vectors/bush-small.svg',
    '/assets/vectors/castle.svg',
    '/assets/vectors/character-mario.svg',
    '/assets/vectors/character-mario-big.svg',
    '/assets/vectors/cloud.svg',
    '/assets/vectors/cloud-large.svg',
    '/assets/vectors/cloud-med.svg',
    '/assets/vectors/coin.svg',
    '/assets/vectors/coin-ui.svg',
    '/assets/vectors/enemy-goomba.svg',
    '/assets/vectors/enemy-koopa.svg',
    '/assets/vectors/field.svg',
    '/assets/vectors/flag.svg',
    '/assets/vectors/flag-head.svg',
    '/assets/vectors/pipe-body.svg',
    '/assets/vectors/pipe-head.svg',
    '/assets/sfx/smb_1-up.wav',
    '/assets/sfx/smb_bowserfalls.wav',
    '/assets/sfx/smb_bowserfire.wav',
    '/assets/sfx/smb_breakblock.wav',
    '/assets/sfx/smb_bump.wav',
    '/assets/sfx/smb_coin.wav',
    '/assets/sfx/smb_fireball.wav',
    '/assets/sfx/smb_fireworks.wav',
    '/assets/sfx/smb_flagpole.wav',
    '/assets/sfx/smb_gameover.wav',
    '/assets/sfx/smb_jump-small.wav',
    '/assets/sfx/smb_jump-super.wav',
    '/assets/sfx/smb_kick.wav',
    '/assets/sfx/smb_mariodie.wav',
    '/assets/sfx/smb_pause.wav',
    '/assets/sfx/smb_pipe.wav',
    '/assets/sfx/smb_powerup.wav',
    '/assets/sfx/smb_powerup_appears.wav',
    '/assets/sfx/smb_stage_clear.wav',
    '/assets/sfx/smb_stomp.wav',
    '/assets/sfx/smb_vine.wav',
    '/assets/sfx/smb_warning.wav',
    '/assets/sfx/smb_world_clear.wav'
];

/*
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});
*/


function cacheResources(urlsToCache) {
    return caches.open(CACHE_NAME)
        .then((cache) => {
            return Promise.all(
                urlsToCache.map((url) => {
                    return fetch(url)
                        .then((response) => cache.put(url, response));
                })
            );
        });
}

cacheResources(urlsToCache)
    .then(() => {
        console.log('Resources cached successfully!');
    })
    .catch((error) => {
        console.error('Error caching resources:', error);
    });


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.match(event.request)
                    .then((response) => {
                        // If the requested resource is in the cache, return it
                        if (response) {
                            return response;
                        }

                        // If the resource is not in the cache, fetch it from the network
                        return fetch(event.request)
                            .then((networkResponse) => {
                                // Cache the fetched resource for future use
                                cache.put(event.request, networkResponse.clone());
                                return networkResponse;
                            });
                    });
            })
    );
});
