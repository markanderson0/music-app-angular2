'use strict';

export const mockArtistPictureRequest =
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

export const mockArtistPictureResponse =
    [
      {
        'pic': '1.jpg',
        'id': '1'
      }
    ];

export const mockArtistAlbumsRequest =
  {
    'items': [
      {
        'id': '1alb',
        'name': '1album',
        'images': [
          {
            'url': '1album.jpg'
          }
        ]
      },
      {
        'id': '2alb',
        'name': '2album',
        'images': [
          {
            'url': '2album.jpg'
          }
        ]
      }
    ]
  };

export const mockArtistAlbumsResponse =
    [
      {
        'id': '1alb',
        'name': '1album',
        'year': '',
        'pic': '1album.jpg',
        'songs': []
      },
      {
        'id': '2alb',
        'name': '2album',
        'year': '',
        'pic': '2album.jpg',
        'songs': []
      }
    ];

export const mockAlbumTracksRequest =
  {
    'albums': [
      {
        'id': '1alb',
        'name': '1album',
        'release_date': '2016-01-01',
        'tracks': {
          'items': [
            {
              'name': 'song1',
              'track_number': 1
            },
            {
              'name': 'song2',
              'track_number': 2
            }
          ]
        },
        'images': [
          {
            'url': '1album.jpg'
          }
        ]
      },
      {
        'id': '2alb',
        'name': '2album',
        'release_date': '2015-01-01',
        'tracks': {
          'items': [
            {
              'name': 'song3',
              'track_number': 1
            },
            {
              'name': 'song4',
              'track_number': 2
            }
          ]
        },
        'images': [
          {
            'url': '2album.jpg'
          }
        ]
      }
    ]
  };

export const mockAlbumTracksResponse =
  [
    {
      'name': '1album',
      'cover': '1album.jpg',
      'year': '2016',
      'songs': [
        {
          'trackNum': 1,
          'name': 'song1'
        },
        {
          'trackNum': 2,
          'name': 'song2'
        }
      ]
    },
    {
      'name': '2album',
      'cover': '2album.jpg',
      'year': '2015',
      'songs': [
        {
          'trackNum': 1,
          'name': 'song3'
        },
        {
          'trackNum': 2,
          'name': 'song4'
        }
      ]
    }
  ];
