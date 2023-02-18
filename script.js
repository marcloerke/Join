async function init() {
    await includeHTML();
    navbarToggler();
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); 
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function navbarToggler() {
    const url= window.location.href;
    const currentPage = url.replace(/^(?:\/\/|[^/]+)*\//, '');
    const currentPageClean=  currentPage.replace("_", " ").replace(".html", "");
    const menuLinks= document.querySelectorAll('.nav-item');
    [...menuLinks].forEach(item => {
        if (currentPageClean.includes(item.innerText.toLowerCase())) {
            item.classList.add('active');
        }
    })
}

