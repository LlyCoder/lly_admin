// change 
export const timeAgo = (dateTimeStamp)  => {
    let result;
    dateTimeStamp = Date.parse(new Date(dateTimeStamp));
    let minute = 1000 * 60;      
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    let halfamonth = day * 15;
    let month = day * 30;
    let now = new Date().getTime() - 8 * hour;   //获取当前时间毫秒,与UTC时间保持一致。
    let diffValue = now - dateTimeStamp;//时间毫秒差

    if (diffValue < 0) {
        return;
    }
    //计算时间差的分，时，天，周，月
    let minC = diffValue / minute;  
    let hourC = diffValue / hour;
    let dayC = diffValue / day;
    let weekC = diffValue / week;
    let monthC = diffValue / month;
    if (monthC >= 1 && monthC <= 3) {
        result = " " + parseInt(monthC) + "月前"
    } else if (weekC >= 1 && weekC <= 3) {
        result = " " + parseInt(weekC) + "周前"
    } else if (dayC >= 1 && dayC <= 6) {
        result = " " + parseInt(dayC) + "天前"
    } else if (hourC >= 1 && hourC <= 23) {
        result = " " + parseInt(hourC) + "小时前"
    } else if (minC >= 1 && minC <= 59) {
        result = " " + parseInt(minC) + "分钟前"
    } else if (diffValue >= 0 && diffValue <= minute) {
        result = "刚刚"
    } else {
        let datetime = new Date();
        datetime.setTime(dateTimeStamp);
        let Nyear = datetime.getFullYear();
        let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        return Nyear + "-" + Nmonth + "-" + Ndate
    }
    return result;
}

