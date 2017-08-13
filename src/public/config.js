(function() {
    angular
        .module('RecipEat')
        .config(configuration)
        .run(function($rootScope, $location) {
            $('.fading-popup-message .close').on('click', function() {
                $('.fading-popup-message').stop({ clearQueue: true }).fadeOut(200);
            });

            $rootScope.displayFadeWarning = function(message) {
                console.log(message)
                var $warningMessage = $('#fading-warning-message');
                $warningMessage.hide().stop({ clearQueue: true });

                $('#fading-warning-message p').text(message);
                $warningMessage.fadeIn(2000, function() {
                    $warningMessage.delay(5000).fadeOut(2000);
                })
            }

            $rootScope.$on('$routeChangeStart', function(event, next, current) {
                if ($('#collapsible-navigationbar').hasClass('collapse in')) {
                    $('.navbar-toggle').click();
                };
            });
        });

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/homepage/templates/homepage.view.client.html'
            })
            .when('/search/recipe/:recipeSearchText', {
                templateUrl: 'views/recipeSearch/templates/recipeSearch.view.client.html',
                controller: 'recipeSearchController',
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model',
                resolve: {
                    asdf: isNotLoggedIn
                }
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model',
                resolve: {
                    asdf: isNotLoggedIn
                }
            })




            .when('/testNutritionix', {
                templateUrl: 'views/test/templates/nutritionixTestSearch.view.client.html',
                controller: 'nutritionixTestSearchController',
                controllerAs: 'model'
            }).when('/testFood2Fork', {
                templateUrl: 'views/test/templates/food2ForkTestSearch.view.client.html',
                controller: 'food2ForkTestSearchController',
                controllerAs: 'model'
            }).when('/testNutritionix/nutritionInfo/:nid', {
                templateUrl: 'views/test/templates/nutritionDetails.view.client.html',
                controller: 'nutritionDetailsController',
                controllerAs: 'model'
            }).when('/testFood2Fork/recipe/:rid', {
                templateUrl: 'views/test/templates/recipeDetails.view.client.html',
                controller: 'recipeDetailsController',
                controllerAs: 'model'
            });
    }

    function isNotLoggedIn($rootScope, $location, userService) {
        return userService.getLoggedInUser()
            .then(function(user) {
                if (user) {
                    $location.url('');
                    $rootScope.displayFadeWarning('You are already logged in.')
                    return true;
                }
            })
    }

})();