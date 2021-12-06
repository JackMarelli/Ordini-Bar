function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code scanned = ${decodedText}`, decodedResult);
    //TODO: salva il codice in localstorage con nome primaryKey
    // localStorage.setItem("primaryKey",decodedText);
    window.location.href = "/ordinedaaccettare/"+parseInt(decodedText);
}

function CaricaQR(){
var html5QrcodeScanner = new Html5QrcodeScanner(
	"qr-reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess);
    // html5QrcodeScanner.rememberLastUsedCamera;
}