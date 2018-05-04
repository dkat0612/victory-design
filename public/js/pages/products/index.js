var categoriesDiv = $('#categories');
var currentCategory = 0;
var productsDiv = $('#products');

var sortParams = {
    field: 'price',
    type: 'desc',
    limit: 10,
    keywords: '',
    category: 0,
    page: 1,
    toOrder: 1
}


var searchTimer = null;

function PopulatePages(pages) {
    var pagination = $('#pagination');
    pagination.html('');
    for (var i = 1; i <= pages; i ++) {
        var li = $('<li id = "page-' + i + '"><a href = "#!/category/show/' + sortParams.category + '/' + i +'">' + i + '</a></li>');
        pagination.append(li);
    }
    $('#page-' + sortParams.page).addClass('active');
}

function PopulateProducts(products) {
    productsDiv.html('');
    for (var i in products) {
        (function() {
            var product = products[i];
            var productDiv = $('#product').clone();
            productDiv.attr('id', product.id);
            productDiv.find('span.price').html(window.formatPrice(product.price) + " тг");

            var productWarranty = 'Гарантия: '+ product.warranty + ' ' + product.warranty_period;
            if (product.warranty == 0) productWarranty = "";
            else if (product.warranty == 2 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 2 Месяца";
            else if (product.warranty == 2 && product.warranty_period == "Год") productWarranty = "Гарантия: 2 Года";
            else if (product.warranty == 3 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 3 Месяца";
            else if (product.warranty == 3 && product.warranty_period == "Год") productWarranty = "Гарантия: 3 Года";
            else if (product.warranty == 4 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 4 Месяца";
            else if (product.warranty == 4 && product.warranty_period == "Год") productWarranty = "Гарантия: 4 Года";
            else if (product.warranty == 5 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 5 Месяцев";
            else if (product.warranty == 5 && product.warranty_period == "Год") productWarranty = "Гарантия: 5 Лет";
            else if (product.warranty == 6 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 6 Месяцев";
            else if (product.warranty == 6 && product.warranty_period == "Год") productWarranty = "Гарантия: 6 Лет";
            else if (product.warranty == 7 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 7 Месяцев";
            else if (product.warranty == 7 && product.warranty_period == "Год") productWarranty = "Гарантия: 7 Лет";
            else if (product.warranty == 10 && product.warranty_period == "Год") productWarranty = "Гарантия: 10 Лет";
            else if (product.warranty == 11 && product.warranty_period == "Год") productWarranty = "Гарантия: 11 Лет";
            else if (product.warranty == 1 && product.warranty_period == "xxx") productWarranty = '1 Год +';
            else productWarranty = 'Гарантия: '+ product.warranty + ' ' + product.warranty_period;

            var productAmount;
            if (product.status == 5) productAmount = "| * |";
            else if (product.amount <= 0) productAmount = "";
            else if (product.amount > 0 && product.amount <= 5) productAmount = "| * |";
            else if (product.amount > 5 && product.amount <= 15) productAmount = "| ** |";
            else if (product.amount > 15) productAmount = "| *** |";
            else productAmount = "| Что-то не так |";

            productDiv.find('.title').html(
                '<a>' + product.name + '</a>' +
                "<br><span>Код товара: " + product.id + "</span>" +
                '<span class="amount-status ' + ((product.amount <= 0)? (product.status == 3)?'del':''):'exist')
                    + '">' + ((product.amount <= 0)? ((product.status == 3)?'Удалён':'Резерв'):'В наличии') + '</span><span>'+ productAmount +'</span><span> ' + productWarranty);
            productDiv.find('a').attr('href', '/products/show/' + product.id);

            productDiv.find('.description').html(product.description);
            productDiv.find('img').attr('src', '/public/img/products/' + product.id + '.jpg');
            if (product.id.indexOf('W') >= 0) {
                productDiv.find('button').addClass('hidden');
            } else {
                productDiv.find('button').attr('onclick', 'AddToCart(\'' + product.id + '\')');
            }
            

            var productStatus = productDiv.find('.status');
            if (product.type == 0) productStatus.addClass('hidden');
            if (product.type == 1) productStatus.html('Снижение Цены').addClass('green');
            if (product.type == 2) productStatus.html('Новый товар').addClass('green');
            if (product.type == 3) productStatus.html('Выгодное предложение').addClass('wide');
            if (product.type == 4) productStatus.html('ХИТ продаж').addClass('green');
            if (product.type == 5) productStatus.html('Распродажа').addClass('blue');
            if (product.type == 6) productStatus.html('+ подарок!').addClass('wide');

            productsDiv.append(productDiv);
        })();
    }
}

function PageAndCategoryChanged(category, page) {
    sortParams.page = page;
    sortParams.category = category;
    MarkCategory(category);
    SearchParamsChanged();
}

function PopulatePath(path) {
    var list = $('#breadcrumb');
    list.html('');
    for (var i in path) {
        (function() {
            var item = path[i];

            if (i == path.length - 1) {
                list.append('<li class = "active">' + item.title + '</li>');
            } else {
                var a = $('<a href = "#!/category/show/' + item.id + '">' + item.title + '</a>');
                var li = $('<li></li>');
                li.append(a);

                list.append(li);
            }
        })()

    }
}

function PageChanged(page) {
    sortParams.page = page;
    SearchParamsChanged();
}

function ToOrderChanged() {
    sortParams.toOrder = ($('#to-order').prop('checked'))?1:0;
    SearchParamsChanged();
}


function SearchParamsChanged() {
    if (searchTimer != null) {
        sortParams.keywords = $('#search-input').val();
        clearTimeout(searchTimer);
    }


    $('#products').removeClass('fadeIn animated');
    $('#products').addClass('fadeOut animated');
    $('.preloader').removeClass('fadeOut animated hidden');
    $('.preloader').addClass('fadeIn animated');
    $.ajax({
        url: window.api + '/products/get',
        type: 'POST',
        data: sortParams,
        async: window.asyncRequests,
        success: function(data) {
            data = JSON.parse(data);
            if (data.status == "ok") {
                if (data.message != "") alertify.notify(data.message, 'success', 5);
                PopulateProducts(data.data.products);
                PopulatePath(data.data.path);
                PopulatePages(data.data.pages);
                $('#products').removeClass('fadeOut animated');
                $('#products').addClass('fadeIn animated');
                $('.preloader').addClass('fadeOut animated');
                setTimeout(function() {$('.preloader').addClass('hidden')}, 500)
            } else {
                alertify.notify(data.message, 'error', 5);
            }
        }, error: function(data) {
            alertify.notify(data.message, 'error', 5);
        }
    });
}

function KeywordChanged(value) {
    if (value != sortParams.keywords) {
        if (searchTimer != null) clearTimeout(searchTimer);
        searchTimer = setTimeout(function() {
            sortParams.keywords = value;
            SearchParamsChanged();
        }, 1000);
    } else if (searchTimer != null) clearTimeout(searchTimer);
}

function Sort(type, sort) {
    var price = $('#price-sort');

    price.find('.fa').addClass('hidden');
    price.attr('onclick', 'Sort(\'price\', \'asc\')');
    if (type == 'price') {
        price.addClass('active');
        price.find('.fa').removeClass('hidden');
        if (sort == 'asc') {
            price.find('.fa').removeClass('fa-caret-down').addClass('fa-caret-up');
            price.attr('onclick', 'Sort(\'price\', \'desc\')');
        }
        else {
            price.find('.fa').removeClass('fa-caret-up').addClass('fa-caret-down');
            price.attr('onclick', 'Sort(\'price\', \'asc\')');
        }
    }
    sortParams.field = type;
    sortParams.type = sort;
    SearchParamsChanged();
}

function NumberOnPageChanged(number) {
    sortParams.limit = number;
    SearchParamsChanged();
}

function PopulateCategories(categories, id) {
    for (var i in categories) {
        (function(){
            var div = '#category-' + id;
            if (id != 0) {
                div = '#sub-category-' + id;
            }
            var categoriesDiv = $(div);
            var category = categories[i];
            var thumb = $('#category-thumb').clone();
            thumb.attr('id', 'category-' + category.id);

            thumb.find('.sub-categories').attr('id', 'sub-category-' + category.id);
            thumb.find('a').attr('href', '#!/category/show/' + category.id).attr('data-parent', div).html(category.title);
            categoriesDiv.append(thumb);
            PopulateCategories(category.subcategories, category.id);
        })();
    }
}

function MarkCategory(categoryId) {
    $('.category-thumb a').removeClass('active');
    $('.sub-categories').removeClass('in');
    $('a[href="#!/category/show/' + categoryId + '"]').addClass('active');
    var subcategory = $('#sub-category-' + categoryId);
    while(subcategory.hasClass('sub-categories')) {
        subcategory.addClass('in');
        subcategory = subcategory.parent().parent();
    }
}

function CategoryChanged(categoryId) {
    sortParams.category = categoryId;
    sortParams.page = 1;
    MarkCategory(categoryId);
    SearchParamsChanged();
}

function GetCategories(categoryToLoad, page) {
    $.ajax({
        url: window.api + '/category/get', 
        type: 'POST',
        async: window.asyncRequests,
        data: {
            id: categoryToLoad
        },
        success: function(data) {
            data = JSON.parse(data);
            if (data.status == "ok") {
                if (data.message != "") alertify.notify(data.message, 'success', 5);
                var categories = data.data;
                PopulateCategories(categories, 0);
                if (categoryToLoad != 0 || page != 1) {
                    PageAndCategoryChanged(categoryToLoad, page);
                }
            }
        }, 
        error: function(data) {
            alert(data);
        }
    });
}

