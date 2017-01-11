export const mockEventRequest =
{
  'setlists': {
    '@itemsPerPage': '20',
    '@total': '2',
    '@page': '1',
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

export const mockEventResponse =
[
  {
    'date': '01-01-2016',
    'venue': 'ven1',
    'id': 'event1'
  },
  {
    'date': '02-01-2016',
    'venue': 'ven2',
    'id': 'event2'
  },
];

export const mockSongsRequest =
{
  'setlists': {
    'setlist': [
      {
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

export const mockSongsResponse = ['song1', 'song2', 'song3'];
