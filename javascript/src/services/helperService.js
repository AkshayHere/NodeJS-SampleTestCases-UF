class HelperService {

  // Sort an array alphabetically by property value
  static sortArrayByProperty(array, propertyName){
    return array.sort(function(a, b){
      if(a[propertyName] < b[propertyName]) { return -1; }
      if(a[propertyName] > b[propertyName]) { return 1; }
      return 0;
    });
  }
}

export default HelperService;