
let timeLimit = 0;
export function check (tenantId,loadingFunc,successFunc) {
    ++timeLimit;
    var xhr = new XMLHttpRequest()
    xhr.onload = loop
    xhr.open('get', '/manager/teamEnter/check?tenantId='+tenantId+'&ts='+new Date().getTime())
    xhr.send()
    function loop () {
        if (this.status == 200) {
            var result = {
                data: false
            }
            try {
                result = JSON.parse(this.responseText)
            } catch (e) {
                console.log(e)
            }
            if (result.data) {
                successFunc();
            } else {
                setTimeout(function () {
                   if(timeLimit ==170) {successFunc();return false;}
                   loadingFunc(tenantId);
                   check(tenantId,loadingFunc,successFunc) 
                }, 500)
            }
        } else {
            setTimeout(function () {
                successFunc();
            }, 1000)
        }
    }
}