var arrowReview = document.querySelector('.kabum-review>svg')
var mainVideo = document.getElementById('mainVideo')

function selectHidden() {

    mainVideo.classList.add('kabum-hidden')

    if (arrowReview.dataset.state == "close") {
        arrowReview.setAttribute('data-state', 'open')
        /* mainVideo.kabum-hidden = tru */
        mainVideo.classList.add('kabum-hidden')

    } else if (arrowReview.dataset.state == "open") {
        arrowReview.setAttribute('data-state', 'close')
        /* mainVideo.kabum-hidden = false */

        mainVideo.classList.remove('kabum-hidden')
    }


}
document.querySelector('#kabum-button > button').addEventListener('click', selectHidden)

function showVideo(event) {
    var clickedImage = event.currentTarget;
    var wrapper = clickedImage.closest('.kabum-thumbnail-wrapper');
    var panel = clickedImage.closest('.uk-panel');
    var iframe = panel.querySelector('.kabum-video-iframe');
    wrapper.classList.add('kabum-hidden');
    iframe.style.display = 'block';
}

document.querySelectorAll('.uk-panel .kabum-thumbnail-wrapper').forEach(function (thumb) {
    thumb.addEventListener('click', showVideo);
});