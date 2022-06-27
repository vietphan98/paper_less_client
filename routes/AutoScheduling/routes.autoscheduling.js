const Router = require("express-promise-router")
const db = require("../../Config/db")
let router = new Router();
const moment = require("moment")
router.post('/',async (req,res,next) => {
    try {
         if(req.body.TOKEN_KEY == "SAVEDATA"){
            let COLUMN = req.body.COLUMN;
            let RawData = req.body.DATA ;
            RawData = JSON.parse(RawData)
            let array_insert = [];
            RawData.forEach(function(item){
                array_insert.push(`('${item.join("','")}')`)
            });
            if(array_insert.length === 0) {
                return res.json("FAIL");
            }
            let sql = `INSERT INTO auto_scheduling.auto_status(${COLUMN}) VALUES ${array_insert.join(",")}`
            const result =  await db.query(sql);
            if(result.rowCount > 0){
                res.json("OK")
            }else{
                res.json("FAIL")
            }
         }else if (req.body.TOKEN_KEY == "SAVEDATA_ITEM" ){
            let COLUMN = req.body.COLUMN;
            let RawData = req.body.DATA;
            let array_insert = [];
        
            RawData = JSON.parse(RawData);
            RawData.forEach(function(item){
                array_insert.push(`('${item.join("','")}')`)
            });
            if(array_insert.length === 0){
                return res.json("FAIL")
            }
            let sql = `INSERT INTO auto_scheduling.inlay_item_unable(${COLUMN}) VALUES ${array_insert.join(",")}`
            const result =  await db.query(sql);
            if(result.rowCount > 0){
                res.json("OK")
            }else{
                res.json("FAIL")
            }
         }else if(req.body.TOKEN_KEY == "LOADDATA"){
            let html_string = "<rows>";
            const DataRaw = await db.query(`SELECT po,so_line,order_item,oracle_item,rbo,qty,ups,sku,printing_size,inlay_position,inlay_code,needed_inlay_quantity,basesheet_code,needed_basesheet_quantity,inlay_status,basesheet_status,rm_status,wip_status,po_readiness,lasted_plan_time,adjusted_lasted_plan_time,service_priority,due_date,quantity_sheet,quantity_already_ran_sheet,quantity_need_to_run_sheet,service_risk,setup_time,run_time,total_needed_time,estimated_finish_time,po_note,machine,position_in_machine FROM auto_scheduling.auto_status`);
            let number_key = 0 ;
            DataRaw.rows.forEach(function(row){
                html_string += `<row id='${number_key + 1}'>`;
                html_string += `<cell>${number_key + 1}</cell>`
                html_string += `<cell>${row.po}</cell>`
                html_string += `<cell>${row.so_line}</cell>`
                html_string += `<cell>${row.order_item}</cell>`
                html_string += `<cell>${row.oracle_item}</cell>`
                html_string += `<cell>${row.rbo}</cell>`
                html_string += `<cell>${row.qty}</cell>`
                html_string += `<cell>${row.ups}</cell>`
                html_string += `<cell>${row.sku}</cell>`
                html_string += `<cell>${row.printing_size}</cell>`
                html_string += `<cell>${row.inlay_position}</cell>`
                html_string += `<cell>${row.inlay_code}</cell>`
                html_string += `<cell>${row.needed_inlay_quantity}</cell>`
                html_string += `<cell>${row.basesheet_code}</cell>`
                html_string += `<cell>${row.needed_basesheet_quantity}</cell>`
                html_string += `<cell>${row.inlay_status}</cell>`
                html_string += `<cell>${row.basesheet_status}</cell>`
                html_string += `<cell>${row.rm_status}</cell>`
                html_string += `<cell>${row.wip_status}</cell>`
                html_string += `<cell>${row.po_readiness}</cell>`
                html_string += `<cell>${row.lasted_plan_time}</cell>`
                html_string += `<cell>${row.adjusted_lasted_plan_time}</cell>`
                html_string += `<cell>${row.service_priority}</cell>`
                html_string += `<cell>${row.due_date}</cell>`
                html_string += `<cell>${row.quantity_sheet}</cell>`
                html_string += `<cell>${row.quantity_already_ran_sheet}</cell>`
                html_string += `<cell>${row.quantity_need_to_run_sheet}</cell>`
                html_string += `<cell>${row.service_risk}</cell>`
                html_string += `<cell>${row.setup_time}</cell>`
                html_string += `<cell>${row.run_time}</cell>`
                html_string += `<cell>${row.total_needed_time}</cell>`
                html_string += `<cell>${row.estimated_finish_time}</cell>`
                html_string += `<cell>${row.po_note}</cell>`
                html_string += `<cell>${row.machine}</cell>`
                html_string += `<cell>${row.position_in_machine}</cell>`
                html_string += `</row>`;
                number_key++ ;
            })
            html_string +="</rows>";
            res.type('application/xml');
            res.send(html_string)
         }
         else if (req.body.TOKEN_KEY == "KLO1_LOAD"){
            let html_string = "<rows>";
            const DataRaw = await db.query(`SELECT po,inlay_code,lasted_plan_time,estimated_time,total_time_need,adjust_time,time_out,priority,id_group_inlay::integer FROM auto_scheduling.inlay_scheduling WHERE machine = 'KL01'  order by stt::int  `);
            let number_key = 0 ;
            DataRaw.rows.forEach(function(row){
                html_string += `<row id='${number_key + 1}'>`;
                html_string += `<cell>${number_key + 1}</cell>`
                html_string += `<cell>${row.po}</cell>`
                html_string += `<cell>${row.inlay_code}</cell>`
                html_string += `<cell>${row.lasted_plan_time}</cell>`
                html_string += `<cell>${row.estimated_time}</cell>`
                html_string += `<cell>${row.total_time_need}</cell>`
                html_string += `<cell>${row.adjust_time}</cell>`
                html_string += `<cell>${row.time_out}</cell>`
                html_string += `<cell>${row.priority}</cell>`
               
                html_string += `</row>`;
                number_key++ ;
            })
            html_string +="</rows>";
            res.type('application/xml');
            res.send(html_string)
         }else if (req.body.TOKEN_KEY == "KLO2_LOAD"){
            let html_string = "<rows>";
            const DataRaw = await db.query(`SELECT po,inlay_code,lasted_plan_time,estimated_time,total_time_need,adjust_time,time_out,priority,id_group_inlay::integer FROM auto_scheduling.inlay_scheduling WHERE  machine = 'KL02' order by stt::int  `);
            let number_key = 0 ;
            DataRaw.rows.forEach(function(row){
                html_string += `<row id='${number_key + 1}'>`;
                html_string += `<cell>${number_key + 1}</cell>`
                html_string += `<cell>${row.po}</cell>`
                html_string += `<cell>${row.inlay_code}</cell>`
                html_string += `<cell>${row.lasted_plan_time}</cell>`
                html_string += `<cell>${row.estimated_time}</cell>`
                html_string += `<cell>${row.total_time_need}</cell>`
                html_string += `<cell>${row.adjust_time}</cell>`
                html_string += `<cell>${row.time_out}</cell>`
                html_string += `<cell>${row.priority}</cell>`
               
                html_string += `</row>`;
                number_key++ ;
            })
            html_string +="</rows>";
            res.type('application/xml');
            res.send(html_string)
         }else if (req.body.TOKEN_KEY == "KLO3_LOAD"){
            let html_string = "<rows>";
            const DataRaw = await db.query(`SELECT po,inlay_code,lasted_plan_time,estimated_time,total_time_need,adjust_time,time_out,priority,id_group_inlay::integer  FROM auto_scheduling.inlay_scheduling WHERE machine = 'KL03' order by stt::int  `);

            let number_key = 0 ;
            DataRaw.rows.forEach(function(row){
                html_string += `<row id='${number_key + 1}'>`;
                html_string += `<cell>${number_key + 1}</cell>`
                html_string += `<cell>${row.po}</cell>`
                html_string += `<cell>${row.inlay_code}</cell>`
                html_string += `<cell>${row.lasted_plan_time}</cell>`
                html_string += `<cell>${row.estimated_time}</cell>`
                html_string += `<cell>${row.total_time_need}</cell>`
                html_string += `<cell>${row.adjust_time}</cell>`
                html_string += `<cell>${row.time_out}</cell>`
                html_string += `<cell>${row.priority}</cell>`
            
                html_string += `</row>`;
                number_key++ ;
            })
            html_string +="</rows>";
            res.type('application/xml');
            res.send(html_string)
         }else if(req.body.TOKEN_KEY == "ITEM_LOAD"){
            let html_string = "<rows>";
            const DataRaw = await db.query(`SELECT kl01,kl02,kl03 FROM auto_scheduling.inlay_item_unable`);
            let number_key = 0 ;
            DataRaw.rows.forEach(function(row){
                html_string += `<row id='${number_key + 1}'>`;
                html_string += `<cell>${row.kl01}</cell>`
                html_string += `<cell>${row.kl02}</cell>`
                html_string += `<cell>${row.kl03}</cell>`
                html_string += `</row>`;
                number_key++ ;
            })
            html_string +="</rows>";
            res.type('application/xml');
            res.send(html_string)
         }else if(req.body.TOKEN_KEY === "DELETE"){
             //, auto_scheduling.inlay_kl03, auto_scheduling.inlay_kl02,auto_scheduling.inlay_kl01,auto_scheduling.auto_status
             await db.query('DELETE FROM auto_scheduling.inlay_item_unable;');
             await db.query('DELETE FROM auto_scheduling.inlay_kl03;');
             await db.query('DELETE FROM auto_scheduling.inlay_kl02;');
              await db.query('DELETE FROM auto_scheduling.inlay_kl01;');
              await db.query('DELETE FROM auto_scheduling.auto_status;');

              res.json("DONE")
         }else if(req.body.TOKEN_KEY == "MODULE_5_CAL"){
             let MainResult = [];
             let MainKL01 = [] ;
             let MainKL02 = [] ;
             let MainKL03 = [] ;
             let TimeFreeKL01 = 1200; //phút
             let TimeFreeKL02 = 900; //phút
             let TimeFreeKL03 = 1200; //phút

             const DataRaw = await db.query(`SELECT po,so_line,inlay_code,oracle_item,po_readiness,lasted_plan_time::timestamp as lasted_plan_time,adjusted_lasted_plan_time,time_in,time_out,
                                                 service_priority::int,'' as kl01 , '' as kl02,'' as kl03,'' as cal_estimated_finish_time,sku,printing_size,inlay_position
                                                ,due_date,quantity_sheet,quantity_already_ran_sheet,quantity_need_to_run_sheet,service_risk,setup_time,run_time,total_needed_time,estimated_finish_time,po_note,machine,position_in_machine,
                                                '' as time_free_kl01, '' as time_free_kl02,'' as time_free_kl03,'' as check_date_po
                                                FROM auto_scheduling.auto_status WHERE lasted_plan_time::timestamp <= '2022-04-27T06:00:00.000Z'::timestamp ORDER BY service_priority `);
            if(DataRaw.rowCount > 0){
                MainResult = DataRaw.rows
            }
          // console.log(MainResult)
            for(let i = 0 ; i< MainResult.length ; i++){
                let ArrayMachine = ["KL01","KL02","KL03"]
                let item = MainResult[i].oracle_item;
                let po = MainResult[i].po;
                const result_p = await db.query(`SELECT create_date_out FROM avery_otk.otk_status WHERE job_jacket = '${po}' AND process = 'Labelling'`);
                if(result_p.rowCount > 0){
                    MainResult[i].time_out = result_p.rows[0].create_date_out
                }
                const result_v = await db.query(`SELECT inlay1,inlay2,inlay3,change_order,change_sku,change_printing_size,change_inlay,change_position_inlay FROM auto_scheduling.item_setup_inlay WHERE item = '${item}'`)
                MainResult[i].setup_time =  parseFloat(parseFloat(result_v.rows[0].change_sku)*parseFloat(MainResult[i].sku)) +  parseFloat(result_v.rows[0].change_order) + parseFloat(result_v.rows[0].change_inlay) + parseFloat(result_v.rows[0].change_printing_size) + parseFloat(result_v.rows[0].change_position_inlay)
                MainResult[i].run_time =  parseFloat(MainResult[i].quantity_sheet)*60/parseFloat(result_v.rows[0].inlay1) 
                MainResult[i].total_needed_time = parseFloat( MainResult[i].setup_time) + parseFloat( MainResult[i].run_time)
                const check_item_kl01 = await db.query(`SELECT kl01 FROM auto_scheduling.inlay_item_unable WHERE kl01 = '${item}'`);
                if (check_item_kl01.rowCount > 0){
                    const index = ArrayMachine.indexOf("KL01");
                        if (index > -1) {
                            ArrayMachine.splice(index, 1);
                            MainResult[i].kl01 = "FALSE";
                        }
                }else{
                    MainResult[i].kl01 = "TRUE";

                }
                const check_item_kl02 = await db.query(`SELECT kl02 FROM auto_scheduling.inlay_item_unable WHERE kl02 = '${item}'`);
                if (check_item_kl02.rowCount > 0){
                    const index = ArrayMachine.indexOf("KL02");
                        if (index > -1) {
                            ArrayMachine.splice(index, 1);
                            MainResult[i].kl02 = "FALSE";
                        }

                }
                else{
                    MainResult[i].kl02 = "TRUE";

                }
                const check_item_kl03 = await db.query(`SELECT kl03 FROM auto_scheduling.inlay_item_unable WHERE kl03 = '${item}'`);
                if (check_item_kl03.rowCount > 0){
                    const index = ArrayMachine.indexOf("KL03");
                        if (index > -1) {
                            ArrayMachine.splice(index, 1);
                            MainResult[i].kl03 = "FALSE";
                        }
                }
                else{
                    MainResult[i].kl03 = "TRUE";

                }
              //  console.log(ArrayMachine)
                if(ArrayMachine.length === 0){
                    MainResult[i].po_note = "Cannot_run_due_to_unable_item"
                    
                }

            }
           // console.log(MainResult)

            // Tính thời gian rảnh  của máy
            
            let InlayKL01 = []
            let InlayKL02 = []
            let InlayKL03 = []

            for(let i_2 = 0 ; i_2 < MainResult.length ;i_2++){
               
                let ToTalTimeNeedAllPOKl01 = 0 ;
                let TempFreeTimeKL01 = -31 ;
                let ToTalTimeNeedAllPOKl02 = 0 ;
                let TempFreeTimeKL02 = -31 ;
                let ToTalTimeNeedAllPOKl03 = 0 ;
                let TempFreeTimeKL03 = -31 ;

                if(MainResult[i_2].kl01 === "TRUE" && MainResult[i_2].kl01 !== undefined){
                     ToTalTimeNeedAllPOKl01 =  MainKL01.reduce((n, {NeedTime}) => parseFloat(n) + parseFloat(NeedTime), 0)
                     TempFreeTimeKL01 = parseFloat(TimeFreeKL01) - parseFloat(ToTalTimeNeedAllPOKl01)
                     if(TempFreeTimeKL01 <= -30){
                        MainResult[i_2].time_free_kl01 = '0'
                     }else{
                        MainResult[i_2].time_free_kl01 = TempFreeTimeKL01
                     }
                }else{
                    MainResult[i_2].time_free_kl01 = '0'
                }
                if(MainResult[i_2].kl02 === "TRUE" && MainResult[i_2].kl02 !== undefined){
                    ToTalTimeNeedAllPOKl02 =  MainKL02.reduce((n, {NeedTime}) => parseFloat(n) + parseFloat(NeedTime), 0)
                    TempFreeTimeKL02 = parseFloat(TimeFreeKL02) - parseFloat(ToTalTimeNeedAllPOKl02)
                    if(TempFreeTimeKL02 <= -30){
                        MainResult[i_2].time_free_kl02 = '0'
                     }else{
                        MainResult[i_2].time_free_kl02 = TempFreeTimeKL02
                     }
                }else{
                    MainResult[i_2].time_free_kl02 = '0'
                }
                if(MainResult[i_2].kl03 === "TRUE" && MainResult[i_2].kl03 !== undefined){
                    ToTalTimeNeedAllPOKl03 =  MainKL03.reduce((n, {NeedTime}) => parseFloat(n) + parseFloat(NeedTime), 0)
                    TempFreeTimeKL03 = parseFloat(TimeFreeKL03) - parseFloat(ToTalTimeNeedAllPOKl03)
                    if(TempFreeTimeKL03 <= -30){
                        MainResult[i_2].time_free_kl03 = '0'
                     }else{
                        MainResult[i_2].time_free_kl03 = TempFreeTimeKL03
                     }
                }else{
                    MainResult[i_2].time_free_kl03 = '0'
                }
                if(TempFreeTimeKL01 <= -30 && TempFreeTimeKL02 <= -30 && TempFreeTimeKL03 <= -30){
                    MainResult[i_2].po_note = "can_not_run_due_to_lack_of_cap"
                    continue
                }

              //  console.log(TempFreeTimeKL01,TempFreeTimeKL02,TempFreeTimeKL03)


                 let LastedPlanTimeLastPO_KL01 = new Date('2022-04-26 06:00:00.000');
                 let LastedPlanTimeLastPO_KL02 = new Date('2022-04-26 06:00:00.000');
                 let LastedPlanTimeLastPO_KL03 = new Date('2022-04-26 06:00:00.000');
                 let EstimatedTimePO_KL01= "";
                 let EstimatedTimePO_KL02= "";
                 let EstimatedTimePO_KL03= "";
                 let Time_Cal_KL01 = null;
                 let Time_Cal_KL02 = null;
                 let Time_Cal_KL03 = null;
                 
                 let  index_kl01 = InlayKL01.lastIndexOf(MainResult[i_2].inlay_code)
                 let  index_kl02 = InlayKL02.lastIndexOf(MainResult[i_2].inlay_code)
                 let  index_kl03 = InlayKL03.lastIndexOf(MainResult[i_2].inlay_code)
                  if(index_kl01 !== -1 || index_kl02 !== -1 || index_kl03 !== -1){

                    Time_Cal_KL01 = Cal_Date_Estimated(MainResult,MainKL01,LastedPlanTimeLastPO_KL01,EstimatedTimePO_KL01,i_2,index_kl01)
                    Time_Cal_KL02 = Cal_Date_Estimated(MainResult,MainKL02,LastedPlanTimeLastPO_KL02,EstimatedTimePO_KL02,i_2,index_kl02)
                    Time_Cal_KL03 = Cal_Date_Estimated(MainResult,MainKL03,LastedPlanTimeLastPO_KL03,EstimatedTimePO_KL03,i_2,index_kl03)
                    ToTalTimeNeedAllPOKl01 =  MainKL01.reduce((n, {NeedTime}) => parseFloat(n) + parseFloat(NeedTime), 0)
                    TempFreeTimeKL01 = parseFloat(TimeFreeKL01) - parseFloat(ToTalTimeNeedAllPOKl01) - parseFloat(MainResult[i_2].total_needed_time)
                    ToTalTimeNeedAllPOKl02 =  MainKL02.reduce((n, {NeedTime}) => parseFloat(n) + parseFloat(NeedTime), 0)
                    TempFreeTimeKL02 = parseFloat(TimeFreeKL02) - parseFloat(ToTalTimeNeedAllPOKl02) - parseFloat(MainResult[i_2].total_needed_time)
                    ToTalTimeNeedAllPOKl03 =  MainKL03.reduce((n, {NeedTime}) => parseFloat(n) + parseFloat(NeedTime), 0)
                    TempFreeTimeKL03 = parseFloat(TimeFreeKL03) - parseFloat(ToTalTimeNeedAllPOKl03) - parseFloat(MainResult[i_2].total_needed_time)
                   if(index_kl01 !== -1 && MainResult[i_2].kl01 === "TRUE" && TempFreeTimeKL01 > -30 && index_kl02 !== -1 && MainResult[i_2].kl02 === "TRUE"   && TempFreeTimeKL02 > -30 && index_kl03 !== -1 && MainResult[i_2].kl03 === "TRUE"  && TempFreeTimeKL03 > -30){
                        if(parseFloat(TempFreeTimeKL01) > parseFloat(TempFreeTimeKL02) && parseFloat(TempFreeTimeKL01) > parseFloat(TempFreeTimeKL02)){
                            Push_Data(MainResult,MainKL01,i_2,MainKL01[index_kl01 ].IDGroup,index_kl01 +1 )
                            InlayKL01.splice(index_kl01 +1,0,MainResult[i_2].inlay_code)
                            // Cal_Time_Same_Inlay(MainKL01,index_kl01)
                            for(let t = index_kl01 + 1 ; t < MainKL01.length;t++){
                               const result_v = await db.query(`SELECT inlay1,inlay2,inlay3,change_order,change_sku,change_printing_size,change_inlay,change_position_inlay FROM auto_scheduling.item_setup_inlay WHERE item = '${MainKL01[t].Item}'`)
                                if(result_v.rowCount > 0)
                                Cal_Need_Time_Inlay(MainKL01,result_v,t)
                  
                             }
                          
                            continue
                        }else if(parseFloat(TempFreeTimeKL02) > parseFloat(TempFreeTimeKL01) && parseFloat(TempFreeTimeKL02) > parseFloat(TempFreeTimeKL03)){
                            Push_Data(MainResult,MainKL02,i_2,MainKL02[index_kl02  ].IDGroup,index_kl02 +1 )
                            InlayKL02.splice(index_kl02 +1,0,MainResult[i_2].inlay_code)
                          //  Cal_Time_Same_Inlay(MainKL02,index_kl02)
                            for(let t = index_kl02 + 1 ; t < MainKL02.length;t++){
                                const result_v = await db.query(`SELECT inlay1,inlay2,inlay3,change_order,change_sku,change_printing_size,change_inlay,change_position_inlay FROM auto_scheduling.item_setup_inlay WHERE item = '${MainKL02[t].Item}'`)
                                if(result_v.rowCount > 0)
                                 Cal_Need_Time_Inlay(MainKL02,result_v,t)

                               
                               
                             }
                            continue
                        }else if(parseFloat(TempFreeTimeKL03) > parseFloat(TempFreeTimeKL01) && parseFloat(TempFreeTimeKL03) > parseFloat(TempFreeTimeKL02)){
                            Push_Data(MainResult,MainKL03,i_2,MainKL03[index_kl03  ].IDGroup,index_kl03 +1 )
                            InlayKL03.splice(index_kl03 +1,0,MainResult[i_2].inlay_code)
                          //  Cal_Time_Same_Inlay(MainKL03,index_kl03)
                            for(let t = index_kl03 + 1 ; t < MainKL03.length;t++){
                                const result_v = await db.query(`SELECT inlay1,inlay2,inlay3,change_order,change_sku,change_printing_size,change_inlay,change_position_inlay FROM auto_scheduling.item_setup_inlay WHERE item = '${MainKL03[t].Item}'`)
                                if(result_v.rowCount > 0)
                                Cal_Need_Time_Inlay(MainKL03,result_v,t)

                                   
                             }
                            continue
                        }
                    }else if(index_kl01 !== -1 && MainResult[i_2].kl01 === "TRUE" && TempFreeTimeKL01 > -30 && index_kl02 !== -1 && MainResult[i_2].kl02 === "TRUE"   && TempFreeTimeKL02 > -30){
                        if(parseFloat(TempFreeTimeKL01) > parseFloat(TempFreeTimeKL02)){
                            Push_Data(MainResult,MainKL01,i_2,MainKL01[index_kl01  ].IDGroup,index_kl01 +1 )
                            InlayKL01.splice(index_kl01 +1,0,MainResult[i_2].inlay_code)
                            for(let t = index_kl01 + 1 ; t < MainKL01.length;t++){
                                const result_v = await db.query(`SELECT inlay1,inlay2,inlay3,change_order,change_sku,change_printing_size,change_inlay,change_position_inlay FROM auto_scheduling.item_setup_inlay WHERE item = '${MainKL01[t].Item}'`)
                                if(result_v.rowCount > 0)
                                Cal_Need_Time_Inlay(MainKL01,result_v,t)

                             }

                            continue
                        }else {
                            Push_Data(MainResult,MainKL02,i_2,MainKL02[index_kl02 ].IDGroup,index_kl02 +1 )
                            InlayKL02.splice(index_kl02 +1,0,MainResult[i_2].inlay_code)
                            for(let t = index_kl02 + 1 ; t < MainKL02.length;t++){
                                const result_v = await db.query(`SELECT inlay1,inlay2,inlay3,change_order,change_sku,change_printing_size,change_inlay,change_position_inlay FROM auto_scheduling.item_setup_inlay WHERE item = '${MainKL02[t].Item}'`)
                                if(result_v.rowCount > 0)
                                Cal_Need_Time_Inlay(MainKL02,result_v,t)

                             }

                            continue
                        }
                    }else if(index_kl01 !== -1 && MainResult[i_2].kl01 === "TRUE" && TempFreeTimeKL01 > -30 && index_kl03 !== -1 && MainResult[i_2].kl03 === "TRUE"   && TempFreeTimeKL03 > -30){
                        if(parseFloat(TempFreeTimeKL01) > parseFloat(TempFreeTimeKL03)){
                            Push_Data(MainResult,MainKL01,i_2,MainKL01[index_kl01  ].IDGroup,index_kl01 +1 )
                            InlayKL01.splice(index_kl01 +1,0,MainResult[i_2].inlay_code)
                            for(let t = index_kl01 + 1 ; t < MainKL01.length;t++){
                                const result_v = await db.query(`SELECT inlay1,inlay2,inlay3,change_order,change_sku,change_printing_size,change_inlay,change_position_inlay FROM auto_scheduling.item_setup_inlay WHERE item = '${MainKL01[t].Item}'`)
                                if(result_v.rowCount > 0)
                                Cal_Need_Time_Inlay(MainKL01,result_v,t)

                             }

                            continue
                        }else {
                            Push_Data(MainResult,MainKL03,i_2,MainKL03[index_kl03  ].IDGroup,index_kl03 +1 )
                            InlayKL03.splice(index_kl03 +1,0,MainResult[i_2].inlay_code)
                            for(let t = index_kl03 + 1 ; t < MainKL03.length;t++){
                                const result_v = await db.query(`SELECT inlay1,inlay2,inlay3,change_order,change_sku,change_printing_size,change_inlay,change_position_inlay FROM auto_scheduling.item_setup_inlay WHERE item = '${MainKL03[t].Item}'`)
                                if(result_v.rowCount > 0)
                                Cal_Need_Time_Inlay(MainKL03,result_v,t)

                             }

                            continue
                        }
                    }else if(index_kl01 !== -1 && MainResult[i_2].kl01 === "TRUE" && TempFreeTimeKL01 > -30){
                        Push_Data(MainResult,MainKL01,i_2,MainKL01[index_kl01  ].IDGroup,index_kl01 +1 )
                        InlayKL01.splice(index_kl01 +1,0,MainResult[i_2].inlay_code)
                        for(let t = index_kl01 + 1 ; t < MainKL01.length;t++){
                            const result_v = await db.query(`SELECT inlay1,inlay2,inlay3,change_order,change_sku,change_printing_size,change_inlay,change_position_inlay FROM auto_scheduling.item_setup_inlay WHERE item = '${MainKL01[t].Item}'`)
                            if(result_v.rowCount > 0)
                            Cal_Need_Time_Inlay(MainKL01,result_v,t)

                         }

                        continue
                    }else if (index_kl02 !== -1 && MainResult[i_2].kl02 === "TRUE"   && TempFreeTimeKL02 > -30){
                        Push_Data(MainResult,MainKL02,i_2,MainKL02[index_kl02  ].IDGroup,index_kl02 +1 )
                        InlayKL02.splice(index_kl02 +1,0,MainResult[i_2].inlay_code)
                        for(let t = index_kl02 + 1 ; t < MainKL02.length;t++){
                            const result_v = await db.query(`SELECT inlay1,inlay2,inlay3,change_order,change_sku,change_printing_size,change_inlay,change_position_inlay FROM auto_scheduling.item_setup_inlay WHERE item = '${MainKL02[t].Item}'`)
                            if(result_v.rowCount > 0)
                            Cal_Need_Time_Inlay(MainKL02,result_v,t)
                           
                         }

                        continue

                    }else if (index_kl03 !== -1 && MainResult[i_2].kl03 === "TRUE"   && TempFreeTimeKL03 > -30){
                        Push_Data(MainResult,MainKL03,i_2,MainKL03[index_kl03  ].IDGroup,index_kl03 +1 )
                        InlayKL03.splice(index_kl03 +1,0,MainResult[i_2].inlay_code)
                        for(let t = index_kl03 + 1 ; t < MainKL03.length;t++){
                            const result_v = await db.query(`SELECT inlay1,inlay2,inlay3,change_order,change_sku,change_printing_size,change_inlay,change_position_inlay FROM auto_scheduling.item_setup_inlay WHERE item = '${MainKL03[t].Item}'`)
                            if(result_v.rowCount > 0)
                            Cal_Need_Time_Inlay(MainKL03,result_v,t)

                         }

                        continue
                    }else{
                        Sap_Xep(Time_Cal_KL01,Time_Cal_KL02,Time_Cal_KL03,MainResult,MainKL01,MainKL02,MainKL03,LastedPlanTimeLastPO_KL01,LastedPlanTimeLastPO_KL02,LastedPlanTimeLastPO_KL03,EstimatedTimePO_KL01,EstimatedTimePO_KL02,EstimatedTimePO_KL03,i_2,InlayKL01,InlayKL02,InlayKL03)
                    }
                    }else{
                            Time_Cal_KL01 = Cal_Date_Estimated(MainResult,MainKL01,LastedPlanTimeLastPO_KL01,EstimatedTimePO_KL01,i_2,-1)
                            Time_Cal_KL02 = Cal_Date_Estimated(MainResult,MainKL02,LastedPlanTimeLastPO_KL02,EstimatedTimePO_KL02,i_2,-1)
                            Time_Cal_KL03 = Cal_Date_Estimated(MainResult,MainKL03,LastedPlanTimeLastPO_KL03,EstimatedTimePO_KL03,i_2,-1)
                            const result_v = await db.query(`SELECT inlay1,inlay2,inlay3,change_order,change_sku,change_printing_size,change_inlay,change_position_inlay FROM auto_scheduling.item_setup_inlay WHERE item = '${MainResult[i_2].oracle_item}'`)
                           
                            if(MainResult[i_2].kl01 === "TRUE"  &&  MainResult[i_2].kl02 === "TRUE" && MainResult[i_2].kl03 === "TRUE"){
                                        let  max =Math.max(Number(Time_Cal_KL01),Number(Time_Cal_KL02),Number(Time_Cal_KL03))
                                    
                                        if(max === Number(Time_Cal_KL01) && Time_Cal_KL01 !== null){
                                                if(result_v.rowCount > 0){
                                                    if(MainKL01.length > 0 && MainKL01[MainKL01.length -1].printing_size === MainResult[i_2].printing_size ){
                                                        result_v.rows[0].change_printing_size = 0
                                                    }
                                                    if(MainKL01.length > 0 && MainKL01[MainKL01.length -1].inlay_position === MainResult[i_2].inlay_position){
                                                        result_v.rows[0].change_position_inlay = 0
                                                    }
                                                }
                                                MainResult[i_2].setup_time =  parseFloat(parseFloat(result_v.rows[0].change_sku)*parseFloat(MainResult[i_2].sku)) +  parseFloat(result_v.rows[0].change_order) + parseFloat(result_v.rows[0].change_inlay) + parseFloat(result_v.rows[0].change_printing_size) + parseFloat(result_v.rows[0].change_position_inlay)
                                                MainResult[i_2].run_time =  parseFloat(MainResult[i_2].quantity_sheet)*60/parseFloat(result_v.rows[0].inlay1) 
                                                MainResult[i_2].total_needed_time = parseFloat( MainResult[i_2].setup_time) + parseFloat( MainResult[i_2].run_time)
                                                
                                                

                                                Push_Data(MainResult,MainKL01,i_2,MainResult[i_2].service_priority)
                                                InlayKL01.push(MainResult[i_2].inlay_code)
                                        }else if(max === Number(Time_Cal_KL02) && Time_Cal_KL02 !== null){
                                            if(result_v.rowCount > 0){
                                                if(MainKL02.length > 0 && MainKL02[MainKL02.length -1].printing_size === MainResult[i_2].printing_size ){
                                                    result_v.rows[0].change_printing_size = 0
                                                }
                                                if( MainKL02.length > 0 && MainKL02[MainKL02.length -1].inlay_position === MainResult[i_2].inlay_position){
                                                    result_v.rows[0].change_position_inlay = 0
                                                }
                                            }
                                            MainResult[i_2].setup_time =  parseFloat(parseFloat(result_v.rows[0].change_sku)*parseFloat(MainResult[i_2].sku)) +  parseFloat(result_v.rows[0].change_order) + parseFloat(result_v.rows[0].change_inlay) + parseFloat(result_v.rows[0].change_printing_size) + parseFloat(result_v.rows[0].change_position_inlay)
                                            MainResult[i_2].run_time =  parseFloat(MainResult[i_2].quantity_sheet)*60/parseFloat(result_v.rows[0].inlay1) 
                                            MainResult[i_2].total_needed_time = parseFloat( MainResult[i_2].setup_time) + parseFloat( MainResult[i_2].run_time)
                                            Push_Data(MainResult,MainKL02,i_2,MainResult[i_2].service_priority)
                                            InlayKL02.push(MainResult[i_2].inlay_code)
                        
                                        }else if(max === Number(Time_Cal_KL03) && Time_Cal_KL03 !== null){
                                            if(result_v.rowCount > 0){
                                                if(MainKL03.length > 0 && MainKL03[MainKL03.length -1].printing_size === MainResult[i_2].printing_size ){
                                                    result_v.rows[0].change_printing_size = 0
                                                }
                                                if(MainKL03.length > 0 && MainKL03[MainKL03.length -1].inlay_position === MainResult[i_2].inlay_position){
                                                    result_v.rows[0].change_position_inlay = 0
                                                }
                                            }
                                            MainResult[i_2].setup_time =  parseFloat(parseFloat(result_v.rows[0].change_sku)*parseFloat(MainResult[i_2].sku)) +  parseFloat(result_v.rows[0].change_order) + parseFloat(result_v.rows[0].change_inlay) + parseFloat(result_v.rows[0].change_printing_size) + parseFloat(result_v.rows[0].change_position_inlay)
                                            MainResult[i_2].run_time =  parseFloat(MainResult[i_2].quantity_sheet)*60/parseFloat(result_v.rows[0].inlay1) 
                                            MainResult[i_2].total_needed_time = parseFloat( MainResult[i_2].setup_time) + parseFloat( MainResult[i_2].run_time)
                                                Push_Data(MainResult,MainKL03,i_2,MainResult[i_2].service_priority)
                                                InlayKL03.push(MainResult[i_2].inlay_code)
                                        }
                            }else if(MainResult[i_2].kl01 === "FALSE"  &&  MainResult[i_2].kl02 === "TRUE" && MainResult[i_2].kl03 === "TRUE"){
                                let  max =Math.max(Number(Time_Cal_KL02),Number(Time_Cal_KL03))
                                if(max === Number(Time_Cal_KL02) && Time_Cal_KL02 !== null){
                                    if(result_v.rowCount > 0){
                                        if(MainKL02.length > 0 && MainKL02[MainKL02.length -1].printing_size === MainResult[i_2].printing_size ){
                                            result_v.rows[0].change_printing_size = 0
                                        }
                                        if( MainKL02.length > 0 && MainKL02[MainKL02.length -1].inlay_position === MainResult[i_2].inlay_position){
                                            result_v.rows[0].change_position_inlay = 0
                                        }
                                    }
                                    MainResult[i_2].setup_time =  parseFloat(parseFloat(result_v.rows[0].change_sku)*parseFloat(MainResult[i_2].sku)) +  parseFloat(result_v.rows[0].change_order) + parseFloat(result_v.rows[0].change_inlay) + parseFloat(result_v.rows[0].change_printing_size) + parseFloat(result_v.rows[0].change_position_inlay)
                                    MainResult[i_2].run_time =  parseFloat(MainResult[i_2].quantity_sheet)*60/parseFloat(result_v.rows[0].inlay1) 
                                    MainResult[i_2].total_needed_time = parseFloat( MainResult[i_2].setup_time) + parseFloat( MainResult[i_2].run_time)
                                    Push_Data(MainResult,MainKL02,i_2,MainResult[i_2].service_priority)
                                    Push_Data(MainResult,MainKL02,i_2,MainResult[i_2].service_priority)
                                    InlayKL02.push(MainResult[i_2].inlay_code)
                                }else if(max === Number(Time_Cal_KL03) && Time_Cal_KL03 !== null){
                                    if(result_v.rowCount > 0){
                                        if(MainKL03.length > 0 && MainKL03[MainKL03.length -1].printing_size === MainResult[i_2].printing_size ){
                                            result_v.rows[0].change_printing_size = 0
                                        }
                                        if(MainKL03.length > 0 && MainKL03[MainKL03.length -1].inlay_position === MainResult[i_2].inlay_position){
                                            result_v.rows[0].change_position_inlay = 0
                                        }
                                    }
                                    MainResult[i_2].setup_time =  parseFloat(parseFloat(result_v.rows[0].change_sku)*parseFloat(MainResult[i_2].sku)) +  parseFloat(result_v.rows[0].change_order) + parseFloat(result_v.rows[0].change_inlay) + parseFloat(result_v.rows[0].change_printing_size) + parseFloat(result_v.rows[0].change_position_inlay)
                                    MainResult[i_2].run_time =  parseFloat(MainResult[i_2].quantity_sheet)*60/parseFloat(result_v.rows[0].inlay1) 
                                    MainResult[i_2].total_needed_time = parseFloat( MainResult[i_2].setup_time) + parseFloat( MainResult[i_2].run_time)
                                    Push_Data(MainResult,MainKL03,i_2,MainResult[i_2].service_priority)
                                    InlayKL03.push(MainResult[i_2].inlay_code)
                        
                                }
                            }else if(MainResult[i_2].kl01 === "TRUE"  &&  MainResult[i_2].kl02 === "FALSE" && MainResult[i_2].kl03 === "TRUE"){
                                let  max =Math.max(Number(Time_Cal_KL01),Number(Time_Cal_KL03))
                                if(max === Number(Time_Cal_KL01) && Time_Cal_KL01 !== null){
                                    if(result_v.rowCount > 0){
                                        if(MainKL01.length > 0 && MainKL01[MainKL01.length -1].printing_size === MainResult[i_2].printing_size ){
                                            result_v.rows[0].change_printing_size = 0
                                        }
                                        if(MainKL01.length > 0 && MainKL01[MainKL01.length -1].inlay_position === MainResult[i_2].inlay_position){
                                            result_v.rows[0].change_position_inlay = 0
                                        }
                                    }
                                    MainResult[i_2].setup_time =  parseFloat(parseFloat(result_v.rows[0].change_sku)*parseFloat(MainResult[i_2].sku)) +  parseFloat(result_v.rows[0].change_order) + parseFloat(result_v.rows[0].change_inlay) + parseFloat(result_v.rows[0].change_printing_size) + parseFloat(result_v.rows[0].change_position_inlay)
                                    MainResult[i_2].run_time =  parseFloat(MainResult[i_2].quantity_sheet)*60/parseFloat(result_v.rows[0].inlay1) 
                                    MainResult[i_2].total_needed_time = parseFloat( MainResult[i_2].setup_time) + parseFloat( MainResult[i_2].run_time)
                                    
                                    Push_Data(MainResult,MainKL01,i_2,MainResult[i_2].service_priority)
                                    InlayKL01.push(MainResult[i_2].inlay_code)
                        
                                }else if(max === Number(Time_Cal_KL03) && Time_Cal_KL03 !== null){
                                    if(result_v.rowCount > 0){
                                        if(MainKL03.length > 0 && MainKL03[MainKL03.length -1].printing_size === MainResult[i_2].printing_size ){
                                            result_v.rows[0].change_printing_size = 0
                                        }
                                        if(MainKL03.length > 0 && MainKL03[MainKL03.length -1].inlay_position === MainResult[i_2].inlay_position){
                                            result_v.rows[0].change_position_inlay = 0
                                        }
                                    }
                                    MainResult[i_2].setup_time =  parseFloat(parseFloat(result_v.rows[0].change_sku)*parseFloat(MainResult[i_2].sku)) +  parseFloat(result_v.rows[0].change_order) + parseFloat(result_v.rows[0].change_inlay) + parseFloat(result_v.rows[0].change_printing_size) + parseFloat(result_v.rows[0].change_position_inlay)
                                    MainResult[i_2].run_time =  parseFloat(MainResult[i_2].quantity_sheet)*60/parseFloat(result_v.rows[0].inlay1) 
                                    MainResult[i_2].total_needed_time = parseFloat( MainResult[i_2].setup_time) + parseFloat( MainResult[i_2].run_time)
                                    Push_Data(MainResult,MainKL03,i_2,MainResult[i_2].service_priority)
                                    InlayKL03.push(MainResult[i_2].inlay_code)
                        
                                }
                            }else if(MainResult[i_2].kl01 === "TRUE"  &&  MainResult[i_2].kl02 === "TRUE" && MainResult[i_2].kl03 === "FALSE"){
                                let  max =Math.max(Number(Time_Cal_KL01),Number(Time_Cal_KL02))
                                if(max === Number(Time_Cal_KL01) && Time_Cal_KL01 !== null){
                                    if(result_v.rowCount > 0){
                                        if(MainKL01.length > 0 && MainKL01[MainKL01.length -1].printing_size === MainResult[i_2].printing_size ){
                                            result_v.rows[0].change_printing_size = 0
                                        }
                                        if(MainKL01.length > 0 && MainKL01[MainKL01.length -1].inlay_position === MainResult[i_2].inlay_position){
                                            result_v.rows[0].change_position_inlay = 0
                                        }
                                    }
                                    MainResult[i_2].setup_time =  parseFloat(parseFloat(result_v.rows[0].change_sku)*parseFloat(MainResult[i_2].sku)) +  parseFloat(result_v.rows[0].change_order) + parseFloat(result_v.rows[0].change_inlay) + parseFloat(result_v.rows[0].change_printing_size) + parseFloat(result_v.rows[0].change_position_inlay)
                                    MainResult[i_2].run_time =  parseFloat(MainResult[i_2].quantity_sheet)*60/parseFloat(result_v.rows[0].inlay1) 
                                    MainResult[i_2].total_needed_time = parseFloat( MainResult[i_2].setup_time) + parseFloat( MainResult[i_2].run_time)
                                    Push_Data(MainResult,MainKL01,i_2,MainResult[i_2].service_priority)
                                    InlayKL01.push(MainResult[i_2].inlay_code)
                        
                                }else if(max === Number(Time_Cal_KL02) && Time_Cal_KL02 !== null){
                                    if(result_v.rowCount > 0){
                                        if(MainKL02.length > 0 && MainKL02[MainKL02.length -1].printing_size === MainResult[i_2].printing_size ){
                                            result_v.rows[0].change_printing_size = 0
                                        }
                                        if(MainKL02.length > 0 && MainKL02[MainKL02.length -1].inlay_position === MainResult[i_2].inlay_position){
                                            result_v.rows[0].change_position_inlay = 0
                                        }
                                    }
                                    MainResult[i_2].setup_time =  parseFloat(parseFloat(result_v.rows[0].change_sku)*parseFloat(MainResult[i_2].sku)) +  parseFloat(result_v.rows[0].change_order) + parseFloat(result_v.rows[0].change_inlay) + parseFloat(result_v.rows[0].change_printing_size) + parseFloat(result_v.rows[0].change_position_inlay)
                                    MainResult[i_2].run_time =  parseFloat(MainResult[i_2].quantity_sheet)*60/parseFloat(result_v.rows[0].inlay1) 
                                    MainResult[i_2].total_needed_time = parseFloat( MainResult[i_2].setup_time) + parseFloat( MainResult[i_2].run_time)
                                    Push_Data(MainResult,MainKL02,i_2,MainResult[i_2].service_priority)
                                    InlayKL02.push(MainResult[i_2].inlay_code)
                        
                                }
                            }else if(MainResult[i_2].kl01 === "TRUE"  &&  MainResult[i_2].kl02 === "FALSE" && MainResult[i_2].kl03 === "FALSE"){
                                if(result_v.rowCount > 0){
                                    if(MainKL01.length > 0 && MainKL01[MainKL01.length -1].printing_size === MainResult[i_2].printing_size ){
                                        result_v.rows[0].change_printing_size = 0
                                    }
                                    if(MainKL01.length > 0 && MainKL01[MainKL01.length -1].inlay_position === MainResult[i_2].inlay_position){
                                        result_v.rows[0].change_position_inlay = 0
                                    }
                                }
                                MainResult[i_2].setup_time =  parseFloat(parseFloat(result_v.rows[0].change_sku)*parseFloat(MainResult[i_2].sku)) +  parseFloat(result_v.rows[0].change_order) + parseFloat(result_v.rows[0].change_inlay) + parseFloat(result_v.rows[0].change_printing_size) + parseFloat(result_v.rows[0].change_position_inlay)
                                MainResult[i_2].run_time =  parseFloat(MainResult[i_2].quantity_sheet)*60/parseFloat(result_v.rows[0].inlay1) 
                                MainResult[i_2].total_needed_time = parseFloat( MainResult[i_2].setup_time) + parseFloat( MainResult[i_2].run_time)
                                    Push_Data(MainResult,MainKL01,i_2,MainResult[i_2].service_priority)
                                    InlayKL01.push(MainResult[i_2].inlay_code)
                        
                                
                            }else if(MainResult[i_2].kl01 === "FALSE"  &&  MainResult[i_2].kl02 === "TRUE" && MainResult[i_2].kl03 === "FALSE"){
                                if(result_v.rowCount > 0){
                                    if(MainKL02.length > 0 && MainKL02[MainKL02.length -1].printing_size === MainResult[i_2].printing_size ){
                                        result_v.rows[0].change_printing_size = 0
                                    }
                                    if(MainKL02.length > 0 && MainKL02[MainKL02.length -1].inlay_position === MainResult[i_2].inlay_position){
                                        result_v.rows[0].change_position_inlay = 0
                                    }
                                }
                                MainResult[i_2].setup_time =  parseFloat(parseFloat(result_v.rows[0].change_sku)*parseFloat(MainResult[i_2].sku)) +  parseFloat(result_v.rows[0].change_order) + parseFloat(result_v.rows[0].change_inlay) + parseFloat(result_v.rows[0].change_printing_size) + parseFloat(result_v.rows[0].change_position_inlay)
                                MainResult[i_2].run_time =  parseFloat(MainResult[i_2].quantity_sheet)*60/parseFloat(result_v.rows[0].inlay1) 
                                MainResult[i_2].total_needed_time = parseFloat( MainResult[i_2].setup_time) + parseFloat( MainResult[i_2].run_time)
                                Push_Data(MainResult,MainKL02,i_2,MainResult[i_2].service_priority)
                                InlayKL02.push(MainResult[i_2].inlay_code)
                        
                        
                            }else if(MainResult[i_2].kl01 === "FALSE"  &&  MainResult[i_2].kl02 === "FALSE" && MainResult[i_2].kl03 === "TRUE"){
                                if(result_v.rowCount > 0){
                                    if(MainKL03.length > 0 && MainKL03[MainKL03.length -1].printing_size === MainResult[i_2].printing_size ){
                                        result_v.rows[0].change_printing_size = 0
                                    }
                                    if(MainKL03.length > 0 && MainKL03[MainKL03.length -1].inlay_position === MainResult[i_2].inlay_position){
                                        result_v.rows[0].change_position_inlay = 0
                                    }
                                }
                                MainResult[i_2].setup_time =  parseFloat(parseFloat(result_v.rows[0].change_sku)*parseFloat(MainResult[i_2].sku)) +  parseFloat(result_v.rows[0].change_order) + parseFloat(result_v.rows[0].change_inlay) + parseFloat(result_v.rows[0].change_printing_size) + parseFloat(result_v.rows[0].change_position_inlay)
                                MainResult[i_2].run_time =  parseFloat(MainResult[i_2].quantity_sheet)*60/parseFloat(result_v.rows[0].inlay1) 
                                MainResult[i_2].total_needed_time = parseFloat( MainResult[i_2].setup_time) + parseFloat( MainResult[i_2].run_time)
                                Push_Data(MainResult,MainKL03,i_2,MainResult[i_2].service_priority)
                                InlayKL03.push(MainResult[i_2].inlay_code)
                        
                            }
                    }
                
       
          
         }
         let Temp_KL01 = MainKL01;
         let Temp_KL02 = MainKL02;
         let Temp_KL03 = MainKL03;
        
        

            let stt = 0 ;
            Temp_KL01.forEach( async function(v){
                    stt = stt + 1
                    await db.query(`INSERT INTO auto_scheduling.inlay_scheduling(stt,po,inlay_code,lasted_plan_time,estimated_time,total_time_need,adjust_time,time_out,priority,id_group_inlay,machine) 
                    VALUES (${stt},'${v.PO}','${v.InlayCode}','${v.EstimatedTime}','${v.NeedTime}','NA','${v.AdjustLastTime}','${v.TimeOut}','${v.Priority}','${v.IDGroup}','KL01')`)
            })
            let stt1 = 0 ;

            Temp_KL02.forEach( async function(v){
                stt1 = stt1 + 1;
                    await db.query(`INSERT INTO auto_scheduling.inlay_scheduling(stt,po,inlay_code,lasted_plan_time,estimated_time,total_time_need,adjust_time,time_out,priority,id_group_inlay,machine) 
                    VALUES ('${stt1}','${v.PO}','${v.InlayCode}','${v.EstimatedTime}','${v.NeedTime}','NA','${v.AdjustLastTime}','${v.TimeOut}','${v.Priority}','${v.IDGroup}','KL02')`)
            })
            let stt2 = 0 ;
            Temp_KL03.forEach( async function(v){
                     stt2 = stt2 + 1
                    await db.query(`INSERT INTO auto_scheduling.inlay_scheduling(stt,po,inlay_code,lasted_plan_time,estimated_time,total_time_need,adjust_time,time_out,priority,id_group_inlay,machine) 
                    VALUES ('${stt2}','${v.PO}','${v.InlayCode}','${v.EstimatedTime}','${v.NeedTime}','NA','${v.AdjustLastTime}','${v.TimeOut}','${v.Priority}','${v.IDGroup}','KL03')`)
                })
            
            res.json('DONE')
            // res.send({
            //   // DataRaw : MainResult,
            //    KL01 : Temp_KL01,
            //    KL02 : Temp_KL02, 
            //    KL03 : Temp_KL03, 
            // })

         }
    } catch (err) {
        console.log(err);
        res.json("FAIL")
    }
})
function Cal_Date_Estimated(result,MainK,LastedPlanTimeLastPO,EstimatedTimePO,n,index){
    if(index < 0){
     if(MainK.length > 0){
            if(MainK[MainK.length -1 ].TimeOut !== "" && MainK[MainK.length -1 ].TimeOut !== null ){
               LastedPlanTimeLastPO = new  Date(MainK[MainK.length -1 ].TimeOut)

            }else{
                LastedPlanTimeLastPO = new  Date(MainK[MainK.length -1 ].EstimatedTime)
            }
        }
    }
    else{
        if(MainK.length > 0){
            if(MainK[index].TimeOut !== "" && MainK[index].TimeOut !== null ){
               LastedPlanTimeLastPO = new  Date(MainK[index].TimeOut)
            }else{
                LastedPlanTimeLastPO = new  Date(MainK[index].EstimatedTime)
            }

        }
    }
   
    EstimatedTimePO = moment(LastedPlanTimeLastPO).add(Number(result[n].total_needed_time), 'minutes')
    //  EstimatedTimePO_KL01 = moment(EstimatedTimePO_KL01).utcOffset('+0700').format('YYYY-MM-DD HH:mm:ss')
     let date_estimate_kl01 = moment(EstimatedTimePO).utcOffset('+0700').format('YYYY-MM-DD HH:mm:ss');
     let adjusted_lasted_plan_time_kl01 = moment(new Date(result[n].adjusted_lasted_plan_time)).format('YYYY-MM-DD HH:mm:ss')
     let a = moment(date_estimate_kl01)
     let b = moment(adjusted_lasted_plan_time_kl01)
     result[n].estimated_finish_time = date_estimate_kl01;
     result[n].cal_estimated_finish_time =  b.diff(a,'minutes')
    return  b.diff(a,'minutes')
}

const groupBy = key => (result,current) => {
    const item = Object.assign({},current);
    if (typeof result[current[key]] == 'undefined'){
      result[current[key]] = [item];
    }else{
      result[current[key]].push(item);
    }
    return result;
  };
  
  const stringSortBy = key => (a,b) => {
     const sa = a[key];
     const sb = b[key];
     return sa < sb ? -1 : +(sa > sb);
  };

function Sap_Xep(Time_Cal_KL01,Time_Cal_KL02,Time_Cal_KL03,MainResult,MainKL01,MainKL02,MainKL03,LastedPlanTimeLastPO_KL01,LastedPlanTimeLastPO_KL02,LastedPlanTimeLastPO_KL03,EstimatedTimePO_KL01,EstimatedTimePO_KL02,EstimatedTimePO_KL03,i_2,InlayKL01,InlayKL02,InlayKL03){
    Time_Cal_KL01 = Cal_Date_Estimated(MainResult,MainKL01,LastedPlanTimeLastPO_KL01,EstimatedTimePO_KL01,i_2,-1)
    Time_Cal_KL02 = Cal_Date_Estimated(MainResult,MainKL02,LastedPlanTimeLastPO_KL02,EstimatedTimePO_KL02,i_2,-1)
    Time_Cal_KL03 = Cal_Date_Estimated(MainResult,MainKL03,LastedPlanTimeLastPO_KL03,EstimatedTimePO_KL03,i_2,-1)
    if(MainResult[i_2].kl01 === "TRUE"  &&  MainResult[i_2].kl02 === "TRUE" && MainResult[i_2].kl03 === "TRUE"){
                let  max =Math.max(Number(Time_Cal_KL01),Number(Time_Cal_KL02),Number(Time_Cal_KL03))
               
                 if(max === Number(Time_Cal_KL01) && Time_Cal_KL01 !== null){
                        Push_Data(MainResult,MainKL01,i_2,MainResult[i_2].service_priority)
                        InlayKL01.push(MainResult[i_2].inlay_code)
                }else if(max === Number(Time_Cal_KL02) && Time_Cal_KL02 !== null){
                    Push_Data(MainResult,MainKL02,i_2,MainResult[i_2].service_priority)
                    InlayKL02.push(MainResult[i_2].inlay_code)

                  }else if(max === Number(Time_Cal_KL03) && Time_Cal_KL03 !== null){
                        Push_Data(MainResult,MainKL03,i_2,MainResult[i_2].service_priority)
                        InlayKL03.push(MainResult[i_2].inlay_code)
                }
    }else if(MainResult[i_2].kl01 === "FALSE"  &&  MainResult[i_2].kl02 === "TRUE" && MainResult[i_2].kl03 === "TRUE"){
        let  max =Math.max(Number(Time_Cal_KL02),Number(Time_Cal_KL03))
        if(max === Number(Time_Cal_KL02) && Time_Cal_KL02 !== null){
            Push_Data(MainResult,MainKL02,i_2,MainResult[i_2].service_priority)
            InlayKL02.push(MainResult[i_2].inlay_code)
        }else if(max === Number(Time_Cal_KL03) && Time_Cal_KL03 !== null){
              Push_Data(MainResult,MainKL03,i_2,MainResult[i_2].service_priority)
              InlayKL03.push(MainResult[i_2].inlay_code)

        }
    }else if(MainResult[i_2].kl01 === "TRUE"  &&  MainResult[i_2].kl02 === "FALSE" && MainResult[i_2].kl03 === "TRUE"){
        let  max =Math.max(Number(Time_Cal_KL01),Number(Time_Cal_KL03))
        if(max === Number(Time_Cal_KL01) && Time_Cal_KL01 !== null){
               Push_Data(MainResult,MainKL01,i_2,MainResult[i_2].service_priority)
               InlayKL01.push(MainResult[i_2].inlay_code)

          }else if(max === Number(Time_Cal_KL03) && Time_Cal_KL03 !== null){
            Push_Data(MainResult,MainKL03,i_2,MainResult[i_2].service_priority)
            InlayKL03.push(MainResult[i_2].inlay_code)

        }
    }else if(MainResult[i_2].kl01 === "TRUE"  &&  MainResult[i_2].kl02 === "TRUE" && MainResult[i_2].kl03 === "FALSE"){
        let  max =Math.max(Number(Time_Cal_KL01),Number(Time_Cal_KL02))
        if(max === Number(Time_Cal_KL01) && Time_Cal_KL01 !== null){
               Push_Data(MainResult,MainKL01,i_2,MainResult[i_2].service_priority)
               InlayKL01.push(MainResult[i_2].inlay_code)

          }else if(max === Number(Time_Cal_KL02) && Time_Cal_KL02 !== null){
            Push_Data(MainResult,MainKL02,i_2,MainResult[i_2].service_priority)
            InlayKL02.push(MainResult[i_2].inlay_code)

          }
    }else if(MainResult[i_2].kl01 === "TRUE"  &&  MainResult[i_2].kl02 === "FALSE" && MainResult[i_2].kl03 === "FALSE"){
               Push_Data(MainResult,MainKL01,i_2,MainResult[i_2].service_priority)
               InlayKL01.push(MainResult[i_2].inlay_code)

          
    }else if(MainResult[i_2].kl01 === "FALSE"  &&  MainResult[i_2].kl02 === "TRUE" && MainResult[i_2].kl03 === "FALSE"){
        Push_Data(MainResult,MainKL02,i_2,MainResult[i_2].service_priority)
        InlayKL02.push(MainResult[i_2].inlay_code)

   
     }else if(MainResult[i_2].kl01 === "FALSE"  &&  MainResult[i_2].kl02 === "FALSE" && MainResult[i_2].kl03 === "TRUE"){
        Push_Data(MainResult,MainKL03,i_2,MainResult[i_2].service_priority)
        InlayKL03.push(MainResult[i_2].inlay_code)

     }
}
function Cal_Need_Time(MainK,result,t){
 if(MainK[MainK.length -2].InlayCode === MainK[MainK.length -1].InlayCode){
    if(result.rowCount > 0){
        MainK[MainK.length -1].NeedTime = parseFloat(parseFloat(MainK[t].Qty)*60/parseFloat(result.rows[0].inlay1)) +   parseFloat(result.rows[0].change_order) + parseFloat(result.rows[0].change_printing_size) + parseFloat(result.rows[0].change_sku)*parseFloat(MainK[t].Sku)
        MainK[MainK.length -1].SetupTime =   parseFloat(result.rows[0].change_order) + parseFloat(result.rows[0].change_printing_size) + parseFloat(result.rows[0].change_sku)*parseFloat(MainK[t].Sku)
        MainK[MainK.length -1].RunTime = parseFloat(MainK[t].Qty)*60/parseFloat(result.rows[0].inlay1)
    }
 }else{
    MainK[MainK.length -1].NeedTime = parseFloat(parseFloat(MainK[t].Qty)*60/parseFloat(result.rows[0].inlay1)) + parseFloat(result.rows[0].change_inlay) + parseFloat(result.rows[0].change_position_inlay) +   parseFloat(result.rows[0].change_order) + parseFloat(result.rows[0].change_printing_size) + parseFloat(result.rows[0].change_sku)*parseFloat(MainK[t].Sku)
    MainK[MainK.length -1].SetupTime =   parseFloat(result.rows[0].change_inlay) + parseFloat(result.rows[0].change_position_inlay) +   parseFloat(result.rows[0].change_order) + parseFloat(result.rows[0].change_printing_size) + parseFloat(result.rows[0].change_sku)*parseFloat(MainK[t].Sku)
    MainK[MainK.length -1].RunTime = parseFloat(MainK[MainK.length -1].Qty)*60/parseFloat(result.rows[0].inlay1)
 }
}
function Cal_Need_Time_Inlay(MainK,result,t){
    if(MainK[t -1 ].InlayCode === MainK[t].InlayCode){
       if(result.rowCount > 0){
           MainK[t].NeedTime = parseFloat(parseFloat(MainK[t].Qty)*60/parseFloat(result.rows[0].inlay1)) +   parseFloat(result.rows[0].change_order) + parseFloat(result.rows[0].change_printing_size) + parseFloat(result.rows[0].change_sku)*parseFloat(MainK[t].Sku)
           MainK[t].SetupTime =   parseFloat(result.rows[0].change_order) + parseFloat(result.rows[0].change_printing_size) + parseFloat(result.rows[0].change_sku)*parseFloat(MainK[t].Sku)
           MainK[t].RunTime = parseFloat(MainK[t].Qty)*60/parseFloat(result.rows[0].inlay1)
       }
    }else{
        MainK[t].NeedTime = parseFloat(parseFloat(MainK[t].Qty)*60/parseFloat(result.rows[0].inlay1)) + parseFloat(result.rows[0].change_inlay) + parseFloat(result.rows[0].change_position_inlay) +   parseFloat(result.rows[0].change_order) + parseFloat(result.rows[0].change_printing_size) + parseFloat(result.rows[0].change_sku)*parseFloat(MainK[t].Sku)
        MainK[t].SetupTime =   parseFloat(result.rows[0].change_inlay) + parseFloat(result.rows[0].change_position_inlay) +   parseFloat(result.rows[0].change_order) + parseFloat(result.rows[0].change_printing_size) + parseFloat(result.rows[0].change_sku)*parseFloat(MainK[t].Sku)
        MainK[t].RunTime = parseFloat(MainK[t].Qty)*60/parseFloat(result.rows[0].inlay1)
    }
    let EstimatedTime = new Date(MainK[t-1].EstimatedTime);
    MainK[t].EstimatedTime = moment(EstimatedTime).add(parseFloat(MainK[t].NeedTime),'minutes')
    MainK[t].EstimatedTime = moment( MainK[t].EstimatedTime ).utcOffset('+0700').format('YYYY-MM-DD HH:mm:ss');
   }
function Push_Data(result,MainK,n,groupIL,index = -1){
        if(index !== -1){
            MainK.splice(index,0,{
                IDGroup: groupIL,
                PO :  result[n].po,
                SO :  result[n].so_line,
                SetupTime : result[n].setup_time,
                RunTime : result[n].run_time,
                NeedTime :  result[n].total_needed_time,
                InlayCode :  result[n].inlay_code,
                LastedPlanTime :  result[n].lasted_plan_time,
                TimeIn :  result[n].time_in,
                TimeOut :  result[n].time_out,
                AdjustLastTime :   result[n].adjusted_lasted_plan_time,
                EstimatedTime :  result[n].estimated_finish_time,
                Priority :  result[n].service_priority,
                TotalNeedTime : result[n].total_needed_time,
                Item: result[n].oracle_item,
                Sku: result[n].sku,
                Qty : result[n].quantity_sheet

            })
        }else{
            MainK.push({
                IDGroup: groupIL,
                PO :  result[n].po,
                SO :  result[n].so_line,
                SetupTime : result[n].setup_time,
                RunTime : result[n].run_time,
                NeedTime :  result[n].total_needed_time,
                InlayCode :  result[n].inlay_code,
                LastedPlanTime :  result[n].lasted_plan_time,
                EstimatedTime :  result[n].estimated_finish_time,
                TimeIn :  result[n].time_in,
                TimeOut :  result[n].time_out,
                AdjustLastTime :   result[n].adjusted_lasted_plan_time,
                Priority :  result[n].service_priority,
                TotalNeedTime : result[n].total_needed_time,
                Item: result[n].oracle_item,
                Sku: result[n].sku,
                Qty : result[n].quantity_sheet

              })
        }
        // if(Number(TimeFreeKL01) >= -30 && Number(TimeFreeKL01) >= Number(TimeFreeKL02) &&  Number(TimeFreeKL01) >= Number(TimeFreeKL03))
        //   {
         
        //   }
}

async function Cal_Time_Same_Inlay(MainKL01,index_kl01){
    for(let t = index_kl01 + 1 ; t < MainKL01.length;t++){
        const result_v = await db.query(`SELECT inlay1,change_inlay,change_position_inlay FROM auto_scheduling.item_setup_inlay WHERE item = '${MainKL01[t].Item}'`)
         if(MainKL01[t-1].InlayCode === MainKL01[t].InlayCode){
             MainKL01[t].NeedTime =  parseFloat(MainKL01[t].NeedTime) - parseFloat(result_v.rows[0].change_inlay) - parseFloat(result_v.rows[0].change_position_inlay)
         }
     }
}
Array.prototype.getIndexOf = function(el) {

    var arr = this;
  
    for (var i=0; i<arr.length; i++){
       console.log(arr[i].name);
       if(arr[i].name==el){
         return i;
       }
       
    }
    
    return -1;
  
  }

module.exports = router