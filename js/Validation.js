function Validation() {
  this.kiemTraRong = function (input, spanId, mess) {
    if (input === "") {
      getEle(spanId).style.display = "block";
      getEle(spanId).innerHTML = mess;
      return false;
    }
    getEle(spanId).style.display = "none";
    getEle(spanId).innerHTML = "";
    return true;
  }

  this.kiemTraTrungTask = function(input, spanId, mess, listArr){
    for(var i = 0; i < listArr.length; i++){
      if(input === listArr[i].taskName){
        getEle(spanId).style.display = "block";
        getEle(spanId).innerHTML = mess;
        return false;
      }
    }
    getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
  }
}