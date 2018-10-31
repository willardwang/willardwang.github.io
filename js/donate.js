(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.vdonate = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var defaults = {
    title: '您的支持将鼓励我继续创作!',
    btnText: '打赏支持'
  };
  var bd = document.body;
  var isShow = false;

  var Donate =
  /*#__PURE__*/
  function () {
    function Donate(options) {
      _classCallCheck(this, Donate);

      if (arguments[0] && _typeof(arguments[0]) === "object") {
        this.options = Object.assign({}, defaults, options);
      }

      if (!this.options.wechatImage) {
        throw new Error('wechatImage is required');
      }

      if (!this.options.alipayImage) {
        throw new Error('alipayImage is required');
      }

      this.el = this.options.el && this.options.el;
      this.render();
      this.bind();
    }

    _createClass(Donate, [{
      key: "render",
      value: function render() {
        var modalTpl = "\n      <div class=\"donate-modal-background\">\n        <div class=\"donate-modal\">\n          <p class=\"donate-quote\">\n            <i class=\"donate-quote-left\"></i>\n            <span class=\"donate-quote-word\">".concat(this.options.title, "</span>\n            <i class=\"donate-quote-right\"></i>\n          </p>\n          <div class=\"donate-tab\">\n            <a href=\"javascript:;\" class=\"donate-wechat active\" data-index=\"0\">\u5FAE\u4FE1</a>\n            <a href=\"javascript:;\" class=\"donate-alipay\" data-index=\"1\">\u652F\u4ED8\u5B9D</a>\n            <img src=\"").concat(this.options.wechatImage, "\" alt=\"wechat\" class=\"donate-image active\">\n            <img src=\"").concat(this.options.alipayImage, "\" alt=\"alipay\" class=\"donate-image\">\n          </div>\n        </div>\n      </div>\n    ");
        var btnTpl = "\n      <div class=\"donate-btn\">".concat(this.options.btnText, "</div>\n    ");
        if (this.el) this.el.innerHTML = btnTpl;
        this.modal = document.createElement('div');
        this.modal.innerHTML = modalTpl;
        this.modal.id = 'donate-modal-container';
        bd.appendChild(this.modal);
      }
    }, {
      key: "bind",
      value: function bind() {
        var self = this;
        this.btns = this.modal.querySelectorAll('.donate-tab a');
        this.images = this.modal.querySelectorAll('.donate-tab .donate-image');
        this.modal.addEventListener('click', this._modalEvent.bind(self), false);

        if (!this.el) {
          return;
        }

        this.el.addEventListener('click', this._donateBtnEvent.bind(self), false);
      }
    }, {
      key: "_modalEvent",
      value: function _modalEvent(e) {
        e.stopPropagation();
        var index = e.target.dataset.index;

        if (index) {
          [].slice.call(this.btns).forEach(function (btn) {
            btn.classList.toggle('active');
          });
          [].slice.call(this.images).forEach(function (image) {
            image.classList.toggle('active');
          });
          return;
        }

        this.hide();
      }
    }, {
      key: "_donateBtnEvent",
      value: function _donateBtnEvent(e) {
        if (e.target.className === 'donate-btn') {
          this.show();
        }
      }
    }, {
      key: "show",
      value: function show() {
        if (isShow) return;
        this.modal.classList.add('active');
        this.modal.querySelector('.donate-modal').classList.add("ready")
        var m = this.modal
        setTimeout(function() {
          m.querySelector('.donate-modal').classList.add("in")
        }, 0);
        isShow = true;
      }
    }, {
      key: "hide",
      value: function hide() {
        this.modal.classList.remove('active');
        this.modal.querySelector('.donate-modal').classList.remove('in');
        var m = this.modal
        setTimeout(function() {
          m.querySelector('.donate-modal').classList.remove('ready');
        }, 300);
        isShow = false;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var self = this;
        this.modal.removeEventListener('click', this._modalEvent.bind(self), false);
        this.el.removeEventListener('click', this._donateBtnEvent.bind(self), false);
        bd.removeChild(this.modal);
      }
    }]);

    return Donate;
  }();

  return Donate;

})));
