let tasa = 0;
let amortizacionData = [];
// let columnAmortizacion= [];
let columnCapital = [];
let columnInteres = [];
let columnCuota = [];
let columnPeriodo = [];
$(document).ready(function () {
    seleccion();
    $("#amortizacion").hide();
    $("#amortizando").hide();
    prestamo();
    // interes();
    amortizacion();
});

function amortizacion() {
    $("#amortizacionForm").submit(function (e) {
        e.preventDefault();
        datosInit = $("#amortizacionForm").serialize().split("&");
        for (var i = 0; i < datosInit.length; i++) {
            datito = datosInit[i].split("=");
            for (var j = 0; j < datito.length; j++) {
                if (j === 1)
                    amortizacionData.push(parseFloat(datito[j]));

            }
        }
        dataTable();
        // console.log(amortizacionData);
    });
}

function dataTable() {
    console.log(amortizacionData);
    columnCapital.push(amortizacionData[0]);
    columnCapBucle = columnCapital[0];
    filasAmortizacion = (amortizacionData[0] / amortizacionData[1]) / amortizacionData[3];
    for (var i = 1; columnCapBucle >= 0; i++) {
        columnPeriodo.push(parseFloat(i));
        interes = columnCapBucle * ((amortizacionData[2] / 100) / amortizacionData[3]);
        columnInteres.push(parseFloat(interes).toFixed(2));
        cuota = interes + filasAmortizacion;
        columnCuota.push(cuota.toFixed(2));
        columnCapBucle = columnCapital[i - 1] - filasAmortizacion;
        columnCapital.push(columnCapBucle.toFixed(2));

    }
    for (var i = 0; i < columnPeriodo.length; i++) {
        if (i == 0) {
            $("#datosTablaAmortizacion").append("<tr>" +
                "<td>" + 0 + "</td>" +
                "<td>" + 0 + "</td>" +
                "<td>" + 0 + "</td>" +
                "<td>" + 0 + "</td>" +
                "<td>" + columnCapital[i] + "</td>" +
                +"</tr>");
        }
        else {
            $("#datosTablaAmortizacion").append("<tr>" +
                "<td>" + columnPeriodo[i - 1] + "</td>" +
                "<td>" + columnCuota[i - 1] + "</td>" +
                "<td>" + columnInteres[i - 1] + "</td>" +
                "<td>" + filasAmortizacion.toFixed(2) + "</td>" +
                "<td>" + columnCapital[i] + "</td>" +
                +"</tr>");
        }

    }
    $("#amortizando").show();
}

function prestamo() {
    $("#close").click(function () {
        console.log(columnCuota);
        tasa = 0;
        amortizacionData = [];
        // let columnAmortizacion= [];
        columnCapital = [];
        columnInteres = [];
        columnCuota = [];
        columnPeriodo = [];
        $("#datosTablaAmortizacion").html("");
        $("#amortizando").hide(1000);
        console.log(columnCuota);

    });
}

function seleccion() {
    $("#datosIniciales").submit(function (e) {
        e.preventDefault();
        // console.log($("#datosIniciales").serialize());
        datos = $("#tipoCredito").val();
        console.log(datos);
        $("#interes").val(datos);
        

        $("#amortizacion").show(1000);

    });
}

