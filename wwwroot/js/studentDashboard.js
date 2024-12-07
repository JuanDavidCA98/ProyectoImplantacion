// studentDashboard.js
$(document).ready(function () {
    var table = $('#alumnosTable').DataTable({
        ajax: {
            url: '/Alumnos/GetAlumnos',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'nombre' },
            { data: 'edad' },
            {
                data: null,
                render: function (data, type, row) {
                    return `
                        <button onclick="showDetails('${row.id}')" class="btn btn-info btn-sm">Detalles</button> |
                        <a href="/Alumnos/Edit/${row.id}" class="btn btn-primary btn-sm">Editar</a> |
                        <a href="/Alumnos/Delete/${row.id}" class="btn btn-danger btn-sm">Eliminar</a>
                    `;
                }
            }
        ],
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                text: 'Exportar a Excel',
                className: 'btn btn-success',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'pdfHtml5',
                text: 'Exportar a PDF',
                className: 'btn btn-danger',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            }
        ],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
        }
    });

    // Add modal to the page
    $('body').append(`
        <div class="modal fade" id="detailsModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Detalles del Alumno</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div id="studentDetails"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `);
});

// Function to show student details in modal
function showDetails(id) {
    $.ajax({
        url: `/Alumnos/GetDetails/${id}`,
        type: 'GET',
        success: function(data) {
            let detailsHtml = `
                <dl class="row">
                    <dt class="col-sm-4">ID:</dt>
                    <dd class="col-sm-8">${data.id}</dd>
                    
                    <dt class="col-sm-4">Nombre:</dt>
                    <dd class="col-sm-8">${data.nombre}</dd>
                    
                    <dt class="col-sm-4">Edad:</dt>
                    <dd class="col-sm-8">${data.edad}</dd>
                    
                    <dt class="col-sm-4">Promedio:</dt>
                    <dd class="col-sm-8">${data.promedio || 'No disponible'}</dd>
                </dl>`;

            if (data.foto) {
                detailsHtml += `
                    <div class="text-center">
                        <img src="data:image/;base64,${data.foto}" 
                             alt="Foto del alumno" 
                             style="max-width: 200px; max-height: 200px;" 
                             class="img-fluid"/>
                    </div>`;
            }

            $('#studentDetails').html(detailsHtml);
            var modal = new bootstrap.Modal(document.getElementById('detailsModal'));
            modal.show();
        },
        error: function(error) {
            console.error('Error:', error);
            alert('Error al cargar los detalles del alumno');
        }
    });
}