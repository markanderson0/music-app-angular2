export const mockRequest =
{
  'findItemsAdvancedResponse': [{
    'searchResult': [{
      'item': [{
        'itemId': ['123'],
        'title': ['artist1 shirt'],
        'viewItemUrl': ['artist1shirt.com'],
        'galleryUrl': ['artist1shirt.jpg'],
        'sellingStatus': [{
          'convertedCurrentPrice': [{
            '__value__': '8'
          }]
        }],
        'shippingInfo': [{
          'shippingServiceCost': [{
            '__value__': '2'
          }]
        }]
      },
      {
        'itemId': ['234'],
        'title': ['artist1 poster'],
        'viewItemUrl': ['artist1poster.jpg.com'],
        'galleryUrl': ['artist1poster.jpg.jpg'],
        'sellingStatus': [{
          'convertedCurrentPrice': [{
            '__value__': '5'
          }]
        }],
        'shippingInfo': [{
          'shippingServiceCost': [{
            '__value__': '0'
          }]
        }]
      }]
    }]
  }]
};

export const mockResponse = [
  {
    'id': '123',
    'name': 'artist1 shirt',
    'pic': 'artist1shirt.jpg',
    'price': 10,
    'url': 'artist1shirt.com'
  },
  {
    'id': '234',
    'name': 'artist1 poster',
    'pic': 'artist1poster.jpg',
    'price': 5,
    'url': 'artist1poster.com'
  }
];
