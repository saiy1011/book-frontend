// https://typedoc.org/options/configuration/#javascript-files
/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
    out: '.extras/doc/api',
    entryPoints: ['api', 'app', 'components', 'context', 'helper', 'hooks'],
    entryPointStrategy: 'expand',
    excludePrivate: true,
    validation: {
        invalidLink: true,
    },
};
