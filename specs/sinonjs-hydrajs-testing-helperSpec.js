(function () {
  Hydra.testing.setTestFramework(true);
  Hydra.module.register('test', ['console'], function (cons) {
    return {
      init: function () {
        cons.log('test');
      }
    };
  });

  describe('SinonJS Hydra testing helper', function () {
    it('should check that you will get an object with all their methods being stubbed', function () {
      Hydra.module.test('test', undefined, function ( oModule ) {
        oModule.init();
        expect(oModule.mocks.console.log.callCount).toEqual(1);
      } );
    });
  });

  describe('Hydra module extend', function () {
    var sModuleId = 'base_module'
    , flag = false
    , sExtendedModuleId = 'extended_module'
    , oModuleInstance
    , fpBaseModuleCreator = function () {
      return {
        init: function () {
          this.method1();
        },
        method1: function () {
          alert('Launching method1');
        },
        prop1: 'prop1',
        prop2: 'prop2'
      };
    }
    , fpExtendedModule = function (oBus, oModule, oLogger, oApi, oBase) {
      return {
        init: function (){
          oBase.init.call(this);
        }
      };
    };
    beforeEach( function () {
      Hydra.setTestFramework( jasmine );
      sinon.stub(window, 'alert');
    });
    afterEach( function () {
      window.alert.restore();
      Hydra.setTestFramework( null );
    } );
    it('should check that we can access to the stubbed base module', function (done){
      Hydra.module.register( sModuleId, fpBaseModuleCreator );
      var oPromise = Hydra.module.extend( sModuleId, sExtendedModuleId, fpExtendedModule );
      oPromise.then(function () {
        Hydra.module.test(sExtendedModuleId, function ( oModule ) {
          oModuleInstance = oModule;
        });
        oModuleInstance.init();
        expect( oModuleInstance.mocks.parent.init.callCount ).toEqual( 1 );
        expect( oModuleInstance.mocks.parent.method1.callCount).toEqual( 0 );
        done();
      });
    });
  });
}());
