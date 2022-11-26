const cdnBaseURL = 'https://hs3-cf.behtarino.com/static/images/behtarino-web';
const redirectLoginBaseUrl =
  process.env.REACT_APP_ENV === 'stage'
    ? process.env.REACT_APP_REDIRECT_URL
    : 'https://behtarino.com';
const apiBaseURL =
  process.env.REACT_APP_ENV === 'stage'
    ? process.env.REACT_APP_PUBLIC_URL
    : 'https://bck.behtarino.com/api/v1';
const MAP_IR_API_KEY =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY3ZTNiN2MzN2Q3YTczNTQ1NWJmY2M1ZjQzNGI2YzFjYjg3NjBiOTE0ODYzMTA5OTFiNmZiNTFmZTdmZTUyZDRhODU0NDJjZTE4ZjUwZGQ2In0.eyJhdWQiOiIxMDkyNiIsImp0aSI6IjY3ZTNiN2MzN2Q3YTczNTQ1NWJmY2M1ZjQzNGI2YzFjYjg3NjBiOTE0ODYzMTA5OTFiNmZiNTFmZTdmZTUyZDRhODU0NDJjZTE4ZjUwZGQ2IiwiaWF0IjoxNjAwNjg0OTc5LCJuYmYiOjE2MDA2ODQ5NzksImV4cCI6MTYwMzE5MDU3OSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.RY3cHTQHUG-A6pgnoQlSIgfpo-daER5hKKKFHcMVHETUS7ieQqyQ5iyhLOB-02IRKjbK-8_x0njtGji9XNyfwGjFbAuVCb2TQTY_-VZRr1mknCO8ax1tbHXhGhzT_W1sJpEbbbl_qeFtNPNUwuN7CdJhRb_LMhmODx62Jx9nurkwUSzO2TLwRqEC47aSqOkmhd26i5lxi44Zb3scnhS6qFHbp0OXD-d1HOIdJTB70ln9bmctfkca_r29ufuiEny4yuB7NX_hzVsA3MOu_9pFocSr2kchavj5XgyTesfhovyIjBdlNF-Hi40dj1T3RGtuj1fii9zMv8IAiEc8OAhZUA';

export { cdnBaseURL, apiBaseURL, MAP_IR_API_KEY, redirectLoginBaseUrl };
