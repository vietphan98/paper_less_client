String.prototype.replaceAll = function(search, replacement) {
    if(this.indexOf(search) !== -1)
    {
        var target = this;
        return target.split(search).join(replacement);
    } else return this;
    
};


Date.prototype.addDate = function(n){
    this.setDate(this.getDate() + n);
    return this;
};

var urlServerSide = "https://zeros.asia:5656/";

function download(filename, text) {
    var element = document.createElement('a');
    var universalBOM = "\uFEFF";
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(universalBOM + text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function getUrl(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function AjaxAsync(urlsend,dtsend,typeSend = "GET", datatype = "html", to = 3000) {
    var it_works;
    if(urlsend.indexOf("http") === 0) {

    } else urlsend = urlServerSide + urlsend;
    $.ajax({
        url: urlsend,
        type: typeSend.toUpperCase(),
        dataType: datatype.toUpperCase(),
        cache: false,
        data: dtsend,
        success: function(string){	
            it_works = string;
        },
        error: function (){
            it_works = 'ERROR';
        },
        async: false,
        timeout: to
    });
    return it_works;
}

function AjaxNonAsync(urlsend,dtsend,typeSend = "GET", datatype = "html") {
    $.ajax({
        url: urlsend,
        type: typeSend.toUpperCase(),
        dataType: datatype.toUpperCase(),
        cache: false,
        data: dtsend,
        success: function(string){	
            console.log(string);
        },
        error: function (){
            console.log("Error");
        },
        async: true
    });
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
    var hh = this.getHours();
    var MM = this.getMinutes();

    return [this.getFullYear(),(mm>9 ? '' : '0') + mm,(dd>9 ? '' : '0') + dd
            ].join('-') + " " + [(hh>9 ? '' : '0') + hh,(MM>9 ? '' : '0') + MM].join(':');
};

function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.style.position = "fixed";
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn\"t work as this gives a negative w/h on some browsers.
    textArea.style.width = "2em";
    textArea.style.height = "2em";

    // We don"t need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = "transparent";


    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Copying text command was " + msg);
    } catch (err) {
        console.log("Oops, unable to copy");
    }

    document.body.removeChild(textArea);
}

dhtmlXGridObject.prototype.AddClipBoard=async function(dp){
    console.log(dp);
    await sleep(150);
    var LastRow = this.getRowsNum();
    var LastColumn = this.getColumnsNum();
    var top_row = this.getSelectedBlock().LeftTopRow;
    var IndexRow = this.getRowIndex(top_row);
    var bottom_row = this.getSelectedBlock().RightBottomRow;
    var left_column = this.getSelectedBlock().LeftTopCol;
    var right_column = this.getSelectedBlock().RightBottomCol;
    var clipText = CopyClipBoard;
    var RowData = clipText.split("\r\n");
    var newId = (new Date()).valueOf();
    if(LastColumn - left_column < RowData[0].split("\t").length) {
        dhtmlx.alert("Cột nhiều hơn, vui lòng dán đúng vị trí");
        return;
    } else {
        var TurnAdd = false;
        var SplitString = "";
        var StringLength = 0;
        var ArrAdd = [];
        var IS = 1;
        var EX = ["text/plain", "text/html", "text/rtf", "Files"];
        if(EX.length == CT.length) {
            for(var x = 0; x < CT.length; x++) {
                if(EX[x] != CT[x]) {
                    IS = 1;
                    break;
                }
            }
        } else {
            IS = 0;
        }
        for(var i = 0; i < RowData.length - IS; i++){
            SplitString = RowData[i].split("\t");
            ArrAdd = [];
            if(IndexRow + i == this.getRowsNum() && i != 0) {
                for(var t = 0; t < left_column; t++) ArrAdd.push("");
                for(var j = 0; j < SplitString.length; j++) {
                    if(SplitString[j][0] == '"' && SplitString[j][SplitString[j].length - 1] == '"') {
                        SplitString[j] = SplitString[j].substring(1,SplitString[j].length - 2);
                    }
                    ArrAdd.push(SplitString[j]);
                }
                this.addRow(this.getRowsNum() + 1,ArrAdd);
                TurnAdd = true;
            } else {
                for(var j = 0; j < SplitString.length; j++) {
                    if(SplitString[j][0] == '"' && SplitString[j][SplitString[j].length - 1] == '"') {
                        SplitString[j] = SplitString[j].substring(1,SplitString[j].length - 2);
                    }
                    this.cells2(IndexRow + i,left_column + j).setValue(SplitString[j]);
                    if(dp != null) dp.setUpdated(this.getRowId(IndexRow + i),true);
                }
            }
        }
        if(TurnAdd) this.addRow(this.getRowsNum() + 1,[""]);
    }
}
            
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            dhtmlXGridObject.prototype.SelectCellEditor=function(){
                if(this.editor && this.editor.obj){
                    this.editor.obj.select();
                }
            };



            
    dhtmlXGridObject.prototype.getColumnCombo = function(a) {
        if (this._col_combos && this._col_combos[a]) {
            return this._col_combos[a]
        }
        if (!this._col_combos) {
            this._col_combos = []
        }
        this._col_combos[a] = eXcell_combo.prototype.initCombo.call({
            grid: this
        }, a);
        return this._col_combos[a]
    };

    function eXcell_combo(a) {
        if (!a) {
            return
        }
        this.cell = a;
        this.grid = a.parentNode.grid;
        this._combo_pre = "";
        this.edit = function() {
            if (!window.dhx_globalImgPath) {
                window.dhx_globalImgPath = this.grid.imgURL
            }
            this.val = this.getValue();
            var c = this.getText();
            if (this.cell._clearCell) {
                c = ""
            }
            this.cell.innerHTML = "";
            if (!this.cell._brval) {
                this.combo = (this.grid._realfake ? this.grid._fake : this.grid)._col_combos[this.cell._cellIndex]
            } else {
                this.combo = this.cell._brval
            }
            this.cell.appendChild(this.combo.DOMParent);
            this.combo.DOMParent.style.margin = "0";
            this.combo.DOMelem_input.focus();
            this.combo.setSize(this.cell.offsetWidth - 2);
            if (!this.combo._xml) {
                if (this.combo.getIndexByValue(this.cell.combo_value) != -1) {
                    this.combo.selectOption(this.combo.getIndexByValue(this.cell.combo_value))
                } else {
                    if (this.combo.getOptionByLabel(c)) {
                        this.combo.selectOption(this.combo.getIndexByValue(this.combo.getOptionByLabel(c).value))
                    } else {
                        this.combo.setComboText(c)
                    }
                }
            } else {
                this.combo.setComboText(c)
            }
            this.combo.openSelect()
        };
        this.selectComboOption = function(e, c) {
            c.selectOption(c.getIndexByValue(c.getOptionByLabel(e).value))
        };
        this.getValue = function(c) {
            return this.cell.combo_value || ""
        };
        this.getText = function(e) {
            var g = this.cell;
            if (this._combo_pre == "" && g.childNodes[1]) {
                g = g.childNodes[1]
            } else {
                g.childNodes[0].childNodes[1]
            }
            return (_isIE ? g.innerText : g.textContent)
        };
        this.setValue = function(h) {
            if (typeof(h) == "object") {
                this.cell._brval = this.initCombo();
                var e = this.cell._cellIndex;
                var g = this.cell.parentNode.idd;
                if (!h.firstChild) {
                    this.cell.combo_value = "&nbsp;";
                    this.cell._clearCell = true
                } else {
                    this.cell.combo_value = h.firstChild.data
                }
                this.setComboOptions(this.cell._brval, h, this.grid, e, g)
            } else {
                this.cell.combo_value = h;
                var c = null;
                if ((c = this.cell._brval) && (typeof(this.cell._brval) == "object")) {
                    h = (c.getOption(h) || {}).text || h
                } else {
                    if (c = this.grid._col_combos[this.cell._cellIndex] || ((this.grid._fake) && (c = this.grid._fake._col_combos[this.cell._cellIndex]))) {
                        h = (c.getOption(h) || {}).text || h
                    }
                }
                if ((h || "").toString()._dhx_trim() == "") {
                    h = null
                }
                if (h !== null) {
                    this.setComboCValue(h)
                } else {
                    this.setComboCValue("&nbsp;", "");
                    this.cell._clearCell = true
                }
            }
        };
        this.detach = function() {
            var c = this.combo.getParent();
            if (c.parentNode == this.cell) {
                this.cell.removeChild(c)
            } else {
                return false
            }
            var e = this.cell.combo_value;
            this.combo._confirmSelect("blur");
            if (!this.combo.getComboText() || this.combo.getComboText().toString()._dhx_trim() == "") {
                this.setComboCValue("&nbsp;");
                this.cell._clearCell = true
            } else {
                this.setComboCValue(this.combo.getComboText().replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), this.combo.getActualValue());
                this.cell._clearCell = false
            }
            this.cell.combo_value = this.combo.getActualValue();
            this.combo.closeAll();
            this.grid._still_active = true;
            this.grid.setActive(1);
            return e != this.cell.combo_value
        }
    }
    eXcell_combo.prototype = new eXcell;
    eXcell_combo_v = function(a) {
        var c = new eXcell_combo(a);
        c._combo_pre = "<img src='" + (window.dhx_globalImgPath ? window.dhx_globalImgPath : this.grid.imgURL) + "combo_select" + (dhtmlx.skin ? "_" + dhtmlx.skin : "") + ".gif' class='dhxgrid_combo_icon'/>";
        return c
    };
    eXcell_combo.prototype.initCombo = function(c) {
        var a = document.createElement("DIV");
        a.className = "dhxcombo_in_grid_parent";
        var g = this.grid.defVal[arguments.length ? c : this.cell._cellIndex];
        var h = new dhtmlXCombo(a, "combo", 0, g);
        this.grid.defVal[arguments.length ? c : this.cell._cellIndex] = "";
        var e = this.grid;
        h.DOMelem.onmousedown = h.DOMelem.onclick = function(l) {
            l = l || event;
            l.cancelBubble = true
        };
        h.DOMelem.onselectstart = function(l) {
            l = l || event;
            l.cancelBubble = true;
            return true
        };
        this.grid.attachEvent("onScroll", function() {
            if (h._isListVisible()) {
                h._hideList()
            }
        });
        h.attachEvent("onKeyPressed", function(l) {
            if (l == 13 || l == 27) {
                e.editStop();
                if (e._fake) {
                    e._fake.editStop()
                }
            }
        });
        return h
    };
    eXcell_combo.prototype.fillColumnCombos = function(e, a) {
        if (!a) {
            return
        }
        var g = dhx4.ajax.xmltop("rows", a, -1);
        if (g && g.tagName !== "DIV") {
            e.combo_columns = e.combo_columns || [];
            columns = dhx4.ajax.xpath("//column", g);
            for (var c = 0; c < columns.length; c++) {
                if ((columns[c].getAttribute("type") || "").indexOf("combo") == 0) {
                    e.combo_columns[e.combo_columns.length] = c;
                    this.setComboOptions(e._col_combos[c], columns[c], e, c)
                }
            }
        }
    };
    eXcell_combo.prototype.setComboCValue = function(e, c) {
        if (this._combo_pre != "") {
            var a = (this.cell.offsetHeight ? this.cell.offsetHeight + "px" : 0);
            e = "<div style='width:100%;position:relative;height:100%;overflow:hidden;'>" + this._combo_pre + "<span>" + e + "</span></div>"
        }
        if (arguments.length > 1) {
            this.setCValue(e, c)
        } else {
            this.setCValue(e)
        }
    };
    eXcell_combo.prototype.setComboOptions = function(l, m, e, r, u) {
        if (window.dhx4.s2b(m.getAttribute("xmlcontent"))) {
            if (!m.getAttribute("source")) {
                options = m.childNodes;
                var a = [];
                for (var n = 0; n < options.length; n++) {
                    if (options[n].tagName == "option") {
                        var g = options[n].firstChild ? options[n].firstChild.data : "";
                        a[a.length] = [options[n].getAttribute("value"), g, (options[n].getAttribute("css") || "")]
                    }
                }
                l.addOption(a);
                if (arguments.length == 4) {
                    e.forEachRowA(function(w) {
                        var v = e.cells(w, r);
                        if (!v.cell._brval && !v.cell._cellType && (v.cell._cellIndex == r)) {
                            if (v.cell.combo_value == "") {
                                v.setComboCValue("&nbsp;", "")
                            } else {
                                if (!l.getOption(v.cell.combo_value)) {
                                    v.setComboCValue(v.cell.combo_value)
                                } else {
                                    v.setComboCValue(l.getOption(v.cell.combo_value).text, v.cell.combo_value)
                                }
                            }
                        }
                    })
                } else {
                    var s = (this.cell) ? this : e.cells(u, r);
                    if (m.getAttribute("text")) {
                        if (m.getAttribute("text")._dhx_trim() == "") {
                            s.setComboCValue("&nbsp;", "")
                        } else {
                            s.setComboCValue(m.getAttribute("text"))
                        }
                    } else {
                        if ((!s.cell.combo_value) || (s.cell.combo_value._dhx_trim() == "")) {
                            s.setComboCValue("&nbsp;", "")
                        } else {
                            if (!l.getOption(s.cell.combo_value)) {
                                s.setComboCValue(s.cell.combo_value)
                            } else {
                                s.setComboCValue(l.getOption(s.cell.combo_value).text, s.cell.combo_value)
                            }
                        }
                    }
                }
            }
        }
        if (m.getAttribute("source")) {
            if (m.getAttribute("auto") && window.dhx4.s2b(m.getAttribute("auto"))) {
                if (m.getAttribute("xmlcontent")) {
                    var s = (this.cell) ? this : e.cells(u, r);
                    if (m.getAttribute("text")) {
                        s.setComboCValue(m.getAttribute("text"))
                    }
                } else {
                    e.forEachRowA(function(y) {
                        var x = e.cells(y, r);
                        if (!x.cell._brval && !x.cell._cellType) {
                            var w = x.cell.combo_value.toString();
                            if (w.indexOf("^") != -1) {
                                var v = w.split("^");
                                x.cell.combo_value = v[0];
                                x.setComboCValue(v[1])
                            }
                        }
                    })
                }
                l.enableFilteringMode(true, m.getAttribute("source"), window.dhx4.s2b(m.getAttribute("cache") || true), window.dhx4.s2b(m.getAttribute("sub") || false))
            } else {
                var o = this;
                var h = arguments.length;
                l.load(m.getAttribute("source"), function() {
                    if (h == 4) {
                        e.forEachRow(function(x) {
                            var w = e.cells(x, r);
                            if (!w.cell._brval && !w.cell._cellType) {
                                if (l.getOption(w.cell.combo_value)) {
                                    w.setComboCValue(l.getOption(w.cell.combo_value).text, w.cell.combo_value)
                                } else {
                                    if ((w.cell.combo_value || "").toString()._dhx_trim() == "") {
                                        w.setComboCValue("&nbsp;", "");
                                        w.cell._clearCell = true
                                    } else {
                                        w.setComboCValue(w.cell.combo_value)
                                    }
                                }
                            }
                        })
                    } else {
                        var v = e.cells(u, r);
                        if (l.getOption(v.cell.combo_value)) {
                            v.setComboCValue(l.getOption(v.cell.combo_value).text, v.cell.combo_value)
                        } else {
                            v.setComboCValue(v.cell.combo_value)
                        }
                    }
                })
            }
        }
        if (!m.getAttribute("auto") || !window.dhx4.s2b(m.getAttribute("auto"))) {
            if (m.getAttribute("editable") && !window.dhx4.s2b(m.getAttribute("editable"))) {
                l.readonly(true)
            }
            if (m.getAttribute("filter") && window.dhx4.s2b(m.getAttribute("filter"))) {
                l.enableFilteringMode(true)
            }
        }
    };
    eXcell_combo.prototype.getCellCombo = function() {
        if (this.cell._brval) {
            return this.cell._brval
        }
        this.cell._brval = this.initCombo();
        return this.cell._brval
    };
    eXcell_combo.prototype.refreshCell = function() {
        this.setValue(this.getValue())
    };
    
    eXcell_combo.prototype.getCellCombo = function() {
        if (this.cell._brval) {
            return this.cell._brval
        }
        this.cell._brval = this.initCombo();
        return this.cell._brval
    };
    eXcell_combo.prototype.refreshCell = function() {
        this.setValue(this.getValue())
    };




    dhtmlXGridObject.prototype.splitAt = function(m) {
        if (!this.obj.rows[0]) {
            return this._split_later = m
        }
        m = parseInt(m);
        var x = document.createElement("DIV");
        this.entBox.appendChild(x);
        var y = document.createElement("DIV");
        this.entBox.appendChild(y);
        for (var v = this.entBox.childNodes.length - 3; v >= 0; v--) {
            y.insertBefore(this.entBox.childNodes[v], y.firstChild)
        }
        this.entBox.style.position = "relative";
        this.globalBox = this.entBox;
        this.entBox = y;
        y.grid = this;
        x.style.cssText += "border:0px solid red !important;";
        y.style.cssText += "border:0px solid red !important;";
        y.style.top = "0px";
        y.style.position = "absolute";
        x.style.position = "absolute";
        x.style.top = "0px";
        x.style.left = "0px";
        x.style.zIndex = 11;
        y.style.height = x.style.height = this.globalBox.clientHeight;
        this._fake = new dhtmlXGridObject(x);
        this.globalBox = this._fake.globalBox = this.globalBox;
        this._fake._fake = this;
        this._fake._realfake = true;
        this._treeC = this.cellType._dhx_find("tree");
        this._fake.delim = this.delim;
        this._fake.customGroupFormat = this.customGroupFormat;
        this._fake.setImagesPath(this._imgURL);
        this._fake.iconURL = this.iconURL;
        this._fake._customSorts = this._customSorts;
        this._fake.noHeader = this.noHeader;
        this._fake._enbTts = this._enbTts;
        this._fake._drsclmW = this._drsclmW;
        this._fake._htkebl = this._htkebl;
        this._fake.clists = this.clists;
        this._fake.fldSort = new Array();
        this._fake.selMultiRows = this.selMultiRows;
        this._fake.multiLine = this.multiLine;
        this._fake._key_events = this._key_events;
        this._fake.smartTabOrder = this.smartTabOrder;
        this._fake._RaSeCol = this._RaSeCol;
        if (this.multiLine || this._erspan) {
            this.attachEvent("onCellChanged", this._correctRowHeight);
            this.attachEvent("onRowAdded", this._correctRowHeight);
            var c = function() {
                this.forEachRow(function(D) {
                    this._correctRowHeight(D)
                })
            };
            this.attachEvent("onPageChanged", c);
            this.attachEvent("onXLE", c);
            this.attachEvent("onResizeEnd", c);
            if (!this._ads_count) {
                this.attachEvent("onAfterSorting", c)
            }
            if (this._srnd) {
                this.attachEvent("onFilterEnd", c)
            }
            this.attachEvent("onDistributedEnd", c)
        }
        this.attachEvent("onGridReconstructed", function() {
            this._fake.objBox.scrollTop = this.objBox.scrollTop
        });
        this._fake.loadedKidsHash = this.loadedKidsHash;
        if (this._h2) {
            this._fake._h2 = this._h2
        }
        this._fake._dInc = this._dInc;
        var n = [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];
        var s = ["hdrLabels", "initCellWidth", "cellType", "cellAlign", "cellVAlign", "fldSort", "columnColor"];
        var h = ["setHeader", "setInitWidths", "setColTypes", "setColAlign", "setColVAlign", "setColSorting", "setColumnColor"];
        this._fake.callEvent = function() {
            var D = true;
            this._fake._split_event = true;
            var E = (arguments[0] == "onScroll");
            if (arguments[0] == "onGridReconstructed" || E) {
                this._fake.callEvent.apply(this, arguments)
            }
            if (!E) {
                D = this._fake.callEvent.apply(this._fake, arguments)
            }
            this._fake._split_event = false;
            return D
        };
        if (this._elmn) {
            this._fake.enableLightMouseNavigation(true)
        }
        if (this._cssEven || this._cssUnEven) {
            this._fake.attachEvent("onGridReconstructed", function() {
                this._fixAlterCss()
            })
        }
        this._fake._cssSP = this._cssSP;
        this._fake.isEditable = this.isEditable;
        this._fake._edtc = this._edtc;
        if (this._sst) {
            this._fake.enableStableSorting(true)
        }
        this._fake._sclE = this._sclE;
        this._fake._dclE = this._dclE;
        this._fake._f2kE = this._f2kE;
        this._fake._maskArr = this._maskArr;
        this._fake._dtmask = this._dtmask;
        this._fake.combos = this.combos;
        var o = 0;
        var a = this.globalBox.offsetWidth;
        for (var v = 0; v < m; v++) {
            for (var u = 0; u < s.length; u++) {
                if (this[s[u]]) {
                    n[u][v] = this[s[u]][v]
                }
                if (typeof n[u][v] == "string") {
                    n[u][v] = n[u][v].replace(new RegExp("\\" + this.delim, "g"), "\\" + this.delim)
                }
            }
            if (_isFF) {
                n[1][v] = n[1][v] * 1
            }
            if (this.cellWidthType == "%") {
                n[1][v] = Math.round(parseInt(this[s[1]][v]) * a / 100);
                o += n[1][v]
            } else {
                o += parseInt(this[s[1]][v])
            }
            this.setColumnHidden(v, true)
        }
        for (var u = 0; u < s.length; u++) {
            var r = n[u].join(this.delim);
            if (h[u] != "setHeader") {
                if (r != "") {
                    this._fake[h[u]](r)
                }
            } else {
                this._fake[h[u]](r, null, this._hstyles)
            }
        }
        this._fake._strangeParams = this._strangeParams;
        this._fake._drsclmn = this._drsclmn;
        o = Math.min(this.globalBox.offsetWidth, o);
        y.style.left = o + "px";
        x.style.width = o + "px";
        y.style.width = Math.max(this.globalBox.offsetWidth - o, 0);
        if (this._ecspn) {
            this._fake._ecspn = true
        }
        this._fake.init();
        if (this.dragAndDropOff) {
            this.dragger.addDragLanding(this._fake.entBox, this)
        }
        this._fake.objBox.style.overflow = "hidden";
        if (!dhtmlx.$customScroll) {
            this._fake.objBox.style.overflowX = "scroll"
        } else {
            this._fake.objBox._custom_scroll_mode = ""
        }
        this._fake._srdh = this._srdh || 20;
        this._fake._srnd = this._srnd;
        this._fake._cssEven = this._cssEven;
        this._fake._cssUnEven = this._cssUnEven;
        if (this.skin_name != this._fake.skin_name) {
            this._fake.setSkin(this.skin_name)
        }
        var A = this;

        function C(F) {
            var D = A.objBox;
            if (D.scrollHeight - D.offsetHeight > 2) {
                var E = F.wheelDelta / -40;
                if (F.wheelDelta === window.undefined) {
                    E = F.detail
                }
                D.scrollTop += E * 40;
                if (F.preventDefault) {
                    F.preventDefault()
                }
            }
        }
        dhtmlxEvent(this._fake.objBox, "mousewheel", C);
        dhtmlxEvent(this._fake.objBox, "DOMMouseScroll", C);

        function g(E, D) {
            D.style.whiteSpace = "";
            var I = D.nextSibling;
            var F = D.parentNode;
            E.parentNode.insertBefore(D, E);
            if (!I) {
                F.appendChild(E)
            } else {
                F.insertBefore(E, I)
            }
            var H = E.style.display;
            E.style.display = D.style.display;
            D.style.display = H
        }

        function w(L, T, M, E) {
            var F = (new Array(m)).join(this.delim);
            var N = [];
            if (L == 2) {
                for (var J = 0; J < m; J++) {
                    var D = T[L - 1].cells[T[L - 1]._childIndexes ? T[L - 1]._childIndexes[J] : J];
                    if (D.rowSpan && D.rowSpan > 1) {
                        N[D._cellIndex] = D.rowSpan - 1;
                        E[L - 1].cells[E[L - 1]._childIndexes ? E[L - 1]._childIndexes[J] : J].rowSpan = D.rowSpan;
                        D.rowSpan = 1
                    }
                }
            }
            for (L; L < T.length; L++) {
                this._fake.attachHeader(F, null, M);
                E = E || this._fake.ftr.childNodes[0].rows;
                var Q = m;
                var H = 0;
                for (var K = 0; K < Q; K++) {
                    if (N[K]) {
                        N[K] = N[K] - 1;
                        if (_isIE || _isOpera) {
                            var I = document.createElement("TD");
                            if (_isFF) {
                                I.style.display = "none"
                            }
                            T[L].insertBefore(I, T[L].cells[0])
                        }
                        H++;
                        continue
                    }
                    var P = E[L].cells[K - H];
                    var O = T[L].cells[K - (_isIE ? 0 : H)];
                    var S = O.rowSpan;
                    g(P, O);
                    if (S > 1) {
                        N[K] = S - 1;
                        O.rowSpan = S
                    }
                    if (E[L].cells[K].colSpan > 1) {
                        T[L].cells[K].colSpan = E[L].cells[K].colSpan;
                        Q -= E[L].cells[K].colSpan - 1;
                        for (var J = 1; J < E[L].cells[K].colSpan; J++) {
                            E[L].removeChild(E[L].cells[K + 1])
                        }
                    }
                }
            }
        }
        if (this.hdr.rows.length > 2) {
            w.call(this, 2, this.hdr.rows, "_aHead", this._fake.hdr.rows)
        }
        if (this.ftr) {
            w.call(this, 1, this.ftr.childNodes[0].rows, "_aFoot");
            this._fake.ftr.parentNode.style.bottom = (_isFF ? 2 : 1) + "px"
        }
        if (this.saveSizeToCookie) {
            this.saveSizeToCookie = function(E, D) {
                if (this._realfake) {
                    return this._fake.saveSizeToCookie.apply(this._fake, arguments)
                }
                if (!E) {
                    E = this.entBox.id
                }
                var H = new Array();
                var I = "cellWidthPX";
                for (var F = 0; F < this[I].length; F++) {
                    if (F < m) {
                        H[F] = this._fake[I][F]
                    } else {
                        H[F] = this[I][F]
                    }
                }
                H = H.join(",");
                this.setCookie(E, D, 0, H);
                var H = (this.initCellWidth || (new Array)).join(",");
                this.setCookie(E, D, 1, H);
                return true
            };
            this.loadSizeFromCookie = function(D) {
                if (!D) {
                    D = this.entBox.id
                }
                var I = this._getCookie(D, 1);
                if (!I) {
                    return
                }
                this.initCellWidth = I.split(",");
                var I = this._getCookie(D, 0);
                var J = "cellWidthPX";
                this.cellWidthType = "px";
                var F = 0;
                if ((I) && (I.length)) {
                    I = I.split(",");
                    for (var E = 0; E < I.length; E++) {
                        if (E < m) {
                            this._fake[J][E] = I[E];
                            F += I[E] * 1
                        } else {
                            this[J][E] = I[E]
                        }
                    }
                }
                this._fake.entBox.style.width = F + "px";
                this._fake.objBox.style.width = F + "px";
                var H = this.globalBox.childNodes[1];
                H.style.left = F - (_isFF ? 0 : 0) + "px";
                if (this.ftr) {
                    this.ftr.style.left = F - (_isFF ? 0 : 0) + "px"
                }
                H.style.width = this.globalBox.offsetWidth - F + "px";
                this.setSizes();
                return true
            };
            this._fake.onRSE = this.onRSE
        }
        this.setCellTextStyleA = this.setCellTextStyle;
        this.setCellTextStyle = function(E, F, D) {
            if (F < m) {
                this._fake.setCellTextStyle(E, F, D)
            }
            this.setCellTextStyleA(E, F, D)
        };
        this.setRowTextBoldA = this.setRowTextBold;
        this.setRowTextBold = function(D) {
            this.setRowTextBoldA(D);
            this._fake.setRowTextBold(D)
        };
        this.setRowColorA = this.setRowColor;
        this.setRowColor = function(E, D) {
            this.setRowColorA(E, D);
            this._fake.setRowColor(E, D)
        };
        this.setRowHiddenA = this.setRowHidden;
        this.setRowHidden = function(E, D) {
            this.setRowHiddenA(E, D);
            this._fake.setRowHidden(E, D)
        };
        this.setRowTextNormalA = this.setRowTextNormal;
        this.setRowTextNormal = function(D) {
            this.setRowTextNormalA(D);
            this._fake.setRowTextNormal(D)
        };
        this.getChangedRows = function(F) {
            var D = new Array();

            function E(I) {
                for (var H = 0; H < I.childNodes.length; H++) {
                    if (I.childNodes[H].wasChanged) {
                        return D[D.length] = I.idd
                    }
                }
            }
            this.forEachRow(function(J) {
                var I = this.rowsAr[J];
                var H = this._fake.rowsAr[J];
                if (I.tagName != "TR" || !H || H.tagName != "TR") {
                    return
                }
                if (F && I._added) {
                    D[D.length] = I.idd
                } else {
                    if (!E(I)) {
                        E(H)
                    }
                }
            });
            return D.join(this.delim)
        };
        this.setRowTextStyleA = this.setRowTextStyle;
        this.setRowTextStyle = function(E, D) {
            this.setRowTextStyleA(E, D);
            if (this._fake.rowsAr[E]) {
                this._fake.setRowTextStyle(E, D)
            }
        };
        this.lockRowA = this.lockRow;
        this.lockRow = function(E, D) {
            this.lockRowA(E, D);
            this._fake.lockRow(E, D)
        };
        this.getColWidth = function(D) {
            if (D < m) {
                return parseInt(this._fake.cellWidthPX[D])
            } else {
                return parseInt(this.cellWidthPX[D])
            }
        };
        this.getColumnLabel = function(D) {
            return this._fake.getColumnLabel.apply(((D < m) ? this._fake : this), arguments)
        };
        this.setColWidthA = this._fake.setColWidthA = this.setColWidth;
        this.setColWidth = function(D, E) {
            D = D * 1;
            if (D < m) {
                this._fake.setColWidthA(D, E)
            } else {
                this.setColWidthA(D, E)
            }
            if ((D + 1) <= m) {
                this._fake._correctSplit(Math.min(this._fake.objBox.offsetWidth, this._fake.obj.offsetWidth))
            }
        };
        this.adjustColumnSizeA = this.adjustColumnSize;
        this.setColumnLabelA = this.setColumnLabel;
        this.setColumnLabel = function(E, D, I, H) {
            var F = this;
            if (E < m) {
                F = this._fake
            }
            return this.setColumnLabelA.apply(F, [E, D, I, H])
        };
        this.adjustColumnSize = function(D, E) {
            if (D < m) {
                if (_isIE) {
                    this._fake.obj.style.tableLayout = ""
                }
                this._fake.adjustColumnSize(D, E);
                if (_isIE) {
                    this._fake.obj.style.tableLayout = "fixed"
                }
                this._fake._correctSplit()
            } else {
                return this.adjustColumnSizeA(D, E)
            }
        };
        var e = "cells";
        this._bfs_cells = this[e];
        this[e] = function() {
            if (arguments[1] < m) {
                return this._fake.cells.apply(this._fake, arguments)
            } else {
                return this._bfs_cells.apply(this, arguments)
            }
        };
        this._bfs_isColumnHidden = this.isColumnHidden;
        this.isColumnHidden = function() {
            if (parseInt(arguments[0]) < m) {
                return this._fake.isColumnHidden.apply(this._fake, arguments)
            } else {
                return this._bfs_isColumnHidden.apply(this, arguments)
            }
        };
        this._bfs_setColumnHidden = this.setColumnHidden;
        this.setColumnHidden = function() {
            if (parseInt(arguments[0]) < m) {
                this._fake.setColumnHidden.apply(this._fake, arguments);
                return this._fake._correctSplit()
            } else {
                return this._bfs_setColumnHidden.apply(this, arguments)
            }
        };
        var e = "cells2";
        this._bfs_cells2 = this[e];
        this[e] = function() {
            if (arguments[1] < m) {
                return this._fake.cells2.apply(this._fake, arguments)
            } else {
                return this._bfs_cells2.apply(this, arguments)
            }
        };
        var e = "cells3";
        this._bfs_cells3 = this[e];
        this[e] = function(E, D) {
            if (arguments[1] < m && this._fake.rowsAr[arguments[0].idd]) {
                if (this._fake.rowsAr[E.idd] && this._fake.rowsAr[E.idd].childNodes.length == 0) {
                    return this._bfs_cells3.apply(this, arguments)
                }
                arguments[0] = arguments[0].idd;
                return this._fake.cells.apply(this._fake, arguments)
            } else {
                return this._bfs_cells3.apply(this, arguments)
            }
        };
        var e = "changeRowId";
        this._bfs_changeRowId = this[e];
        this[e] = function() {
            this._bfs_changeRowId.apply(this, arguments);
            if (this._fake.rowsAr[arguments[0]]) {
                this._fake.changeRowId.apply(this._fake, arguments)
            }
        };
        this._fake.getRowById = function(F) {
            var E = this.rowsAr[F];
            if (!E && this._fake.rowsAr[F]) {
                E = this._fake.getRowById(F)
            }
            if (E) {
                if (E.tagName != "TR") {
                    for (var D = 0; D < this.rowsBuffer.length; D++) {
                        if (this.rowsBuffer[D] && this.rowsBuffer[D].idd == F) {
                            return this.render_row(D)
                        }
                    }
                    if (this._h2) {
                        return this.render_row(null, E.idd)
                    }
                }
                return E
            }
            return null
        };
        if (this.collapseKids) {
            this._fake._bfs_collapseKids = this.collapseKids;
            this._fake.collapseKids = function() {
                return this._fake.collapseKids.apply(this._fake, [this._fake.rowsAr[arguments[0].idd]])
            };
            this["_bfs_collapseKids"] = this.collapseKids;
            this["collapseKids"] = function() {
                var D = this["_bfs_collapseKids"].apply(this, arguments);
                this._fake._h2syncModel();
                if (!this._cssSP) {
                    this._fake._fixAlterCss()
                }
            };
            this._fake._bfs_expandKids = this.expandKids;
            this._fake.expandKids = function() {
                this._fake.expandKids.apply(this._fake, [this._fake.rowsAr[arguments[0].idd]]);
                if (!this._cssSP) {
                    this._fake._fixAlterCss()
                }
            };
            this["_bfs_expandAll"] = this.expandAll;
            this["expandAll"] = function() {
                this._bfs_expandAll();
                this._fake._h2syncModel();
                if (!this._cssSP) {
                    this._fake._fixAlterCss()
                }
            };
            this["_bfs_collapseAll"] = this.collapseAll;
            this["collapseAll"] = function() {
                this._bfs_collapseAll();
                this._fake._h2syncModel();
                if (!this._cssSP) {
                    this._fake._fixAlterCss()
                }
            };
            this["_bfs_expandKids"] = this.expandKids;
            this["expandKids"] = function() {
                var D = this["_bfs_expandKids"].apply(this, arguments);
                this._fake._h2syncModel();
                if (!this._cssSP) {
                    this._fake._fixAlterCss()
                }
            };
            this._fake._h2syncModel = function() {
                if (this._fake.pagingOn) {
                    this._fake._renderSort()
                } else {
                    this._renderSort()
                }
            };
            this._updateTGRState = function(D) {
                return this._fake._updateTGRState(D)
            }
        }
        if (this._elmnh) {
            this._setRowHoverA = this._fake._setRowHoverA = this._setRowHover;
            this._unsetRowHoverA = this._fake._unsetRowHoverA = this._unsetRowHover;
            this._setRowHover = this._fake._setRowHover = function() {
                var D = this.grid;
                D._setRowHoverA.apply(this, arguments);
                var E = (_isIE ? event.srcElement : arguments[0].target);
                E = D._fake.rowsAr[D.getFirstParentOfType(E, "TD").parentNode.idd];
                if (E) {
                    D._fake._setRowHoverA.apply(D._fake.obj, [{
                        target: E.childNodes[0]
                    }, arguments[1]])
                }
            };
            this._unsetRowHover = this._fake._unsetRowHover = function() {
                if (arguments[1]) {
                    var D = this
                } else {
                    var D = this.grid
                }
                D._unsetRowHoverA.apply(this, arguments);
                D._fake._unsetRowHoverA.apply(D._fake.obj, arguments)
            };
            this._fake.enableRowsHover(true, this._hvrCss);
            this.enableRowsHover(false);
            this.enableRowsHover(true, this._fake._hvrCss)
        }
        this._updateTGRState = function(D) {
            if (!D.update || D.id == 0) {
                return
            }
            if (this.rowsAr[D.id].imgTag) {
                this.rowsAr[D.id].imgTag.src = this.iconTree + D.state + ".gif"
            }
            if (this._fake.rowsAr[D.id] && this._fake.rowsAr[D.id].imgTag) {
                this._fake.rowsAr[D.id].imgTag.src = this.iconTree + D.state + ".gif"
            }
            D.update = false
        };
        this.copy_row = function(I) {
            var D = I.cloneNode(true);
            D._skipInsert = I._skipInsert;
            var J = m;
            D._attrs = {};
            D._css = I._css;
            if (this._ecspn) {
                J = 0;
                for (var H = 0;
                    (J < D.childNodes.length && H < m); H += (D.childNodes[J].colSpan || 1)) {
                    J++
                }
            }
            while (D.childNodes.length > J) {
                D.removeChild(D.childNodes[D.childNodes.length - 1])
            }
            var F = J;
            for (var H = 0; H < F; H++) {
                if (this.dragAndDropOff) {
                    this.dragger.addDraggableItem(D.childNodes[H], this)
                }
                D.childNodes[H].style.display = (this._fake._hrrar ? (this._fake._hrrar[H] ? "none" : "") : "");
                D.childNodes[H]._cellIndex = H;
                D.childNodes[H].combo_value = arguments[0].childNodes[H].combo_value;
                D.childNodes[H]._clearCell = arguments[0].childNodes[H]._clearCell;
                D.childNodes[H]._cellType = arguments[0].childNodes[H]._cellType;
                D.childNodes[H]._brval = arguments[0].childNodes[H]._brval;
                D.childNodes[H].val = arguments[0].childNodes[H].val;
                D.childNodes[H]._combo = arguments[0].childNodes[H]._combo;
                D.childNodes[H]._attrs = arguments[0].childNodes[H]._attrs;
                D.childNodes[H].chstate = arguments[0].childNodes[H].chstate;
                if (I._attrs.style) {
                    D.childNodes[H].style.cssText = I._attrs.style + ";" + D.childNodes[H].style.cssText
                }
                if (D.childNodes[H].colSpan > 1) {
                    D._childIndexes = arguments[0]._childIndexes
                }
            }
            if (this._h2 && this._treeC < m) {
                var E = this._h2.get[arguments[0].idd];
                D.imgTag = D.childNodes[this._treeC].childNodes[0].childNodes[E.level];
                D.valTag = D.childNodes[this._treeC].childNodes[0].childNodes[E.level + 2]
            }
            D.idd = I.idd;
            D.grid = this._fake;
            return D
        };
        var e = "_insertRowAt";
        this._bfs_insertRowAt = this[e];
        this[e] = function() {
            var E = this["_bfs_insertRowAt"].apply(this, arguments);
            arguments[0] = this.copy_row(arguments[0]);
            var D = this._fake._insertRowAt.apply(this._fake, arguments);
            if (E._fhd) {
                D.parentNode.removeChild(D);
                this._fake.rowsCol._dhx_removeAt(this._fake.rowsCol._dhx_find(D));
                E._fhd = false
            }
            return E
        };
        this._bfs_setSizes = this.setSizes;
        this.setSizes = function() {
            if (this._notresize) {
                return
            }
            this._bfs_setSizes(this, arguments);
            this.sync_headers();
            if (this.sync_scroll() && this._ahgr) {
                this.setSizes()
            }
            var D = this.dontSetSizes ? (this.entBox.offsetHeight + "px") : this.entBox.style.height;
            this._fake.entBox.style.height = D;
            this._fake.objBox.style.height = this.objBox.style.height;
            this._fake.hdrBox.style.height = this.hdrBox.style.height;
            this._fake.objBox.scrollTop = this.objBox.scrollTop;
            this._fake.setColumnSizes(this._fake.entBox.clientWidth);
            this.globalBox.style.width = parseInt(this.entBox.style.width) + parseInt(this._fake.entBox.style.width);
            if (!this.dontSetSizes) {
                this.globalBox.style.height = D
            }
        };
        this.sync_scroll = this._fake.sync_scroll = function(E) {
            var D = this.objBox.style.overflowX;
            if (this.obj.offsetWidth <= this.objBox.offsetWidth) {
                if (!E) {
                    return this._fake.sync_scroll(true)
                }
                this.objBox.style.overflowX = "hidden";
                this._fake.objBox.style.overflowX = "hidden"
            } else {
                if (!dhtmlx.$customScroll) {
                    this.objBox.style.overflowX = "scroll";
                    this._fake.objBox.style.overflowX = "scroll"
                }
            }
            return D != this.objBox.style.overflowX
        };
        this.sync_headers = this._fake.sync_headers = function() {
            if (this.noHeader || (this._fake.hdr.scrollHeight == this.hdr.offsetHeight) || this.noHeaderResize) {
                return
            }
            for (var E = 1; E < this.hdr.rows.length; E++) {
                var I = m;
                while (!this.hdr.rows[E].childNodes[I]) {
                    I--
                }
                var D = Math.min(this.hdr.rows[E].childNodes[I].scrollHeight + 2, this.hdr.rows[E].scrollHeight);
                var H = this._fake.hdr.rows[E].scrollHeight;
                if (D != H) {
                    this._fake.hdr.rows[E].style.height = this.hdr.rows[E].style.height = Math.max(D, H) + "px"
                }
                if (window._KHTMLrv) {
                    var F = 0;
                    while (this._fake._hrrar[F]) {
                        F++
                    }
                    this._fake.hdr.rows[E].childNodes[F].style.height = this.hdr.rows[E].childNodes[I].style.height = Math.max(D, H) + "px"
                }
            }
            this._fake.sync_headers
        };
        this._fake._bfs_setSizes = this._fake.setSizes;
        this._fake.setSizes = function() {
            if (this._fake._notresize) {
                return
            }
            this._fake.setSizes()
        };
        var e = "_doOnScroll";
        this._bfs__doOnScroll = this[e];
        this[e] = function() {
            this._bfs__doOnScroll.apply(this, arguments);
            this._fake.objBox.scrollTop = this.objBox.scrollTop;
            this._fake._doOnScroll.apply(this._fake, arguments)
        };
        var e = "selectAll";
        this._bfs__selectAll = this[e];
        this[e] = function() {
            this._bfs__selectAll.apply(this, arguments);
            this._bfs__selectAll.apply(this._fake, arguments)
        };
        var e = "doClick";
        this._bfs_doClick = this[e];
        this[e] = function() {
            this["_bfs_doClick"].apply(this, arguments);
            if (arguments[0].tagName == "TD") {
                var D = (arguments[0]._cellIndex >= m);
                if (!arguments[0].parentNode.idd) {
                    return
                }
                if (!D) {
                    arguments[0].className = arguments[0].className.replace(/cellselected/g, "")
                }
                if (!this._fake.rowsAr[arguments[0].parentNode.idd]) {
                    this._fake.render_row(this.getRowIndex(arguments[0].parentNode.idd))
                }
                arguments[0] = this._fake.cells(arguments[0].parentNode.idd, (D ? 0 : arguments[0]._cellIndex)).cell;
                if (D) {
                    this._fake.cell = null
                }
                this._fake._bfs_doClick.apply(this._fake, arguments);
                if (D) {
                    this._fake.cell = this.cell
                } else {
                    this.cell = this._fake.cell
                }
                if (this._fake.onRowSelectTime) {
                    clearTimeout(this._fake.onRowSelectTime)
                }
                if (D) {
                    arguments[0].className = arguments[0].className.replace(/cellselected/g, "");
                    globalActiveDHTMLGridObject = this;
                    this._fake.cell = this.cell
                } else {
                    this.objBox.scrollTop = this._fake.objBox.scrollTop
                }
            }
        };
        this._fake._bfs_doClick = this._fake[e];
        this._fake[e] = function() {
            this["_bfs_doClick"].apply(this, arguments);
            if (arguments[0].tagName == "TD") {
                var D = (arguments[0]._cellIndex < m);
                if (!arguments[0].parentNode.idd) {
                    return
                }
                arguments[0] = this._fake._bfs_cells(arguments[0].parentNode.idd, (D ? m : arguments[0]._cellIndex)).cell;
                this._fake.cell = null;
                this._fake._bfs_doClick.apply(this._fake, arguments);
                this._fake.cell = this.cell;
                if (this._fake.onRowSelectTime) {
                    clearTimeout(this._fake.onRowSelectTime)
                }
                if (D) {
                    arguments[0].className = arguments[0].className.replace(/cellselected/g, "");
                    globalActiveDHTMLGridObject = this;
                    this._fake.cell = this.cell;
                    this._fake.objBox.scrollTop = this.objBox.scrollTop
                }
            }
        };
        this.clearSelectionA = this.clearSelection;
        this.clearSelection = function(D) {
            if (D) {
                this._fake.clearSelection()
            }
            this.clearSelectionA()
        };
        this.moveRowUpA = this.moveRowUp;
        this.moveRowUp = function(D) {
            if (!this._h2) {
                this._fake.moveRowUp(D)
            }
            this.moveRowUpA(D);
            if (this._h2) {
                this._fake._h2syncModel()
            }
        };
        this.moveRowDownA = this.moveRowDown;
        this.moveRowDown = function(D) {
            if (!this._h2) {
                this._fake.moveRowDown(D)
            }
            this.moveRowDownA(D);
            if (this._h2) {
                this._fake._h2syncModel()
            }
        };
        this._fake.getUserData = function() {
            return this._fake.getUserData.apply(this._fake, arguments)
        };
        this._fake.setUserData = function() {
            return this._fake.setUserData.apply(this._fake, arguments)
        };
        this.getSortingStateA = this.getSortingState;
        this.getSortingState = function() {
            var D = this.getSortingStateA();
            if (D.length != 0) {
                return D
            }
            return this._fake.getSortingState()
        };
        this.setSortImgStateA = this._fake.setSortImgStateA = this.setSortImgState;
        this.setSortImgState = function(E, D, H, F) {
            this.setSortImgStateA(E, D, H, F);
            if (D * 1 < m) {
                this._fake.setSortImgStateA(E, D, H, F);
                this.setSortImgStateA(false)
            } else {
                this._fake.setSortImgStateA(false)
            }
        };
        this._fake.doColResizeA = this._fake.doColResize;
        this._fake.doColResize = function(I, H, F, D, K) {
            var E = -1;
            var J = 0;
            if (arguments[1]._cellIndex == (m - 1)) {
                E = this._initalSplR + (I.clientX - D);
                if (!this._initalSplF) {
                    this._initalSplF = arguments[3] + this.objBox.scrollWidth - this.objBox.offsetWidth
                }
                if (this.objBox.scrollWidth == this.objBox.offsetWidth && (this._fake.alter_split_resize || (I.clientX - D) > 0)) {
                    arguments[3] = (this._initalSplF || arguments[3]);
                    J = this.doColResizeA.apply(this, arguments)
                } else {
                    J = this.doColResizeA.apply(this, arguments)
                }
            } else {
                if (this.obj.offsetWidth < this.entBox.offsetWidth) {
                    E = this.obj.offsetWidth
                }
                J = this.doColResizeA.apply(this, arguments)
            }
            if (J !== false) {
                this._correctSplit(E);
                this.resized = this._fake.resized = 1
            }
            return J
        };
        this._fake.changeCursorState = function(F) {
            var E = F.target || F.srcElement;
            if (E.tagName != "TD") {
                E = this.getFirstParentOfType(E, "TD")
            }
            if ((E.tagName == "TD") && (this._drsclmn) && (!this._drsclmn[E._cellIndex])) {
                return
            }
            var D = (F.layerX || 0) + (((!_isIE) && (F.target.tagName == "DIV")) ? E.offsetLeft : 0);
            var H = parseInt(this.getPosition(E, this.hdrBox));
            if (((E.offsetWidth - (F.offsetX || (H - D) * -1)) < (_isOpera ? 20 : 10)) || ((this.entBox.offsetWidth - (F.offsetX ? (F.offsetX + E.offsetLeft) : D) + this.objBox.scrollLeft - 0) < (_isOpera ? 20 : 10))) {
                E.style.cursor = "E-resize"
            } else {
                E.style.cursor = "default"
            }
            if (_isOpera) {
                this.hdrBox.scrollLeft = this.objBox.scrollLeft
            }
        };
        this._fake.startColResizeA = this._fake.startColResize;
        this._fake.startColResize = function(E) {
            var F = this.startColResizeA(E);
            this._initalSplR = this.entBox.offsetWidth;
            this._initalSplF = null;
            if (this.entBox.onmousemove) {
                var D = this.entBox.parentNode;
                if (D._aggrid) {
                    return F
                }
                D._aggrid = D.grid;
                D.grid = this;
                this.entBox.parentNode.onmousemove = this.entBox.onmousemove;
                this.entBox.onmousemove = null
            }
            return F
        };
        this._fake.stopColResizeA = this._fake.stopColResize;
        this._fake.stopColResize = function(E) {
            if (this.entBox.parentNode.onmousemove) {
                var D = this.entBox.parentNode;
                D.grid = D._aggrid;
                D._aggrid = null;
                this.entBox.onmousemove = this.entBox.parentNode.onmousemove;
                this.entBox.parentNode.onmousemove = null;
                if (this.obj.offsetWidth < this.entBox.offsetWidth) {
                    this._correctSplit(this.obj.offsetWidth)
                }
            }
            return this.stopColResizeA(E)
        };
        this.doKeyA = this.doKey;
        this._fake.doKeyA = this._fake.doKey;

        function l(K, J, D, M) {
            var E = M.shiftKey ? -1 : 1;
            var F = M.shiftKey ? -1 : D._cCount;
            var I = false;
            for (var H = K + E; H != F; H += E) {
                if (D.smartTabOrder) {
                    I = D.cells2(J, H).isDisabled() ? false : H
                } else {
                    I = H
                }
                if (I !== false) {
                    var L = !D._key_events.k_other;
                    D.selectCell(J, I, false, false, L, true);
                    M.cancelBubble = true;
                    if (M.preventDefault) {
                        M.preventDefault()
                    }
                    return true
                }
            }
        }
        this._fake.doKey = this.doKey = function(I) {
            if (!I) {
                return true
            }
            if (this._htkebl) {
                return true
            }
            if ((I.target || I.srcElement).value !== window.undefined) {
                var E = (I.target || I.srcElement);
                if ((!E.parentNode) || (E.parentNode.className.indexOf("editable") == -1)) {
                    return true
                }
            }
            switch (I.keyCode) {
                case 9:
                    var H = this._realfake ? this._fake : this;
                    if (!H.callEvent("onTab", [true])) {
                        return true
                    }
                    if (this.cell) {
                        var F = this.cell._cellIndex;
                        var D = H.getRowIndex(this.cell.parentNode.idd);
                        while (!l(F, D, H, I)) {
                            D += (I.shiftKey ? -1 : 1);
                            if (D < 0 || D >= H.rowsBuffer.length) {
                                return
                            }
                            F = I.shiftKey ? H._cCount : -1
                        }
                        return
                    }
                    break
            }
            return this.doKeyA(I)
        };
        this.editCellA = this.editCell;
        this.editCell = function() {
            if (this.cell && this.cell.parentNode.grid != this) {
                return this._fake.editCell()
            }
            return this.editCellA()
        };
        this.deleteRowA = this.deleteRow;
        this.deleteRow = function(D, E) {
            if (this.deleteRowA(D, E) === false) {
                return false
            }
            if (this._fake.rowsAr[D]) {
                this._fake.deleteRow(D)
            }
        };
        this.clearAllA = this.clearAll;
        this.clearAll = function() {
            this.clearAllA();
            this._fake.clearAll()
        };
        this.editStopA = this.editStop;
        this.editStop = function(D) {
            if (this._fake.editor) {
                this._fake.editStop(D)
            } else {
                this.editStopA(D)
            }
        };
        this.attachEvent("onAfterSorting", function(E, D, F) {
            if (E >= m) {
                this._fake.setSortImgState(false)
            }
        });
        this._fake.sortField = function(E, D, H) {
            this._fake.sortField.call(this._fake, E, D, this._fake.hdr.rows[0].cells[E]);
            if (this.fldSort[E] != "na" && this._fake.fldSorted) {
                var F = this._fake.getSortingState()[1];
                this._fake.setSortImgState(false);
                this.setSortImgState(true, arguments[0], F)
            }
        };
        this.sortTreeRowsA = this.sortTreeRows;
        this._fake.sortTreeRowsA = this._fake.sortTreeRows;
        this.sortTreeRows = this._fake.sortTreeRows = function(F, H, D, E) {
            if (this._realfake) {
                return this._fake.sortTreeRows(F, H, D, E)
            }
            this.sortTreeRowsA(F, H, D, E);
            this._fake._h2syncModel();
            this._fake.setSortImgStateA(false);
            this._fake.fldSorted = null
        };
        this._fake._fillers = [];
        this._fake.rowsBuffer = this.rowsBuffer;
        this.attachEvent("onClearAll", function() {
            this._fake.rowsBuffer = this.rowsBuffer
        });
        this._add_filler_s = this._add_filler;
        this._add_filler = function(E, D, I, F) {
            if (!this._fake._fillers) {
                this._fake._fillers = []
            }
            if (this._realfake || !F) {
                var H;
                if (I && I.idd) {
                    H = this._fake.rowsAr[I.idd]
                } else {
                    if (I && I.nextSibling) {
                        H = {};
                        H.nextSibling = this._fake.rowsAr[I.nextSibling.idd];
                        H.parentNode = H.nextSibling.parentNode
                    } else {
                        if (this._fake._fillers.length) {
                            H = this._fake._fillers[this._fake._fillers.length - 1][2]
                        }
                    }
                }
                this._fake._fillers.push(this._fake._add_filler(E, D, H))
            }
            return this._add_filler_s.apply(this, arguments)
        };
        this._add_from_buffer_s = this._add_from_buffer;
        this._add_from_buffer = function() {
            var D = this._add_from_buffer_s.apply(this, arguments);
            if (D != -1) {
                this._fake._add_from_buffer.apply(this._fake, arguments);
                if (this.multiLine) {
                    this._correctRowHeight(this.rowsBuffer[arguments[0]].idd)
                }
            }
            return D
        };
        this._fake.render_row = function(D) {
            var E = this._fake.render_row(D);
            if (E == -1) {
                return -1
            }
            if (E) {
                return this.rowsAr[E.idd] = this.rowsAr[E.idd] || this._fake.copy_row(E)
            }
            return null
        };
        this._reset_view_s = this._reset_view;
        this._reset_view = function() {
            this._fake._reset_view(true);
            this._fake._fillers = [];
            this._reset_view_s()
        };
        this.moveColumn_s = this.moveColumn;
        this.moveColumn = function(E, D) {
            if (D >= m) {
                return this.moveColumn_s(E, D)
            }
        };
        this.attachEvent("onCellChanged", function(I, F, H) {
            if (this._split_event && F < m && this.rowsAr[I]) {
                var D = this._fake.rowsAr[I];
                if (!D) {
                    return
                }
                if (D._childIndexes) {
                    D = D.childNodes[D._childIndexes[F]]
                } else {
                    D = D.childNodes[F]
                }
                var E = this.rowsAr[I].childNodes[F];
                if (E._treeCell && E.firstChild.lastChild) {
                    E.firstChild.lastChild.innerHTML = H
                } else {
                    E.innerHTML = D.innerHTML
                }
                E._clearCell = false;
                E.combo_value = D.combo_value;
                E.chstate = D.chstate
            }
        });
        this._fake.combos = this.combos;
        this.setSizes();
        if (this.rowsBuffer[0]) {
            this._reset_view()
        }
        this.attachEvent("onXLE", function() {
            this._fake._correctSplit()
        });
        this._fake._correctSplit()
    };
    dhtmlXGridObject.prototype._correctSplit = function(c) {
        c = c || (this.obj.scrollWidth - this.objBox.scrollLeft);
        c = Math.min(this.globalBox.offsetWidth, c);
        if (c > -1) {
            this.entBox.style.width = c + "px";
            this.objBox.style.width = c + "px";
            var g = (this.globalBox.offsetWidth - this.globalBox.clientWidth) / 2;
            this._fake.entBox.style.left = c + "px";
            this._fake.entBox.style.width = Math.max(0, this.globalBox.offsetWidth - c - (this.quirks ? 0 : 2) * g) + "px";
            if (this._fake.ftr) {
                this._fake.ftr.parentNode.style.width = this._fake.entBox.style.width
            }
            if (_isIE) {
                var e = _isIE && !window.xmlHttpRequest;
                var g = (this.globalBox.offsetWidth - this.globalBox.clientWidth);
                this._fake.hdrBox.style.width = this._fake.objBox.style.width = Math.max(0, this.globalBox.offsetWidth - (e ? g : 0) - c) + "px"
            }
        }
    };

    Array.prototype.distinct = function() {
        return this.filter((v, i, a) => a.indexOf(v) === i);
    }

    Array.prototype.myUcase = function() {
        for (let i = 0; i < this.length; i++) {
          this[i] = this[i].toUpperCase();
        }
    };

    dhtmlXGridObject.prototype._correctRowHeight = function(o, m) {
        if (!this.rowsAr[o] || !this._fake.rowsAr[o]) {
            return
        }
        var l = parseInt(this.rowsAr[o].style.height) || this.rowsAr[o].offsetHeight;
        var e = parseInt(this._fake.rowsAr[o].style.height) || this._fake.rowsAr[o].offsetHeight;
        var a = Math.max(l, e) - (this.rowsAr[o].delta_fix || 0);
        if (!a) {
            return
        }
        this.rowsAr[o].style.height = this._fake.rowsAr[o].style.height = Math.round(a + 1) + "px";
        this.rowsAr[o].delta_fix = 1;
        if (window._KHTMLrv) {
            var c = this._fake._cCount;
            var n;
            while (!n && c >= 0) {
                n = this.rowsAr[o].childNodes[c];
                c -= 1
            }
            var g = this._fake.rowsAr[o].firstChild;
            if (n && g) {
                n.style.height = g.style.height = a + "px"
            }
        }
    };