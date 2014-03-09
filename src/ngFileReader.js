
(function( angular ){

  'use strict';

  var app = angular.module( 'ngFileReader', [] );

  app.directive( "ngFileReader", function(){

    /**
    * @param {Object} attrs
    * @return Object
    */
    var parseParams_ = function( attrs ){

      return {
        multiple:attrs.multiple != undefined
      };
    };

    /**
    * @param {jQuery|jqlite} $elem
    * @param {Object} inputParams
    */
    var init_ = function( $elem, inputParams ){

      var $input = $elem.find( "input" );

      if ( inputParams.multiple ) $input.attr( 'multiple', true );

    };

    var events = {

      /**
      * @param {Scope} scope
      * @param {FileList} files
      */
      onSelected:function( scope, files ){

        scope.onSelected( {files:files} );
      },

      /**
      * @param {Scope} scope
      * @param {FileList} files
      */
      onReadered:function( scope, files ){

        angular.forEach( files, function( file ){

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

      }
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

      /**
      * @param {Scope} scope
      * @param {jQuery|jqlite} $elem
      * @param {Object} attrs
      */
      link:function( scope, $elem, attrs ){

        var inputParams = parseParams_( attrs );

        if ( window.File == undefined ) {

          $elem.fileReader({

            multiple:inputParams.multiple,
            debugMode:attrs.debugMode,
            filereader:scope.filereader
          });


        } else {

          init_( $elem, inputParams );

          var ignoreDrag = function( e ){

            e.preventDefault();
          };

          $elem.on( "dragenter", ignoreDrag );
          $elem.on( "dragover", ignoreDrag );
          $elem.on( "drop", function( e ){

              ignoreDrag( e );

              //console.log( e.dataTransfer.files.length );

              var originalEvent = e.originalEvent ? e.originalEvent : e,

              files = originalEvent.dataTransfer.files;

              //console.log( originalEvent );

              events.onSelected( scope, files );

              events.onReadered( scope, files );

          });

        }

        $elem.on( 'change', function( evt ){

          var files = evt.target.files;

          events.onSelected( scope, files );

          events.onReadered( scope, files );

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

