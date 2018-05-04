function TokenInput(settings) {
    this.results = ((settings.results == undefined)?3:settings.results);
    this.input = ((settings.input == undefined)?null:settings.input);
    this.url = ((settings.url == undefined)?"":settings.url);
    this.label = ((settings.label == undefined)?undefined:settings.label);
    this.callback = ((settings.callback == undefined)?null:settings.callback);
    this.chars = ((settings.chars == undefined)?3:settings.chars);
    this.theme = ((settings.theme == undefined)?'':settings.theme);
    this.post = ((settings.post == undefined)?[]:settings.post);
    this.placeholder = null;
    this.tokenInput = null;
    this.button = ((settings.button == undefined)?null:settings.button);
    this.value = "";
    this.selectedValue = "";
    this.selectedPhoto = "";

    this.init();


}

TokenInput.prototype = {
    init: function() {
        var obj = this;
        var tmpInput = $('#' + obj.input);
        this.tokenInput = $('<div class = "token-input"></div>');
        this.tokenInput.append('<div class = "input-group"></div>');
        tmpInput.before(this.tokenInput);
        if (this.label != undefined) this.tokenInput.find('.input-group').append('<span class = "token-label">' + this.label + '</span>');
        this.tokenInput.find('.input-group').append(tmpInput);
        this.tokenInput.addClass(this.theme);
        if (this.button != undefined) {
            this.tokenInput.find('.input-group').append('<span class="token-button"><button class = "btn btn-link btn-green">' + this.button.text + '</button></span>');
            this.tokenInput.find('.token-button button').click(function() {
                obj.button.callback(obj);
            });
        }

        this.tokenInput.find('input').focusin(function() {
            obj.createPlaceholder();
        });

        this.tokenInput.find('input').keyup(function() {
            obj.value = obj.tokenInput.find('input').val();
            obj.search();
        });
        this.tokenInput.focusout(function() {
        });


    },
    createPlaceholder: function() {
        if (this.placeholder != null) return;
        this.placeholder = $('<ul class = "placeholder"><li><span>Введите минимум ' + this.chars + ' символа чтобы начать поиск</span></li></ul>');
        this.tokenInput.append(this.placeholder);
        if (this.value.length >= this.chars) this.search();

    },
    removePlacehoder: function() {
        this.placeholder.remove();
        this.placeholder = null;
    },
    search: function() {
        var obj = this;
        this.placeholder.html('');

        var keyword = this.value;
        if (keyword.length < this.chars) {
            this.placeholder.append('<li><span>Введите минимум ' + this.chars + ' символа чтобы начать поиск</span></li>');
            return;
        }


        this.placeholder.append('<li><span>Идет поиск..</span></li>');

        this.post.keyword = this.value;
        this.post.limit = this.results;

        $.ajax({
           url: obj.url,
            type: 'POST',
            data: obj.post,
            success: function(data) {
                data = JSON.parse(data);
                obj.placeholder.html('');
                if (data.length != 0) {
                    for (var i = 0; i < data.length; i ++) {
                        (function(){
                            var item = data[i];
                            var newItem = $('<li><a href = "#" onclick = "return false;"><img src = "' + item.photo + '"><div class = "item-text"><div class = "centered"><span>' + item.text + '</span></div></div></a></li>');
                            newItem.find('a').click(function() {
                                obj.tokenInput.find('input').val(item.text);
                                obj.value = item.text;
                                obj.selectedValue = item.value;
                                obj.selectedPhoto = item.photo;
                                obj.removePlacehoder();
                                if (obj.callback != null) obj.callback(obj);
                            });
                            obj.placeholder.append(newItem);
                        })();
                    }
                } else {
                   obj.placeholder.append('<li><span>Данные не найдены</span></li>');
                }
            },
            error: function() {
                obj.placeholder.html('');
                obj.placeholder.append('<li><span>При поиске возникла ошибка пожалуйста перезагрузите страницу</span></li>');
            }
        });
    }
}


function PopUp(settings) {
    this.closed = false;
    this.toAppend = $('body');
    this.title = null;
    this.controls = {ok: null, cancel: null};
    this.callback = null;
    this.buttons = {ok: null, cancel: null};
    this.content = settings.html.clone();
    this.height = null;
    this.content.find('[data-id]').each(function(i) {
        var obj = $(this);
        obj.attr('id', obj.attr('data-id'));
    })

    this.additionalButtons = null;

    if (settings.height != undefined) this.height = settings.height;
    if (settings.parent != undefined) toAppend = settings.parent;
    if (settings.title != undefined) this.title = settings.title;
    if (settings.buttons != undefined) {
        if (settings.buttons.ok != undefined) this.controls.ok = settings.buttons.ok;
        if (settings.buttons.cancel != undefined) this.controls.cancel = settings.buttons.cancel;
    }
    if (settings.callback != undefined) this.callback = settings.callback;
    if (settings.additionalButtons != undefined) this.additionalButtons = settings.additionalButtons;

    this.createPopUp();


    return this;
}

PopUp.prototype = {
    createPopUp: function() {
        var obj = this;
        this.popup = $('<div class = "popup fadeIn animated"><div>');
        var popup = $('<div class = "page-container popup-content bounceInDown animated"><div>');
        var header = $('<div class = "popup-header"><h2></h2></div>');
        if (this.title != null) {
            header.find('h2').html(this.title);
            popup.append(header);
            this.popup.append(popup);
        }
        var body = $('<div class = "popup-body"><div>');
        if (this.height != null) body.css('height', this.height);
        this.popup.click(function(e) {
            if (e.target.classList.contains("popup")) obj.close();
        });

        var closeCross = $('<a href = "#" class = "popup-close" onclick = "return false"><i class = "fa fa-times fa-fw"></i></a>');
        closeCross.click(function() { obj.close()});
        popup.append(closeCross);

        body.append(this.content);
        popup.append(body);


        var controls = $('<div class = "popup-controls"></div>');

        var ok = $('<button class = "btn btn-link btn-blue btn-lg btn-square btn-inverse">OK</button>');
        if (this.controls.ok != null) ok.html(this.controls.ok);
        this.buttons.ok = ok;
        if (this.callback != null) ok.click(function() {
            obj.callback(obj);
        }); else ok.click(function() {
            obj.close();
        })
        controls.append(ok);
        controls.append('&nbsp;')



        if (this.additionalButtons != null) {
            for (var i in this.additionalButtons) {
                var button = this.additionalButtons[i];
                var buttonHtml = $('<button class = "' + button.classes + '">' + button.text + '</button>');
                buttonHtml.click(function() {
                    button.callback(obj);
                });
                controls.append(buttonHtml);
                controls.append('&nbsp;');
            }

        }

        var cancel = $('<button class = "btn btn-link btn-red btn-lg btn-square btn-inverse">Cancel</button>');
        if (this.controls.cancel != null) {

            cancel.html(this.controls.cancel);
            this.buttons.cancel = cancel;
            cancel.click(function() {
                obj.close();
            });
            controls.append(cancel);
        }

        popup.append(controls);

        this.popup.append(popup);

        this.appendPopUp();
    },
    appendPopUp: function() {
        this.toAppend.append(this.popup);
    },
    close: function(forced) {
        var obj = this;
        if ((this.buttons.cancel == null && forced == undefined) || (forced == undefined && this.buttons.cancel != null)) {
            alertify.confirm("Подтверждение", "Закрыть окно?", function() {
                obj.popup.removeClass('fadeIn animated');
                obj.popup.addClass('fadeOut animated');
                setTimeout(function() {obj.popup.remove(); obj.closed = true}, 600);
            }, function() {});
        } else {
            obj.popup.removeClass('fadeIn animated');
            obj.popup.addClass('fadeOut animated');
            setTimeout(function() {obj.popup.remove(); obj.closed = true;}, 600);

        }


    }
}

function Calendar(__url, id) {
	var el = $('#new-calendar');
	el.attr('id', id).removeClass('hidden')
	this.prevButton = el.find('.left-arrow');
	this.nextButton = el.find('.right-arrow');
	this.monthPlaceholder = el.find('.date');
	this.body = el.find('tbody');
	this.month = new Date().getMonth() * 1;
	this.year = new Date().getFullYear() * 1;
	this.placeholder = el.find('.new-placeholder');
	this._url = __url;
	this.id = id;
	this.loading = false;

	this.monthList = {
		0: "Январь",
		1: "Февраль",
		2: "Март",
		3: "Апрель",
		4: "Май",
		5: "Июнь",
		6: "Июль",
		7: "Август",
		8: "Сентябрь",
		9: "Октябрь",
		10: "Ноябрь",
		11: "Декабрь"
	}

	this.initEvents();
	this.loadEvents();

	return this;
}
//
Calendar.prototype = {
	initEvents: function() {
		var obj = this;
		obj.prevButton.click(function() {
			obj.month --;
			if (obj.month < 0) {
				obj.month = 11;
				obj.year --;
			}
			obj.loadEvents();
		});
		obj.nextButton.click(function() {
			obj.month ++;
			if (obj.month > 11) {
				obj.month = 0;
				obj.year ++;
			}
			obj.loadEvents();
		});
	},

	makeFields: function() {
		var obj = this;
		obj.body.html('');

		var day = new Date(obj.year, obj.month, 1).getUTCDay();
		var pastMonthDay = new Date(obj.year, obj.month, 0).getDate() - day + 1;

		var pastDays = day;

		var tmpWeek = $('<tr></tr>');

		for (var i = 0; i < pastDays; i ++) {
			tmpWeek.append('<td class = "prev-month">' + (pastMonthDay ++) + '</td>');
		}

		var ok = false;
		for (var i = 0; i < new Date(obj.year, obj.month + 1, 0).getDate(); i ++) {
			tmpWeek.append('<td id = "calendar-day-' + obj.id + '-'+ (i + 1) + '">' + (i + 1) + '</td>');
			day ++;
			ok = false;
			if (day > 6) {
				day = 0;
				obj.body.append(tmpWeek);
				tmpWeek = $('<tr></tr>');
				ok = true;
			}
		}
		if (!ok) {
			for (var i = day + 1; i <= 7; i ++) {
				tmpWeek.append('<td class = "prev-month">' + (i - day) + '</td>');
			}
			obj.body.append(tmpWeek);
		}
	},

	PopulateEvent: function(event) {
		var obj = this;
		var day = $('#calendar-day-' + obj.id + '-' + event.time);
		day.addClass('has-event');
		if (new Date().getTime() > new Date(obj.year, obj.month, event.time)) day.addClass('past');

		var tmpPlaceholder = obj.placeholder.clone();
		tmpPlaceholder.removeClass('new-placeholder hidden').addClass('event-placeholder');

		tmpPlaceholder.html(event.content);

		day.append(tmpPlaceholder);

		day.click(function() {
			if (tmpPlaceholder.hasClass('active')) {
				tmpPlaceholder.removeClass('active');
			} else {
				tmpPlaceholder.addClass('active');
				setTimeout(function() {
					$(document).one('click', function() {
						tmpPlaceholder.removeClass('active');
					});
				}, 1);
			}
		});
	},

	loadEvents: function() {
		var obj = this;

		if (obj.loading) {
			return;
		}

		obj.loading = true;

		$.ajax({
			url: obj._url,
			type: 'POST',
			data: { month: obj.month, year: obj.year },
			success: function(data) {
				obj.loading = false;
				if (data == "FAIL") {
					alertify.alert('Ошибка', "Не удалось загрузить календарь, пожалуйста, попробуйте перезагрузить страницу");
					return;
				}

				data = JSON.parse(data);

				obj.makeFields();

				for (var i in data) {
					var event = data[i];
					obj.PopulateEvent(event);
				}
				obj.monthPlaceholder.html(obj.monthList[obj.month] + " " + obj.year);

			},
			error: function(data) {
				obj.loading = false;
				alertify.alert('Ошибка', "Не удалось загрузить календарь, пожалуйста, попробуйте перезагрузить страницу");
			}
		});
	}
}

function DropDown(el, options) {
	this.dd = el;
	this.placeholder = this.dd.children('span');
	this.opts = this.dd.find('ul.custom-dropdown > li');
	this.val = '';
	this.index = -1;
	this.input = $(el.attr('data-for'));
	this.initEvents();
	this.toSend = el.attr('data-toSend');
    this.initialPlaceholder = (options != undefined && options.initialPlaceholder != undefined)?options.initialPlaceholder:"Выберите нужный пункт";
    if (this.dd.attr('data-title') != undefined && this.dd.attr('data-title') != "") this.initialPlaceholder = this.dd.attr('data-title');
    this.placeholder.text(this.initialPlaceholder);
	if (options != undefined && options.initialItem != undefined && this.opts.length > 0) {
		this.setItem($(this.opts[options.initialItem]));
	}

    return this;
}

DropDown.prototype = {
	initEvents : function() {
		var obj = this;

		obj.dd.on('click', function(event){
			$(this).toggleClass('active');
			return false;
		});

		obj.opts.on('click',function(){
			var opt = $(this);
			obj.setItem(opt);
		});
	},
	setItem: function(opt) {
		var obj = this;

		if (opt == undefined || opt == null) {
			obj.input.val("");
			obj.placeholder.html(obj.initialPlaceholder);
		} else {
			obj.val = opt.text();
			obj.index = opt.index();
			obj.placeholder.text(obj.val);
			if (opt.attr('data-toSend') != undefined) {
				obj.input.val(opt.attr('data-toSend')).trigger('change');
			} else {
				obj.input.val(obj.val).trigger('change');
			}
		}
	},
	getValue : function() {
		return this.val;
	},
	getIndex : function() {
		return this.index;
	},
    addItems: function(jsonString) {
        var newItems = JSON.parse(jsonString);
        for (var i = 0; i < newItems.length; i ++) {
            this.dd.find('ul.custom-dropdown').append('<li '+((newItems[i].value != undefined && newItems[i].value != null)?'data-tosend = "'+newItems[i].value+'"':'')+' ><a href = "#">'+newItems[i].text+'</a></li>');
        }
        this.opts = this.dd.find('ul.custom-dropdown > li');
        this.opts.unbind('click');
        this.dd.unbind('click');
        this.initEvents();
        return this;
    },
    addItem: function(value, text) {
        this.dd.find('ul.custom-dropdown').append('<li '+((value != undefined && value != null)?'data-tosend = "'+value+'"':'')+' ><a href = "#">'+text+'</a></li>');
        return this;
    },
    rebind: function() {
        this.opts = this.dd.find('ul.custom-dropdown > li');
        this.opts.unbind('click');
        this.dd.unbind('click');
        this.initEvents();
        return this;
    },
    clear: function() {
        this.dd.find('ul.custom-dropdown > li').remove();
        this.opts = this.dd.find('ul.custom-dropdown > li');
        this.opts.unbind('click');
        this.dd.unbind('click');
        this.initEvents();
        this.val = '';
        this.input.val('');
        this.placeholder.text(this.initialPlaceholder);
        return this;
    }
}

function html_decode(str) {
	return String(str)
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
}

function html_encode(str) {
    return String(str)
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}


