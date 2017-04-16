(function () {
  'use strict';
  var mockObjectProperties = function(oObj) {
    var mock = {},
      oWhatever;
    for(var sKey in oObj) {
      oWhatever = oObj[sKey];
      if (typeof oWhatever === 'function' && oWhatever.toString() !== 'stub') {
        mock[sKey] = sinon.stub();
      } else {
        mock[sKey] = oWhatever;
      }
    }
    return mock;
  };

  function adapter(Hydra, sinon) {
    Hydra.testing.setMockLibrary(sinon, {
      getAllFunctionsStubbed: function (oObj) {
        var oMock = {};
        if(oObj.toString() === 'stub') {
          return oObj;
        }
        if (typeof oObj === 'function') {
          if (oObj.prototype) {
            oMock = sinon.stub();
            oMock.prototype = mockObjectProperties(oObj.prototype);
          } else {
            return sinon.stub();
          }
          return oMock;
        }
        oMock = mockObjectProperties(oObj); 
        return oMock;
      }
    });
    return Hydra;
  }

  if (typeof define !== 'undefined') {
    define('sinonjs-hydrajs-testing-helper', ['hydrajs-testing-helper', 'sinon'], adapter);
  } else {
    adapter(Hydra, sinon);
  }
}());
