export const mockNameRequest =
  {
    'artists':
    {
      'items': [
        {
          'id': '1',
          'name': 'artist1',
          'images': [
            {
              'url': '1.jpg'
            }
          ]
        },
        {
          'id': '2',
          'name': 'artist2',
          'images': [
            {
              'url': '2.jpg'
            }
          ]
        }
      ]
    }
  };

export const mockNameResponse = 'artist1';

export const mockArtistRequest =
{
  'setlists': {
    'setlist': [
      {
        'artist': {
          '@name': 'artist1',
          '@sortName': 'artist1',
          '@mbid': 'm123'
        }
      },
      {
        'artist': {
          '@name': 'artist2',
          '@sortName': 'artist2',
          '@mbid': 'm234'
        }
      }
    ]
  }
};

export const mockArtistResponse = 'm123';

export const mockArtistShowsRequest =
{
  'setlists': {
    '@itemsPerPage': '20',
    '@total': '1090',
    'setlist': [
      {
        '@id': '123',
        '@tour': 'artistTour',
        '@eventDate': '01-01-2016',
        'venue': {
          '@name': 'ven1',
          'city': {
            '@name': 'city1',
            '@stateCode': '',
            'country': {
              '@name': 'country1'
            },
            'coords': {
              '@lat': '123',
              '@long': '123'
            }
          }
        },
        'artist': {
          '@name': 'artist1',
          '@sortName': 'artist1',
          '@mbid': 'm123'
        },
        'sets': {
          'set': [
            {
              'song': [
                {
                  '@name': 'song1'
                },
                {
                  '@name': 'song2'
                }
              ]
            },
            {
              'song': [
                {
                  '@name': 'song3'
                }
              ]
            }
          ]
        }
      },
      {
        '@id': '234',
        '@tour': 'artistTour',
        '@eventDate': '02-01-2016',
        'venue': {
          '@name': 'ven2',
          'city': {
            '@name': 'city2',
            '@stateCode': 'ct',
            'country': {
              '@name': 'United States'
            },
            'coords': {
              '@lat': '234',
              '@long': '234'
            }
          }
        },
        'artist': {
          '@name': 'artist1',
          '@sortName': 'artist1',
          '@mbid': 'm123'
        },
        'sets': {
          'set': [
            {
              'song': [
                {
                  '@name': 'song4'
                },
                {
                  '@name': 'song5'
                }
              ]
            }
          ]
        }
      }
    ]
  }
};

export const mockArtistShowsResponse = [
  {
    'tour': 'artistTour',
    'id': '123',
    'date': '01-01-2016',
    'venue': 'ven1',
    'country': 'country1',
    'city': 'city1',
    'state': '',
    'latitude': '123',
    'longitude': '123',
    'songs': [
      'song1',
      'song2',
      'song3'
    ],
    'isCollapsed': false
  },
  {
    'tour': 'artistTour',
    'id': '234',
    'date': '02-01-2016',
    'venue': 'ven2',
    'country': 'United States',
    'city': 'city2',
    'state': 'ct',
    'latitude': '234',
    'longitude': '234',
    'songs': [
      'song4',
      'song5'
    ],
    'isCollapsed': false
  }
];
