var feedback = $('#feedback-section');
var feedbackButtons = {
    success: $('#feedback-success'),
    cancel: $('#feedback-cancel')
}
var feedbackFields = {
    name: $('#feedback-name'),
    email: $('#feedback-email'),
    feedback: $('#feedback'),
    clear: function() {
        this.name.val('');
        this.email.val('');
        this.feedback.val('');
    }
}
var feedbackSections = {
    name: $('#feedback-name-section'),
    email: $('#feedback-email-section'),
    feedback: $('#feedback-feedback-section'),
    hide: function() {
        this.name.addClass('hidden');
        this.email.addClass('hidden');
        this.feedback.addClass('hidden');
    }
}

feedbackFields.name.keyup(function(e) {
    if (e.keyCode == 13) FeedbackNameEntered();
});
feedbackFields.email.keyup(function(e) {
    if (e.keyCode == 13) FeedbackEmailEntered();
});

function FeedbackNameEntered() {
    var name = feedbackFields.name.val();
    if (name == "") {
        feedbackFields.name.addClass('has-error')
        .one('keyup', function() {
            $(this).removeClass('has-error');
        });
    } else {
        feedbackButtons.success.attr('onclick', 'FeedbackEmailEntered()');
        feedbackSections.hide();
        feedbackSections.email.removeClass('hidden');
        feedbackFields.email.focus();
    }
}

function FeedbackEmailEntered() {
    var email = feedbackFields.email.val();
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (email == "" || !re.test(email)) {
        feedbackFields.email.addClass('has-error')
        .one('keyup', function() {
            $(this).removeClass('has-error');
        });
    } else {
        feedbackButtons.success.attr('onclick', 'FeedbackEntered()');
        feedbackSections.hide();
        feedbackSections.feedback.removeClass('hidden');
        feedbackFields.feedback.focus();
    }
}

function FeedbackEntered() {
    var feedbackText = feedbackFields.feedback.val();
    if (feedbackText == "") {
        feedbackFields.feedback.addClass('has-error')
        .one('keyup', function() {
            $(this).removeClass('has-error');
        });
    } else {
        SendFeedback(feedbackFields.name.val(), feedbackFields.email.val(), feedbackText);
    }
}

function SendFeedback(name, email, feedbackText) {
    alertify.notify('Спасибо за отзыв!', 'success', 5);
    ClearFeedback();
}

function ClearFeedback() {
    feedbackFields.clear();
    feedbackSections.hide();
    feedbackSections.name.removeClass('hidden');
    feedbackButtons.success.attr('onclick', 'FeedbackNameEntered()');
}
