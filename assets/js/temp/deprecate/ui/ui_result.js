/* Girudatsu Dev.
 * Ver.:	1.00
 * File:	ui_result.js
 * Date:	
 * Desc:	Result UI events. Modified from http://iace.pw/stylecyb/js/pluginchk.js
 * Copyright (C) 2015 Girudatsu Dev (http://girudatsu.website)
 */ 


$(document)["ready"](function() {
$('#delete_dieacc')['click'](function () {
        jQuery.gritter.add({
                    title: 'MESSAGE!',
                    text: 'Successed Remove Die Account',
          class_name: 'growl-success',
                    sticky: false,
                    time: ''
             });
    $('#tvmit_die_count')['html']('0');
                $('#tvmit_die')['text']('');
        });
        $('#delete_failed')['click'](function () {
          jQuery.gritter.add({
                      title: 'MESSAGE!',
                      text: 'Successed Remove Failed Response',
            class_name: 'growl-success',
                      sticky: false,
                      time: ''
               });
      $('#tvmit_unk_fail')['html']('0');
                  $('#tvmit_fail')['text']('');
          });


 $('#reset_stat')['click'](function () {
bootbox.dialog({
        title: "Alert!",
        message: "Your really want remove all Statistic Data ?",
        buttons: {
            success: {
              label: "Okay",
              className: "btn-success",
              callback: function() {
                $('#count_all')['html']('0');
                $('#tvmit_live_counts')['html']('0');
                $('#tvmit_die_counts')['html']('0');
                $('#tvmit_unk_counts')['html']('0');
                $('#tvmit_unk_counts')['html']('0');
                $('.progress .bar')['css']('width','0%')['text']('0%');
                $('#checkStatus')['text']('');
                $('#percentcheck')['text']('');
                $('#FaisalTamvan')['text']('');
                            jQuery.gritter.add({
                                        title: 'MESSAGE!',
                                        text: 'Successed Remove Statistic Data',
                              class_name: 'growl-success',
                                        sticky: false,
                                        time: ''
                                 });
      }
    },
            danger: {
      label: "Cancel!",
      className: "btn-danger",
      callback: function() {
        jQuery.gritter.add({
                    title: 'MESSAGE!',
                    text: 'Cancelled Remove Statistic Data',
          class_name: 'growl-danger',
                    sticky: false,
                    time: ''
             });
      }
    }
        }
    });
    });


         $('#delete_liveacc')['click'](function () {
bootbox.dialog({
        title: "Alert!",
        message: "Your really want remove all live account ?",
        buttons: {
            success: {
              label: "Okay",
              className: "btn-success",
              callback: function() {
                $('#tvmit_live_count')['html']('0');
                            $('#tvmit_live')['text']('');
                            jQuery.gritter.add({
                                        title: 'MESSAGE!',
                                        text: 'Successed Remove Live Data',
                              class_name: 'growl-success',
                                        sticky: false,
                                        time: ''
                                 });
      }
    },
            danger: {
      label: "Cancel!",
      className: "btn-danger",
      callback: function() {
        jQuery.gritter.add({
                    title: 'MESSAGE!',
                    text: 'Cancelled Remove Live Data',
          class_name: 'growl-danger',
                    sticky: false,
                    time: ''
             });
      }
    }
        }
    });
        });


          $('#delete_unknown')['click'](function () {
            jQuery.gritter.add({
                        title: 'MESSAGE!',
                        text: 'Successed Remove Unknown Account Response',
              class_name: 'growl-success',
                        sticky: false,
                        time: ''
                 });
    $('#tvmit_unk_count')['html']('0');
                $('#tvmit_unk')['text']('');


        });
        });