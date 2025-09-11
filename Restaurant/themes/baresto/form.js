$(function () {
    function after_form_submitted(success, $form) {
        if (success) {
            $form.find('#success_message').show();
            $form.find('#error_message').hide();
        } else {
            $form.find('#success_message').hide();
            $form.find('#error_message').show();
        }

        // Reset button text
        $form.find('button[type="button"], input[type="button"]').each(function () {
            let $btn = $(this);
            let label = $btn.prop('orig_label');
            if (label) {
                $btn.prop('type', 'submit');
                $btn.val(label);   // for input[type=submit]
                $btn.text(label);  // for button
                $btn.prop('orig_label', '');
            }
        });
    }

    // Generic handler for both booking and contact forms
    $('form').on('submit', function (e) {
        e.preventDefault();

        let $form = $(this);
        let formId = $form.attr('id');

        // Show "Sending..."
        $form.find('input[type="submit"]').each(function () {
            let $btn = $(this);
            $btn.prop('type', 'button');
            $btn.prop('orig_label', $btn.val());
            $btn.val('Sending ...');
        });

        // Collect form data based on form type
        let formData = {
            name: $form.find('#name').val(),
            email: $form.find('#email').val(),
            phone: $form.find('#phone').val(),
            message: $form.find('#message').val()
        };

        let url = "";

        if (formId === "booking_form") {
            // Add booking-specific fields
            formData.date = $form.find('#date').val();
            formData.time = $form.find('#time').val();
            formData.guests = $form.find('#guests').val();

            url = "http://localhost:5000/api/bookings";  // Booking route
        } else if (formId === "contact_form") {
            // Contact form only
            url = "http://localhost:5000/api/contact";   // Contact route
        }

        // Send request
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(formData),
            contentType: "application/json",
            success: function () {
                after_form_submitted(true, $form);
                $form[0].reset(); // clear form after success
            },
            error: function () {
                after_form_submitted(false, $form);
            }
        });
    });
});
