export const mockRequest =
{
  '_embedded': {
    'events': [
      {
        'name': 'artist1',
        'url': 'artist1tickets.com',
        'dates': {
          'start': {
            'localDate': '2016-01-01'
          }
        },
        '_embedded': {
          'venues': [
            {
              'name': 'ven1',
              'city': {
                'name': 'city1'
              },
              'state': {
                'name': 'state1',
                'stateCode': 's1'
              },
              'country': {
                'name': 'United States',
                'countryCode': 'US'
              }
            }
          ]
        }
      }
    ]
  },
  'page': {
    'totalPages': 1
  }
};

export const mockResponse =
  [
    {
      'name': 'artist1',
      'url': 'artist1tickets.com',
      'date': '2016-01-01',
      'venue': 'ven1',
      'city': 'city1',
      'state': 's1',
      'country': 'US',
      'lat': 1000,
      'lng': 1000
    }
  ];

export const mockSimpleResponse =
  [
    {
      'name': 'artist1',
      'url': 'artist1tickets.com',
      'date': '2016-01-01',
      'venue': 'ven1',
      'city': 'city1',
      'state': 's1',
      'country': 'US'
    }
  ];