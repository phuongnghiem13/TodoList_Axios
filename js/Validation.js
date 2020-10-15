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
}