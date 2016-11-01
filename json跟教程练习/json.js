//利用JSON全局对象的parse()方法，JSON字符串转换成JavaScript原生值,且拥有第二个参数
 //var box = '[{"title":"a","num":2},{"title":"b","num":3},{"title":"c","num":4}]';
 //var json = JSON.parse(box, function (key, value) {
 //    if (key == "num") {
 //        return "sdf:" + value;
 //    } else if (key == "title") {
 //        return "as:" + value;
 //    } else {
 //        return value;
 //    }
 //});
 ////alert(typeof json);
 //alert(json[1].title);
 //alert(json[1].num);



//利用JSON全局对象的stringify()方法，将JavaScript原生值转换成JSON字符串
//var box = [{title:"a",num:2},{title:"b",num:3},{title:"c",num:4}];
//var json = JSON.stringify(box,['num'],2);
//alert(json);




//利用JSON全局对象的stringify()方法有三个参数
//第一个参数是需要转换成JSON字符串的JavaScript原生值
//第二个参数可以是一个数组（需要保留的对象属性），可以是null（不设置保留属性）,可以是函数（过滤属性名，添加自己想要的内容）
//第三个参数可以是数字（设置缩进值），可以是字符串（以此字符串为分隔符）
//var box = [{ title: "a", num: 2 }, { title: "b", num: 3 }, { title: "c", num: 4 }];
////var json = JSON.stringify(box, ["num"], 4);  //第二个参数可以是一个数组,第三个参数可以是数字
////var json = JSON.stringify(box, null, 'NO');  //第二个参数可以是一个null,第三个参数可以是字符串
//var json = JSON.stringify(box, function (key, value) {    //第二个参数可以是一个函数（函数的两个参数中key对应的是对象键值对中的键，value对应的是对象键值对中的值）,第三个参数可以是数字，
//    if (key == "title") {
//        return "Mr." + value;
//    } else if (key == "num") {
//        return "Number" + value;
//    } else {
//        return value;
//    }
//}, 4);
//alert(json);




//利用toJSON()方法过滤属性，将一组js原生值经过过滤返回成JSON字符串
//var box = [
//    {
//        title: "a",
//        num: 2,
//        toJSON: function () {
//            return this.num;
//        }
//    },
//    {
//        title: "b",
//        num: 3,
//        toJSON: function () {
//            return this.title;
//        }
//    },
//    {
//        title: "c",
//        num: 4,
//        toJSON: function () {
//            return this.num;
//        }
//    }
//];
//var json = JSON.stringify(box, ["title"], 4);
//alert(json);
//PS：toJSON()方法的优先级要大于stringify()中的第二个参数的优先级，所以就会优先返回toJSON的返回值