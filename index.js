$("#incrypt_btn").click(function () {

    let textvalue = $("#normal_text").val()
    // console.log(textvalue)
    const crypt = (salt, text) => {
        const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
        const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
        const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

        return text
            .split("")
            .map(textToChars)
            .map(applySaltToChar)
            .map(byteHex)
            .join("");

    };
    const encrypted_text = crypt("salt", textvalue); // -> 426f666665
    $("#result").val(encrypted_text)
    $(".copybtn").removeClass("d-none")
})
$("#decrypt_btn").click(function () {
    let incrypted_txt = $("#result").val()

    const decrypt = (salt, encoded) => {
        const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
        const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
        return encoded
            .match(/.{1,2}/g)
            .map((hex) => parseInt(hex, 16))
            .map(applySaltToChar)
            .map((charCode) => String.fromCharCode(charCode))
            .join("");
    };
    const decrypted_string = decrypt("salt", incrypted_txt); // -> Hello
    $("#result").val(decrypted_string)
})
$(".copybtn").click(function () {
    var copyText = document.getElementById("result");
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
    /* Alert the copied text */
    // alert("Copied the text: " + copyText.value);
    $("#copieditem").html("Text Copied : " + copyText.value)

})

var toastTrigger = document.getElementById('liveToastBtn')
var toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
    toastTrigger.addEventListener('click', function () {
        var toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
    })
}
$("#clear_btn").click(function () {
    $("#result").val("")
    $("#normal_text").val("")
})