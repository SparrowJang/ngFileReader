ngFileReader
=============

![demo image](/images/screenprint.png)

This is file reader component on angular.

##LiveDemo

[demo](http://www.sparrowjang.com/ngFileReader/example/index.html)

##Support

* IE8+
* chrome
* firefox


##Dependency

* angularjs
* jQuery
* [FileReader](https://github.com/Jahdrien/FileReader)

You need load **jQuery** and **FileReader** if browser is not support `FileReader`.

And The base64 size only limit 32kb if you use base64 to set image on IE8.

You also use other [FileReader](https://github.com/Phlow2001/FileReader) version,if you don't want to use `fixed` position by flash.

##Install

```bash
bower install ngFileReader
```

##Usage

Set some attrs of element.

```html
<div ng-file-reader on-readed="onReaded( event, file )" read-method="readMethod"  multiple></div>

size:{{file.size | fileSize}}

<img ng-src="{{img}}">
```

Set a reader method.

```js
$scope.readMethod = "readAsDataURL";
```

Add a `on-readed` callback to set file size and img data.

```js
$scope.onReaded = function( e, file ){

  $scope.img = e.target.result;
  $scope.file = file;
};
```

##Attribute

###filereader
This is `swf` path, if you use ie8 ~ ie9.

###multiple
Input multiple property.

###debug-mode
Use `swf` only.

**ex:**

Set the attr on tag.

```
debug-mode="true"
```

###accept
accept file extensions.

##Parameter

###read-method

This is file reader method,when you selected file to call `read-method` method.

**ex:** `readAsDataURL`、`readAsText`、`readAsBinaryString`

Set the attr.

```js
read-method="readMethod"
```

Set a string value.

```js
$scope.readMethod = "readAsDataURL"
```

##Event

###on-selected `Event`
It will trigger this event if you has selected.

###on-readed `Event`
It will trigger this event When the selected file has readed by file reader.

##Filter

###fileSize

Transfer file size from number to unit.

```html
<!-- 1048576 => 1 m -->
{{file.size | fileSize}}
```

You can write this if you need round off to the 2nd decimal place.

```html
{{file.size | fileSize:2}}
```

##Run
 
run a server:

```bash
grunt server
```
 
Finally,open your brower,enter [http://localhost:3000/example/index.html](http://localhost/example/index.html).


##Minification

Just run `npm install` to install dependencies. Then run `grunt` for minification.

