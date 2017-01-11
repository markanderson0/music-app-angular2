export const mockRequest =
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
                  'file': '1.mp4',
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
      'id': '234qwe',
      'artist': 'artist2',
      'shows': [
        {
          'id': 'show234',
          'date': '02-01-2016',
          'venue': 'ven2',
          'location': 'city2, country2',
          'videos': [
            {
              'user': 'testUser2',
              'playlistId': 'p234',
              'video': [
                {
                  'id': 'vid234',
                  'file': '2.mp4',
                  'image': '2.png',
                  'songs': [
                    'song2'
                  ],
                  'songsString': 'song2',
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
    }
  ]
};

export const mockResponse =
  [
    {
      'artistId': '123qwe',
      'artistName': 'artist1',
      'shows': [
        {
          'date': '01-01-2016',
          'venue': 'ven1',
          'location': 'city1, country1',
          'id': 'show123',
          'playlistId': 'p123',
          'videos': [
            {
              'id': 'vid123',
              'file': '1.mp4',
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
    },
  ];