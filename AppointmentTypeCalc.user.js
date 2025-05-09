// ==UserScript==
// @name           AppointmnetTypeCalc
// @description    Appointment types calulator
// @namespace      oscar

// @include *provider/appointmentprovideradminday.jsp?*
// @include *provider/providercontrol.jsp?*

// @version     1.7
// @grant       unsafeWindow
// @downloadURL https://raw.githubusercontent.com/M0J0R1S1NG/tampermonkey/main/AppointmentTypeCalc.js
// @updateURL https://raw.githubusercontent.com/M0J0R1S1NG/tampermonkey/main/AppointmentTypeCalc.js
// ==/UserScript==


    var appts1 = document.querySelectorAll(".appt");
var navlist = document.getElementsByClassName("header-div")[0];
var ApptCounts = document.createElement("DIV");
ApptCounts.style.position="absolute";
ApptCounts.style.top="5%";
ApptCounts.style.left="60%";
ApptCounts.style.zIndex="9999";
ApptCounts.style.backgroundColor="red";
ApptCounts.style.border='2px solid #d3d3d3';
ApptCounts.style.color="white";

function GetStats() {

  var IUDs = 0;
  var Surgicals = 0;
  var Medicals = 0;
  var other = 0;
    var followup = 0;
    var assessment = 0;
    var counselling = 0;
    var STI = 0;
    var innerht='';
    for (const i of appts1.keys()) {


            var appStatus=appts1[i].children[0].title

if (!appts1[i].getElementsByClassName("reason_37")[0]){  

        if (!appts1[i].getElementsByClassName("reason_13")[0]){
            if (!appts1[i].getElementsByClassName("reason_18")[0]){
                 if (!appts1[i].getElementsByClassName("reason_21")[0]){
                     innerht=appts1[i].getElementsByClassName("reason_43")[0].innerText;
                 }else{
                     innerht=appts1[i].getElementsByClassName("reason_21")[0].innerText;
                 }
            }else{
                innerht=appts1[i].getElementsByClassName("reason_18")[0].innerText;

            }

        }else {
            innerht=appts1[i].getElementsByClassName("reason_13")[0].innerText;
        }

}
            if (!appStatus.includes('No Show') && !appStatus.includes('Cancelled') && !appStatus.includes('Rebooked') && !innerht.includes('Team:') && !innerht.includes(':DR ') && !innerht.includes(':DR.')){
                if (innerht.includes('IUD') && innerht.includes('12 weeks')==0 && innerht.includes('D&C')==0 && innerht.includes('TA')==0 && innerht.includes('MEDICAL')==0
                    && innerht.includes('Follow')==0){IUDs+=1;}
                if (innerht.includes('12-14') || innerht.includes('12 weeks') || innerht.includes('Lami - Day 2') || innerht.includes('D&C' ) || innerht.includes('TA') || innerht.includes('LR') || innerht.includes('REDO')
                    && (innerht.includes('CU')==0 && innerht.includes('BETA')==0 && innerht.includes('CHUP')==0 && innerht.includes('CHECK UP')==0 && innerht.includes('Follow')==0
                        && innerht.includes('CU')==0)) {Surgicals+=1;}
                if ((innerht.includes('MEDICAL') || innerht.includes('MA')) && innerht.includes('CHECK UP')==0 && innerht.includes('CU ')==0 && innerht.includes('Follow')==0 && innerht.includes('BETA')==0 && innerht.includes('CHUP')==0 && innerht.includes('D&C')==0 && innerht.includes('Assessment')==0 ){Medicals+=1;}
                if (innerht.includes('Follow-up') || innerht.includes('CU ') || innerht.includes('CHECK UP') || innerht.includes('CHUP') || innerht.includes('BETA') || innerht.includes('LI') ) {followup+=1;}
                if (innerht.includes('Assessment')) {assessment+=1;}
                if (innerht.includes('Counselling')) {counselling+=1;}
                if (innerht.includes('STI') ){STI +=1;}
                //alert('Medicals=' + Medicals + ' Surgicals=' + Surgicals + ' IUDs=' + IUDs + ' FOLLOW-UP=' + followup + ' ASSESSMENT=' + assessment + ' CounsellingP=' + counselling + ' STI=' + STI + "     " + innerht);
                other=Medicals+Surgicals+IUDs+followup+counselling+assessment+STI;

            }


}
    ApptCounts.innerText = 'Total=' + other + ' Medicals=' + Medicals + ' Surgicals=' + Surgicals + ' IUDs=' + IUDs + ' Followup=' + followup+ ' Counselling=' + counselling+ ' Assessment=' + assessment+ ' STI=' + STI;
    navlist.appendChild(ApptCounts);

}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

if(!unsafeWindow.dragElement)
{
    unsafeWindow.dragElement = dragElement;
}
if(!unsafeWindow.GetStats)
{
    unsafeWindow.GetStats = GetStats;
}
if(!unsafeWindow.appts1)
{
    unsafeWindow.appts1 = appts1;
}

dragElement(ApptCounts);
setInterval(GetStats(),10000);
