$(document).ready(function(){
	var parseApplicationId = "Ob3JLE46mimF2Gd7MZUB4lST7KTsZmer30dfrcOp";
	var parseJavaScriptKey = "Y4Vobgv4F6z9IY6igG3zDllXY9Fdhz6QbjmjbqeF";

	Parse.initialize(parseApplicationId, parseJavaScriptKey);
	var Test = Parse.Object.extend('Test');
	var test = new Test();

	test.save(
		{ name : "John", text : "hi"},
		{ success : function(obj) {
			alert('Parse.com obj ' + obj + ' is saved.');
			},
			error : function(obj){
				alert('Error! Parse.com did not save obj: ' + obj);
			}
		}
	);
});