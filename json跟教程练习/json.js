//����JSONȫ�ֶ����parse()������JSON�ַ���ת����JavaScriptԭ��ֵ,��ӵ�еڶ�������
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



//����JSONȫ�ֶ����stringify()��������JavaScriptԭ��ֵת����JSON�ַ���
//var box = [{title:"a",num:2},{title:"b",num:3},{title:"c",num:4}];
//var json = JSON.stringify(box,['num'],2);
//alert(json);




//����JSONȫ�ֶ����stringify()��������������
//��һ����������Ҫת����JSON�ַ�����JavaScriptԭ��ֵ
//�ڶ�������������һ�����飨��Ҫ�����Ķ������ԣ���������null�������ñ������ԣ�,�����Ǻ���������������������Լ���Ҫ�����ݣ�
//�������������������֣���������ֵ�����������ַ������Դ��ַ���Ϊ�ָ�����
//var box = [{ title: "a", num: 2 }, { title: "b", num: 3 }, { title: "c", num: 4 }];
////var json = JSON.stringify(box, ["num"], 4);  //�ڶ�������������һ������,��������������������
////var json = JSON.stringify(box, null, 'NO');  //�ڶ�������������һ��null,�����������������ַ���
//var json = JSON.stringify(box, function (key, value) {    //�ڶ�������������һ������������������������key��Ӧ���Ƕ����ֵ���еļ���value��Ӧ���Ƕ����ֵ���е�ֵ��,�������������������֣�
//    if (key == "title") {
//        return "Mr." + value;
//    } else if (key == "num") {
//        return "Number" + value;
//    } else {
//        return value;
//    }
//}, 4);
//alert(json);




//����toJSON()�����������ԣ���һ��jsԭ��ֵ�������˷��س�JSON�ַ���
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
//PS��toJSON()���������ȼ�Ҫ����stringify()�еĵڶ������������ȼ������Ծͻ����ȷ���toJSON�ķ���ֵ