// 定时器setInterval 开始、暂停、继续

const timeout_run = {
  timer: null, // 暂停用
  j: 0, // 继续用
  auto_run: function (data, area_num) {
    // 开始方法
    let time_num = data.length / area_num; // 总数/区域 = 时间次数
    let j = timeout_run.j;
    timeout_run.timer = setInterval(function () {
      if (j < time_num) {
        let wrw_array = new Array();
        let array1 = new Array();
        let temp_string = "";

        for (let i = j * area_num; i < (j + 1) * area_num - 1; i++) {
          let obj = {};
          obj.stcode = data[i].stcode;
          obj.stname = data[i].stname;
          obj.area = data[i].area;
          obj.areacode = data[i].areacode;
          obj.item_code = data[i].item_code;
          obj.DT = data[i].DT;
          obj.p_pfl = data[i].p_pfl;
          wrw_array.push(obj);
        }

        $("text_now_time").attr("value", wrw_array[0]["DT"]);
        parent.parent.njgis.setStyleforArea(wrw_array);
        j++;
        timeout_run.j = j;
      } else {
        timeout_run.j = 0;
      }
    }, 2000);
  },
  auto_run_suspend: function () {
    // 暂停方法
    clearInterval(timeout_run.timer);
  },
};
