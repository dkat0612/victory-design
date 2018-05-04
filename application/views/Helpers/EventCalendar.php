<div class="calendar hidden" id = "new-calendar">
	<div class="calendar-header">
		<a class="control left-arrow"><i class="fa fa-chevron-left fa-fw"></i></a>
		<div class="date">Сентябрь 2014</div>
		<a class="control right-arrow"><i class="fa fa-chevron-right fa-fw"></i></a>
	</div>
	<div class="calendar-body">
		<table class = "table-bordered" id = "calendar">
			<thead>
				<tr>
					<th>Пн</th>
					<th>Вт</th>
					<th>Ср</th>
					<th>Чт</th>
					<th>Пт</th>
					<th>Сб</th>
					<th>Вс</th>
				</tr>
			</thead>
			<tbody>

			</tbody>

		</table>
		<div class="new-placeholder hidden"></div>
	</div>
</div>

<script>
	$(document).ready(function(){
        window.eventCalendar = new Calendar('/feeds/getevents', 'event-calendar');
	});
</script>
