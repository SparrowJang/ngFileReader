
(function( angular ){


  var app = angular.module( 'ngFileReader', [] );

  app.directive( "ngFileReader", function(){

    var parseParams = function( attrs ){

      return {
        multiple:attrs.multiple != undefined
      };
    };

    var init_ = function( $elem, inputParams ){

      var $input = $elem.find( "input" );

      if ( inputParams.multiple ) $input.attr( 'multiple', true );

    };

    return {

      scope:{
        onSelected:"&",
        onReaded:"&",
        readMethod:"=",
        readEncoding:"=",
        filereader:"@"
      },

      template:"<input type='file'/>",

      link:function( scope, $elem, attrs ){

        var inputParams = parseParams( attrs );

        if ( window.File == undefined ) {

          $elem.fileReader({

            multiple:inputParams.multiple,
            debugMode:attrs.debugMode,
            filereader:scope.filereader
          });

        } else {

          init_( $elem, inputParams );
        }

        $elem.on( 'change', function( evt ){

          scope.onSelected( {files:evt.target.files} );

          angular.forEach( evt.target.files, function( file ){

            var readMethod = scope.readMethod;

            if ( readMethod ) {

              var fileReader = new FileReader();

              fileReader.addEventListener( 'loadend', function( e ){

                scope.onReaded( {event:e,file:file} );
                scope.$apply();
              });

              fileReader[ readMethod ] && fileReader[ readMethod ]( file, scope.readEncoding );

            }
          });

          $elem.find("input").val('');
          //console.log( 'change' );
          scope.$apply();
        });

      }
    };

  });

  app.filter( 'fileSize', function(){

      return function( total, bit ){

          if ( !total ) return "";

          var size_types = ["k","m","g","t"],
              output = total,
              index = -1;

          while ( output > 1024 ) {

            var output = output / 1024;

            index ++;

            if ( output < 1 || index == 3 ) {

              break;
            }
            
          }

          return output.toFixed( bit ? bit : 1 ) + " " + ( size_types[index]? size_types[index]:"" );

      };
  });


})( angular );

