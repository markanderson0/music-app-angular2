export const mockShowDetailsRequest =
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

export const mockShowDetailsResponse =
[
  {
    'date': '01-01-2016',
    'location': 'city1, country1',
    'venue': 'ven1',
    'videos': [
      {
        'playlistId': 'p123',
        'user': 'testUser1',
        'video': [
          {
            'audio': 5,
            'file': 'file1.mp4',
            'id': 'vid123',
            'image': '1.png',
            'songs': [
              'song1'
            ],
            'songsString': 'song1',
            'time': '20:00',
            'views': 100,
            'video': 7
          }
        ]
      }
    ]
  }
];

export const mockVideoDetailsResponse =
[
  {
    'audio': 5,
    'video' : 7,
    'views': 100,
    'songsString': 'song1',
    'time': '20:00',
    'file': 'file1.mp4'
  }
];
