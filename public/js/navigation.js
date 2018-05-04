
window.api = "http://api.victory.kz";

if (window.location.hostname == 'designvictory.loc') {
	window.api = 'http://apivictory.loc';
} else if (window.location.hostname == "victorypc.ru" || window.location.hostname == "www.victorypc.ru") {
    window.api = "http://api.victorypc.ru"
} else if (window.location.hostname == "www") {
    window.api = 'http://api';
} else if (window.location.hostname == "victory.loc") {
    window.api = 'http://api.victory.loc';
}

window.navigation = null;
window.asyncRequests = true;

$(document).ready( function() {

    if (window.navigation == null) window.navigation = new Navigation("/products");

	alertify.defaults.glossary.cancel = "Отмена";

	$.address.change(function(event) {  
		var path = event.value;
		if (path == "/") {
			window.location.replace(window.navigation.mainPage);
			return;
		}
		window.navigation.Navigate(path);
	});
});

function NavigationQueue() {
    this.queue = [];
    this.navigating = false;
    this.id = 0;
}
NavigationQueue.prototype.addPage = function(path) {
    var self = this;
    this.queue.push({id: self.id, path: path});
    return self.id ++;
}
NavigationQueue.prototype.lastPage = function() {
    return this.queue[this.queue.length - 1];
}
NavigationQueue.prototype.parseUrl = function (url) {
    var result = {
        fullPath: url,
        parsedPath: url,
        controller: 'navigation',
        action: 'index',
        ids: [],
        scroll: 0
    }



    var pathParts = result.fullPath.split('&');
    if (pathParts.length > 1) result.scroll = pathParts[1];
    pathParts = pathParts[0];
    result.parsedPath = pathParts;
    var pathParts = result.fullPath.split('/');
    if (pathParts[1] != undefined && pathParts[1] != null && pathParts[1] != "") result.controller = pathParts[1];
    if (pathParts[2] != undefined && pathParts[2] != null && pathParts[2] != "") result.action = pathParts[2];
    for (var i = 3; i < pathParts.length; i ++) result.ids.push(pathParts[i]);
    return result;
}

function Navigation(mainPage) {
    this.mainPage = mainPage;
    this.navigationQueue = new NavigationQueue();
    this.pagesToNavigate = [];
    this.content = $('#content');
    this.preloader = $('#content-preloader');
    this.navigationUnits = [];
    this.navigationMenu = $('#nav-units');
    this.init();
};
Navigation.prototype.NavigateToPage = function(path) {
    var self = this;
    var navigationId = null;
    if (this.navigationQueue.navigating) {
        navigationId = this.navigationQueue.addPage(path);
        return;
    } else {
        this.navigationQueue = new NavigationQueue();
        navigationId = this.navigationQueue.addPage(path);
    }
    var parsedUrl = this.navigationQueue.parseUrl(path);

    $.ajax({
        url: parsedUrl.parsedPath,
        type: 'GET',
        async: window.asyncRequests,
        beforeSend: function() {
            self.navigationQueue.navigating = true;
            self.preloader.removeClass('hidden');
            self.content.css('opacity', '0');
            /*window.slider.hide('hidden');*/
        },
        success: function(data) {
            var sendedNavigationId = navigationId;
            console.log(parsedUrl);
            var scroll = parsedUrl.scroll;
            var fullPath = parsedUrl.fullPath;
            var lastPage = self.navigationQueue.lastPage();
            if (lastPage.id == sendedNavigationId) {
                self.content.html(data);
                self.navigationQueue.navigating = false;
                self.preloader.addClass('hidden');
                self.content.css('opacity','1');
                $(window).scrollTo((scroll == "")?0:$('#'+scroll).offset().top, 200);
                self.MarkActiveUrl(fullPath);
            } else {
                self.navigationQueue.navigating = false;
                self.NavigateToPage(lastPage.path);
            }
        },
        error: function(data) {
            var sendedNavigationId = navigationId;
            var lastPage = self.navigationQueue.lastPage();
            if (lastPage.id == sendedNavigationId) {
                self.navigationQueue.navigating = false;
                self.preloader.addClass('hidden');
                self.content.css('opacity','1');
                alertify.notify('Произошла ошибка при загрузке странице, проверте адрес или попробуйте еще раз', 'error', 2);
            } else {
                self.navigationQueue.navigating = false;
                self.NavigateToPage(lastPage.path);
            }
        }
    });
}
Navigation.prototype.init = function() {
    this.navigationUnits = [
        [{
            type: 'url',
            data: '/news'
        }],
        [{
                type: 'controllers',
                data: ['products', 'category']
        }],
        [{
                type: 'url',
                data: '/contacts'
        }],
        [{
                type: 'url',
                data: '/help'
        }],
        [{
                type: 'url',
                data: '/about'
        }],
        [{
                type: 'url',
                data: '/warranty'
        }]
    ];
    Navigation.prototype.Navigate = function(path) {
        this.NavigateToPage(path);
    }
}
Navigation.prototype.ProductNavigationInit = function(callback) {
    self = this;
    Navigation.prototype.Navigate = function(path) {
        var parsedUrl = self.navigationQueue.parseUrl(path);
        if (parsedUrl.controller != "category") {
            if ((parsedUrl.controller == "products" && parsedUrl.action != "index") || parsedUrl.controller != "products") {
                self.init();
                self.Navigate(path);
                return;
            }
        }
        var category = 0;
        var page = 1;

        if (parsedUrl.controller == "category" && parsedUrl.ids[0] != undefined && parsedUrl.ids[0] != null && parsedUrl.ids[0] != "") category = parsedUrl.ids[0];
        if (parsedUrl.controller == "category" && parsedUrl.ids[1] != undefined && parsedUrl.ids[1] != null && parsedUrl.ids[1] != "") page = parsedUrl.ids[1];
        callback(category, page);
        $(window).scrollTo(0, 300);
    }
}
Navigation.prototype.MarkActiveUrl = function(path) {
    var self = this;
    path = self.navigationQueue.parseUrl(path);
    self.navigationMenu.find('li').removeClass('active');
    self.navigationMenu.find('li').each(function(itemNumber) {
        for (var i in self.navigationUnits[itemNumber]) {
            var item = self.navigationUnits[itemNumber][i];
            if (item.type == 'url' && item.data == path.parsedPath) {
                $(this).addClass('active');
                break;
            } else if (item.type == 'controllers') {
                var ok = false;
                for (var j in item.data) {
                    if (item.data[j] == path.controller) ok = true;
                }
                if (ok) {
                    $(this).addClass('active');
                    break;
                }
            }
        }
    });
}

window.formatPrice = function(str) {
	str += "";
	var result = "";
	var cnt = -1;
	for (var i = str.length - 1; i >= 0; i --) {
		cnt ++;
		if (cnt == 3) result = " " + result;
		cnt = cnt % 3;
		result = str[i] + result;
	}
	return result;
}
