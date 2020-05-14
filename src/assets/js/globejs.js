exports.install = function(Vue, options) {
    /*------------      时间、日期格式化     ------------*/
    // 日期格式化
    Vue.prototype.dateFormate = function(dateStr) {
        if (!this.notEmptyN(dateStr) || isNaN(Date.parse(dateStr))) return "";
        var dt = new Date(dateStr);
        return dt.getFullYear() + '-' + (dt.getMonth() + 1).toString().padStart(2, '0') + '-' + dt.getDate().toString().padStart(2, '0');
    }

    // 日期时间格式化
    Vue.prototype.dateTimeFormate = function(dateStr) {
        var dt = new Date(dateStr);
        return dt.getFullYear() + '-' + (dt.getMonth() + 1).toString().padStart(2, '0') + '-' + dt.getDate().toString().padStart(2, '0') +
            ' ' + dt.getHours().toString().padStart(2, '0') + ':' + dt.getMinutes().toString().padStart(2, '0') + ':' + dt.getSeconds().toString().padStart(2, '0');
    }

    // 时间格式化
    Vue.prototype.timeFormate = function(dateStr) {
        if (!this.notEmptyN(dateStr) || isNaN(Date.parse(dateStr))) return "";
        var dt = new Date(dateStr);
        return dt.getHours().toString().padStart(2, '0') + ':' + dt.getMinutes().toString().padStart(2, '0');
    }

    // 时间格式化
    Vue.prototype.timeSecondsFormate = function(dateStr) {
        if (!this.notEmptyN(dateStr) || isNaN(Date.parse(dateStr))) return "";
        var dt = new Date(dateStr);
        return dt.getHours().toString().padStart(2, '0') + ':' + dt.getMinutes().toString().padStart(2, '0') +
            ' ' + dt.getSeconds().toString().padStart(2, '0');
    }

    // 时间格式化
    Vue.prototype.MinutesFormate = function(dateStr) {
        if (!this.notEmptyN(dateStr) || isNaN(Date.parse(dateStr))) return "";
        var dt = new Date(dateStr);
        return dt.getMinutes().toString().padStart(2, '0') + ':' + dt.getSeconds().toString().padStart(2, '0');
    }
   
    
}