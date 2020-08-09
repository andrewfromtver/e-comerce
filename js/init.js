/* Init */
document.cookie = "SameSite=Strict; secure";
window.onload = function() {
    window.addEventListener("resize", function() {devCheck();});
    devCheck();
    if (sessionStorage.last_seen) {
        lastSeenItems = JSON.parse(sessionStorage.last_seen); 
    }
    document.querySelector('.blank__screen').style.display = '';
    document.querySelector('#searchForm').addEventListener('submit', searchList);
    fetchData();
};