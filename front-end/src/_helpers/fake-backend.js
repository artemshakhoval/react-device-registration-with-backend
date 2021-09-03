import { Role } from './'

export function configureFakeBackend() {
    // array in local storage for user records
    let users = JSON.parse(localStorage.getItem('users')) || [{
        id: 1,
        label: 'Huawei',
        firstName: 'Joe',
        lastName: 'Bloggs',
        email: 'joe@bloggs.com',
        number: 123456,
        password: 'joe123'
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
                    case url.endsWith('/users') && method === 'GET':
                        return getOLTs();
                    case url.match(/\/users\/\d+$/) && method === 'GET':
                        return getOLTById();
                    case url.endsWith('/users') && method === 'POST':
                        return createOLT();
                    case url.match(/\/users\/\d+$/) && method === 'PUT':
                        return updateOLT();
                    case url.match(/\/users\/\d+$/) && method === 'DELETE':
                        return deleteOLT();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function getOLTs() {
                return ok(users);
            }

            function getOLTById() {
                let user = users.find(x => x.id === idFromUrl());
                return ok(user);
            }

            function createOLT() {
                const user = body();

                if (users.find(x => x.email === user.email)) {
                    return error(`OLT with the email ${user.email} already exists`);
                }
                if (users.find(x => x.number === user.number)) {
                    return error(`OLT with the serial number ${user.number} already exists`);
                }

                // assign user id and a few other properties then save
                user.id = newOLTId();
                user.dateCreated = new Date().toISOString();
                delete user.confirmPassword;
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));

                return ok();
            }

            function updateOLT() {
                let params = body();
                let user = users.find(x => x.id === idFromUrl());

                // only update password if included
                if (!params.password) {
                    delete params.password;
                }
                // don't save confirm password
                delete params.confirmPassword;

                // update and save user
                Object.assign(user, params);
                localStorage.setItem('users', JSON.stringify(users));

                return ok();
            }

            function deleteOLT() {
                users = users.filter(x => x.id !== idFromUrl());
                localStorage.setItem('users', JSON.stringify(users));

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

            function newOLTId() {
                return users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            }
        });
    }
};