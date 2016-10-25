'use strict';

angular.module('openSenseMapApp')
  .controller('HeaderCtrl', ['$scope', '$rootScope', '$translate', '$route', 'OpenSenseBoxAPI', '$http', 'FilterActiveService', 'amMoment', 'tmhDynamicLocale', function ($scope, $rootScope, $translate, $route, OpenSenseBoxAPI, $http, FilterActiveService, amMoment, tmhDynamicLocale) {
  	$scope.osemapi = OpenSenseBoxAPI;

    $scope.changeLang = function (key) {
      $translate.use(key).then(function (key) {
        console.log('Sprache zu '+ key +' gewechselt.');
        $scope.key = key.split('_')[0];
        amMoment.changeLocale($scope.key);
        tmhDynamicLocale.set($scope.key);
      }, function (key) {
        console.log('Fehler beim wechseln zur Sprache ' + key);
      });
    };
    $scope.changeLang('de_DE');

    $rootScope.$watch('selectedBox', function() {
      $scope.box = $rootScope.selectedBox;
      console.log('box changed to '+$rootScope.selectedBox);
    });

  	$scope.counts = {
  		boxes: '',
  		measurements : ''
  	};
  	$http.get($scope.osemapi.url+'/stats')
  	 .success(function(data){
  		  $scope.counts.boxes = data[0];
  		  $scope.counts.measurements = data[1];
      }).error(function(){
  	});
    $scope.filterActive = FilterActiveService;
}]);
