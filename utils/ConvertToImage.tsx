import RNFS from 'react-native-fs';

function base64ToFile(base64String : string, path :string) {
  const base64Data = base64String.replace(/^data:.+;base64,/, '');
  
  RNFS.writeFile(path, base64Data, 'base64')
    .then(() => {
      console.log('File berhasil disimpan di:', path);
    })
    .catch(err => {
      console.error('Gagal menyimpan file:', err);
    });
}

export default base64ToFile;
