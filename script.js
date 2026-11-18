
$(document).ready(function () {

    // LOAD DATA FROM JSON
    fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Unable to load JSON data");
            }
            return response.json();
        })
        .then(data => {

            // STUDENT PROFILE
            $("#studentName").text(data.student.name);
            $("#studentCourse").text(data.student.course);
            $("#studentID").text(data.student.id);
            $("#studentYear").text(data.student.year);
            $("#studentEmail").text(data.student.email);

            // ANNOUNCEMENTS
            let announcements = "";

            data.announcements.forEach(item => {
                announcements += `
                    <div class="announcement">
                        <h6 class="fw-bold">${item.title}</h6>
                        <p class="mb-1">${item.description}</p>
                        <small class="text-muted">${item.date}</small>
                    </div>
                `;
            });

            $("#announcementList").html(announcements);

            // SUBJECTS
            let subjects = "";

            data.subjects.forEach(item => {
                subjects += `
                    <div class="col-12 col-sm-6 col-lg-4">
                        <div class="card subject-card shadow-sm h-100">
                            <div class="card-body">
                                <h5>${item.name}</h5>
                                <p class="text-muted">${item.code}</p>
                                <span class="badge bg-primary">
                                    ${item.units} Units
                                </span>
                            </div>
                        </div>
                    </div>
                `;
            });

            $("#subjectList").html(subjects);

        })
        .catch(error => {
            console.error(error);
            $("#announcementList").text("Unable to load announcements.");
            $("#subjectList").text("Unable to load subjects.");
        });

    // REGISTRATION FORM
    $("#registrationForm").on("submit", function (event) {
        event.preventDefault();

        const name = $("#fullName").val().trim();
        const email = $("#email").val().trim();
        const studentNumber = $("#studentNumber").val().trim();
        const course = $("#course").val();

        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }

        $("#formMessage").html(`
            <div class="alert alert-success">
                <strong>Registration Successful!</strong><br>
                Welcome, ${$("<div>").text(name).html()}!<br>
                Student Number: ${$("<div>").text(studentNumber).html()}<br>
                Course: ${$("<div>").text(course).html()}<br>
                Email: ${$("<div>").text(email).html()}
            </div>
        `);

        this.reset();
    });

});
