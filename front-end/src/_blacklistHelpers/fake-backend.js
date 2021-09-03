import { Role } from '.'

export function configureFakeBackendForBlacklist() {
    // array in local storage for routers records
    let routers = JSON.parse(localStorage.getItem('routers')) || [{
        id: 1,
        label: 'Xiomi',
        number: 12378963,
    }];

    // monkey patch fetch to setup fake backend
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                const { method } = opts;
                switch (true) {
                    case url.endsWith('/blacklist') && method === 'GET':
                        return getRouters();
                    case url.match(/\/blacklist\/\d+$/) && method === 'GET':
                        return getRouterById();
                    case url.endsWith('/blacklist') && method === 'POST':
                        return createRouter();
                    case url.match(/\/blacklist\/\d+$/) && method === 'PUT':
                        return updateRouter();
                    case url.match(/\/blacklist\/\d+$/) && method === 'DELETE':
                        return deleteRouter();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions
            function getRouters() {
                return ok(routers);
            }

            function getRouterById() {
                let router = routers.find(x => x.id === idFromUrl());
                return ok(router);
            }

            function createRouter() {
                const router = body();

                if (routers.find(x => x.number === router.number)) {
                    return error(`Router with the serial number ${router.number} already exists`);
                }

                // assign routers id and a few other properties then save
                router.id = newRouterId();
                router.dateCreated = new Date().toISOString();
                delete router.confirmPassword;
                routers.push(router);
                localStorage.setItem('routers', JSON.stringify(routers));

                return ok();
            }

            function updateRouter() {
                let params = body();
                let router = routers.find(x => x.id === idFromUrl());

                // only update password if included
                if (!params.password) {
                    delete params.password;
                }
                // don't save confirm password
                delete params.confirmPassword;

                // update and save routers
                Object.assign(router, params);
                localStorage.setItem('routers', JSON.stringify(routers));

                return ok();
            }

            function deleteRouter() {
                routers = routers.filter(x => x.id !== idFromUrl());
                localStorage.setItem('routers', JSON.stringify(routers));

                return ok();
            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }

            function body() {
                return opts.body && JSON.parse(opts.body);
            }

            function newRouterId() {
                return routers.length ? Math.max(...routers.map(x => x.id)) + 1 : 1;
            }
        });
    }
};