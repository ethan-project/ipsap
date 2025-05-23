"undefined" == typeof ipsap_common_js &&
  document.write("<script src='/assets/js/ipsap/ipsap_common.js'></script>"),
  "undefined" == typeof api_js &&
    document.write("<script src='/assets/js/common/api.js'></script>"),
  "undefined" == typeof const_js &&
    document.write("<script src='/assets/js/common/const.js'></script>"),
  "undefined" == typeof date_utils_js &&
    document.write(
      "<script src='/assets/js/common/util/date_utils.js'></script>"
    ),
  "undefined" == typeof ipsap_application_common_js &&
    document.write(
      "<script src='/assets/js/ipsap/ipsap_application_common.js'></script>"
    );
var final_saved_list,
  iacuc_num = 0,
  ibc_num = 0,
  irb_num = 0,
  cardObjTmp = $(".myApp_body .card").eq(0).clone(),
  explistObjTmp = $(".exp_area_body .card").eq(0).clone(),
  judge_type = JSON.parse(COMM.getCookie("institution_info")).judge_type.split(
    ","
  ),
  empty_apps =
    '\n<div class="card round_10 empty_apps">\n  <div class="card-header">\n    <div class="card_icon text-center"><i class="mdi mdi-file-upload-outline"></i></div>\n  </div>\n  <div class="card-body noBorder">\n    <div class="card-title text-center"><span class="empty_comment"></span> 없습니다.</div>\n  </div>\n</div>',
  empty_exps =
    '\n<div class="card round_10 empty_apps">\n  <div class="card-header">\n    <div class="card_icon text-center"><i class="mdi mdi-flask-outline"></i></div>\n  </div>\n  <div class="card-body noBorder">\n    <div class="card-title text-center">진행중인 실험이 없습니다.</div>\n  </div>\n</div>',
  empty_result =
    '\n<div class="card round_10 empty_result">\n  <div class="card-header">\n    <div class="card_icon text-center"><i class="mdi mdi-file-upload-outline"></i></div>\n  </div>\n  <div class="card-body noBorder">\n    <div class="card-title text-center">필터링된 신청서가 없습니다.</div>\n  </div>\n</div>',
  service_status = Number(
    JSON.parse(COMM.getCookie("institution_info")).service_status
  );
function onClickApplication(t) {
  switch (
    (g_AppInfo.initWithAppObj(final_saved_list[t]) ||
      alert("Fail to ApplicationInfo Init!"),
    final_saved_list[t].judge_type)
  ) {
    case IPSAP.JUDGE_TYPE.IACUC:
      navigateIACUC(t);
      break;
    case IPSAP.JUDGE_TYPE.IBC:
      navigateIBC(t);
      break;
    case IPSAP.JUDGE_TYPE.IRB:
      //alert("onClickApplication IRB");
      navigateIRB(e, a);
      break;          
    default:
      return void alert(
        `JUDGE_TYPE Error!! (${final_saved_list[t].judge_type})`
      );
  }
}
function navigateIACUC(t) {
  switch (final_saved_list[t].application_type) {
    case IPSAP.APPLICATION_TYPE.NEW:
      navigateIACUC_new(t);
      break;
    case IPSAP.APPLICATION_TYPE.CHANGE:
      navigateIACUC_change(t);
      break;
    case IPSAP.APPLICATION_TYPE.RENEW:
      navigateIACUC_renew(t);
      break;
    case IPSAP.APPLICATION_TYPE.BRING:
      navigateIACUC_bring(t);
      break;
    case IPSAP.APPLICATION_TYPE.END:
      navigateIACUC_end(t);
      break;
    case IPSAP.APPLICATION_TYPE.CHECKLIST:
      navigateIACUC_checklist(t);
      break;
    default:
      return void alert(
        `application_type Error!! (${final_saved_list[t].application_type})`
      );
  }
}
function navigateIACUC_new(t) {
  g_AppInfo.saveParamsAndNavigate("./reviewConfirm_list-review.html");
}
function navigateIACUC_change(t) {
  g_AppInfo.saveParamsAndNavigate("./reviewConfirm_list-review_change.html");
}
function navigateIACUC_renew(t) {
  g_AppInfo.saveParamsAndNavigate("./reviewConfirm_list-review_renew.html");
}
function navigateIACUC_bring(t) {
  g_AppInfo.saveParamsAndNavigate("./reviewConfirm_list-review_bring.html");
}
function navigateIACUC_end(t) {
  g_AppInfo.saveParamsAndNavigate("./reviewConfirm_list-review_end.html");
}
function navigateIACUC_checklist(t) {
  g_AppInfo.saveParamsAndNavigate("./inspection_list-info.html");
}
function navigateIBC(t) {
  switch (final_saved_list[t].application_type) {
    case IPSAP.APPLICATION_TYPE.NEW:
      navigateIBC_new(t);
      break;
    case IPSAP.APPLICATION_TYPE.CHANGE:
      navigateIBC_change(t);
      break;
    default:
      return void alert(
        `application_type Error!! (${final_saved_list[t].application_type})`
      );
  }
}
function navigateIBC_new(t) {
  g_AppInfo.saveParamsAndNavigate("./IBC/reviewConfirm_list-IBC_review.html");
}
function navigateIBC_change(t) {
  g_AppInfo.saveParamsAndNavigate(
    "./IBC/reviewConfirm_list-IBC_review_change.html"
  );
}
function originalDashboardFunction() {
  setDashboardFilters();
}
$(function () {
  if (IPSAP.DEMO_MODE)
    return (
      $(".dashboard_box").removeClass("hidden"),
      void originalDashboardFunction()
    );
  API.load({
    url: CONST.API.DASHBOARD.LIST,
    type: CONST.API_TYPE.GET,
    data: { "filter.dashboard_type": 3 },
    success: function (t) {
      $(".final_cnt").text(t.final_cnt),
        $(".exp_cnt").text(t.performance_app_list_cnt);
      let e = $(".final_apps_body");
      if ((e.empty(), t.final.length))
        $.each(t.final, function (a, i) {
          final_saved_list = t.final;
          var s = "",
            r = "",
            n = `onClickApplication(${a})`;
          switch (i.application_type) {
            case IPSAP.APPLICATION_TYPE.NEW:
            case IPSAP.APPLICATION_TYPE.CHANGE:
            case IPSAP.APPLICATION_TYPE.RENEW:
              (s = "application"),
                (r = '<i class="mdi mdi-file-upload-outline"></i>'),
                "label gray_bg";
              break;
            case IPSAP.APPLICATION_TYPE.BRING:
            case IPSAP.APPLICATION_TYPE.END:
            case IPSAP.APPLICATION_TYPE.CHECKLIST:
              (s = "report"),
                (r = '<i class="mdi mdi-finance"></i>'),
                "label gray_border_inner";
          }
          var d = "";
          if (i.application_result === IPSAP.APPLICATION_RESULT.SUPPLEMENT)
            d = "supplement";
          switch (i.judge_type) {
            case IPSAP.JUDGE_TYPE.IACUC:
              iacuc_num++;
              break;
            case IPSAP.JUDGE_TYPE.IBC:
              ibc_num++;
              break;
            case IPSAP.JUDGE_TYPE.IRB:
              irb_num++;
          }
          var c = cardObjTmp.clone();
          c.addClass(`${i.judge_type_str}`).addClass(`${s}`).addClass(`${d}`),
            c.find(".card_icon").html(r),
            c.find(".committee_bg").text(`${i.application_type_str}`),
            c.find(".committee_color").text(`${i.judge_type_str}`),
            c.find(".card-title").text(`${i.name_ko}`),
            c.find(".rcv_num").text(`${i.application_no}`),
            c.find(".title_date").text(`(${i.tmp_submit_dttm})`),
            c.find(".bullet").text(`${i.time_diff}`),
            c.find(".link_btn").text("최종 심의"),
            c.find(".link_btn").addClass("btn btn-primary btn_xxs"),
            c.find(".link_btn").attr("onclick", `${n}`),
            e.append(c);
        });
      else {
        let t = e.data("comment") ? e.data("comment") : "등록된 신청서";
        e.closest(".myApps").addClass("empty"),
          e.append(empty_apps).find(".empty_comment").text(t);
      }
      $(".exp_area_body").empty(),
        t.performance_app_list.length
          ? $.each(t.performance_app_list, function (t, e) {
              switch (e.judge_type) {
                case IPSAP.JUDGE_TYPE.IACUC:
                  iacuc_num++;
                  break;
                case IPSAP.JUDGE_TYPE.IBC:
                  ibc_num++;
                  break;
                case IPSAP.JUDGE_TYPE.IRB:
                  irb_num++;
              }
              var a = explistObjTmp.clone();
              a.addClass(e.judge_type_str),
                a.find(".committee_bg").text(e.judge_type_str),
                a.find(".card-title").text(e.name_ko),
                a.find(".rcv_num").text(e.application_no),
                a
                  .find(".title_date")
                  .text(
                    `(${getDttm(e.approved_dttm).dt} ~ ${e.general_end_date})`
                  ),
                a
                  .find(".end_date")
                  .html(
                    `${e.general_end_date}<i class="mdi mdi-arrow-collapse-right mLeft5"></i>`
                  );
              let i = 1 == e.end_date_over ? "closed" : "";
              a.addClass(i),
                "closed" == i &&
                  a
                    .addClass("tippy-btn")
                    .attr({
                      "data-tippy-placement": "top-start",
                      "data-tippy-arrow": "true",
                      title:
                        '실험 기간이 만료되었습니다. "종료 보고서" 제출이 필요합니다.',
                    });
              let s = getYMDHMSFromUnixtime(e.approved_dttm),
                r = getYMDHMSFromDateType(getDateByStr(e.general_end_date)),
                n = new Date(),
                d = getDateDiffWith10(n, s),
                c = getDateDiffWith10(r, s),
                p = 335;
              d < p
                ? a
                    .find(".exp_period")
                    .html(
                      `<div class="progress mTop5">\n              <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: ${Math.floor(
                        (d / c) * 100
                      )}%">1차 년도</div>\n            </div>`
                    )
                : d > p && d < 670
                ? a
                    .find(".exp_period")
                    .html(
                      `<div class="progress mTop5">\n              <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: ${Math.floor(
                        (p / c) * 100
                      )}%">1차 년도</div>\n              <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" style="width: 5%">재승인</div>\n              <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: ${Math.floor(
                        ((d - p) / c) * 100
                      )}%">2차 년도</div>\n            </div>`
                    )
                : d > 670 &&
                  a
                    .find(".exp_period")
                    .html(
                      `<div class="progress mTop5">\n              <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: ${Math.floor(
                        (p / c) * 100
                      )}%">1차 년도</div>\n              <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" style="width: 5%">재승인</div>\n              <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: ${Math.floor(
                        (p / c) * 100
                      )}%">2차 년도</div>\n              <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" style="width: 5%">재승인</div>\n              <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: ${Math.floor(
                        ((d - 670) / c) * 100
                      )}%">3차 년도</div>\n            </div>`
                    ),
                $(".exp_area_body").append(a);
            })
          : $(".exp_area_body")
              .closest(".myApps")
              .addClass("empty")
              .append(empty_exps),
        -1 == $.inArray("1", judge_type)
          ? ($(".btn.IACUC").css("display", "none"),
            $("#statistics").find(".IACUC").css("display", "none"))
          : -1 == $.inArray("2", judge_type)
          ? ($(".btn.IBC").css("display", "none"),
            $("#statistics").find(".IBC").css("display", "none"))
          : -1 == $.inArray("3", judge_type) &&
            ($(".btn.IRB").css("display", "none"),
            $("#statistics").find(".IRB").css("display", "none")),
        $(".IACUC_num").text(iacuc_num),
        $(".IBC_num").text(ibc_num),
        $(".IRB_num").text(irb_num),
        $("#statistics")
          .find(".IACUC")
          .html(
            `<td class="committee_color">IACUC</td>\n      <td data-num="${t.approved_statistics.iacuc.total_cnt}" class="border_left_thick">${t.approved_statistics.iacuc.total_cnt}</td>\n      <td data-num="${t.approved_statistics.iacuc.approved_cnt}" class="border_left_thick">${t.approved_statistics.iacuc.approved_cnt}</td>\n      <td data-num="${t.approved_statistics.iacuc.conditional_approved_cnt}" class="border_left">${t.approved_statistics.iacuc.conditional_approved_cnt}</td>\n      <td data-num="${t.approved_statistics.iacuc.require_retry_cnt}" class="border_left">${t.approved_statistics.iacuc.require_retry_cnt}</td>\n      <td data-num="${t.approved_statistics.iacuc.reject_cnt}" class="border_left">${t.approved_statistics.iacuc.reject_cnt}</td>`
          ),
        $("#statistics")
          .find(".IBC")
          .html(
            `<td class="committee_color">IBC</td>\n      <td data-num="${t.approved_statistics.ibc.total_cnt}" class="border_left_thick">${t.approved_statistics.ibc.total_cnt}</td>\n      <td data-num="${t.approved_statistics.ibc.approved_cnt}" class="border_left_thick">${t.approved_statistics.ibc.approved_cnt}</td>\n      <td data-num="${t.approved_statistics.ibc.conditional_approved_cnt}" class="border_left">${t.approved_statistics.ibc.conditional_approved_cnt}</td>\n      <td data-num="${t.approved_statistics.ibc.require_retry_cnt}" class="border_left">${t.approved_statistics.ibc.require_retry_cnt}</td>\n      <td data-num="${t.approved_statistics.ibc.reject_cnt}" class="border_left">${t.approved_statistics.ibc.reject_cnt}</td>`
          ),
        $("#statistics")
          .find(".IRB")
          .html(
            `<td class="committee_color">IRB</td>\n      <td data-num="${t.approved_statistics.irb.total_cnt}" class="border_left_thick">${t.approved_statistics.irb.total_cnt}</td>\n      <td data-num="${t.approved_statistics.irb.approved_cnt}" class="border_left_thick">${t.approved_statistics.irb.approved_cnt}</td>\n      <td data-num="${t.approved_statistics.irb.conditional_approved_cnt}" class="border_left">${t.approved_statistics.irb.conditional_approved_cnt}</td>\n      <td data-num="${t.approved_statistics.irb.require_retry_cnt}" class="border_left">${t.approved_statistics.irb.require_retry_cnt}</td>\n      <td data-num="${t.approved_statistics.irb.reject_cnt}" class="border_left">${t.approved_statistics.irb.reject_cnt}</td>`
          ),
        $(".dashboard_box").removeClass("hidden"),
        updateStackCounter($(".myApps"), ".card", ".myApp_cnt", !0),
        setTimeout(() => {
          stackCards($(".myApps, .exp_area"));
        }, 300);
    },
    complete: function () {
      1 != service_status &&
        ($(".dashboard_box").find("*").removeAttr("href"),
        $(".dashboard_box").find("*").removeAttr("onclick")),
        originalDashboardFunction();
    },
  });
});


function navigateIRB(t) {
    switch (final_saved_list[t].application_type) {
      case IPSAP.APPLICATION_TYPE.NEW:
        navigateIRB_new(t);
        break;
      case IPSAP.APPLICATION_TYPE.CHANGE:
        navigateIRB_change(t);
        break;
      default:
        return void alert(
          `application_type Error!! (${final_saved_list[t].application_type})`
        );
    }
  }
  function navigateIRB_new(t) {
    g_AppInfo.saveParamsAndNavigate("./IRB/reviewConfirm_list-IRB_review.html");
  }
  function navigateIRB_change(t) {
    g_AppInfo.saveParamsAndNavigate(
      "./IRB/reviewConfirm_list-IRB_review_change.html"
    );
  }