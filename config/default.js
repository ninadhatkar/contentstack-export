module.exports = {
  versioning: false,
  host: 'https://stag-api.contentstack.io/v3',
  cdn: 'https://cdn.contentstack.io/v3',
  modules: {
    types: [
      'assets',
      'locales',
      'environments',
      'extensions',
      'webhooks',
      'global_fields',
      'content_types',
      'entries'
      
    ],
    locales: {
      dirName: 'locales',
      fileName: 'locales.json',
      requiredKeys: [
        'code',
        'uid',
        'name',
        'fallback_locale'
      ]
    },
    environments: {
      dirName: 'environments',
      fileName: 'environments.json'
    },
    webhooks: {
      dirName: 'webhooks',
      fileName: 'webhooks.json'
    },
    globalfields: {
      dirName: 'global_fields',
      fileName: 'globalfields.json'
    },
    assets: {
      dirName: 'assets',
      fileName: 'assets.json',
      // This is the total no. of asset objects fetched in each 'get assets' call
      batchLimit: 20,
      host: 'https://images.contentstack.io',
      invalidKeys: [
        'created_at',
        'updated_at',
        'created_by',
        'updated_by',
        '_metadata',
        'published'
      ],
      // no of asset version files (of a single asset) that'll be downloaded parallelly
      downloadLimit: 5
    },
    content_types: {
      dirName: 'content_types',
      fileName: 'content_types.json',
      validKeys: [
        'title',
        'uid',
        'field_rules',
        'schema',
        'options',
        'singleton',
        'description'
      ],
      // total no of content types fetched in each 'get content types' call
      limit: 100
    },
    entries: {
      dirName: 'entries',
      fileName: 'entries.json',
      invalidKeys: [
        'created_at',
        'updated_at',
        'created_by',
        'updated_by',
        '_metadata',
        'published'
      ],
      batchLimit: 20,
      downloadLimit: 5,
      // total no of entries fetched in each content type in a single call
      limit: 100
    },
    
    extensions: {
      dirName: 'extensions',
      fileName: 'extensions.json'
    }
  },
  apis: {
    userSession: '/user-session/',
    globalfields: '/global_fields/',
    locales: '/locales/',
    environments: '/environments/',
    assets: '/assets/',
    content_types: '/content_types/',
    entries: '/entries/',
    users: '/stacks',
    extension: '/extensions',
    webhooks: '/webhooks/'
  }
}
