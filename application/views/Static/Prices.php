<div class="main-content">
</div>

<script>
    alertify.prompt('Введите пароль', 'Введите пароль', '', function(data, password) {
        if (password == "v123") {
            $('.main-content').append(
                '<ul class="list-group">' +
                    '<li class="list-group-item"><a href="/public/files/prices/fullprice_v1.xlsx">Оптовый прайс (1)</a></li>' +
                '</ul>'
            );
        }

    },function(data) {

        })
</script>
