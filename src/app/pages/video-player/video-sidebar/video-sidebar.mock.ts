export const mockVideosRequest =
{
  'data': [
    {
      'id': '123qwe',
      'artist': 'artist1',
      'shows': [
        {
          'id': 'show123',
          'date': '01-01-2016',
          'venue': 'ven1',
          'location': 'city1, country1',
          'videos': [
            {
              'user': 'testUser1',
              'playlistId': 'p123',
              'video': [
                {
                  'id': 'vid123',
                  'file': 'file1.mp4',
                  'image': '1.png',
                  'songs': [
                    'song1'
                  ],
                  'songsString': 'song1',
                  'time': '20:00',
                  'views': 100,
                  'audio': 5,
                  'video': 7
                }
              ]
            }
          ]
        }
      ]
    },
    {
      'id': '234wer',
      'artist': 'artist2',
      'shows': [
        {
          'id': 'show456',
          'date': '12-01-2016',
          'venue': 'ven2',
          'location': 'city2, country2',
          'videos': [
            {
              'user': 'testUser1',
              'playlistId': 'p789',
              'video': [
                {
                  'id': 'vid234',
                  'file': 'file2.mp4',
                  'image': '2.png',
                  'songs': [
                    'song2'
                  ],
                  'songsString': 'song2',
                  'time': '20:00',
                  'views': 86,
                  'audio': 5,
                  'video': 6
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const mockVideosResponse =
[
  {
    'id': 'vid123',
    'file': 'file1.mp4',
    'image': '1.png',
    'audio': 5,
    'video' : 7,
    'views': 100,
    'songs': [
      'song1'
    ],
    'songsString': 'song1',
    'time': '20:00',
    'date': '01-01-2016',
    'venue': 'ven1',
    'location': 'city1, country1'
  }
];

export const mockSetlistRequest =
{
  'setlists': {
    '@itemsPerPage': '20',
    '@total': '1090',
    'setlist': {
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
    }
  }
};

export const mockSetlistResponse =
[
  'song1',
  'song2',
  'song3'
];
