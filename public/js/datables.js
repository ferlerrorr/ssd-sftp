/*! DataTables 1.13.5
 * ©2008-2023 SpryMedia Ltd - datatables.net/license
 */ !(function (t) {
  "use strict";
  var e;
  "function" == typeof define && define.amd
    ? define(["jquery"], function (e) {
        return t(e, window, document);
      })
    : "object" == typeof exports
    ? ((e = require("jquery")),
      "undefined" != typeof window
        ? (module.exports = function (n, a) {
            return (n = n || window), t((a = a || e(n)), n, n.document);
          })
        : t(e, window, window.document))
    : (window.DataTable = t(jQuery, window, document));
})(function (t, e, n, a) {
  "use strict";
  function r(t) {
    var e = parseInt(t, 10);
    return !isNaN(e) && isFinite(t) ? e : null;
  }
  function o(t, e, n) {
    var a = typeof t,
      r = "string" == a;
    return (
      "number" == a ||
      "bigint" == a ||
      !!D(t) ||
      (e && r && (t = y(t, e)),
      n && r && (t = t.replace(v, "")),
      !isNaN(parseFloat(t)) && isFinite(t))
    );
  }
  function i(t, e, n) {
    var a;
    return (
      !!D(t) ||
      ((D((a = t)) || "string" == typeof a) &&
        !!o(t.replace($, "").replace(/<script/i, ""), e, n)) ||
      null
    );
  }
  function l(t, e, n, r) {
    var o = [],
      i = 0,
      l = e.length;
    if (r !== a) for (; i < l; i++) t[e[i]][n] && o.push(t[e[i]][n][r]);
    else for (; i < l; i++) o.push(t[e[i]][n]);
    return o;
  }
  function s(t, e) {
    var n,
      r = [];
    e === a ? ((e = 0), (n = t)) : ((n = e), (e = t));
    for (var o = e; o < n; o++) r.push(o);
    return r;
  }
  function u(t) {
    for (var e = [], n = 0, a = t.length; n < a; n++) t[n] && e.push(t[n]);
    return e;
  }
  function c(t, e) {
    return -1 !== this.indexOf(t, (e = e === a ? 0 : e));
  }
  var f,
    d,
    h,
    p = function (e, n) {
      if (p.factory(e, n)) return p;
      if (this instanceof p) return t(e).DataTable(n);
      (n = e),
        (this.$ = function (t, e) {
          return this.api(!0).$(t, e);
        }),
        (this._ = function (t, e) {
          return this.api(!0).rows(t, e).data();
        }),
        (this.api = function (t) {
          return new eg(t ? t4(this[f.iApiIndex]) : this);
        }),
        (this.fnAddData = function (e, n) {
          var r = this.api(!0),
            e = (
              Array.isArray(e) && (Array.isArray(e[0]) || t.isPlainObject(e[0]))
                ? r.rows
                : r.row
            ).add(e);
          return (n === a || n) && r.draw(), e.flatten().toArray();
        }),
        (this.fnAdjustColumnSizing = function (t) {
          var e = this.api(!0).columns.adjust(),
            n = e.settings()[0],
            r = n.oScroll;
          t === a || t ? e.draw(!1) : ("" === r.sX && "" === r.sY) || tE(n);
        }),
        (this.fnClearTable = function (t) {
          var e = this.api(!0).clear();
          (t === a || t) && e.draw();
        }),
        (this.fnClose = function (t) {
          this.api(!0).row(t).child.hide();
        }),
        (this.fnDeleteRow = function (t, e, n) {
          var r = this.api(!0),
            t = r.rows(t),
            o = t.settings()[0],
            i = o.aoData[t[0][0]];
          return (
            t.remove(), e && e.call(this, o, i), (n === a || n) && r.draw(), i
          );
        }),
        (this.fnDestroy = function (t) {
          this.api(!0).destroy(t);
        }),
        (this.fnDraw = function (t) {
          this.api(!0).draw(t);
        }),
        (this.fnFilter = function (t, e, n, r, o, i) {
          var l = this.api(!0);
          (null === e || e === a ? l : l.column(e)).search(t, n, r, i),
            l.draw();
        }),
        (this.fnGetData = function (t, e) {
          var n,
            r = this.api(!0);
          return t !== a
            ? ((n = t.nodeName ? t.nodeName.toLowerCase() : ""),
              e !== a || "td" == n || "th" == n
                ? r.cell(t, e).data()
                : r.row(t).data() || null)
            : r.data().toArray();
        }),
        (this.fnGetNodes = function (t) {
          var e = this.api(!0);
          return t !== a
            ? e.row(t).node()
            : e.rows().nodes().flatten().toArray();
        }),
        (this.fnGetPosition = function (t) {
          var e = this.api(!0),
            n = t.nodeName.toUpperCase();
          return "TR" == n
            ? e.row(t).index()
            : "TD" == n || "TH" == n
            ? [(n = e.cell(t).index()).row, n.columnVisible, n.column]
            : null;
        }),
        (this.fnIsOpen = function (t) {
          return this.api(!0).row(t).child.isShown();
        }),
        (this.fnOpen = function (t, e, n) {
          return this.api(!0).row(t).child(e, n).show().child()[0];
        }),
        (this.fnPageChange = function (t, e) {
          (t = this.api(!0).page(t)), (e === a || e) && t.draw(!1);
        }),
        (this.fnSetColumnVis = function (t, e, n) {
          (t = this.api(!0).column(t).visible(e)),
            (n === a || n) && t.columns.adjust().draw();
        }),
        (this.fnSettings = function () {
          return t4(this[f.iApiIndex]);
        }),
        (this.fnSort = function (t) {
          this.api(!0).order(t).draw();
        }),
        (this.fnSortListener = function (t, e, n) {
          this.api(!0).order.listener(t, e, n);
        }),
        (this.fnUpdate = function (t, e, n, r, o) {
          var i = this.api(!0);
          return (
            (n === a || null === n ? i.row(e) : i.cell(e, n)).data(t),
            (o === a || o) && i.columns.adjust(),
            (r === a || r) && i.draw(),
            0
          );
        }),
        (this.fnVersionCheck = f.fnVersionCheck);
      var r,
        o = this,
        i = n === a,
        l = this.length;
      for (r in (i && (n = {}),
      (this.oApi = this.internal = f.internal),
      p.ext.internal))
        r && (this[r] = eH(r));
      return (
        this.each(function () {
          var e = 1 < l ? et({}, n, !0) : n,
            r = 0,
            s = this.getAttribute("id"),
            u = !1,
            c = p.defaults,
            f = t(this);
          if ("table" != this.nodeName.toLowerCase())
            t7(
              null,
              0,
              "Non-table node initialisation (" + this.nodeName + ")",
              2
            );
          else {
            L(c),
              R(c.column),
              I(c, c, !0),
              I(c.column, c.column, !0),
              I(c, t.extend(e, f.data()), !0);
            for (var d = p.settings, r = 0, h = d.length; r < h; r++) {
              var g = d[r];
              if (
                g.nTable == this ||
                (g.nTHead && g.nTHead.parentNode == this) ||
                (g.nTFoot && g.nTFoot.parentNode == this)
              ) {
                var b = (e.bRetrieve !== a ? e : c).bRetrieve,
                  $ = (e.bDestroy !== a ? e : c).bDestroy;
                if (i || b) return g.oInstance;
                if ($) {
                  g.oInstance.fnDestroy();
                  break;
                }
                return void t7(g, 0, "Cannot reinitialise DataTable", 3);
              }
              if (g.sTableId == this.id) {
                d.splice(r, 1);
                break;
              }
            }
            (null !== s && "" !== s) ||
              ((s = "DataTables_Table_" + p.ext._unique++), (this.id = s));
            var m,
              S,
              v = t.extend(!0, {}, p.models.oSettings, {
                sDestroyWidth: f[0].style.width,
                sInstance: s,
                sTableId: s,
              }),
              D =
                ((v.nTable = this),
                (v.oApi = o.internal),
                (v.oInit = e),
                d.push(v),
                (v.oInstance = 1 === o.length ? o : f.dataTable()),
                L(e),
                A(e.oLanguage),
                e.aLengthMenu &&
                  !e.iDisplayLength &&
                  (e.iDisplayLength = (
                    Array.isArray(e.aLengthMenu[0])
                      ? e.aLengthMenu[0]
                      : e.aLengthMenu
                  )[0]),
                (e = et(t.extend(!0, {}, c), e)),
                tQ(v.oFeatures, e, [
                  "bPaginate",
                  "bLengthChange",
                  "bFilter",
                  "bSort",
                  "bSortMulti",
                  "bInfo",
                  "bProcessing",
                  "bAutoWidth",
                  "bSortClasses",
                  "bServerSide",
                  "bDeferRender",
                ]),
                tQ(v, e, [
                  "asStripeClasses",
                  "ajax",
                  "fnServerData",
                  "fnFormatNumber",
                  "sServerMethod",
                  "aaSorting",
                  "aaSortingFixed",
                  "aLengthMenu",
                  "sPaginationType",
                  "sAjaxSource",
                  "sAjaxDataProp",
                  "iStateDuration",
                  "sDom",
                  "bSortCellsTop",
                  "iTabIndex",
                  "fnStateLoadCallback",
                  "fnStateSaveCallback",
                  "renderer",
                  "searchDelay",
                  "rowId",
                  ["iCookieDuration", "iStateDuration"],
                  ["oSearch", "oPreviousSearch"],
                  ["aoSearchCols", "aoPreSearchCols"],
                  ["iDisplayLength", "_iDisplayLength"],
                ]),
                tQ(v.oScroll, e, [
                  ["sScrollX", "sX"],
                  ["sScrollXInner", "sXInner"],
                  ["sScrollY", "sY"],
                  ["bScrollCollapse", "bCollapse"],
                ]),
                tQ(v.oLanguage, e, "fnInfoCallback"),
                en(v, "aoDrawCallback", e.fnDrawCallback, "user"),
                en(v, "aoServerParams", e.fnServerParams, "user"),
                en(v, "aoStateSaveParams", e.fnStateSaveParams, "user"),
                en(v, "aoStateLoadParams", e.fnStateLoadParams, "user"),
                en(v, "aoStateLoaded", e.fnStateLoaded, "user"),
                en(v, "aoRowCallback", e.fnRowCallback, "user"),
                en(v, "aoRowCreatedCallback", e.fnCreatedRow, "user"),
                en(v, "aoHeaderCallback", e.fnHeaderCallback, "user"),
                en(v, "aoFooterCallback", e.fnFooterCallback, "user"),
                en(v, "aoInitComplete", e.fnInitComplete, "user"),
                en(v, "aoPreDrawCallback", e.fnPreDrawCallback, "user"),
                (v.rowIdFn = Z(e.rowId)),
                P(v),
                v.oClasses),
              y =
                (t.extend(D, p.ext.classes, e.oClasses),
                f.addClass(D.sTable),
                v.iInitDisplayStart === a &&
                  ((v.iInitDisplayStart = e.iDisplayStart),
                  (v._iDisplayStart = e.iDisplayStart)),
                null !== e.iDeferLoading &&
                  ((v.bDeferLoading = !0),
                  (s = Array.isArray(e.iDeferLoading)),
                  (v._iRecordsDisplay = s
                    ? e.iDeferLoading[0]
                    : e.iDeferLoading),
                  (v._iRecordsTotal = s
                    ? e.iDeferLoading[1]
                    : e.iDeferLoading)),
                v.oLanguage),
              s =
                (t.extend(!0, y, e.oLanguage),
                y.sUrl
                  ? (t.ajax({
                      dataType: "json",
                      url: y.sUrl,
                      success: function (e) {
                        I(c.oLanguage, e),
                          A(e),
                          t.extend(!0, y, e, v.oInit.oLanguage),
                          ea(v, null, "i18n", [v]),
                          tR(v);
                      },
                      error: function () {
                        tR(v);
                      },
                    }),
                    (u = !0))
                  : ea(v, null, "i18n", [v]),
                null === e.asStripeClasses &&
                  (v.asStripeClasses = [D.sStripeOdd, D.sStripeEven]),
                v.asStripeClasses),
              C = f.children("tbody").find("tr").eq(0),
              T =
                (-1 !==
                  t.inArray(
                    !0,
                    t.map(s, function (t, e) {
                      return C.hasClass(t);
                    })
                  ) &&
                  (t("tbody tr", this).removeClass(s.join(" ")),
                  (v.asDestroyStripes = s.slice())),
                []),
              s = this.getElementsByTagName("thead");
            if (
              (0 !== s.length && (tf(v.aoHeader, s[0]), (T = td(v))),
              null === e.aoColumns)
            )
              for (m = [], r = 0, h = T.length; r < h; r++) m.push(null);
            else m = e.aoColumns;
            for (r = 0, h = m.length; r < h; r++) H(v, T ? T[r] : null);
            U(v, e.aoColumnDefs, m, function (t, e) {
              N(v, t, e);
            }),
              C.length &&
                ((S = function (t, e) {
                  return null !== t.getAttribute("data-" + e) ? e : null;
                }),
                t(C[0])
                  .children("th, td")
                  .each(function (t, e) {
                    var n,
                      r = v.aoColumns[t];
                    r || t7(v, 0, "Incorrect column count", 18),
                      r.mData === t &&
                        ((n = S(e, "sort") || S(e, "order")),
                        (e = S(e, "filter") || S(e, "search")),
                        (null === n && null === e) ||
                          ((r.mData = {
                            _: t + ".display",
                            sort: null !== n ? t + ".@data-" + n : a,
                            type: null !== n ? t + ".@data-" + n : a,
                            filter: null !== e ? t + ".@data-" + e : a,
                          }),
                          (r._isArrayHost = !0),
                          N(v, t)));
                  }));
            var w = v.oFeatures,
              s = function () {
                if (e.aaSorting === a) {
                  var n = v.aaSorting;
                  for (r = 0, h = n.length; r < h; r++)
                    n[r][1] = v.aoColumns[r].asSorting[0];
                }
                tZ(v),
                  w.bSort &&
                    en(v, "aoDrawCallback", function () {
                      var e, n;
                      v.bSorted &&
                        ((e = tG(v)),
                        (n = {}),
                        t.each(e, function (t, e) {
                          n[e.src] = e.dir;
                        }),
                        ea(v, null, "order", [v, e, n]),
                        tY(v));
                    }),
                  en(
                    v,
                    "aoDrawCallback",
                    function () {
                      (v.bSorted || "ssp" === ei(v) || w.bDeferRender) && tZ(v);
                    },
                    "sc"
                  );
                var o = f.children("caption").each(function () {
                    this._captionSide = t(this).css("caption-side");
                  }),
                  i = f.children("thead"),
                  l =
                    (0 === i.length && (i = t("<thead/>").appendTo(f)),
                    (v.nTHead = i[0]),
                    f.children("tbody")),
                  i =
                    (0 === l.length && (l = t("<tbody/>").insertAfter(i)),
                    (v.nTBody = l[0]),
                    f.children("tfoot"));
                if (
                  (0 ===
                    (i =
                      0 === i.length &&
                      0 < o.length &&
                      ("" !== v.oScroll.sX || "" !== v.oScroll.sY)
                        ? t("<tfoot/>").appendTo(f)
                        : i).length || 0 === i.children().length
                    ? f.addClass(D.sNoFooter)
                    : 0 < i.length &&
                      ((v.nTFoot = i[0]), tf(v.aoFooter, v.nTFoot)),
                  e.aaData)
                )
                  for (r = 0; r < e.aaData.length; r++) V(v, e.aaData[r]);
                else
                  (v.bDeferLoading || "dom" == ei(v)) &&
                    X(v, t(v.nTBody).children("tr"));
                (v.aiDisplay = v.aiDisplayMaster.slice()),
                  (v.bInitialised = !0),
                  !1 === u && tR(v);
              };
            en(v, "aoDrawCallback", t3, "state_save"),
              e.bStateSave ? ((w.bStateSave = !0), t5(v, 0, s)) : s();
          }
        }),
        (o = null),
        this
      );
    },
    g = {},
    b = /[\r\n\u2028]/g,
    $ = /<.*?>/g,
    m =
      /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,
    S = RegExp(
      "(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)",
      "g"
    ),
    v = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,
    D = function (t) {
      return !t || !0 === t || "-" === t;
    },
    y = function (t, e) {
      return (
        g[e] || (g[e] = RegExp(tC(e), "g")),
        "string" == typeof t && "." !== e
          ? t.replace(/\./g, "").replace(g[e], ".")
          : t
      );
    },
    C = function (t, e, n) {
      var r = [],
        o = 0,
        i = t.length;
      if (n !== a) for (; o < i; o++) t[o] && t[o][e] && r.push(t[o][e][n]);
      else for (; o < i; o++) t[o] && r.push(t[o][e]);
      return r;
    },
    T = function (t) {
      if (!(t.length < 2))
        for (
          var e = t.slice().sort(), n = e[0], a = 1, r = e.length;
          a < r;
          a++
        ) {
          if (e[a] === n) return !1;
          n = e[a];
        }
      return !0;
    },
    w = function (t) {
      if (T(t)) return t.slice();
      var e,
        n,
        a,
        r = [],
        o = t.length,
        i = 0;
      t: for (n = 0; n < o; n++) {
        for (e = t[n], a = 0; a < i; a++) if (r[a] === e) continue t;
        r.push(e), i++;
      }
      return r;
    },
    x = function (t, e) {
      if (Array.isArray(e)) for (var n = 0; n < e.length; n++) x(t, e[n]);
      else t.push(e);
      return t;
    };
  function _(e) {
    var n,
      a,
      r = {};
    t.each(e, function (t, o) {
      (n = t.match(/^([^A-Z]+?)([A-Z])/)) &&
        -1 !== "a aa ai ao as b fn i m o s ".indexOf(n[1] + " ") &&
        ((r[(a = t.replace(n[0], n[2].toLowerCase()))] = t), "o" === n[1]) &&
        _(e[t]);
    }),
      (e._hungarianMap = r);
  }
  function I(e, n, r) {
    var o;
    e._hungarianMap || _(e),
      t.each(n, function (i, l) {
        (o = e._hungarianMap[i]) !== a &&
          (r || n[o] === a) &&
          ("o" === o.charAt(0)
            ? (n[o] || (n[o] = {}), t.extend(!0, n[o], n[i]), I(e[o], n[o], r))
            : (n[o] = n[i]));
      });
  }
  function A(t) {
    var e,
      n = p.defaults.oLanguage,
      a = n.sDecimal;
    a && eT(a),
      t &&
        ((e = t.sZeroRecords),
        !t.sEmptyTable &&
          e &&
          "No data available in table" === n.sEmptyTable &&
          tQ(t, t, "sZeroRecords", "sEmptyTable"),
        !t.sLoadingRecords &&
          e &&
          "Loading..." === n.sLoadingRecords &&
          tQ(t, t, "sZeroRecords", "sLoadingRecords"),
        t.sInfoThousands && (t.sThousands = t.sInfoThousands),
        (e = t.sDecimal)) &&
        a !== e &&
        eT(e);
  }
  Array.isArray ||
    (Array.isArray = function (t) {
      return "[object Array]" === Object.prototype.toString.call(t);
    }),
    Array.prototype.includes || (Array.prototype.includes = c),
    String.prototype.trim ||
      (String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
      }),
    String.prototype.includes || (String.prototype.includes = c),
    (p.util = {
      throttle: function (t, e) {
        var n,
          r,
          o = e !== a ? e : 200;
        return function () {
          var e = this,
            i = +new Date(),
            l = arguments;
          n && i < n + o
            ? (clearTimeout(r),
              (r = setTimeout(function () {
                (n = a), t.apply(e, l);
              }, o)))
            : ((n = i), t.apply(e, l));
        };
      },
      escapeRegex: function (t) {
        return t.replace(S, "\\$1");
      },
      set: function (e) {
        var n;
        return t.isPlainObject(e)
          ? p.util.set(e._)
          : null === e
          ? function () {}
          : "function" == typeof e
          ? function (t, n, a) {
              e(t, "set", n, a);
            }
          : "string" != typeof e ||
            (-1 === e.indexOf(".") &&
              -1 === e.indexOf("[") &&
              -1 === e.indexOf("("))
          ? function (t, n) {
              t[e] = n;
            }
          : ((n = function (t, e, r) {
              for (
                var o,
                  i,
                  l,
                  s,
                  u = Y(r),
                  r = u[u.length - 1],
                  c = 0,
                  f = u.length - 1;
                c < f;
                c++
              ) {
                if ("__proto__" === u[c] || "constructor" === u[c])
                  throw Error("Cannot set prototype values");
                if (((o = u[c].match(G)), (i = u[c].match(z)), o)) {
                  if (
                    ((u[c] = u[c].replace(G, "")),
                    (t[u[c]] = []),
                    (o = u.slice()).splice(0, c + 1),
                    (s = o.join(".")),
                    Array.isArray(e))
                  )
                    for (var d = 0, h = e.length; d < h; d++)
                      n((l = {}), e[d], s), t[u[c]].push(l);
                  else t[u[c]] = e;
                  return;
                }
                i && ((u[c] = u[c].replace(z, "")), (t = t[u[c]](e))),
                  (null !== t[u[c]] && t[u[c]] !== a) || (t[u[c]] = {}),
                  (t = t[u[c]]);
              }
              r.match(z) ? t[r.replace(z, "")](e) : (t[r.replace(G, "")] = e);
            }),
            function (t, a) {
              return n(t, a, e);
            });
      },
      get: function (e) {
        var n, r;
        return t.isPlainObject(e)
          ? ((n = {}),
            t.each(e, function (t, e) {
              e && (n[t] = p.util.get(e));
            }),
            function (t, e, r, o) {
              var i = n[e] || n._;
              return i !== a ? i(t, e, r, o) : t;
            })
          : null === e
          ? function (t) {
              return t;
            }
          : "function" == typeof e
          ? function (t, n, a, r) {
              return e(t, n, a, r);
            }
          : "string" != typeof e ||
            (-1 === e.indexOf(".") &&
              -1 === e.indexOf("[") &&
              -1 === e.indexOf("("))
          ? function (t, n) {
              return t[e];
            }
          : ((r = function (t, e, n) {
              var o, i, l;
              if ("" !== n)
                for (var s = Y(n), u = 0, c = s.length; u < c; u++) {
                  if (((h = s[u].match(G)), (o = s[u].match(z)), h)) {
                    if (
                      ((s[u] = s[u].replace(G, "")),
                      "" !== s[u] && (t = t[s[u]]),
                      (i = []),
                      s.splice(0, u + 1),
                      (l = s.join(".")),
                      Array.isArray(t))
                    )
                      for (var f = 0, d = t.length; f < d; f++)
                        i.push(r(t[f], e, l));
                    var h = h[0].substring(1, h[0].length - 1);
                    t = "" === h ? i : i.join(h);
                    break;
                  }
                  if (o) (s[u] = s[u].replace(z, "")), (t = t[s[u]]());
                  else {
                    if (null === t || null === t[s[u]]) return null;
                    if (t === a || t[s[u]] === a) return a;
                    t = t[s[u]];
                  }
                }
              return t;
            }),
            function (t, n) {
              return r(t, n, e);
            });
      },
    });
  var F = function (t, e, n) {
    t[e] !== a && (t[n] = t[e]);
  };
  function L(t) {
    F(t, "ordering", "bSort"),
      F(t, "orderMulti", "bSortMulti"),
      F(t, "orderClasses", "bSortClasses"),
      F(t, "orderCellsTop", "bSortCellsTop"),
      F(t, "order", "aaSorting"),
      F(t, "orderFixed", "aaSortingFixed"),
      F(t, "paging", "bPaginate"),
      F(t, "pagingType", "sPaginationType"),
      F(t, "pageLength", "iDisplayLength"),
      F(t, "searching", "bFilter"),
      "boolean" == typeof t.sScrollX && (t.sScrollX = t.sScrollX ? "100%" : ""),
      "boolean" == typeof t.scrollX && (t.scrollX = t.scrollX ? "100%" : "");
    var e = t.aoSearchCols;
    if (e)
      for (var n = 0, a = e.length; n < a; n++)
        e[n] && I(p.models.oSearch, e[n]);
  }
  function R(t) {
    F(t, "orderable", "bSortable"),
      F(t, "orderData", "aDataSort"),
      F(t, "orderSequence", "asSorting"),
      F(t, "orderDataType", "sortDataType");
    var e = t.aDataSort;
    "number" != typeof e || Array.isArray(e) || (t.aDataSort = [e]);
  }
  function P(n) {
    var a, r, o, i;
    p.__browser ||
      ((p.__browser = a = {}),
      (i = (o = (r = t("<div/>")
        .css({
          position: "fixed",
          top: 0,
          left: -1 * t(e).scrollLeft(),
          height: 1,
          width: 1,
          overflow: "hidden",
        })
        .append(
          t("<div/>")
            .css({
              position: "absolute",
              top: 1,
              left: 1,
              width: 100,
              overflow: "scroll",
            })
            .append(t("<div/>").css({ width: "100%", height: 10 }))
        )
        .appendTo("body")).children()).children()),
      (a.barWidth = o[0].offsetWidth - o[0].clientWidth),
      (a.bScrollOversize =
        100 === i[0].offsetWidth && 100 !== o[0].clientWidth),
      (a.bScrollbarLeft = 1 !== Math.round(i.offset().left)),
      (a.bBounding = !!r[0].getBoundingClientRect().width),
      r.remove()),
      t.extend(n.oBrowser, p.__browser),
      (n.oScroll.iBarWidth = p.__browser.barWidth);
  }
  function j(t, e, n, r, o, i) {
    var l,
      s = r,
      u = !1;
    for (n !== a && ((l = n), (u = !0)); s !== o; )
      t.hasOwnProperty(s) &&
        ((l = u ? e(l, t[s], s, t) : t[s]), (u = !0), (s += i));
    return l;
  }
  function H(e, a) {
    var r = p.defaults.column,
      o = e.aoColumns.length,
      r = t.extend({}, p.models.oColumn, r, {
        nTh: a || n.createElement("th"),
        sTitle: r.sTitle || (a ? a.innerHTML : ""),
        aDataSort: r.aDataSort || [o],
        mData: r.mData || o,
        idx: o,
      }),
      r = (e.aoColumns.push(r), e.aoPreSearchCols);
    (r[o] = t.extend({}, p.models.oSearch, r[o])), N(e, o, t(a).data());
  }
  function N(e, n, r) {
    function o(t) {
      return "string" == typeof t && -1 !== t.indexOf("@");
    }
    var n = e.aoColumns[n],
      i = e.oClasses,
      l = t(n.nTh),
      s =
        (!n.sWidthOrig &&
          ((n.sWidthOrig = l.attr("width") || null),
          (f = (l.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/))) &&
          (n.sWidthOrig = f[1]),
        r !== a &&
          null !== r &&
          (R(r),
          I(p.defaults.column, r, !0),
          r.mDataProp === a || r.mData || (r.mData = r.mDataProp),
          r.sType && (n._sManualType = r.sType),
          r.className && !r.sClass && (r.sClass = r.className),
          r.sClass && l.addClass(r.sClass),
          (f = n.sClass),
          t.extend(n, r),
          tQ(n, r, "sWidth", "sWidthOrig"),
          f !== n.sClass && (n.sClass = f + " " + n.sClass),
          r.iDataSort !== a && (n.aDataSort = [r.iDataSort]),
          tQ(n, r, "aDataSort")),
        n.mData),
      u = Z(s),
      c = n.mRender ? Z(n.mRender) : null,
      f =
        ((n._bAttrSrc =
          t.isPlainObject(s) && (o(s.sort) || o(s.type) || o(s.filter))),
        (n._setter = null),
        (n.fnGetData = function (t, e, n) {
          var r = u(t, e, a, n);
          return c && e ? c(r, e, t, n) : r;
        }),
        (n.fnSetData = function (t, e, n) {
          return K(s)(t, e, n);
        }),
        "number" == typeof s || n._isArrayHost || (e._rowReadObject = !0),
        e.oFeatures.bSort || ((n.bSortable = !1), l.addClass(i.sSortableNone)),
        -1 !== t.inArray("asc", n.asSorting)),
      r = -1 !== t.inArray("desc", n.asSorting);
    n.bSortable && (f || r)
      ? f && !r
        ? ((n.sSortingClass = i.sSortableAsc),
          (n.sSortingClassJUI = i.sSortJUIAscAllowed))
        : !f && r
        ? ((n.sSortingClass = i.sSortableDesc),
          (n.sSortingClassJUI = i.sSortJUIDescAllowed))
        : ((n.sSortingClass = i.sSortable), (n.sSortingClassJUI = i.sSortJUI))
      : ((n.sSortingClass = i.sSortableNone), (n.sSortingClassJUI = ""));
  }
  function O(t) {
    if (!1 !== t.oFeatures.bAutoWidth) {
      var e = t.aoColumns;
      t0(t);
      for (var n = 0, a = e.length; n < a; n++)
        e[n].nTh.style.width = e[n].sWidth;
    }
    var r = t.oScroll;
    ("" === r.sY && "" === r.sX) || tE(t), ea(t, null, "column-sizing", [t]);
  }
  function k(t, e) {
    return "number" == typeof (t = E(t, "bVisible"))[e] ? t[e] : null;
  }
  function W(e, n) {
    return (e = E(e, "bVisible")), -1 !== (n = t.inArray(n, e)) ? n : null;
  }
  function M(e) {
    var n = 0;
    return (
      t.each(e.aoColumns, function (e, a) {
        a.bVisible && "none" !== t(a.nTh).css("display") && n++;
      }),
      n
    );
  }
  function E(e, n) {
    var a = [];
    return (
      t.map(e.aoColumns, function (t, e) {
        t[n] && a.push(e);
      }),
      a
    );
  }
  function B(t) {
    for (
      var e,
        n,
        r,
        o,
        i,
        l,
        s,
        u = t.aoColumns,
        c = t.aoData,
        f = p.ext.type.detect,
        d = 0,
        h = u.length;
      d < h;
      d++
    )
      if (((s = []), !(i = u[d]).sType && i._sManualType))
        i.sType = i._sManualType;
      else if (!i.sType) {
        for (e = 0, n = f.length; e < n; e++) {
          for (
            r = 0, o = c.length;
            r < o &&
            (s[r] === a && (s[r] = J(t, r, d, "type")),
            (l = f[e](s[r], t)) || e === f.length - 1) &&
            ("html" !== l || D(s[r]));
            r++
          );
          if (l) {
            i.sType = l;
            break;
          }
        }
        i.sType || (i.sType = "string");
      }
  }
  function U(e, n, r, o) {
    var i,
      l,
      s,
      u,
      c = e.aoColumns;
    if (n) {
      for (i = n.length - 1; 0 <= i; i--)
        for (
          var f,
            d =
              (f = n[i]).target !== a
                ? f.target
                : f.targets !== a
                ? f.targets
                : f.aTargets,
            h = 0,
            p = (d = Array.isArray(d) ? d : [d]).length;
          h < p;
          h++
        )
          if ("number" == typeof d[h] && 0 <= d[h]) {
            for (; c.length <= d[h]; ) H(e);
            o(d[h], f);
          } else if ("number" == typeof d[h] && d[h] < 0) o(c.length + d[h], f);
          else if ("string" == typeof d[h])
            for (s = 0, u = c.length; s < u; s++)
              ("_all" == d[h] || t(c[s].nTh).hasClass(d[h])) && o(s, f);
    }
    if (r) for (i = 0, l = r.length; i < l; i++) o(i, r[i]);
  }
  function V(e, n, r, o) {
    for (
      var i = e.aoData.length,
        l = t.extend(!0, {}, p.models.oRow, {
          src: r ? "dom" : "data",
          idx: i,
        }),
        s = ((l._aData = n), e.aoData.push(l), e.aoColumns),
        u = 0,
        c = s.length;
      u < c;
      u++
    )
      s[u].sType = null;
    return (
      e.aiDisplayMaster.push(i),
      (n = e.rowIdFn(n)) !== a && (e.aIds[n] = l),
      (!r && e.oFeatures.bDeferRender) || tr(e, i, r, o),
      i
    );
  }
  function X(e, n) {
    var a;
    return (n = n instanceof t ? n : t(n)).map(function (t, n) {
      return (a = ta(e, n)), V(e, a.data, n, a.cells);
    });
  }
  function J(t, e, n, r) {
    "search" === r ? (r = "filter") : "order" === r && (r = "sort");
    var o = t.iDraw,
      i = t.aoColumns[n],
      l = t.aoData[e]._aData,
      s = i.sDefaultContent,
      u = i.fnGetData(l, r, { settings: t, row: e, col: n });
    if (u === a)
      return (
        t.iDrawError != o &&
          null === s &&
          (t7(
            t,
            0,
            "Requested unknown parameter " +
              ("function" == typeof i.mData
                ? "{function}"
                : "'" + i.mData + "'") +
              " for row " +
              e +
              ", column " +
              n,
            4
          ),
          (t.iDrawError = o)),
        s
      );
    if ((u !== l && null !== u) || null === s || r === a) {
      if ("function" == typeof u) return u.call(l);
    } else u = s;
    return null === u && "display" === r
      ? ""
      : "filter" === r && (e = p.ext.type.search)[i.sType]
      ? e[i.sType](u)
      : u;
  }
  function q(t, e, n, a) {
    var r = t.aoColumns[n],
      o = t.aoData[e]._aData;
    r.fnSetData(o, a, { settings: t, row: e, col: n });
  }
  var G = /\[.*?\]$/,
    z = /\(\)$/;
  function Y(e) {
    return t.map(e.match(/(\\.|[^\.])+/g) || [""], function (t) {
      return t.replace(/\\\./g, ".");
    });
  }
  var Z = p.util.get,
    K = p.util.set;
  function Q(t) {
    return C(t.aoData, "_aData");
  }
  function tt(t) {
    (t.aoData.length = 0),
      (t.aiDisplayMaster.length = 0),
      (t.aiDisplay.length = 0),
      (t.aIds = {});
  }
  function te(t, e, n) {
    for (var r = -1, o = 0, i = t.length; o < i; o++)
      t[o] == e ? (r = o) : t[o] > e && t[o]--;
    -1 != r && n === a && t.splice(r, 1);
  }
  function tn(t, e, n, r) {
    function o(n, a) {
      for (; n.childNodes.length; ) n.removeChild(n.firstChild);
      n.innerHTML = J(t, e, a, "display");
    }
    var i,
      l,
      s = t.aoData[e];
    if ("dom" !== n && ((n && "auto" !== n) || "dom" !== s.src)) {
      var u = s.anCells;
      if (u) {
        if (r !== a) o(u[r], r);
        else for (i = 0, l = u.length; i < l; i++) o(u[i], i);
      }
    } else s._aData = ta(t, s, r, r === a ? a : s._aData).data;
    (s._aSortData = null), (s._aFilterData = null);
    var c = t.aoColumns;
    if (r !== a) c[r].sType = null;
    else {
      for (i = 0, l = c.length; i < l; i++) c[i].sType = null;
      to(t, s);
    }
  }
  function ta(t, e, n, r) {
    function o(t, e) {
      var n;
      "string" == typeof t &&
        -1 !== (n = t.indexOf("@")) &&
        ((n = t.substring(n + 1)), K(t)(r, e.getAttribute(n)));
    }
    function i(t) {
      (n !== a && n !== d) ||
        ((s = h[d]),
        (u = t.innerHTML.trim()),
        s && s._bAttrSrc
          ? (K(s.mData._)(r, u),
            o(s.mData.sort, t),
            o(s.mData.type, t),
            o(s.mData.filter, t))
          : p
          ? (s._setter || (s._setter = K(s.mData)), s._setter(r, u))
          : (r[d] = u)),
        d++;
    }
    var l,
      s,
      u,
      c = [],
      f = e.firstChild,
      d = 0,
      h = t.aoColumns,
      p = t._rowReadObject;
    if (((r = r !== a ? r : p ? {} : []), f))
      for (; f; )
        ("TD" != (l = f.nodeName.toUpperCase()) && "TH" != l) ||
          (i(f), c.push(f)),
          (f = f.nextSibling);
    else for (var g = 0, b = (c = e.anCells).length; g < b; g++) i(c[g]);
    var e = e.firstChild ? e : e.nTr;
    return (
      e && (e = e.getAttribute("id")) && K(t.rowId)(r, e), { data: r, cells: c }
    );
  }
  function tr(e, a, r, o) {
    var i,
      l,
      s,
      u,
      c,
      f,
      d = e.aoData[a],
      h = d._aData,
      p = [];
    if (null === d.nTr) {
      for (
        i = r || n.createElement("tr"),
          d.nTr = i,
          d.anCells = p,
          i._DT_RowIndex = a,
          to(e, d),
          u = 0,
          c = e.aoColumns.length;
        u < c;
        u++
      )
        (s = e.aoColumns[u]),
          (l = (f = !r) ? n.createElement(s.sCellType) : o[u]) ||
            t7(e, 0, "Incorrect column count", 18),
          (l._DT_CellIndex = { row: a, column: u }),
          p.push(l),
          (!f &&
            ((!s.mRender && s.mData === u) ||
              (t.isPlainObject(s.mData) && s.mData._ === u + ".display"))) ||
            (l.innerHTML = J(e, a, u, "display")),
          s.sClass && (l.className += " " + s.sClass),
          s.bVisible && !r
            ? i.appendChild(l)
            : !s.bVisible && r && l.parentNode.removeChild(l),
          s.fnCreatedCell &&
            s.fnCreatedCell.call(e.oInstance, l, J(e, a, u), h, a, u);
      ea(e, "aoRowCreatedCallback", null, [i, h, a, p]);
    }
  }
  function to(e, n) {
    var a = n.nTr,
      r = n._aData;
    a &&
      ((e = e.rowIdFn(r)) && (a.id = e),
      r.DT_RowClass &&
        ((e = r.DT_RowClass.split(" ")),
        (n.__rowc = n.__rowc ? w(n.__rowc.concat(e)) : e),
        t(a).removeClass(n.__rowc.join(" ")).addClass(r.DT_RowClass)),
      r.DT_RowAttr && t(a).attr(r.DT_RowAttr),
      r.DT_RowData) &&
      t(a).data(r.DT_RowData);
  }
  function ti(e) {
    var n,
      a,
      r,
      o = e.nTHead,
      i = e.nTFoot,
      l = 0 === t("th, td", o).length,
      s = e.oClasses,
      u = e.aoColumns;
    for (l && (a = t("<tr/>").appendTo(o)), f = 0, d = u.length; f < d; f++)
      (n = t((r = u[f]).nTh).addClass(r.sClass)),
        l && n.appendTo(a),
        e.oFeatures.bSort &&
          (n.addClass(r.sSortingClass), !1 !== r.bSortable) &&
          (n.attr("tabindex", e.iTabIndex).attr("aria-controls", e.sTableId),
          t6(e, r.nTh, f)),
        r.sTitle != n[0].innerHTML && n.html(r.sTitle),
        eo(e, "header")(e, n, r, s);
    if (
      (l && tf(e.aoHeader, o),
      t(o).children("tr").children("th, td").addClass(s.sHeaderTH),
      t(i).children("tr").children("th, td").addClass(s.sFooterTH),
      null !== i)
    )
      for (var c = e.aoFooter[0], f = 0, d = c.length; f < d; f++)
        (r = u[f])
          ? ((r.nTf = c[f].cell), r.sClass && t(r.nTf).addClass(r.sClass))
          : t7(e, 0, "Incorrect column count", 18);
  }
  function tl(e, n, r) {
    var o,
      i,
      l,
      s,
      u,
      c,
      f,
      d,
      h,
      p = [],
      g = [],
      b = e.aoColumns.length;
    if (n) {
      for (r === a && (r = !1), o = 0, i = n.length; o < i; o++) {
        for (p[o] = n[o].slice(), p[o].nTr = n[o].nTr, l = b - 1; 0 <= l; l--)
          e.aoColumns[l].bVisible || r || p[o].splice(l, 1);
        g.push([]);
      }
      for (o = 0, i = p.length; o < i; o++) {
        if ((f = p[o].nTr)) for (; (c = f.firstChild); ) f.removeChild(c);
        for (l = 0, s = p[o].length; l < s; l++)
          if (((h = d = 1), g[o][l] === a)) {
            for (
              f.appendChild(p[o][l].cell), g[o][l] = 1;
              p[o + d] !== a && p[o][l].cell == p[o + d][l].cell;

            )
              (g[o + d][l] = 1), d++;
            for (; p[o][l + h] !== a && p[o][l].cell == p[o][l + h].cell; ) {
              for (u = 0; u < d; u++) g[o + u][l + h] = 1;
              h++;
            }
            t(p[o][l].cell).attr("rowspan", d).attr("colspan", h);
          }
      }
    }
  }
  function ts(e, n) {
    (r = "ssp" == ei((c = e))),
      (u = c.iInitDisplayStart) !== a &&
        -1 !== u &&
        ((c._iDisplayStart = !r && u >= c.fnRecordsDisplay() ? 0 : u),
        (c.iInitDisplayStart = -1));
    var r = ea(e, "aoPreDrawCallback", "preDraw", [e]);
    if (-1 !== t.inArray(!1, r)) tW(e, !1);
    else {
      var o = [],
        i = 0,
        l = e.asStripeClasses,
        s = l.length,
        u = e.oLanguage,
        c = "ssp" == ei(e),
        f = e.aiDisplay,
        r = e._iDisplayStart,
        d = e.fnDisplayEnd();
      if (((e.bDrawing = !0), e.bDeferLoading))
        (e.bDeferLoading = !1), e.iDraw++, tW(e, !1);
      else if (c) {
        if (!e.bDestroying && !n) return void tp(e);
      } else e.iDraw++;
      if (0 !== f.length)
        for (var h = c ? e.aoData.length : d, p = c ? 0 : r; p < h; p++) {
          var g,
            b = f[p],
            $ = e.aoData[b],
            m = (null === $.nTr && tr(e, b), $.nTr);
          0 !== s &&
            ((g = l[i % s]), $._sRowStripe != g) &&
            (t(m).removeClass($._sRowStripe).addClass(g), ($._sRowStripe = g)),
            ea(e, "aoRowCallback", null, [m, $._aData, i, p, b]),
            o.push(m),
            i++;
        }
      else
        (n = u.sZeroRecords),
          1 == e.iDraw && "ajax" == ei(e)
            ? (n = u.sLoadingRecords)
            : u.sEmptyTable && 0 === e.fnRecordsTotal() && (n = u.sEmptyTable),
          (o[0] = t("<tr/>", { class: s ? l[0] : "" }).append(
            t("<td />", {
              valign: "top",
              colSpan: M(e),
              class: e.oClasses.sRowEmpty,
            }).html(n)
          )[0]);
      ea(e, "aoHeaderCallback", "header", [
        t(e.nTHead).children("tr")[0],
        Q(e),
        r,
        d,
        f,
      ]),
        ea(e, "aoFooterCallback", "footer", [
          t(e.nTFoot).children("tr")[0],
          Q(e),
          r,
          d,
          f,
        ]),
        (c = t(e.nTBody)).children().detach(),
        c.append(t(o)),
        ea(e, "aoDrawCallback", "draw", [e]),
        (e.bSorted = !1),
        (e.bFiltered = !1),
        (e.bDrawing = !1);
    }
  }
  function tu(t, e) {
    var n = t.oFeatures,
      a = n.bSort,
      n = n.bFilter;
    a && tz(t),
      n ? tS(t, t.oPreviousSearch) : (t.aiDisplay = t.aiDisplayMaster.slice()),
      !0 !== e && (t._iDisplayStart = 0),
      (t._drawHold = e),
      ts(t),
      (t._drawHold = !1);
  }
  function tc(e) {
    for (
      var n,
        a,
        r,
        o,
        i,
        l,
        s,
        u = e.oClasses,
        c = t(e.nTable),
        c = t("<div/>").insertBefore(c),
        f = e.oFeatures,
        d = t("<div/>", {
          id: e.sTableId + "_wrapper",
          class: u.sWrapper + (e.nTFoot ? "" : " " + u.sNoFooter),
        }),
        h =
          ((e.nHolding = c[0]),
          (e.nTableWrapper = d[0]),
          (e.nTableReinsertBefore = e.nTable.nextSibling),
          e.sDom.split("")),
        g = 0;
      g < h.length;
      g++
    ) {
      if (((n = null), "<" == (a = h[g]))) {
        if (((r = t("<div/>")[0]), "'" == (o = h[g + 1]) || '"' == o)) {
          for (i = "", l = 2; h[g + l] != o; ) (i += h[g + l]), l++;
          "H" == i ? (i = u.sJUIHeader) : "F" == i && (i = u.sJUIFooter),
            -1 != i.indexOf(".")
              ? ((s = i.split(".")),
                (r.id = s[0].substr(1, s[0].length - 1)),
                (r.className = s[1]))
              : "#" == i.charAt(0)
              ? (r.id = i.substr(1, i.length - 1))
              : (r.className = i),
            (g += l);
        }
        d.append(r), (d = t(r));
      } else if (">" == a) d = d.parent();
      else if ("l" == a && f.bPaginate && f.bLengthChange) n = tH(e);
      else if ("f" == a && f.bFilter) n = tm(e);
      else if ("r" == a && f.bProcessing) n = tk(e);
      else if ("t" == a) n = tM(e);
      else if ("i" == a && f.bInfo) n = tA(e);
      else if ("p" == a && f.bPaginate) n = tN(e);
      else if (0 !== p.ext.feature.length) {
        for (var b = p.ext.feature, $ = 0, m = b.length; $ < m; $++)
          if (a == b[$].cFeature) {
            n = b[$].fnInit(e);
            break;
          }
      }
      n && ((s = e.aanFeatures)[a] || (s[a] = []), s[a].push(n), d.append(n));
    }
    c.replaceWith(d), (e.nHolding = null);
  }
  function tf(e, n) {
    var a,
      r,
      o,
      i,
      l,
      s,
      u,
      c,
      f,
      d,
      h = t(n).children("tr");
    for (e.splice(0, e.length), o = 0, s = h.length; o < s; o++) e.push([]);
    for (o = 0, s = h.length; o < s; o++)
      for (r = (a = h[o]).firstChild; r; ) {
        if (
          "TD" == r.nodeName.toUpperCase() ||
          "TH" == r.nodeName.toUpperCase()
        )
          for (
            c = (c = +r.getAttribute("colspan")) && 0 != c && 1 != c ? c : 1,
              f = (f = +r.getAttribute("rowspan")) && 0 != f && 1 != f ? f : 1,
              u = (function (t, e, n) {
                for (var a = t[e]; a[n]; ) n++;
                return n;
              })(e, o, 0),
              d = 1 == c,
              l = 0;
            l < c;
            l++
          )
            for (i = 0; i < f; i++)
              (e[o + i][u + l] = { cell: r, unique: d }), (e[o + i].nTr = a);
        r = r.nextSibling;
      }
  }
  function td(t, e, n) {
    var a = [];
    n || ((n = t.aoHeader), e && tf((n = []), e));
    for (var r = 0, o = n.length; r < o; r++)
      for (var i = 0, l = n[r].length; i < l; i++)
        !n[r][i].unique || (a[i] && t.bSortCellsTop) || (a[i] = n[r][i].cell);
    return a;
  }
  function th(e, n, a) {
    function r(t) {
      var n = e.jqXHR ? e.jqXHR.status : null;
      (null === t || ("number" == typeof n && 204 == n)) && t$(e, (t = {}), []),
        (n = t.error || t.sError) && t7(e, 0, n),
        (e.json = t),
        ea(e, null, "xhr", [e, t, e.jqXHR]),
        a(t);
    }
    ea(e, "aoServerParams", "serverParams", [n]),
      n &&
        Array.isArray(n) &&
        ((o = {}),
        (i = /(.*?)\[\]$/),
        t.each(n, function (t, e) {
          var n = e.name.match(i);
          n
            ? (o[(n = n[0])] || (o[n] = []), o[n].push(e.value))
            : (o[e.name] = e.value);
        }),
        (n = o));
    var o,
      i,
      l,
      s = e.ajax,
      u = e.oInstance,
      c =
        (t.isPlainObject(s) &&
          s.data &&
          ((c = "function" == typeof (l = s.data) ? l(n, e) : l),
          (n = "function" == typeof l && c ? c : t.extend(!0, n, c)),
          delete s.data),
        {
          data: n,
          success: r,
          dataType: "json",
          cache: !1,
          type: e.sServerMethod,
          error: function (n, a, r) {
            var o = ea(e, null, "xhr", [e, null, e.jqXHR]);
            -1 === t.inArray(!0, o) &&
              ("parsererror" == a
                ? t7(e, 0, "Invalid JSON response", 1)
                : 4 === n.readyState && t7(e, 0, "Ajax error", 7)),
              tW(e, !1);
          },
        });
    (e.oAjaxData = n),
      ea(e, null, "preXhr", [e, n]),
      e.fnServerData
        ? e.fnServerData.call(
            u,
            e.sAjaxSource,
            t.map(n, function (t, e) {
              return { name: e, value: t };
            }),
            r,
            e
          )
        : e.sAjaxSource || "string" == typeof s
        ? (e.jqXHR = t.ajax(t.extend(c, { url: s || e.sAjaxSource })))
        : "function" == typeof s
        ? (e.jqXHR = s.call(u, n, r, e))
        : ((e.jqXHR = t.ajax(t.extend(c, s))), (s.data = l));
  }
  function tp(t) {
    t.iDraw++, tW(t, !0);
    var e = t._drawHold;
    th(t, tg(t), function (n) {
      (t._drawHold = e), tb(t, n), (t._drawHold = !1);
    });
  }
  function tg(e) {
    for (
      var n,
        a,
        r,
        o = e.aoColumns,
        i = o.length,
        l = e.oFeatures,
        s = e.oPreviousSearch,
        u = e.aoPreSearchCols,
        c = [],
        f = tG(e),
        d = e._iDisplayStart,
        h = !1 !== l.bPaginate ? e._iDisplayLength : -1,
        g = function (t, e) {
          c.push({ name: t, value: e });
        },
        b =
          (g("sEcho", e.iDraw),
          g("iColumns", i),
          g("sColumns", C(o, "sName").join(",")),
          g("iDisplayStart", d),
          g("iDisplayLength", h),
          {
            draw: e.iDraw,
            columns: [],
            order: [],
            start: d,
            length: h,
            search: { value: s.sSearch, regex: s.bRegex },
          }),
        $ = 0;
      $ < i;
      $++
    )
      (a = o[$]),
        (r = u[$]),
        (n = "function" == typeof a.mData ? "function" : a.mData),
        b.columns.push({
          data: n,
          name: a.sName,
          searchable: a.bSearchable,
          orderable: a.bSortable,
          search: { value: r.sSearch, regex: r.bRegex },
        }),
        g("mDataProp_" + $, n),
        l.bFilter &&
          (g("sSearch_" + $, r.sSearch),
          g("bRegex_" + $, r.bRegex),
          g("bSearchable_" + $, a.bSearchable)),
        l.bSort && g("bSortable_" + $, a.bSortable);
    return (
      l.bFilter && (g("sSearch", s.sSearch), g("bRegex", s.bRegex)),
      l.bSort &&
        (t.each(f, function (t, e) {
          b.order.push({ column: e.col, dir: e.dir }),
            g("iSortCol_" + t, e.col),
            g("sSortDir_" + t, e.dir);
        }),
        g("iSortingCols", f.length)),
      null === (d = p.ext.legacy.ajax) ? (e.sAjaxSource ? c : b) : d ? c : b
    );
  }
  function tb(t, e) {
    function n(t, n) {
      return e[t] !== a ? e[t] : e[n];
    }
    var r = t$(t, e),
      o = n("sEcho", "draw"),
      i = n("iTotalRecords", "recordsTotal"),
      l = n("iTotalDisplayRecords", "recordsFiltered");
    if (o !== a) {
      if (+o < t.iDraw) return;
      t.iDraw = +o;
    }
    (r = r || []),
      tt(t),
      (t._iRecordsTotal = parseInt(i, 10)),
      (t._iRecordsDisplay = parseInt(l, 10));
    for (var s = 0, u = r.length; s < u; s++) V(t, r[s]);
    (t.aiDisplay = t.aiDisplayMaster.slice()),
      ts(t, !0),
      t._bInitComplete || tP(t, e),
      tW(t, !1);
  }
  function t$(e, n, r) {
    if (
      ((e =
        t.isPlainObject(e.ajax) && e.ajax.dataSrc !== a
          ? e.ajax.dataSrc
          : e.sAjaxDataProp),
      !r)
    )
      return "data" === e ? n.aaData || n[e] : "" !== e ? Z(e)(n) : n;
    K(e)(n, r);
  }
  function tm(e) {
    function a(t) {
      s.f;
      var n = this.value || "";
      (l.return && "Enter" !== t.key) ||
        (n != l.sSearch &&
          (tS(e, {
            sSearch: n,
            bRegex: l.bRegex,
            bSmart: l.bSmart,
            bCaseInsensitive: l.bCaseInsensitive,
            return: l.return,
          }),
          (e._iDisplayStart = 0),
          ts(e)));
    }
    var r = e.oClasses,
      o = e.sTableId,
      i = e.oLanguage,
      l = e.oPreviousSearch,
      s = e.aanFeatures,
      u = '<input type="search" class="' + r.sFilterInput + '"/>',
      c = (c = i.sSearch).match(/_INPUT_/) ? c.replace("_INPUT_", u) : c + u,
      u = t("<div/>", {
        id: s.f ? null : o + "_filter",
        class: r.sFilter,
      }).append(t("<label/>").append(c)),
      r = null !== e.searchDelay ? e.searchDelay : "ssp" === ei(e) ? 400 : 0,
      f = t("input", u)
        .val(l.sSearch)
        .attr("placeholder", i.sSearchPlaceholder)
        .on("keyup.DT search.DT input.DT paste.DT cut.DT", r ? tV(a, r) : a)
        .on("mouseup.DT", function (t) {
          setTimeout(function () {
            a.call(f[0], t);
          }, 10);
        })
        .on("keypress.DT", function (t) {
          if (13 == t.keyCode) return !1;
        })
        .attr("aria-controls", o);
    return (
      t(e.nTable).on("search.dt.DT", function (t, a) {
        if (e === a)
          try {
            f[0] !== n.activeElement && f.val(l.sSearch);
          } catch (r) {}
      }),
      u[0]
    );
  }
  function tS(t, e, n) {
    function r(t) {
      (i.sSearch = t.sSearch),
        (i.bRegex = t.bRegex),
        (i.bSmart = t.bSmart),
        (i.bCaseInsensitive = t.bCaseInsensitive),
        (i.return = t.return);
    }
    function o(t) {
      return t.bEscapeRegex !== a ? !t.bEscapeRegex : t.bRegex;
    }
    var i = t.oPreviousSearch,
      l = t.aoPreSearchCols;
    if ((B(t), "ssp" != ei(t))) {
      ty(t, e.sSearch, n, o(e), e.bSmart, e.bCaseInsensitive), r(e);
      for (var s = 0; s < l.length; s++)
        tD(t, l[s].sSearch, s, o(l[s]), l[s].bSmart, l[s].bCaseInsensitive);
      tv(t);
    } else r(e);
    (t.bFiltered = !0), ea(t, null, "search", [t]);
  }
  function tv(e) {
    for (
      var n, a, r = p.ext.search, o = e.aiDisplay, i = 0, l = r.length;
      i < l;
      i++
    ) {
      for (var s = [], u = 0, c = o.length; u < c; u++)
        (a = o[u]),
          (n = e.aoData[a]),
          r[i](e, n._aFilterData, a, n._aData, u) && s.push(a);
      (o.length = 0), t.merge(o, s);
    }
  }
  function tD(t, e, n, a, r, o) {
    if ("" !== e) {
      for (
        var i, l = [], s = t.aiDisplay, u = t8(e, a, r, o), c = 0;
        c < s.length;
        c++
      )
        (i = t.aoData[s[c]]._aFilterData[n]), u.test(i) && l.push(s[c]);
      t.aiDisplay = l;
    }
  }
  function ty(t, e, n, a, r, o) {
    var i,
      l,
      s,
      u = t8(e, a, r, o),
      r = t.oPreviousSearch.sSearch,
      o = t.aiDisplayMaster,
      c = [];
    if ((0 !== p.ext.search.length && (n = !0), (l = tx(t)), e.length <= 0))
      t.aiDisplay = o.slice();
    else {
      for (
        (l ||
          n ||
          a ||
          r.length > e.length ||
          0 !== e.indexOf(r) ||
          t.bSorted) &&
          (t.aiDisplay = o.slice()),
          i = t.aiDisplay,
          s = 0;
        s < i.length;
        s++
      )
        u.test(t.aoData[i[s]]._sFilterRow) && c.push(i[s]);
      t.aiDisplay = c;
    }
  }
  function t8(e, n, a, r) {
    return (
      (e = n ? e : tC(e)),
      a &&
        (e =
          "^(?=.*?" +
          t
            .map(
              e.match(/["\u201C][^"\u201D]+["\u201D]|[^ ]+/g) || [""],
              function (t) {
                var e;
                return (
                  '"' === t.charAt(0)
                    ? (t = (e = t.match(/^"(.*)"$/)) ? e[1] : t)
                    : "“" === t.charAt(0) &&
                      (t = (e = t.match(/^\u201C(.*)\u201D$/)) ? e[1] : t),
                  t.replace('"', "")
                );
              }
            )
            .join(")(?=.*?") +
          ").*$"),
      RegExp(e, r ? "i" : "")
    );
  }
  var tC = p.util.escapeRegex,
    tT = t("<div>")[0],
    tw = tT.textContent !== a;
  function tx(t) {
    for (
      var e, n, a, r, o, i = t.aoColumns, l = !1, s = 0, u = t.aoData.length;
      s < u;
      s++
    )
      if (!(o = t.aoData[s])._aFilterData) {
        for (a = [], e = 0, n = i.length; e < n; e++)
          i[e].bSearchable
            ? "string" !=
                typeof (r = null === (r = J(t, s, e, "filter")) ? "" : r) &&
              r.toString &&
              (r = r.toString())
            : (r = ""),
            r.indexOf &&
              -1 !== r.indexOf("&") &&
              ((tT.innerHTML = r), (r = tw ? tT.textContent : tT.innerText)),
            r.replace && (r = r.replace(/[\r\n\u2028]/g, "")),
            a.push(r);
        (o._aFilterData = a), (o._sFilterRow = a.join("  ")), (l = !0);
      }
    return l;
  }
  function t_(t) {
    return {
      search: t.sSearch,
      smart: t.bSmart,
      regex: t.bRegex,
      caseInsensitive: t.bCaseInsensitive,
    };
  }
  function tI(t) {
    return {
      sSearch: t.search,
      bSmart: t.smart,
      bRegex: t.regex,
      bCaseInsensitive: t.caseInsensitive,
    };
  }
  function tA(e) {
    var n = e.sTableId,
      a = e.aanFeatures.i,
      r = t("<div/>", {
        class: e.oClasses.sInfo,
        id: a ? null : n + "_info",
      });
    return (
      a ||
        (e.aoDrawCallback.push({ fn: tF, sName: "information" }),
        r.attr("role", "status").attr("aria-live", "polite"),
        t(e.nTable).attr("aria-describedby", n + "_info")),
      r[0]
    );
  }
  function tF(e) {
    var n,
      a,
      r,
      o,
      i,
      l,
      s = e.aanFeatures.i;
    0 !== s.length &&
      ((l = e.oLanguage),
      (n = e._iDisplayStart + 1),
      (a = e.fnDisplayEnd()),
      (r = e.fnRecordsTotal()),
      (i = (o = e.fnRecordsDisplay()) ? l.sInfo : l.sInfoEmpty),
      o !== r && (i += " " + l.sInfoFiltered),
      (i = tL(e, (i += l.sInfoPostFix))),
      null !== (l = l.fnInfoCallback) &&
        (i = l.call(e.oInstance, e, n, a, r, o, i)),
      t(s).html(i));
  }
  function tL(t, e) {
    var n = t.fnFormatNumber,
      a = t._iDisplayStart + 1,
      r = t._iDisplayLength,
      o = t.fnRecordsDisplay(),
      i = -1 === r;
    return e
      .replace(/_START_/g, n.call(t, a))
      .replace(/_END_/g, n.call(t, t.fnDisplayEnd()))
      .replace(/_MAX_/g, n.call(t, t.fnRecordsTotal()))
      .replace(/_TOTAL_/g, n.call(t, o))
      .replace(/_PAGE_/g, n.call(t, i ? 1 : Math.ceil(a / r)))
      .replace(/_PAGES_/g, n.call(t, i ? 1 : Math.ceil(o / r)));
  }
  function tR(t) {
    var e,
      n,
      a,
      r = t.iInitDisplayStart,
      o = t.aoColumns,
      i = t.oFeatures,
      l = t.bDeferLoading;
    if (t.bInitialised) {
      for (
        tc(t),
          ti(t),
          tl(t, t.aoHeader),
          tl(t, t.aoFooter),
          tW(t, !0),
          i.bAutoWidth && t0(t),
          e = 0,
          n = o.length;
        e < n;
        e++
      )
        (a = o[e]).sWidth && (a.nTh.style.width = t9(a.sWidth));
      ea(t, null, "preInit", [t]),
        tu(t),
        ("ssp" != (i = ei(t)) || l) &&
          ("ajax" == i
            ? th(t, [], function (n) {
                var a = t$(t, n);
                for (e = 0; e < a.length; e++) V(t, a[e]);
                (t.iInitDisplayStart = r), tu(t), tW(t, !1), tP(t, n);
              })
            : (tW(t, !1), tP(t)));
    } else
      setTimeout(function () {
        tR(t);
      }, 200);
  }
  function tP(t, e) {
    (t._bInitComplete = !0),
      (e || t.oInit.aaData) && O(t),
      ea(t, null, "plugin-init", [t, e]),
      ea(t, "aoInitComplete", "init", [t, e]);
  }
  function tj(t, e) {
    (e = parseInt(e, 10)),
      (t._iDisplayLength = e),
      er(t),
      ea(t, null, "length", [t, e]);
  }
  function tH(e) {
    for (
      var n = e.oClasses,
        a = e.sTableId,
        r = e.aLengthMenu,
        o = Array.isArray(r[0]),
        i = o ? r[0] : r,
        l = o ? r[1] : r,
        s = t("<select/>", {
          name: a + "_length",
          "aria-controls": a,
          class: n.sLengthSelect,
        }),
        u = 0,
        c = i.length;
      u < c;
      u++
    )
      s[0][u] = new Option(
        "number" == typeof l[u] ? e.fnFormatNumber(l[u]) : l[u],
        i[u]
      );
    var f = t("<div><label/></div>").addClass(n.sLength);
    return (
      e.aanFeatures.l || (f[0].id = a + "_length"),
      f
        .children()
        .append(e.oLanguage.sLengthMenu.replace("_MENU_", s[0].outerHTML)),
      t("select", f)
        .val(e._iDisplayLength)
        .on("change.DT", function (n) {
          tj(e, t(this).val()), ts(e);
        }),
      t(e.nTable).on("length.dt.DT", function (n, a, r) {
        e === a && t("select", f).val(r);
      }),
      f[0]
    );
  }
  function tN(e) {
    function n(t) {
      ts(t);
    }
    var a = e.sPaginationType,
      r = p.ext.pager[a],
      o = "function" == typeof r,
      a = t("<div/>").addClass(e.oClasses.sPaging + a)[0],
      i = e.aanFeatures;
    return (
      o || r.fnInit(e, a, n),
      i.p ||
        ((a.id = e.sTableId + "_paginate"),
        e.aoDrawCallback.push({
          fn: function (t) {
            if (o)
              for (
                var e = t._iDisplayStart,
                  a = t._iDisplayLength,
                  l = t.fnRecordsDisplay(),
                  s = -1 === a,
                  u = s ? 0 : Math.ceil(e / a),
                  c = s ? 1 : Math.ceil(l / a),
                  f = r(u, c),
                  d = 0,
                  h = i.p.length;
                d < h;
                d++
              )
                eo(t, "pageButton")(t, i.p[d], d, f, u, c);
            else r.fnUpdate(t, n);
          },
          sName: "pagination",
        })),
      a
    );
  }
  function tO(t, e, n) {
    var a = t._iDisplayStart,
      r = t._iDisplayLength,
      o = t.fnRecordsDisplay(),
      o =
        (0 === o || -1 === r
          ? (a = 0)
          : "number" == typeof e
          ? o < (a = e * r) && (a = 0)
          : "first" == e
          ? (a = 0)
          : "previous" == e
          ? (a = 0 <= r ? a - r : 0) < 0 && (a = 0)
          : "next" == e
          ? a + r < o && (a += r)
          : "last" == e
          ? (a = Math.floor((o - 1) / r) * r)
          : t7(t, 0, "Unknown paging action: " + e, 5),
        t._iDisplayStart !== a);
    return (
      (t._iDisplayStart = a),
      o ? (ea(t, null, "page", [t]), n && ts(t)) : ea(t, null, "page-nc", [t]),
      o
    );
  }
  function tk(e) {
    return t("<div/>", {
      id: e.aanFeatures.r ? null : e.sTableId + "_processing",
      class: e.oClasses.sProcessing,
      role: "status",
    })
      .html(e.oLanguage.sProcessing)
      .append("<div><div></div><div></div><div></div><div></div></div>")
      .insertBefore(e.nTable)[0];
  }
  function tW(e, n) {
    e.oFeatures.bProcessing &&
      t(e.aanFeatures.r).css("display", n ? "block" : "none"),
      ea(e, null, "processing", [e, n]);
  }
  function tM(e) {
    var n,
      a,
      r,
      o,
      i,
      l,
      s,
      u,
      c,
      f,
      d,
      h,
      p = t(e.nTable),
      g = e.oScroll;
    return "" === g.sX && "" === g.sY
      ? e.nTable
      : ((n = g.sX),
        (a = g.sY),
        (r = e.oClasses),
        (i = (o = p.children("caption")).length ? o[0]._captionSide : null),
        (u = t(p[0].cloneNode(!1))),
        (l = t(p[0].cloneNode(!1))),
        (c = function (t) {
          return t ? t9(t) : null;
        }),
        (s = p.children("tfoot")).length || (s = null),
        (u = t((d = "<div/>"), { class: r.sScrollWrapper })
          .append(
            t(d, { class: r.sScrollHead })
              .css({
                overflow: "hidden",
                position: "relative",
                border: 0,
                width: n ? c(n) : "100%",
              })
              .append(
                t(d, { class: r.sScrollHeadInner })
                  .css({
                    "box-sizing": "content-box",
                    width: g.sXInner || "100%",
                  })
                  .append(
                    u
                      .removeAttr("id")
                      .css("margin-left", 0)
                      .append("top" === i ? o : null)
                      .append(p.children("thead"))
                  )
              )
          )
          .append(
            t(d, { class: r.sScrollBody })
              .css({
                position: "relative",
                overflow: "auto",
                width: c(n),
              })
              .append(p)
          )),
        s &&
          u.append(
            t(d, { class: r.sScrollFoot })
              .css({
                overflow: "hidden",
                border: 0,
                width: n ? c(n) : "100%",
              })
              .append(
                t(d, { class: r.sScrollFootInner }).append(
                  l
                    .removeAttr("id")
                    .css("margin-left", 0)
                    .append("bottom" === i ? o : null)
                    .append(p.children("tfoot"))
                )
              )
          ),
        (f = (c = u.children())[0]),
        (d = c[1]),
        (h = s ? c[2] : null),
        n &&
          t(d).on("scroll.DT", function (t) {
            var e = this.scrollLeft;
            (f.scrollLeft = e), s && (h.scrollLeft = e);
          }),
        t(d).css("max-height", a),
        g.bCollapse || t(d).css("height", a),
        (e.nScrollHead = f),
        (e.nScrollBody = d),
        (e.nScrollFoot = h),
        e.aoDrawCallback.push({ fn: tE, sName: "scrolling" }),
        u[0]);
  }
  function tE(n) {
    function r(t) {
      ((t = t.style).paddingTop = "0"),
        (t.paddingBottom = "0"),
        (t.borderTopWidth = "0"),
        (t.borderBottomWidth = "0"),
        (t.height = 0);
    }
    var o,
      i,
      l,
      s,
      u,
      c = n.oScroll,
      f = c.sX,
      d = c.sXInner,
      h = c.sY,
      c = c.iBarWidth,
      p = t(n.nScrollHead),
      g = p[0].style,
      b = p.children("div"),
      $ = b[0].style,
      b = b.children("table"),
      m = n.nScrollBody,
      S = t(m),
      v = m.style,
      D = t(n.nScrollFoot).children("div"),
      y = D.children("table"),
      T = t(n.nTHead),
      w = t(n.nTable),
      x = w[0],
      _ = x.style,
      I = n.nTFoot ? t(n.nTFoot) : null,
      A = n.oBrowser,
      F = A.bScrollOversize,
      L = (C(n.aoColumns, "nTh"), []),
      R = [],
      P = [],
      j = [],
      H = m.scrollHeight > m.clientHeight;
    n.scrollBarVis !== H && n.scrollBarVis !== a
      ? ((n.scrollBarVis = H), O(n))
      : ((n.scrollBarVis = H),
        w.children("thead, tfoot").remove(),
        I &&
          ((H = I.clone().prependTo(w)),
          (u = I.find("tr")),
          (i = H.find("tr")),
          H.find("[id]").removeAttr("id")),
        (H = T.clone().prependTo(w)),
        (T = T.find("tr")),
        (o = H.find("tr")),
        H.find("th, td").removeAttr("tabindex"),
        H.find("[id]").removeAttr("id"),
        f || ((v.width = "100%"), (p[0].style.width = "100%")),
        t.each(td(n, H), function (t, e) {
          (l = k(n, t)), (e.style.width = n.aoColumns[l].sWidth);
        }),
        I &&
          tB(function (t) {
            t.style.width = "";
          }, i),
        (p = w.outerWidth()),
        "" === f
          ? ((_.width = "100%"),
            F &&
              (w.find("tbody").height() > m.offsetHeight ||
                "scroll" == S.css("overflow-y")) &&
              (_.width = t9(w.outerWidth() - c)),
            (p = w.outerWidth()))
          : "" !== d && ((_.width = t9(d)), (p = w.outerWidth())),
        tB(r, o),
        tB(function (n) {
          var a = e.getComputedStyle
            ? e.getComputedStyle(n).width
            : t9(t(n).width());
          P.push(n.innerHTML), L.push(a);
        }, o),
        tB(function (t, e) {
          t.style.width = L[e];
        }, T),
        t(o).css("height", 0),
        I &&
          (tB(r, i),
          tB(function (e) {
            j.push(e.innerHTML), R.push(t9(t(e).css("width")));
          }, i),
          tB(function (t, e) {
            t.style.width = R[e];
          }, u),
          t(i).height(0)),
        tB(function (t, e) {
          (t.innerHTML = '<div class="dataTables_sizing">' + P[e] + "</div>"),
            (t.childNodes[0].style.height = "0"),
            (t.childNodes[0].style.overflow = "hidden"),
            (t.style.width = L[e]);
        }, o),
        I &&
          tB(function (t, e) {
            (t.innerHTML = '<div class="dataTables_sizing">' + j[e] + "</div>"),
              (t.childNodes[0].style.height = "0"),
              (t.childNodes[0].style.overflow = "hidden"),
              (t.style.width = R[e]);
          }, i),
        Math.round(w.outerWidth()) < Math.round(p)
          ? ((s =
              m.scrollHeight > m.offsetHeight || "scroll" == S.css("overflow-y")
                ? p + c
                : p),
            F &&
              (m.scrollHeight > m.offsetHeight ||
                "scroll" == S.css("overflow-y")) &&
              (_.width = t9(s - c)),
            ("" !== f && "" === d) ||
              t7(n, 1, "Possible column misalignment", 6))
          : (s = "100%"),
        (v.width = t9(s)),
        (g.width = t9(s)),
        I && (n.nScrollFoot.style.width = t9(s)),
        h || (F && (v.height = t9(x.offsetHeight + c))),
        (H = w.outerWidth()),
        (b[0].style.width = t9(H)),
        ($.width = t9(H)),
        (T = w.height() > m.clientHeight || "scroll" == S.css("overflow-y")),
        ($[(u = "padding" + (A.bScrollbarLeft ? "Left" : "Right"))] = T
          ? c + "px"
          : "0px"),
        I &&
          ((y[0].style.width = t9(H)),
          (D[0].style.width = t9(H)),
          (D[0].style[u] = T ? c + "px" : "0px")),
        w.children("colgroup").insertBefore(w.children("thead")),
        S.trigger("scroll"),
        (n.bSorted || n.bFiltered) && !n._drawHold && (m.scrollTop = 0));
  }
  function tB(t, e, n) {
    for (var a, r, o = 0, i = 0, l = e.length; i < l; ) {
      for (a = e[i].firstChild, r = n ? n[i].firstChild : null; a; )
        1 === a.nodeType && (n ? t(a, r, o) : t(a, o), o++),
          (a = a.nextSibling),
          (r = n ? r.nextSibling : null);
      i++;
    }
  }
  var tU = /<.*?>/g;
  function t0(n) {
    var a,
      r,
      o = n.nTable,
      i = n.aoColumns,
      l = n.oScroll,
      s = l.sY,
      u = l.sX,
      l = l.sXInner,
      c = i.length,
      f = E(n, "bVisible"),
      d = t("th", n.nTHead),
      h = o.getAttribute("width"),
      p = o.parentNode,
      g = !1,
      b = n.oBrowser,
      $ = b.bScrollOversize,
      m = o.style.width;
    for (m && -1 !== m.indexOf("%") && (h = m), y = 0; y < f.length; y++)
      null !== (a = i[f[y]]).sWidth &&
        ((a.sWidth = tX(a.sWidthOrig, p)), (g = !0));
    if (!$ && (g || u || s || c != M(n) || c != d.length)) {
      var m = t(o).clone().css("visibility", "hidden").removeAttr("id"),
        S = (m.find("tbody tr").remove(), t("<tr/>").appendTo(m.find("tbody")));
      for (
        m.find("thead, tfoot").remove(),
          m.append(t(n.nTHead).clone()).append(t(n.nTFoot).clone()),
          m.find("tfoot th, tfoot td").css("width", ""),
          d = td(n, m.find("thead")[0]),
          y = 0;
        y < f.length;
        y++
      )
        (a = i[f[y]]),
          (d[y].style.width =
            null !== a.sWidthOrig && "" !== a.sWidthOrig
              ? t9(a.sWidthOrig)
              : ""),
          a.sWidthOrig &&
            u &&
            t(d[y]).append(
              t("<div/>").css({
                width: a.sWidthOrig,
                margin: 0,
                padding: 0,
                border: 0,
                height: 1,
              })
            );
      if (n.aoData.length)
        for (y = 0; y < f.length; y++)
          (a = i[(r = f[y])]),
            t(tJ(n, r)).clone(!1).append(a.sContentPadding).appendTo(S);
      t("[name]", m).removeAttr("name");
      for (
        var v = t("<div/>")
            .css(
              u || s
                ? {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 1,
                    right: 0,
                    overflow: "hidden",
                  }
                : {}
            )
            .append(m)
            .appendTo(p),
          D =
            (u && l
              ? m.width(l)
              : u
              ? (m.css("width", "auto"),
                m.removeAttr("width"),
                m.width() < p.clientWidth && h && m.width(p.clientWidth))
              : s
              ? m.width(p.clientWidth)
              : h && m.width(h),
            0),
          y = 0;
        y < f.length;
        y++
      ) {
        var C = t(d[y]),
          T = C.outerWidth() - C.width(),
          C = b.bBounding
            ? Math.ceil(d[y].getBoundingClientRect().width)
            : C.outerWidth();
        (D += C), (i[f[y]].sWidth = t9(C - T));
      }
      (o.style.width = t9(D)), v.remove();
    } else
      for (y = 0; y < c; y++) {
        var w = k(n, y);
        null !== w && (i[w].sWidth = t9(d.eq(y).width()));
      }
    h && (o.style.width = t9(h)),
      (h || u) &&
        !n._reszEvt &&
        ((l = function () {
          t(e).on(
            "resize.DT-" + n.sInstance,
            tV(function () {
              O(n);
            })
          );
        }),
        $ ? setTimeout(l, 1e3) : l(),
        (n._reszEvt = !0));
  }
  var tV = p.util.throttle;
  function tX(e, a) {
    return e
      ? ((a = (e = t("<div/>")
          .css("width", t9(e))
          .appendTo(a || n.body))[0].offsetWidth),
        e.remove(),
        a)
      : 0;
  }
  function tJ(e, n) {
    var a,
      r = tq(e, n);
    return r < 0
      ? null
      : (a = e.aoData[r]).nTr
      ? a.anCells[n]
      : t("<td/>").html(J(e, r, n, "display"))[0];
  }
  function tq(t, e) {
    for (var n, a = -1, r = -1, o = 0, i = t.aoData.length; o < i; o++)
      (n = (n = (n = J(t, o, e, "display") + "").replace(tU, "")).replace(
        /&nbsp;/g,
        " "
      )).length > a && ((a = n.length), (r = o));
    return r;
  }
  function t9(t) {
    return null === t
      ? "0px"
      : "number" == typeof t
      ? t < 0
        ? "0px"
        : t + "px"
      : t.match(/\d$/)
      ? t + "px"
      : t;
  }
  function tG(e) {
    function n(e) {
      e.length && !Array.isArray(e[0]) ? b.push(e) : t.merge(b, e);
    }
    var r,
      o,
      i,
      l,
      s,
      u,
      c,
      f = [],
      d = e.aoColumns,
      h = e.aaSortingFixed,
      g = t.isPlainObject(h),
      b = [];
    for (
      Array.isArray(h) && n(h),
        g && h.pre && n(h.pre),
        n(e.aaSorting),
        g && h.post && n(h.post),
        r = 0;
      r < b.length;
      r++
    )
      for (i = (l = d[(c = b[r][(o = 0)])].aDataSort).length; o < i; o++)
        (u = d[(s = l[o])].sType || "string"),
          b[r]._idx === a && (b[r]._idx = t.inArray(b[r][1], d[s].asSorting)),
          f.push({
            src: c,
            col: s,
            dir: b[r][1],
            index: b[r]._idx,
            type: u,
            formatter: p.ext.type.order[u + "-pre"],
          });
    return f;
  }
  function tz(t) {
    var e,
      n,
      a,
      r,
      o,
      i = [],
      l = p.ext.type.order,
      s = t.aoData,
      u = (t.aoColumns, 0),
      c = t.aiDisplayMaster;
    for (B(t), e = 0, n = (o = tG(t)).length; e < n; e++)
      (r = o[e]).formatter && u++, t2(t, r.col);
    if ("ssp" != ei(t) && 0 !== o.length) {
      for (e = 0, a = c.length; e < a; e++) i[c[e]] = e;
      u === o.length
        ? c.sort(function (t, e) {
            for (
              var n,
                a,
                r,
                l,
                u = o.length,
                c = s[t]._aSortData,
                f = s[e]._aSortData,
                d = 0;
              d < u;
              d++
            )
              if (
                0 !=
                (r =
                  (n = c[(l = o[d]).col]) < (a = f[l.col]) ? -1 : a < n ? 1 : 0)
              )
                return "asc" === l.dir ? r : -r;
            return (n = i[t]) < (a = i[e]) ? -1 : a < n ? 1 : 0;
          })
        : c.sort(function (t, e) {
            for (
              var n,
                a,
                r,
                u = o.length,
                c = s[t]._aSortData,
                f = s[e]._aSortData,
                d = 0;
              d < u;
              d++
            )
              if (
                ((n = c[(r = o[d]).col]),
                (a = f[r.col]),
                0 !==
                  (r = (l[r.type + "-" + r.dir] || l["string-" + r.dir])(n, a)))
              )
                return r;
            return (n = i[t]) < (a = i[e]) ? -1 : a < n ? 1 : 0;
          });
    }
    t.bSorted = !0;
  }
  function tY(t) {
    for (
      var e = t.aoColumns,
        n = tG(t),
        a = t.oLanguage.oAria,
        r = 0,
        o = e.length;
      r < o;
      r++
    ) {
      var i = e[r],
        l = i.asSorting,
        s = i.ariaTitle || i.sTitle.replace(/<.*?>/g, ""),
        u = i.nTh;
      u.removeAttribute("aria-sort"),
        (i = i.bSortable
          ? s +
            ("asc" ===
            ((0 < n.length &&
              n[0].col == r &&
              (u.setAttribute(
                "aria-sort",
                "asc" == n[0].dir ? "ascending" : "descending"
              ),
              l[n[0].index + 1])) ||
              l[0])
              ? a.sSortAscending
              : a.sSortDescending)
          : s),
        u.setAttribute("aria-label", i);
    }
  }
  function t1(e, n, r, o) {
    function i(e, n) {
      var r = e._idx;
      return (r = r === a ? t.inArray(e[1], c) : r) + 1 < c.length
        ? r + 1
        : n
        ? null
        : 0;
    }
    var l,
      s = e.aoColumns[n],
      u = e.aaSorting,
      c = s.asSorting;
    "number" == typeof u[0] && (u = e.aaSorting = [u]),
      r && e.oFeatures.bSortMulti
        ? -1 !== (s = t.inArray(n, C(u, "0")))
          ? null === (l = null === (l = i(u[s], !0)) && 1 === u.length ? 0 : l)
            ? u.splice(s, 1)
            : ((u[s][1] = c[l]), (u[s]._idx = l))
          : (u.push([n, c[0], 0]), (u[u.length - 1]._idx = 0))
        : u.length && u[0][0] == n
        ? ((l = i(u[0])), (u.length = 1), (u[0][1] = c[l]), (u[0]._idx = l))
        : ((u.length = 0), u.push([n, c[0]]), (u[0]._idx = 0)),
      tu(e),
      "function" == typeof o && o(e);
  }
  function t6(t, e, n, a) {
    var r = t.aoColumns[n];
    ee(e, {}, function (e) {
      !1 !== r.bSortable &&
        (t.oFeatures.bProcessing
          ? (tW(t, !0),
            setTimeout(function () {
              t1(t, n, e.shiftKey, a), "ssp" !== ei(t) && tW(t, !1);
            }, 0))
          : t1(t, n, e.shiftKey, a));
    });
  }
  function tZ(e) {
    var n,
      a,
      r,
      o = e.aLastSort,
      i = e.oClasses.sSortColumn,
      l = tG(e),
      s = e.oFeatures;
    if (s.bSort && s.bSortClasses) {
      for (n = 0, a = o.length; n < a; n++)
        (r = o[n].src),
          t(C(e.aoData, "anCells", r)).removeClass(i + (n < 2 ? n + 1 : 3));
      for (n = 0, a = l.length; n < a; n++)
        (r = l[n].src),
          t(C(e.aoData, "anCells", r)).addClass(i + (n < 2 ? n + 1 : 3));
    }
    e.aLastSort = l;
  }
  function t2(t, e) {
    for (
      var n,
        a,
        r,
        o = t.aoColumns[e],
        i = p.ext.order[o.sSortDataType],
        l =
          (i && (n = i.call(t.oInstance, t, e, W(t, e))),
          p.ext.type.order[o.sType + "-pre"]),
        s = 0,
        u = t.aoData.length;
      s < u;
      s++
    )
      (a = t.aoData[s])._aSortData || (a._aSortData = []),
        (a._aSortData[e] && !i) ||
          ((r = i ? n[s] : J(t, s, e, "sort")),
          (a._aSortData[e] = l ? l(r) : r));
  }
  function t3(e) {
    var n;
    e._bLoadingState ||
      ((n = {
        time: +new Date(),
        start: e._iDisplayStart,
        length: e._iDisplayLength,
        order: t.extend(!0, [], e.aaSorting),
        search: t_(e.oPreviousSearch),
        columns: t.map(e.aoColumns, function (t, n) {
          return {
            visible: t.bVisible,
            search: t_(e.aoPreSearchCols[n]),
          };
        }),
      }),
      (e.oSavedState = n),
      ea(e, "aoStateSaveParams", "stateSaveParams", [e, n]),
      e.oFeatures.bStateSave &&
        !e.bDestroying &&
        e.fnStateSaveCallback.call(e.oInstance, e, n));
  }
  function t5(t, e, n) {
    var r;
    if (t.oFeatures.bStateSave)
      return (
        (r = t.fnStateLoadCallback.call(t.oInstance, t, function (e) {
          tK(t, e, n);
        })) !== a && tK(t, r, n),
        !0
      );
    n();
  }
  function tK(e, n, r) {
    var o,
      i,
      l = e.aoColumns,
      s = ((e._bLoadingState = !0), e._bInitComplete ? new p.Api(e) : null);
    if (n && n.time) {
      var u = ea(e, "aoStateLoadParams", "stateLoadParams", [e, n]);
      if (-1 !== t.inArray(!1, u)) e._bLoadingState = !1;
      else if (0 < (u = e.iStateDuration) && n.time < +new Date() - 1e3 * u)
        e._bLoadingState = !1;
      else if (n.columns && l.length !== n.columns.length)
        e._bLoadingState = !1;
      else {
        if (
          ((e.oLoadedState = t.extend(!0, {}, n)),
          n.length !== a &&
            (s ? s.page.len(n.length) : (e._iDisplayLength = n.length)),
          n.start !== a &&
            (null === s
              ? ((e._iDisplayStart = n.start), (e.iInitDisplayStart = n.start))
              : tO(e, n.start / e._iDisplayLength)),
          n.order !== a &&
            ((e.aaSorting = []),
            t.each(n.order, function (t, n) {
              e.aaSorting.push(n[0] >= l.length ? [0, n[1]] : n);
            })),
          n.search !== a && t.extend(e.oPreviousSearch, tI(n.search)),
          n.columns)
        ) {
          for (o = 0, i = n.columns.length; o < i; o++) {
            var c = n.columns[o];
            c.visible !== a &&
              (s
                ? s.column(o).visible(c.visible, !1)
                : (l[o].bVisible = c.visible)),
              c.search !== a && t.extend(e.aoPreSearchCols[o], tI(c.search));
          }
          s && s.columns.adjust();
        }
        (e._bLoadingState = !1), ea(e, "aoStateLoaded", "stateLoaded", [e, n]);
      }
    } else e._bLoadingState = !1;
    r();
  }
  function t4(e) {
    var n = p.settings,
      e = t.inArray(e, C(n, "nTable"));
    return -1 !== e ? n[e] : null;
  }
  function t7(t, n, a, r) {
    if (
      ((a =
        "DataTables warning: " +
        (t ? "table id=" + t.sTableId + " - " : "") +
        a),
      r &&
        (a +=
          ". For more information about this error, please see http://datatables.net/tn/" +
          r),
      n)
    )
      e.console && console.log && console.log(a);
    else if (
      ((n = (n = p.ext).sErrMode || n.errMode),
      t && ea(t, null, "error", [t, r, a]),
      "alert" == n)
    )
      alert(a);
    else {
      if ("throw" == n) throw Error(a);
      "function" == typeof n && n(t, r, a);
    }
  }
  function tQ(e, n, r, o) {
    Array.isArray(r)
      ? t.each(r, function (t, a) {
          Array.isArray(a) ? tQ(e, n, a[0], a[1]) : tQ(e, n, a);
        })
      : (o === a && (o = r), n[r] !== a && (e[o] = n[r]));
  }
  function et(e, n, a) {
    var r, o;
    for (o in n)
      n.hasOwnProperty(o) &&
        ((r = n[o]),
        t.isPlainObject(r)
          ? (t.isPlainObject(e[o]) || (e[o] = {}), t.extend(!0, e[o], r))
          : a && "data" !== o && "aaData" !== o && Array.isArray(r)
          ? (e[o] = r.slice())
          : (e[o] = r));
    return e;
  }
  function ee(e, n, a) {
    t(e)
      .on("click.DT", n, function (n) {
        t(e).trigger("blur"), a(n);
      })
      .on("keypress.DT", n, function (t) {
        13 === t.which && (t.preventDefault(), a(t));
      })
      .on("selectstart.DT", function () {
        return !1;
      });
  }
  function en(t, e, n, a) {
    n && t[e].push({ fn: n, sName: a });
  }
  function ea(e, n, a, r) {
    var o = [];
    return (
      n &&
        (o = t.map(e[n].slice().reverse(), function (t, n) {
          return t.fn.apply(e.oInstance, r);
        })),
      null !== a &&
        ((n = t.Event(a + ".dt")),
        (a = t(e.nTable)).trigger(n, r),
        0 === a.parents("body").length && t("body").trigger(n, r),
        o.push(n.result)),
      o
    );
  }
  function er(t) {
    var e = t._iDisplayStart,
      n = t.fnDisplayEnd(),
      a = t._iDisplayLength;
    n <= e && (e = n - a),
      (e -= e % a),
      (t._iDisplayStart = e = -1 === a || e < 0 ? 0 : e);
  }
  function eo(e, n) {
    var e = e.renderer,
      a = p.ext.renderer[n];
    return t.isPlainObject(e) && e[n]
      ? a[e[n]] || a._
      : ("string" == typeof e && a[e]) || a._;
  }
  function ei(t) {
    return t.oFeatures.bServerSide
      ? "ssp"
      : t.ajax || t.sAjaxSource
      ? "ajax"
      : "dom";
  }
  function el(t, e, n) {
    var a, r;
    n &&
      (a = new eg(t)).one("draw", function () {
        n(a.ajax.json());
      }),
      "ssp" == ei(t)
        ? tu(t, e)
        : (tW(t, !0),
          (r = t.jqXHR) && 4 !== r.readyState && r.abort(),
          th(t, [], function (n) {
            tt(t);
            for (var a = t$(t, n), r = 0, o = a.length; r < o; r++) V(t, a[r]);
            tu(t, e), tW(t, !1);
          }));
  }
  function es(t, e, n, r, o) {
    for (
      var i,
        l,
        s,
        u,
        c = [],
        d = typeof e,
        h = 0,
        p = (e =
          e && "string" != d && "function" != d && e.length !== a ? e : [e])
          .length;
      h < p;
      h++
    )
      for (
        s = 0,
          u = (l =
            e[h] && e[h].split && !e[h].match(/[\[\(:]/)
              ? e[h].split(",")
              : [e[h]]).length;
        s < u;
        s++
      )
        (i = n("string" == typeof l[s] ? l[s].trim() : l[s])) &&
          i.length &&
          (c = c.concat(i));
    var g = f.selector[t];
    if (g.length) for (h = 0, p = g.length; h < p; h++) c = g[h](r, o, c);
    return w(c);
  }
  function eu(e) {
    return (
      (e = e || {}).filter && e.search === a && (e.search = e.filter),
      t.extend({ search: "none", order: "current", page: "all" }, e)
    );
  }
  function ec(t) {
    for (var e = 0, n = t.length; e < n; e++)
      if (0 < t[e].length)
        return (
          (t[0] = t[e]),
          (t[0].length = 1),
          (t.length = 1),
          (t.context = [t.context[e]]),
          t
        );
    return (t.length = 0), t;
  }
  function ef(e, n) {
    var a = e.context;
    if (a.length && e.length) {
      var r = a[0].aoData[e[0]];
      if (r._details) {
        (r._detailsShow = n)
          ? (r._details.insertAfter(r.nTr), t(r.nTr).addClass("dt-hasChild"))
          : (r._details.detach(), t(r.nTr).removeClass("dt-hasChild")),
          ea(a[0], null, "childRow", [n, e.row(e[0])]);
        var o = a[0],
          i = new eg(o),
          r = ".dt.DT_details",
          n = "draw" + r,
          e = "column-sizing" + r,
          r = "destroy" + r,
          l = o.aoData;
        i.off(n + " " + e + " " + r),
          C(l, "_details").length > 0 &&
            (i.on(n, function (t, e) {
              o === e &&
                i
                  .rows({ page: "current" })
                  .eq(0)
                  .each(function (t) {
                    var e = l[t];
                    e._detailsShow && e._details.insertAfter(e.nTr);
                  });
            }),
            i.on(e, function (t, e, n, a) {
              if (o === e)
                for (var r, i = M(e), s = 0, u = l.length; s < u; s++)
                  (r = l[s])._details &&
                    r._details.children("td[colspan]").attr("colspan", i);
            }),
            i.on(r, function (t, e) {
              if (o === e)
                for (var n = 0, a = l.length; n < a; n++)
                  l[n]._details && em(i, n);
            })),
          e$(a);
      }
    }
  }
  function ed(t, e, n, a, r) {
    for (var o = [], i = 0, l = r.length; i < l; i++) o.push(J(t, r[i], e));
    return o;
  }
  var eh = [],
    ep = Array.prototype,
    eg = function (e, n) {
      if (!(this instanceof eg)) return new eg(e, n);
      function a(e) {
        var n, a, o, i;
        (o = p.settings),
          (i = t.map(o, function (t, e) {
            return t.nTable;
          })),
          (e = e
            ? e.nTable && e.oApi
              ? [e]
              : e.nodeName && "table" === e.nodeName.toLowerCase()
              ? -1 !== (n = t.inArray(e, i))
                ? [o[n]]
                : null
              : e && "function" == typeof e.settings
              ? e.settings().toArray()
              : ("string" == typeof e ? (a = t(e)) : e instanceof t && (a = e),
                a
                  ? a
                      .map(function (e) {
                        return -1 !== (n = t.inArray(this, i)) ? o[n] : null;
                      })
                      .toArray()
                  : void 0)
            : []) && r.push.apply(r, e);
      }
      var r = [];
      if (Array.isArray(e)) for (var o = 0, i = e.length; o < i; o++) a(e[o]);
      else a(e);
      (this.context = w(r)),
        n && t.merge(this, n),
        (this.selector = { rows: null, cols: null, opts: null }),
        eg.extend(this, this, eh);
    },
    eb =
      ((p.Api = eg),
      t.extend(eg.prototype, {
        any: function () {
          return 0 !== this.count();
        },
        concat: ep.concat,
        context: [],
        count: function () {
          return this.flatten().length;
        },
        each: function (t) {
          for (var e = 0, n = this.length; e < n; e++)
            t.call(this, this[e], e, this);
          return this;
        },
        eq: function (t) {
          var e = this.context;
          return e.length > t ? new eg(e[t], this[t]) : null;
        },
        filter: function (t) {
          var e = [];
          if (ep.filter) e = ep.filter.call(this, t, this);
          else
            for (var n = 0, a = this.length; n < a; n++)
              t.call(this, this[n], n, this) && e.push(this[n]);
          return new eg(this.context, e);
        },
        flatten: function () {
          var t = [];
          return new eg(this.context, t.concat.apply(t, this.toArray()));
        },
        join: ep.join,
        indexOf:
          ep.indexOf ||
          function (t, e) {
            for (var n = e || 0, a = this.length; n < a; n++)
              if (this[n] === t) return n;
            return -1;
          },
        iterator: function (t, e, n, r) {
          var o,
            i,
            l,
            s,
            u,
            c,
            f,
            d,
            h = [],
            p = this.context,
            g = this.selector;
          for (
            "string" == typeof t && ((r = n), (n = e), (e = t), (t = !1)),
              i = 0,
              l = p.length;
            i < l;
            i++
          ) {
            var b = new eg(p[i]);
            if ("table" === e) (o = n.call(b, p[i], i)) !== a && h.push(o);
            else if ("columns" === e || "rows" === e)
              (o = n.call(b, p[i], this[i], i)) !== a && h.push(o);
            else if (
              "column" === e ||
              "column-rows" === e ||
              "row" === e ||
              "cell" === e
            )
              for (
                f = this[i],
                  "column-rows" === e && (c = eb(p[i], g.opts)),
                  s = 0,
                  u = f.length;
                s < u;
                s++
              )
                (d = f[s]),
                  (o =
                    "cell" === e
                      ? n.call(b, p[i], d.row, d.column, i, s)
                      : n.call(b, p[i], d, i, s, c)) !== a && h.push(o);
          }
          return h.length || r
            ? (((t = (r = new eg(p, t ? h.concat.apply([], h) : h))
                .selector).rows = g.rows),
              (t.cols = g.cols),
              (t.opts = g.opts),
              r)
            : this;
        },
        lastIndexOf:
          ep.lastIndexOf ||
          function (t, e) {
            return this.indexOf.apply(this.toArray.reverse(), arguments);
          },
        length: 0,
        map: function (t) {
          var e = [];
          if (ep.map) e = ep.map.call(this, t, this);
          else
            for (var n = 0, a = this.length; n < a; n++)
              e.push(t.call(this, this[n], n));
          return new eg(this.context, e);
        },
        pluck: function (t) {
          var e = p.util.get(t);
          return this.map(function (t) {
            return e(t);
          });
        },
        pop: ep.pop,
        push: ep.push,
        reduce:
          ep.reduce ||
          function (t, e) {
            return j(this, t, e, 0, this.length, 1);
          },
        reduceRight:
          ep.reduceRight ||
          function (t, e) {
            return j(this, t, e, this.length - 1, -1, -1);
          },
        reverse: ep.reverse,
        selector: null,
        shift: ep.shift,
        slice: function () {
          return new eg(this.context, this);
        },
        sort: ep.sort,
        splice: ep.splice,
        toArray: function () {
          return ep.slice.call(this);
        },
        to$: function () {
          return t(this);
        },
        toJQuery: function () {
          return t(this);
        },
        unique: function () {
          return new eg(this.context, w(this));
        },
        unshift: ep.unshift,
      }),
      (eg.extend = function (t, e, n) {
        if (n.length && e && (e instanceof eg || e.__dt_wrapper))
          for (var a, r = 0, o = n.length; r < o; r++)
            (e[(a = n[r]).name] =
              "function" === a.type
                ? (function (t, e, n) {
                    return function () {
                      var a = e.apply(t, arguments);
                      return eg.extend(a, a, n.methodExt), a;
                    };
                  })(t, a.val, a)
                : "object" === a.type
                ? {}
                : a.val),
              (e[a.name].__dt_wrapper = !0),
              eg.extend(t, e[a.name], a.propExt);
      }),
      (eg.register = d =
        function (e, n) {
          if (Array.isArray(e))
            for (var a = 0, r = e.length; a < r; a++) eg.register(e[a], n);
          else
            for (
              var o = e.split("."), i = eh, l = 0, s = o.length;
              l < s;
              l++
            ) {
              var u,
                c,
                f = (function (t, e) {
                  for (var n = 0, a = t.length; n < a; n++)
                    if (t[n].name === e) return t[n];
                  return null;
                })(
                  i,
                  (c = (u = -1 !== o[l].indexOf("()"))
                    ? o[l].replace("()", "")
                    : o[l])
                );
              f ||
                i.push(
                  (f = {
                    name: c,
                    val: {},
                    methodExt: [],
                    propExt: [],
                    type: "object",
                  })
                ),
                l === s - 1
                  ? ((f.val = n),
                    (f.type =
                      "function" == typeof n
                        ? "function"
                        : t.isPlainObject(n)
                        ? "object"
                        : "other"))
                  : (i = u ? f.methodExt : f.propExt);
            }
        }),
      (eg.registerPlural = h =
        function (t, e, n) {
          eg.register(t, n),
            eg.register(e, function () {
              var t = n.apply(this, arguments);
              return t === this
                ? this
                : t instanceof eg
                ? t.length
                  ? Array.isArray(t[0])
                    ? new eg(t.context, t[0])
                    : t[0]
                  : a
                : t;
            });
        }),
      d("tables()", function (e) {
        return e !== a && null !== e
          ? new eg(
              (function e(n, a) {
                var r;
                return Array.isArray(n)
                  ? t.map(n, function (t) {
                      return e(t, a);
                    })
                  : "number" == typeof n
                  ? [a[n]]
                  : ((r = t.map(a, function (t, e) {
                      return t.nTable;
                    })),
                    t(r)
                      .filter(n)
                      .map(function (e) {
                        return a[t.inArray(this, r)];
                      })
                      .toArray());
              })(e, this.context)
            )
          : this;
      }),
      d("table()", function (t) {
        var t = this.tables(t),
          e = t.context;
        return e.length ? new eg(e[0]) : t;
      }),
      h("tables().nodes()", "table().node()", function () {
        return this.iterator(
          "table",
          function (t) {
            return t.nTable;
          },
          1
        );
      }),
      h("tables().body()", "table().body()", function () {
        return this.iterator(
          "table",
          function (t) {
            return t.nTBody;
          },
          1
        );
      }),
      h("tables().header()", "table().header()", function () {
        return this.iterator(
          "table",
          function (t) {
            return t.nTHead;
          },
          1
        );
      }),
      h("tables().footer()", "table().footer()", function () {
        return this.iterator(
          "table",
          function (t) {
            return t.nTFoot;
          },
          1
        );
      }),
      h("tables().containers()", "table().container()", function () {
        return this.iterator(
          "table",
          function (t) {
            return t.nTableWrapper;
          },
          1
        );
      }),
      d("draw()", function (t) {
        return this.iterator("table", function (e) {
          "page" === t
            ? ts(e)
            : tu(e, !1 === (t = "string" == typeof t ? "full-hold" !== t : t));
        });
      }),
      d("page()", function (t) {
        return t === a
          ? this.page.info().page
          : this.iterator("table", function (e) {
              tO(e, t);
            });
      }),
      d("page.info()", function (t) {
        var e, n, r, o, i;
        return 0 === this.context.length
          ? a
          : ((n = (e = this.context[0])._iDisplayStart),
            (r = e.oFeatures.bPaginate ? e._iDisplayLength : -1),
            (o = e.fnRecordsDisplay()),
            {
              page: (i = -1 === r) ? 0 : Math.floor(n / r),
              pages: i ? 1 : Math.ceil(o / r),
              start: n,
              end: e.fnDisplayEnd(),
              length: r,
              recordsTotal: e.fnRecordsTotal(),
              recordsDisplay: o,
              serverSide: "ssp" === ei(e),
            });
      }),
      d("page.len()", function (t) {
        return t === a
          ? 0 !== this.context.length
            ? this.context[0]._iDisplayLength
            : a
          : this.iterator("table", function (e) {
              tj(e, t);
            });
      }),
      d("ajax.json()", function () {
        var t = this.context;
        if (0 < t.length) return t[0].json;
      }),
      d("ajax.params()", function () {
        var t = this.context;
        if (0 < t.length) return t[0].oAjaxData;
      }),
      d("ajax.reload()", function (t, e) {
        return this.iterator("table", function (n) {
          el(n, !1 === e, t);
        });
      }),
      d("ajax.url()", function (e) {
        var n = this.context;
        return e === a
          ? 0 === n.length
            ? a
            : (n = n[0]).ajax
            ? t.isPlainObject(n.ajax)
              ? n.ajax.url
              : n.ajax
            : n.sAjaxSource
          : this.iterator("table", function (n) {
              t.isPlainObject(n.ajax) ? (n.ajax.url = e) : (n.ajax = e);
            });
      }),
      d("ajax.url().load()", function (t, e) {
        return this.iterator("table", function (n) {
          el(n, !1 === e, t);
        });
      }),
      function (e, n) {
        var a,
          r = [],
          o = e.aiDisplay,
          i = e.aiDisplayMaster,
          l = n.search,
          u = n.order,
          n = n.page;
        if ("ssp" == ei(e)) return "removed" === l ? [] : s(0, i.length);
        if ("current" == n)
          for (f = e._iDisplayStart, d = e.fnDisplayEnd(); f < d; f++)
            r.push(o[f]);
        else if ("current" == u || "applied" == u) {
          if ("none" == l) r = i.slice();
          else if ("applied" == l) r = o.slice();
          else if ("removed" == l) {
            for (var c = {}, f = 0, d = o.length; f < d; f++) c[o[f]] = null;
            r = t.map(i, function (t) {
              return c.hasOwnProperty(t) ? null : t;
            });
          }
        } else if ("index" == u || "original" == u)
          for (f = 0, d = e.aoData.length; f < d; f++)
            ("none" == l ||
              (-1 === (a = t.inArray(f, o)) && "removed" == l) ||
              (0 <= a && "applied" == l)) &&
              r.push(f);
        return r;
      }),
    e$ =
      (d("rows()", function (e, n) {
        e === a ? (e = "") : t.isPlainObject(e) && ((n = e), (e = "")),
          (n = eu(n));
        var o = this.iterator(
          "table",
          function (o) {
            var i, s, c;
            return es(
              "row",
              e,
              function (e) {
                var n = r(e),
                  o = i.aoData;
                if (
                  (null !== n && !s) ||
                  ((c = c || eb(i, s)), null !== n && -1 !== t.inArray(n, c))
                )
                  return [n];
                if (null === e || e === a || "" === e) return c;
                if ("function" == typeof e)
                  return t.map(c, function (t) {
                    var n = o[t];
                    return e(t, n._aData, n.nTr) ? t : null;
                  });
                if (e.nodeName)
                  return (
                    (n = e._DT_RowIndex),
                    (f = e._DT_CellIndex),
                    n !== a
                      ? o[n] && o[n].nTr === e
                        ? [n]
                        : []
                      : f
                      ? o[f.row] && o[f.row].nTr === e.parentNode
                        ? [f.row]
                        : []
                      : (n = t(e).closest("*[data-dt-row]")).length
                      ? [n.data("dt-row")]
                      : []
                  );
                if ("string" == typeof e && "#" === e.charAt(0)) {
                  var f = i.aIds[e.replace(/^#/, "")];
                  if (f !== a) return [f.idx];
                }
                return (
                  (n = u(l(i.aoData, c, "nTr"))),
                  t(n)
                    .filter(e)
                    .map(function () {
                      return this._DT_RowIndex;
                    })
                    .toArray()
                );
              },
              (i = o),
              (s = n)
            );
          },
          1
        );
        return (o.selector.rows = e), (o.selector.opts = n), o;
      }),
      d("rows().nodes()", function () {
        return this.iterator(
          "row",
          function (t, e) {
            return t.aoData[e].nTr || a;
          },
          1
        );
      }),
      d("rows().data()", function () {
        return this.iterator(
          !0,
          "rows",
          function (t, e) {
            return l(t.aoData, e, "_aData");
          },
          1
        );
      }),
      h("rows().cache()", "row().cache()", function (t) {
        return this.iterator(
          "row",
          function (e, n) {
            return (
              (e = e.aoData[n]), "search" === t ? e._aFilterData : e._aSortData
            );
          },
          1
        );
      }),
      h("rows().invalidate()", "row().invalidate()", function (t) {
        return this.iterator("row", function (e, n) {
          tn(e, n, t);
        });
      }),
      h("rows().indexes()", "row().index()", function () {
        return this.iterator(
          "row",
          function (t, e) {
            return e;
          },
          1
        );
      }),
      h("rows().ids()", "row().id()", function (t) {
        for (var e = [], n = this.context, a = 0, r = n.length; a < r; a++)
          for (var o = 0, i = this[a].length; o < i; o++) {
            var l = n[a].rowIdFn(n[a].aoData[this[a][o]]._aData);
            e.push((!0 === t ? "#" : "") + l);
          }
        return new eg(n, e);
      }),
      h("rows().remove()", "row().remove()", function () {
        var t = this;
        return (
          this.iterator("row", function (e, n, r) {
            var o,
              i,
              l,
              s,
              u,
              c,
              f = e.aoData,
              d = f[n];
            for (f.splice(n, 1), o = 0, i = f.length; o < i; o++)
              if (
                ((c = (u = f[o]).anCells),
                null !== u.nTr && (u.nTr._DT_RowIndex = o),
                null !== c)
              )
                for (l = 0, s = c.length; l < s; l++)
                  c[l]._DT_CellIndex.row = o;
            te(e.aiDisplayMaster, n),
              te(e.aiDisplay, n),
              te(t[r], n, !1),
              0 < e._iRecordsDisplay && e._iRecordsDisplay--,
              er(e),
              (r = e.rowIdFn(d._aData)) !== a && delete e.aIds[r];
          }),
          this.iterator("table", function (t) {
            for (var e = 0, n = t.aoData.length; e < n; e++)
              t.aoData[e].idx = e;
          }),
          this
        );
      }),
      d("rows.add()", function (e) {
        var n = this.iterator(
            "table",
            function (t) {
              for (var n, a = [], r = 0, o = e.length; r < o; r++)
                (n = e[r]).nodeName && "TR" === n.nodeName.toUpperCase()
                  ? a.push(X(t, n)[0])
                  : a.push(V(t, n));
              return a;
            },
            1
          ),
          a = this.rows(-1);
        return a.pop(), t.merge(a, n), a;
      }),
      d("row()", function (t, e) {
        return ec(this.rows(t, e));
      }),
      d("row().data()", function (t) {
        var e,
          n = this.context;
        return t === a
          ? n.length && this.length
            ? n[0].aoData[this[0]]._aData
            : a
          : (((e = n[0].aoData[this[0]])._aData = t),
            Array.isArray(t) && e.nTr && e.nTr.id && K(n[0].rowId)(t, e.nTr.id),
            tn(n[0], this[0], "data"),
            this);
      }),
      d("row().node()", function () {
        var t = this.context;
        return (t.length && this.length && t[0].aoData[this[0]].nTr) || null;
      }),
      d("row.add()", function (e) {
        e instanceof t && e.length && (e = e[0]);
        var n = this.iterator("table", function (t) {
          return e.nodeName && "TR" === e.nodeName.toUpperCase()
            ? X(t, e)[0]
            : V(t, e);
        });
        return this.row(n[0]);
      }),
      t(n).on("plugin-init.dt", function (e, n) {
        var a = new eg(n),
          r = "on-plugin-init",
          o = "stateSaveParams." + r,
          i = "destroy. " + r,
          r =
            (a.on(o, function (t, e, n) {
              for (
                var a = e.rowIdFn, r = e.aoData, o = [], i = 0;
                i < r.length;
                i++
              )
                r[i]._detailsShow && o.push("#" + a(r[i]._aData));
              n.childRows = o;
            }),
            a.on(i, function () {
              a.off(o + " " + i);
            }),
            a.state.loaded());
        r &&
          r.childRows &&
          a
            .rows(
              t.map(r.childRows, function (t) {
                return t.replace(/:/g, "\\:");
              })
            )
            .every(function () {
              ea(n, null, "requestChild", [this]);
            });
      }),
      p.util.throttle(function (t) {
        t3(t[0]);
      }, 500)),
    em = function (e, n) {
      var r = e.context;
      r.length &&
        (n = r[0].aoData[n !== a ? n : e[0]]) &&
        n._details &&
        (n._details.remove(),
        (n._detailsShow = a),
        (n._details = a),
        t(n.nTr).removeClass("dt-hasChild"),
        e$(r));
    },
    eS = "row().child",
    ev = eS + "()",
    eD =
      (d(ev, function (e, n) {
        var r,
          o,
          i,
          l,
          s,
          u = this.context;
        return e === a
          ? u.length && this.length
            ? u[0].aoData[this[0]]._details
            : a
          : (!0 === e
              ? this.child.show()
              : !1 === e
              ? em(this)
              : u.length &&
                this.length &&
                ((r = u[0]),
                (o = u[0].aoData[this[0]]),
                (i = e),
                (s = []),
                (function e(n, a) {
                  var o;
                  if (Array.isArray(n) || n instanceof t)
                    for (var i = 0, l = n.length; i < l; i++) e(n[i], a);
                  else
                    n.nodeName && "tr" === n.nodeName.toLowerCase()
                      ? s.push(n)
                      : ((o = t("<tr><td></td></tr>").addClass(a)),
                        (t("td", o).addClass(a).html(n)[0].colSpan = M(r)),
                        s.push(o[0]));
                })(i, (l = n)),
                o._details && o._details.detach(),
                (o._details = t(s)),
                o._detailsShow && o._details.insertAfter(o.nTr)),
            this);
      }),
      d([eS + ".show()", ev + ".show()"], function (t) {
        return ef(this, !0), this;
      }),
      d([eS + ".hide()", ev + ".hide()"], function () {
        return ef(this, !1), this;
      }),
      d([eS + ".remove()", ev + ".remove()"], function () {
        return em(this), this;
      }),
      d(eS + ".isShown()", function () {
        var t = this.context;
        return (
          (t.length && this.length && t[0].aoData[this[0]]._detailsShow) || !1
        );
      }),
      /^([^:]+):(name|visIdx|visible)$/),
    ey =
      (d("columns()", function (e, n) {
        e === a ? (e = "") : t.isPlainObject(e) && ((n = e), (e = "")),
          (n = eu(n));
        var o = this.iterator(
          "table",
          function (a) {
            var o, i, l, u, c, f;
            return (
              (i = e),
              (l = n),
              (c = C((u = (o = a).aoColumns), "sName")),
              (f = C(u, "nTh")),
              es(
                "column",
                i,
                function (e) {
                  var n,
                    a = r(e);
                  if ("" === e) return s(u.length);
                  if (null !== a) return [0 <= a ? a : u.length + a];
                  if ("function" == typeof e)
                    return (
                      (n = eb(o, l)),
                      t.map(u, function (t, a) {
                        return e(a, ed(o, a, 0, 0, n), f[a]) ? a : null;
                      })
                    );
                  var i = "string" == typeof e ? e.match(eD) : "";
                  if (i)
                    switch (i[2]) {
                      case "visIdx":
                      case "visible":
                        var d,
                          h = parseInt(i[1], 10);
                        return h < 0
                          ? [
                              (d = t.map(u, function (t, e) {
                                return t.bVisible ? e : null;
                              }))[d.length + h],
                            ]
                          : [k(o, h)];
                      case "name":
                        return t.map(c, function (t, e) {
                          return t === i[1] ? e : null;
                        });
                      default:
                        return [];
                    }
                  return e.nodeName && e._DT_CellIndex
                    ? [e._DT_CellIndex.column]
                    : (a = t(f)
                        .filter(e)
                        .map(function () {
                          return t.inArray(this, f);
                        })
                        .toArray()).length || !e.nodeName
                    ? a
                    : (a = t(e).closest("*[data-dt-column]")).length
                    ? [a.data("dt-column")]
                    : [];
                },
                o,
                l
              )
            );
          },
          1
        );
        return (o.selector.cols = e), (o.selector.opts = n), o;
      }),
      h("columns().header()", "column().header()", function (t, e) {
        return this.iterator(
          "column",
          function (t, e) {
            return t.aoColumns[e].nTh;
          },
          1
        );
      }),
      h("columns().footer()", "column().footer()", function (t, e) {
        return this.iterator(
          "column",
          function (t, e) {
            return t.aoColumns[e].nTf;
          },
          1
        );
      }),
      h("columns().data()", "column().data()", function () {
        return this.iterator("column-rows", ed, 1);
      }),
      h("columns().dataSrc()", "column().dataSrc()", function () {
        return this.iterator(
          "column",
          function (t, e) {
            return t.aoColumns[e].mData;
          },
          1
        );
      }),
      h("columns().cache()", "column().cache()", function (t) {
        return this.iterator(
          "column-rows",
          function (e, n, a, r, o) {
            return l(
              e.aoData,
              o,
              "search" === t ? "_aFilterData" : "_aSortData",
              n
            );
          },
          1
        );
      }),
      h("columns().nodes()", "column().nodes()", function () {
        return this.iterator(
          "column-rows",
          function (t, e, n, a, r) {
            return l(t.aoData, r, "anCells", e);
          },
          1
        );
      }),
      h("columns().visible()", "column().visible()", function (e, n) {
        var r = this,
          o = this.iterator("column", function (n, r) {
            if (e === a) return n.aoColumns[r].bVisible;
            var o,
              i,
              l = r,
              r = e,
              s = n.aoColumns,
              u = s[l],
              c = n.aoData;
            if (r === a) u.bVisible;
            else if (u.bVisible !== r) {
              if (r)
                for (
                  var f = t.inArray(!0, C(s, "bVisible"), l + 1),
                    d = 0,
                    h = c.length;
                  d < h;
                  d++
                )
                  (i = c[d].nTr),
                    (o = c[d].anCells),
                    i && i.insertBefore(o[l], o[f] || null);
              else t(C(n.aoData, "anCells", l)).detach();
              u.bVisible = r;
            }
          });
        return (
          e !== a &&
            this.iterator("table", function (o) {
              tl(o, o.aoHeader),
                tl(o, o.aoFooter),
                o.aiDisplay.length ||
                  t(o.nTBody).find("td[colspan]").attr("colspan", M(o)),
                t3(o),
                r.iterator("column", function (t, a) {
                  ea(t, null, "column-visibility", [t, a, e, n]);
                }),
                (n === a || n) && r.columns.adjust();
            }),
          o
        );
      }),
      h("columns().indexes()", "column().index()", function (t) {
        return this.iterator(
          "column",
          function (e, n) {
            return "visible" === t ? W(e, n) : n;
          },
          1
        );
      }),
      d("columns.adjust()", function () {
        return this.iterator(
          "table",
          function (t) {
            O(t);
          },
          1
        );
      }),
      d("column.index()", function (t, e) {
        var n;
        if (0 !== this.context.length)
          return (
            (n = this.context[0]),
            "fromVisible" === t || "toData" === t
              ? k(n, e)
              : "fromData" === t || "toVisible" === t
              ? W(n, e)
              : void 0
          );
      }),
      d("column()", function (t, e) {
        return ec(this.columns(t, e));
      }),
      d("cells()", function (e, n, r) {
        var o, i, s, c, f, d, h;
        return (
          t.isPlainObject(e) &&
            (e.row === a ? ((r = e), (e = null)) : ((r = n), (n = null))),
          t.isPlainObject(n) && ((r = n), (n = null)),
          null === n || n === a
            ? this.iterator("table", function (n) {
                var o, i, s, c, f, d, h, p, g, b, $, m, S, v;
                return (
                  (o = n),
                  (n = e),
                  (i = eu(r)),
                  (b = o.aoData),
                  ($ = eb(o, i)),
                  (m = u(l(b, $, "anCells"))),
                  (S = t(x([], m))),
                  (v = o.aoColumns.length),
                  es(
                    "cell",
                    n,
                    function (e) {
                      var n,
                        r = "function" == typeof e;
                      if (null === e || e === a || r) {
                        for (c = [], f = 0, d = $.length; f < d; f++)
                          for (s = $[f], h = 0; h < v; h++)
                            (p = {
                              row: s,
                              column: h,
                            }),
                              (!r ||
                                ((g = b[s]),
                                e(
                                  p,
                                  J(o, s, h),
                                  g.anCells ? g.anCells[h] : null
                                ))) &&
                                c.push(p);
                        return c;
                      }
                      return t.isPlainObject(e)
                        ? e.column !== a &&
                          e.row !== a &&
                          -1 !== t.inArray(e.row, $)
                          ? [e]
                          : []
                        : (n = S.filter(e)
                            .map(function (t, e) {
                              return {
                                row: e._DT_CellIndex.row,
                                column: e._DT_CellIndex.column,
                              };
                            })
                            .toArray()).length || !e.nodeName
                        ? n
                        : (g = t(e).closest("*[data-dt-row]")).length
                        ? [
                            {
                              row: g.data("dt-row"),
                              column: g.data("dt-column"),
                            },
                          ]
                        : [];
                    },
                    o,
                    i
                  )
                );
              })
            : ((h = r
                ? {
                    page: r.page,
                    order: r.order,
                    search: r.search,
                  }
                : {}),
              (o = this.columns(n, h)),
              (i = this.rows(e, h)),
              (h = this.iterator(
                "table",
                function (t, e) {
                  var n = [];
                  for (s = 0, c = i[e].length; s < c; s++)
                    for (f = 0, d = o[e].length; f < d; f++)
                      n.push({
                        row: i[e][s],
                        column: o[e][f],
                      });
                  return n;
                },
                1
              )),
              (h = r && r.selected ? this.cells(h, r) : h),
              t.extend(h.selector, { cols: n, rows: e, opts: r }),
              h)
        );
      }),
      h("cells().nodes()", "cell().node()", function () {
        return this.iterator(
          "cell",
          function (t, e, n) {
            return (t = t.aoData[e]) && t.anCells ? t.anCells[n] : a;
          },
          1
        );
      }),
      d("cells().data()", function () {
        return this.iterator(
          "cell",
          function (t, e, n) {
            return J(t, e, n);
          },
          1
        );
      }),
      h("cells().cache()", "cell().cache()", function (t) {
        return (
          (t = "search" === t ? "_aFilterData" : "_aSortData"),
          this.iterator(
            "cell",
            function (e, n, a) {
              return e.aoData[n][t][a];
            },
            1
          )
        );
      }),
      h("cells().render()", "cell().render()", function (t) {
        return this.iterator(
          "cell",
          function (e, n, a) {
            return J(e, n, a, t);
          },
          1
        );
      }),
      h("cells().indexes()", "cell().index()", function () {
        return this.iterator(
          "cell",
          function (t, e, n) {
            return { row: e, column: n, columnVisible: W(t, n) };
          },
          1
        );
      }),
      h("cells().invalidate()", "cell().invalidate()", function (t) {
        return this.iterator("cell", function (e, n, a) {
          tn(e, n, t, a);
        });
      }),
      d("cell()", function (t, e, n) {
        return ec(this.cells(t, e, n));
      }),
      d("cell().data()", function (t) {
        var e = this.context,
          n = this[0];
        return t === a
          ? e.length && n.length
            ? J(e[0], n[0].row, n[0].column)
            : a
          : (q(e[0], n[0].row, n[0].column, t),
            tn(e[0], n[0].row, "data", n[0].column),
            this);
      }),
      d("order()", function (t, e) {
        var n = this.context;
        return t === a
          ? 0 !== n.length
            ? n[0].aaSorting
            : a
          : ("number" == typeof t
              ? (t = [[t, e]])
              : t.length &&
                !Array.isArray(t[0]) &&
                (t = Array.prototype.slice.call(arguments)),
            this.iterator("table", function (e) {
              e.aaSorting = t.slice();
            }));
      }),
      d("order.listener()", function (t, e, n) {
        return this.iterator("table", function (a) {
          t6(a, t, e, n);
        });
      }),
      d("order.fixed()", function (e) {
        var n;
        return e
          ? this.iterator("table", function (n) {
              n.aaSortingFixed = t.extend(!0, {}, e);
            })
          : Array.isArray(
              (n = (n = this.context).length ? n[0].aaSortingFixed : a)
            )
          ? { pre: n }
          : n;
      }),
      d(["columns().order()", "column().order()"], function (e) {
        var n = this;
        return this.iterator("table", function (a, r) {
          var o = [];
          t.each(n[r], function (t, n) {
            o.push([n, e]);
          }),
            (a.aaSorting = o);
        });
      }),
      d("search()", function (e, n, r, o) {
        var i = this.context;
        return e === a
          ? 0 !== i.length
            ? i[0].oPreviousSearch.sSearch
            : a
          : this.iterator("table", function (a) {
              a.oFeatures.bFilter &&
                tS(
                  a,
                  t.extend({}, a.oPreviousSearch, {
                    sSearch: e + "",
                    bRegex: null !== n && n,
                    bSmart: null === r || r,
                    bCaseInsensitive: null === o || o,
                  }),
                  1
                );
            });
      }),
      h("columns().search()", "column().search()", function (e, n, r, o) {
        return this.iterator("column", function (i, l) {
          var s = i.aoPreSearchCols;
          if (e === a) return s[l].sSearch;
          i.oFeatures.bFilter &&
            (t.extend(s[l], {
              sSearch: e + "",
              bRegex: null !== n && n,
              bSmart: null === r || r,
              bCaseInsensitive: null === o || o,
            }),
            tS(i, i.oPreviousSearch, 1));
        });
      }),
      d("state()", function () {
        return this.context.length ? this.context[0].oSavedState : null;
      }),
      d("state.clear()", function () {
        return this.iterator("table", function (t) {
          t.fnStateSaveCallback.call(t.oInstance, t, {});
        });
      }),
      d("state.loaded()", function () {
        return this.context.length ? this.context[0].oLoadedState : null;
      }),
      d("state.save()", function () {
        return this.iterator("table", function (t) {
          t3(t);
        });
      }),
      (p.use = function (a, r) {
        "lib" === r || a.fn
          ? (t = a)
          : "win" == r || a.document
          ? (n = (e = a).document)
          : ("datetime" !== r && "DateTime" !== a.type) || (p.DateTime = a);
      }),
      (p.factory = function (a, r) {
        var o = !1;
        return (
          a && a.document && (n = (e = a).document),
          r && r.fn && r.fn.jquery && ((t = r), (o = !0)),
          o
        );
      }),
      (p.versionCheck = p.fnVersionCheck =
        function (t) {
          for (
            var e,
              n,
              a = p.version.split("."),
              r = t.split("."),
              o = 0,
              i = r.length;
            o < i;
            o++
          )
            if ((e = parseInt(a[o], 10) || 0) !== (n = parseInt(r[o], 10) || 0))
              return n < e;
          return !0;
        }),
      (p.isDataTable = p.fnIsDataTable =
        function (e) {
          var n = t(e).get(0),
            a = !1;
          return (
            e instanceof p.Api ||
            (t.each(p.settings, function (e, r) {
              var o = r.nScrollHead ? t("table", r.nScrollHead)[0] : null,
                i = r.nScrollFoot ? t("table", r.nScrollFoot)[0] : null;
              (r.nTable !== n && o !== n && i !== n) || (a = !0);
            }),
            a)
          );
        }),
      (p.tables = p.fnTables =
        function (e) {
          var n = !1,
            a =
              (t.isPlainObject(e) && ((n = e.api), (e = e.visible)),
              t.map(p.settings, function (n) {
                if (!e || t(n.nTable).is(":visible")) return n.nTable;
              }));
          return n ? new eg(a) : a;
        }),
      (p.camelToHungarian = I),
      d("$()", function (e, n) {
        return (
          (n = t((n = this.rows(n).nodes()))),
          t([].concat(n.filter(e).toArray(), n.find(e).toArray()))
        );
      }),
      t.each(["on", "one", "off"], function (e, n) {
        d(n + "()", function () {
          var e = Array.prototype.slice.call(arguments),
            a =
              ((e[0] = t
                .map(e[0].split(/\s/), function (t) {
                  return t.match(/\.dt\b/) ? t : t + ".dt";
                })
                .join(" ")),
              t(this.tables().nodes()));
          return a[n].apply(a, e), this;
        });
      }),
      d("clear()", function () {
        return this.iterator("table", function (t) {
          tt(t);
        });
      }),
      d("settings()", function () {
        return new eg(this.context, this.context);
      }),
      d("init()", function () {
        var t = this.context;
        return t.length ? t[0].oInit : null;
      }),
      d("data()", function () {
        return this.iterator("table", function (t) {
          return C(t.aoData, "_aData");
        }).flatten();
      }),
      d("destroy()", function (n) {
        return (
          (n = n || !1),
          this.iterator("table", function (a) {
            var r,
              o = a.oClasses,
              i = a.nTable,
              l = a.nTBody,
              s = a.nTHead,
              u = a.nTFoot,
              c = t(i),
              l = t(l),
              f = t(a.nTableWrapper),
              d = t.map(a.aoData, function (t) {
                return t.nTr;
              }),
              u =
                ((a.bDestroying = !0),
                ea(a, "aoDestroyCallback", "destroy", [a]),
                n || new eg(a).columns().visible(!0),
                f.off(".DT").find(":not(tbody *)").off(".DT"),
                t(e).off(".DT-" + a.sInstance),
                i != s.parentNode &&
                  (c.children("thead").detach(), c.append(s)),
                u &&
                  i != u.parentNode &&
                  (c.children("tfoot").detach(), c.append(u)),
                (a.aaSorting = []),
                (a.aaSortingFixed = []),
                tZ(a),
                t(d).removeClass(a.asStripeClasses.join(" ")),
                t("th, td", s).removeClass(
                  o.sSortable +
                    " " +
                    o.sSortableAsc +
                    " " +
                    o.sSortableDesc +
                    " " +
                    o.sSortableNone
                ),
                l.children().detach(),
                l.append(d),
                a.nTableWrapper.parentNode),
              s = n ? "remove" : "detach",
              d =
                (c[s](),
                f[s](),
                !n &&
                  u &&
                  (u.insertBefore(i, a.nTableReinsertBefore),
                  c.css("width", a.sDestroyWidth).removeClass(o.sTable),
                  (r = a.asDestroyStripes.length)) &&
                  l.children().each(function (e) {
                    t(this).addClass(a.asDestroyStripes[e % r]);
                  }),
                t.inArray(a, p.settings));
            -1 !== d && p.settings.splice(d, 1);
          })
        );
      }),
      t.each(["column", "row", "cell"], function (t, e) {
        d(e + "s().every()", function (t) {
          var n = this.selector.opts,
            r = this;
          return this.iterator(e, function (o, i, l, s, u) {
            t.call(
              r[e](i, "cell" === e ? l : n, "cell" === e ? n : a),
              i,
              l,
              s,
              u
            );
          });
        });
      }),
      d("i18n()", function (e, n, r) {
        var o = this.context[0],
          e = Z(e)(o.oLanguage);
        return (
          e === a && (e = n),
          "string" ==
          typeof (e =
            r !== a && t.isPlainObject(e) ? (e[r] !== a ? e[r] : e._) : e)
            ? e.replace("%d", r)
            : e
        );
      }),
      (p.version = "1.13.5"),
      (p.settings = []),
      (p.models = {}),
      (p.models.oSearch = {
        bCaseInsensitive: !0,
        sSearch: "",
        bRegex: !1,
        bSmart: !0,
        return: !1,
      }),
      (p.models.oRow = {
        nTr: null,
        anCells: null,
        _aData: [],
        _aSortData: null,
        _aFilterData: null,
        _sFilterRow: null,
        _sRowStripe: "",
        src: null,
        idx: -1,
      }),
      (p.models.oColumn = {
        idx: null,
        aDataSort: null,
        asSorting: null,
        bSearchable: null,
        bSortable: null,
        bVisible: null,
        _sManualType: null,
        _bAttrSrc: !1,
        fnCreatedCell: null,
        fnGetData: null,
        fnSetData: null,
        mData: null,
        mRender: null,
        nTh: null,
        nTf: null,
        sClass: null,
        sContentPadding: null,
        sDefaultContent: null,
        sName: null,
        sSortDataType: "std",
        sSortingClass: null,
        sSortingClassJUI: null,
        sTitle: null,
        sType: null,
        sWidth: null,
        sWidthOrig: null,
      }),
      (p.defaults = {
        aaData: null,
        aaSorting: [[0, "asc"]],
        aaSortingFixed: [],
        ajax: null,
        aLengthMenu: [10, 25, 50, 100],
        aoColumns: null,
        aoColumnDefs: null,
        aoSearchCols: [],
        asStripeClasses: null,
        bAutoWidth: !0,
        bDeferRender: !1,
        bDestroy: !1,
        bFilter: !0,
        bInfo: !0,
        bLengthChange: !0,
        bPaginate: !0,
        bProcessing: !1,
        bRetrieve: !1,
        bScrollCollapse: !1,
        bServerSide: !1,
        bSort: !0,
        bSortMulti: !0,
        bSortCellsTop: !1,
        bSortClasses: !0,
        bStateSave: !1,
        fnCreatedRow: null,
        fnDrawCallback: null,
        fnFooterCallback: null,
        fnFormatNumber: function (t) {
          return t
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands);
        },
        fnHeaderCallback: null,
        fnInfoCallback: null,
        fnInitComplete: null,
        fnPreDrawCallback: null,
        fnRowCallback: null,
        fnServerData: null,
        fnServerParams: null,
        fnStateLoadCallback: function (t) {
          try {
            return JSON.parse(
              (-1 === t.iStateDuration ? sessionStorage : localStorage).getItem(
                "DataTables_" + t.sInstance + "_" + location.pathname
              )
            );
          } catch (e) {
            return {};
          }
        },
        fnStateLoadParams: null,
        fnStateLoaded: null,
        fnStateSaveCallback: function (t, e) {
          try {
            (-1 === t.iStateDuration ? sessionStorage : localStorage).setItem(
              "DataTables_" + t.sInstance + "_" + location.pathname,
              JSON.stringify(e)
            );
          } catch (n) {}
        },
        fnStateSaveParams: null,
        iStateDuration: 7200,
        iDeferLoading: null,
        iDisplayLength: 10,
        iDisplayStart: 0,
        iTabIndex: 0,
        oClasses: {},
        oLanguage: {
          oAria: {
            sSortAscending: ": activate to sort column ascending",
            sSortDescending: ": activate to sort column descending",
          },
          oPaginate: {
            sFirst: "First",
            sLast: "Last",
            sNext: "Next",
            sPrevious: "Previous",
          },
          sEmptyTable: "No data available in table",
          sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
          sInfoEmpty: "Showing 0 to 0 of 0 entries",
          sInfoFiltered: "(filtered from _MAX_ total entries)",
          sInfoPostFix: "",
          sDecimal: "",
          sThousands: ",",
          sLengthMenu: "Show _MENU_ entries",
          sLoadingRecords: "Loading...",
          sProcessing: "",
          sSearch: "Search:",
          sSearchPlaceholder: "",
          sUrl: "",
          sZeroRecords: "No matching records found",
        },
        oSearch: t.extend({}, p.models.oSearch),
        sAjaxDataProp: "data",
        sAjaxSource: null,
        sDom: "lfrtip",
        searchDelay: null,
        sPaginationType: "simple_numbers",
        sScrollX: "",
        sScrollXInner: "",
        sScrollY: "",
        sServerMethod: "GET",
        renderer: null,
        rowId: "DT_RowId",
      }),
      _(p.defaults),
      (p.defaults.column = {
        aDataSort: null,
        iDataSort: -1,
        asSorting: ["asc", "desc"],
        bSearchable: !0,
        bSortable: !0,
        bVisible: !0,
        fnCreatedCell: null,
        mData: null,
        mRender: null,
        sCellType: "td",
        sClass: "",
        sContentPadding: "",
        sDefaultContent: null,
        sName: "",
        sSortDataType: "std",
        sTitle: null,
        sType: null,
        sWidth: null,
      }),
      _(p.defaults.column),
      (p.models.oSettings = {
        oFeatures: {
          bAutoWidth: null,
          bDeferRender: null,
          bFilter: null,
          bInfo: null,
          bLengthChange: null,
          bPaginate: null,
          bProcessing: null,
          bServerSide: null,
          bSort: null,
          bSortMulti: null,
          bSortClasses: null,
          bStateSave: null,
        },
        oScroll: {
          bCollapse: null,
          iBarWidth: 0,
          sX: null,
          sXInner: null,
          sY: null,
        },
        oLanguage: { fnInfoCallback: null },
        oBrowser: {
          bScrollOversize: !1,
          bScrollbarLeft: !1,
          bBounding: !1,
          barWidth: 0,
        },
        ajax: null,
        aanFeatures: [],
        aoData: [],
        aiDisplay: [],
        aiDisplayMaster: [],
        aIds: {},
        aoColumns: [],
        aoHeader: [],
        aoFooter: [],
        oPreviousSearch: {},
        aoPreSearchCols: [],
        aaSorting: null,
        aaSortingFixed: [],
        asStripeClasses: null,
        asDestroyStripes: [],
        sDestroyWidth: 0,
        aoRowCallback: [],
        aoHeaderCallback: [],
        aoFooterCallback: [],
        aoDrawCallback: [],
        aoRowCreatedCallback: [],
        aoPreDrawCallback: [],
        aoInitComplete: [],
        aoStateSaveParams: [],
        aoStateLoadParams: [],
        aoStateLoaded: [],
        sTableId: "",
        nTable: null,
        nTHead: null,
        nTFoot: null,
        nTBody: null,
        nTableWrapper: null,
        bDeferLoading: !1,
        bInitialised: !1,
        aoOpenRows: [],
        sDom: null,
        searchDelay: null,
        sPaginationType: "two_button",
        iStateDuration: 0,
        aoStateSave: [],
        aoStateLoad: [],
        oSavedState: null,
        oLoadedState: null,
        sAjaxSource: null,
        sAjaxDataProp: null,
        jqXHR: null,
        json: a,
        oAjaxData: a,
        fnServerData: null,
        aoServerParams: [],
        sServerMethod: null,
        fnFormatNumber: null,
        aLengthMenu: null,
        iDraw: 0,
        bDrawing: !1,
        iDrawError: -1,
        _iDisplayLength: 10,
        _iDisplayStart: 0,
        _iRecordsTotal: 0,
        _iRecordsDisplay: 0,
        oClasses: {},
        bFiltered: !1,
        bSorted: !1,
        bSortCellsTop: null,
        oInit: null,
        aoDestroyCallback: [],
        fnRecordsTotal: function () {
          return "ssp" == ei(this)
            ? +this._iRecordsTotal
            : this.aiDisplayMaster.length;
        },
        fnRecordsDisplay: function () {
          return "ssp" == ei(this)
            ? +this._iRecordsDisplay
            : this.aiDisplay.length;
        },
        fnDisplayEnd: function () {
          var t = this._iDisplayLength,
            e = this._iDisplayStart,
            n = e + t,
            a = this.aiDisplay.length,
            r = this.oFeatures,
            o = r.bPaginate;
          return r.bServerSide
            ? !1 === o || -1 === t
              ? e + a
              : Math.min(e + t, this._iRecordsDisplay)
            : !o || a < n || -1 === t
            ? a
            : n;
        },
        oInstance: null,
        sInstance: null,
        iTabIndex: 0,
        nScrollHead: null,
        nScrollFoot: null,
        aLastSort: [],
        oPlugins: {},
        rowIdFn: null,
        rowId: null,
      }),
      (p.ext = f =
        {
          buttons: {},
          classes: {},
          builder: "-source-",
          errMode: "alert",
          feature: [],
          search: [],
          selector: { cell: [], column: [], row: [] },
          internal: {},
          legacy: { ajax: null },
          pager: {},
          renderer: { pageButton: {}, header: {} },
          order: {},
          type: { detect: [], search: {}, order: {} },
          _unique: 0,
          fnVersionCheck: p.fnVersionCheck,
          iApiIndex: 0,
          oJUIClasses: {},
          sVersion: p.version,
        }),
      t.extend(f, {
        afnFiltering: f.search,
        aTypes: f.type.detect,
        ofnSearch: f.type.search,
        oSort: f.type.order,
        afnSortData: f.order,
        aoFeatures: f.feature,
        oApi: f.internal,
        oStdClasses: f.classes,
        oPagination: f.pager,
      }),
      t.extend(p.ext.classes, {
        sTable: "dataTable",
        sNoFooter: "no-footer",
        sPageButton: "paginate_button",
        sPageButtonActive: "current",
        sPageButtonDisabled: "disabled",
        sStripeOdd: "odd",
        sStripeEven: "even",
        sRowEmpty: "dataTables_empty",
        sWrapper: "dataTables_wrapper",
        sFilter: "dataTables_filter",
        sInfo: "dataTables_info",
        sPaging: "dataTables_paginate paging_",
        sLength: "dataTables_length",
        sProcessing: "dataTables_processing",
        sSortAsc: "sorting_asc",
        sSortDesc: "sorting_desc",
        sSortable: "sorting",
        sSortableAsc: "sorting_desc_disabled",
        sSortableDesc: "sorting_asc_disabled",
        sSortableNone: "sorting_disabled",
        sSortColumn: "sorting_",
        sFilterInput: "",
        sLengthSelect: "",
        sScrollWrapper: "dataTables_scroll",
        sScrollHead: "dataTables_scrollHead",
        sScrollHeadInner: "dataTables_scrollHeadInner",
        sScrollBody: "dataTables_scrollBody",
        sScrollFoot: "dataTables_scrollFoot",
        sScrollFootInner: "dataTables_scrollFootInner",
        sHeaderTH: "",
        sFooterTH: "",
        sSortJUIAsc: "",
        sSortJUIDesc: "",
        sSortJUI: "",
        sSortJUIAscAllowed: "",
        sSortJUIDescAllowed: "",
        sSortJUIWrapper: "",
        sSortIcon: "",
        sJUIHeader: "",
        sJUIFooter: "",
      }),
      p.ext.pager);
  function e8(t, e) {
    var n = [],
      a = ey.numbers_length,
      r = Math.floor(a / 2);
    return (
      e <= a
        ? (n = s(0, e))
        : t <= r
        ? ((n = s(0, a - 2)).push("ellipsis"), n.push(e - 1))
        : ((e - 1 - r <= t
            ? (n = s(e - (a - 2), e))
            : ((n = s(t - r + 2, t + r - 1)).push("ellipsis"), n.push(e - 1), n)
          ).splice(0, 0, "ellipsis"),
          n.splice(0, 0, 0)),
      (n.DT_el = "span"),
      n
    );
  }
  function eC(t, e, n, a) {
    var r;
    return 0 === t || (t && "-" !== t)
      ? "number" == (r = typeof t) || "bigint" == r
        ? t
        : +(t =
            (t = e ? y(t, e) : t).replace && (n && (t = t.replace(n, "")), a)
              ? t.replace(a, "")
              : t)
      : -1 / 0;
  }
  function eT(e) {
    t.each(
      {
        num: function (t) {
          return eC(t, e);
        },
        "num-fmt": function (t) {
          return eC(t, e, v);
        },
        "html-num": function (t) {
          return eC(t, e, $);
        },
        "html-num-fmt": function (t) {
          return eC(t, e, $, v);
        },
      },
      function (t, n) {
        (f.type.order[t + e + "-pre"] = n),
          t.match(/^html\-/) && (f.type.search[t + e] = f.type.search.html);
      }
    );
  }
  function ew(t) {
    return "string" == typeof (t = Array.isArray(t) ? t.join(",") : t)
      ? t
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
      : t;
  }
  function ex(t, n, a, r, o) {
    return e.moment ? t[n](o) : e.luxon ? t[a](o) : r ? t[r](o) : t;
  }
  t.extend(ey, {
    simple: function (t, e) {
      return ["previous", "next"];
    },
    full: function (t, e) {
      return ["first", "previous", "next", "last"];
    },
    numbers: function (t, e) {
      return [e8(t, e)];
    },
    simple_numbers: function (t, e) {
      return ["previous", e8(t, e), "next"];
    },
    full_numbers: function (t, e) {
      return ["first", "previous", e8(t, e), "next", "last"];
    },
    first_last_numbers: function (t, e) {
      return ["first", e8(t, e), "last"];
    },
    _numbers: e8,
    numbers_length: 7,
  }),
    t.extend(!0, p.ext.renderer, {
      pageButton: {
        _: function (e, r, o, i, l, s) {
          var u,
            c,
            f,
            d = e.oClasses,
            h = e.oLanguage.oPaginate,
            p = e.oLanguage.oAria.paginate || {};
          try {
            f = t(r).find(n.activeElement).data("dt-idx");
          } catch (g) {}
          (function n(a, r) {
            for (
              var i,
                f,
                g,
                b = d.sPageButtonDisabled,
                $ = function (t) {
                  tO(e, t.data.action, !0);
                },
                m = 0,
                S = r.length;
              m < S;
              m++
            )
              if (Array.isArray((i = r[m]))) {
                var v = t("<" + (i.DT_el || "div") + "/>").appendTo(a);
                n(v, i);
              } else {
                switch (((u = null), (c = i), (f = e.iTabIndex), i)) {
                  case "ellipsis":
                    a.append('<span class="ellipsis">&#x2026;</span>');
                    break;
                  case "first":
                    (u = h.sFirst), 0 === l && ((f = -1), (c += " " + b));
                    break;
                  case "previous":
                    (u = h.sPrevious), 0 === l && ((f = -1), (c += " " + b));
                    break;
                  case "next":
                    (u = h.sNext),
                      (0 !== s && l !== s - 1) || ((f = -1), (c += " " + b));
                    break;
                  case "last":
                    (u = h.sLast),
                      (0 !== s && l !== s - 1) || ((f = -1), (c += " " + b));
                    break;
                  default:
                    (u = e.fnFormatNumber(i + 1)),
                      (c = l === i ? d.sPageButtonActive : "");
                }
                null !== u &&
                  ((v = e.oInit.pagingTag || "a"),
                  (g = -1 !== c.indexOf(b)),
                  ee(
                    t("<" + v + ">", {
                      class: d.sPageButton + " " + c,
                      "aria-controls": e.sTableId,
                      "aria-disabled": g ? "true" : null,
                      "aria-label": p[i],
                      role: "link",
                      "aria-current": c === d.sPageButtonActive ? "page" : null,
                      "data-dt-idx": i,
                      tabindex: f,
                      id:
                        0 === o && "string" == typeof i
                          ? e.sTableId + "_" + i
                          : null,
                    })
                      .html(u)
                      .appendTo(a),
                    { action: i },
                    $
                  ));
              }
          })(t(r).empty(), i),
            f !== a &&
              t(r)
                .find("[data-dt-idx=" + f + "]")
                .trigger("focus");
        },
      },
    }),
    t.extend(p.ext.type.detect, [
      function (t, e) {
        return o(t, (e = e.oLanguage.sDecimal)) ? "num" + e : null;
      },
      function (t, e) {
        var n;
        return (!t || t instanceof Date || m.test(t)) &&
          ((null !== (n = Date.parse(t)) && !isNaN(n)) || D(t))
          ? "date"
          : null;
      },
      function (t, e) {
        return o(t, (e = e.oLanguage.sDecimal), !0) ? "num-fmt" + e : null;
      },
      function (t, e) {
        return i(t, (e = e.oLanguage.sDecimal)) ? "html-num" + e : null;
      },
      function (t, e) {
        return i(t, (e = e.oLanguage.sDecimal), !0) ? "html-num-fmt" + e : null;
      },
      function (t, e) {
        return D(t) || ("string" == typeof t && -1 !== t.indexOf("<"))
          ? "html"
          : null;
      },
    ]),
    t.extend(p.ext.type.search, {
      html: function (t) {
        return D(t)
          ? t
          : "string" == typeof t
          ? t.replace(b, " ").replace($, "")
          : "";
      },
      string: function (t) {
        return D(t) || "string" != typeof t ? t : t.replace(b, " ");
      },
    }),
    t.extend(f.type.order, {
      "date-pre": function (t) {
        return isNaN((t = Date.parse(t))) ? -1 / 0 : t;
      },
      "html-pre": function (t) {
        return D(t)
          ? ""
          : t.replace
          ? t.replace(/<.*?>/g, "").toLowerCase()
          : t + "";
      },
      "string-pre": function (t) {
        return D(t)
          ? ""
          : "string" == typeof t
          ? t.toLowerCase()
          : t.toString
          ? t.toString()
          : "";
      },
      "string-asc": function (t, e) {
        return t < e ? -1 : e < t ? 1 : 0;
      },
      "string-desc": function (t, e) {
        return t < e ? 1 : e < t ? -1 : 0;
      },
    }),
    eT(""),
    t.extend(!0, p.ext.renderer, {
      header: {
        _: function (e, n, a, r) {
          t(e.nTable).on("order.dt.DT", function (t, o, i, l) {
            e === o &&
              ((o = a.idx),
              n
                .removeClass(r.sSortAsc + " " + r.sSortDesc)
                .addClass(
                  "asc" == l[o]
                    ? r.sSortAsc
                    : "desc" == l[o]
                    ? r.sSortDesc
                    : a.sSortingClass
                ));
          });
        },
        jqueryui: function (e, n, a, r) {
          t("<div/>")
            .addClass(r.sSortJUIWrapper)
            .append(n.contents())
            .append(
              t("<span/>").addClass(r.sSortIcon + " " + a.sSortingClassJUI)
            )
            .appendTo(n),
            t(e.nTable).on("order.dt.DT", function (t, o, i, l) {
              e === o &&
                ((o = a.idx),
                n
                  .removeClass(r.sSortAsc + " " + r.sSortDesc)
                  .addClass(
                    "asc" == l[o]
                      ? r.sSortAsc
                      : "desc" == l[o]
                      ? r.sSortDesc
                      : a.sSortingClass
                  ),
                n
                  .find("span." + r.sSortIcon)
                  .removeClass(
                    r.sSortJUIAsc +
                      " " +
                      r.sSortJUIDesc +
                      " " +
                      r.sSortJUI +
                      " " +
                      r.sSortJUIAscAllowed +
                      " " +
                      r.sSortJUIDescAllowed
                  )
                  .addClass(
                    "asc" == l[o]
                      ? r.sSortJUIAsc
                      : "desc" == l[o]
                      ? r.sSortJUIDesc
                      : a.sSortingClassJUI
                  ));
            });
        },
      },
    });
  var e_ = !1;
  function eI(t, n, a) {
    var r;
    if (e.moment) {
      if (!(r = e.moment.utc(t, n, a, !0)).isValid()) return null;
    } else if (e.luxon) {
      if (
        !(r =
          n && "string" == typeof t
            ? e.luxon.DateTime.fromFormat(t, n)
            : e.luxon.DateTime.fromISO(t)).isValid
      )
        return null;
      r.setLocale(a);
    } else
      n
        ? (e_ ||
            alert(
              "DataTables warning: Formatted date without Moment.js or Luxon - https://datatables.net/tn/17"
            ),
          (e_ = !0))
        : (r = new Date(t));
    return r;
  }
  function eA(t) {
    return function (e, n, r, o) {
      0 === arguments.length
        ? ((r = "en"), (e = n = null))
        : 1 === arguments.length
        ? ((r = "en"), (n = e), (e = null))
        : 2 === arguments.length && ((r = n), (n = e), (e = null));
      var i = "datetime-" + n;
      return (
        p.ext.type.order[i] ||
          (p.ext.type.detect.unshift(function (t) {
            return t === i && i;
          }),
          (p.ext.type.order[i + "-asc"] = function (t, e) {
            return (t = t.valueOf()) === (e = e.valueOf()) ? 0 : t < e ? -1 : 1;
          }),
          (p.ext.type.order[i + "-desc"] = function (t, e) {
            return (t = t.valueOf()) === (e = e.valueOf()) ? 0 : e < t ? -1 : 1;
          })),
        function (l, s) {
          var u;
          return (
            (null !== l && l !== a) ||
              (l =
                "--now" === o
                  ? ((u = new Date()),
                    new Date(
                      Date.UTC(
                        u.getFullYear(),
                        u.getMonth(),
                        u.getDate(),
                        u.getHours(),
                        u.getMinutes(),
                        u.getSeconds()
                      )
                    ))
                  : ""),
            "type" === s
              ? i
              : "" === l
              ? "sort" !== s
                ? ""
                : eI("0000-01-01 00:00:00", null, r)
              : (null === n ||
                  e !== n ||
                  "sort" === s ||
                  "type" === s ||
                  l instanceof Date) &&
                null !== (u = eI(l, e, r))
              ? "sort" === s
                ? u
                : ((l =
                    null === n
                      ? ex(u, "toDate", "toJSDate", "")[t]()
                      : ex(u, "format", "toFormat", "toISOString", n)),
                  "display" === s ? ew(l) : l)
              : l
          );
        }
      );
    };
  }
  var eF = ",",
    eL = ".";
  if (e.Intl !== a)
    try {
      for (
        var eR = new Intl.NumberFormat().formatToParts(100000.1), eP = 0;
        eP < eR.length;
        eP++
      )
        "group" === eR[eP].type
          ? (eF = eR[eP].value)
          : "decimal" === eR[eP].type && (eL = eR[eP].value);
    } catch (ej) {}
  function eH(t) {
    return function () {
      var e = [t4(this[p.ext.iApiIndex])].concat(
        Array.prototype.slice.call(arguments)
      );
      return p.ext.internal[t].apply(this, e);
    };
  }
  return (
    (p.datetime = function (t, e) {
      var n = "datetime-detect-" + t;
      (e = e || "en"),
        p.ext.type.order[n] ||
          (p.ext.type.detect.unshift(function (a) {
            var r = eI(a, t, e);
            return !("" !== a && !r) && n;
          }),
          (p.ext.type.order[n + "-pre"] = function (n) {
            return eI(n, t, e) || 0;
          }));
    }),
    (p.render = {
      date: eA("toLocaleDateString"),
      datetime: eA("toLocaleString"),
      time: eA("toLocaleTimeString"),
      number: function (t, e, n, r, o) {
        return (
          (null !== t && t !== a) || (t = eF),
          (null !== e && e !== a) || (e = eL),
          {
            display: function (a) {
              if (
                ("number" != typeof a && "string" != typeof a) ||
                "" === a ||
                null === a
              )
                return a;
              var i = a < 0 ? "-" : "",
                l = parseFloat(a);
              return isNaN(l)
                ? ew(a)
                : ((l = parseInt((a = Math.abs((l = l.toFixed(n)))), 10)),
                  (a = n ? e + (a - l).toFixed(n).substring(2) : ""),
                  (i = 0 === l && 0 === parseFloat(a) ? "" : i) +
                    (r || "") +
                    l.toString().replace(/\B(?=(\d{3})+(?!\d))/g, t) +
                    a +
                    (o || ""));
            },
          }
        );
      },
      text: function () {
        return { display: ew, filter: ew };
      },
    }),
    t.extend(p.ext.internal, {
      _fnExternApiFunc: eH,
      _fnBuildAjax: th,
      _fnAjaxUpdate: tp,
      _fnAjaxParameters: tg,
      _fnAjaxUpdateDraw: tb,
      _fnAjaxDataSrc: t$,
      _fnAddColumn: H,
      _fnColumnOptions: N,
      _fnAdjustColumnSizing: O,
      _fnVisibleToColumnIndex: k,
      _fnColumnIndexToVisible: W,
      _fnVisbleColumns: M,
      _fnGetColumns: E,
      _fnColumnTypes: B,
      _fnApplyColumnDefs: U,
      _fnHungarianMap: _,
      _fnCamelToHungarian: I,
      _fnLanguageCompat: A,
      _fnBrowserDetect: P,
      _fnAddData: V,
      _fnAddTr: X,
      _fnNodeToDataIndex: function (t, e) {
        return e._DT_RowIndex !== a ? e._DT_RowIndex : null;
      },
      _fnNodeToColumnIndex: function (e, n, a) {
        return t.inArray(a, e.aoData[n].anCells);
      },
      _fnGetCellData: J,
      _fnSetCellData: q,
      _fnSplitObjNotation: Y,
      _fnGetObjectDataFn: Z,
      _fnSetObjectDataFn: K,
      _fnGetDataMaster: Q,
      _fnClearTable: tt,
      _fnDeleteIndex: te,
      _fnInvalidate: tn,
      _fnGetRowElements: ta,
      _fnCreateTr: tr,
      _fnBuildHead: ti,
      _fnDrawHead: tl,
      _fnDraw: ts,
      _fnReDraw: tu,
      _fnAddOptionsHtml: tc,
      _fnDetectHeader: tf,
      _fnGetUniqueThs: td,
      _fnFeatureHtmlFilter: tm,
      _fnFilterComplete: tS,
      _fnFilterCustom: tv,
      _fnFilterColumn: tD,
      _fnFilter: ty,
      _fnFilterCreateSearch: t8,
      _fnEscapeRegex: tC,
      _fnFilterData: tx,
      _fnFeatureHtmlInfo: tA,
      _fnUpdateInfo: tF,
      _fnInfoMacros: tL,
      _fnInitialise: tR,
      _fnInitComplete: tP,
      _fnLengthChange: tj,
      _fnFeatureHtmlLength: tH,
      _fnFeatureHtmlPaginate: tN,
      _fnPageChange: tO,
      _fnFeatureHtmlProcessing: tk,
      _fnProcessingDisplay: tW,
      _fnFeatureHtmlTable: tM,
      _fnScrollDraw: tE,
      _fnApplyToChildren: tB,
      _fnCalculateColumnWidths: t0,
      _fnThrottle: tV,
      _fnConvertToWidth: tX,
      _fnGetWidestNode: tJ,
      _fnGetMaxLenString: tq,
      _fnStringToCss: t9,
      _fnSortFlatten: tG,
      _fnSort: tz,
      _fnSortAria: tY,
      _fnSortListener: t1,
      _fnSortAttachListener: t6,
      _fnSortingClasses: tZ,
      _fnSortData: t2,
      _fnSaveState: t3,
      _fnLoadState: t5,
      _fnImplementState: tK,
      _fnSettingsFromNode: t4,
      _fnLog: t7,
      _fnMap: tQ,
      _fnBindAction: ee,
      _fnCallbackReg: en,
      _fnCallbackFire: ea,
      _fnLengthOverflow: er,
      _fnRenderer: eo,
      _fnDataSource: ei,
      _fnRowAttributes: to,
      _fnExtend: et,
      _fnCalculateEnd: function () {},
    }),
    (((t.fn.dataTable = p).$ = t).fn.dataTableSettings = p.settings),
    (t.fn.dataTableExt = p.ext),
    (t.fn.DataTable = function (e) {
      return t(this).dataTable(e).api();
    }),
    t.each(p, function (e, n) {
      t.fn.DataTable[e] = n;
    }),
    p
  );
});
