export const mockRequest =
  {
    'artists':
    {
      'items': [
        {
          'id': '1',
          'name': 'Muse',
          'images': [
            {
              'url': '1.jpg'
            }
          ]
        },
        {
          'id': '2',
          'name': 'Muses',
          'images': [
            {
              'url': '2.jpg'
            }
          ]
        }
      ]
    }
  };

export const mockResponse =
  [
    {
      'image': '1.jpg',
      'name': 'Muse'
    },
    {
      'image': '2.jpg',
      'name': 'Muses'
    }
  ];
