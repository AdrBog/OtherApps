// Replace original label and button inserts
document.getElementById("a-label").setAttribute("onclick", "extraInsert('label')");
document.getElementById("a-button").setAttribute("onclick", "extraInsert('button')");

// This addon adds extra options to the insert button

document.getElementById("tool-bar-insert").innerHTML += '<hr>' +
    '<a href="#" onclick="extraInsert(\'database\')">Database</a>' +
    '<hr>' +
    '<a href="#" onclick="extraInsert(\'plus\')">Plus Icon</a>' +
    '<a href="#" onclick="extraInsert(\'refresh\')">Refresh Icon</a>' +
    '<a href="#" onclick="extraInsert(\'back\')">Back Icon</a>' +
    '<a href="#" onclick="extraInsert(\'home\')">Home Icon</a>' ;
    

function extraInsert(item) {
    switch (item) {
        case "label":
            newitemID = insert("label");
            newitemElement = document.getElementById(newitemID);
            newitemElement.style.backgroundColor = "transparent";
            newitemElement.style.whiteSpace = "pre";
            break;
        case "button":
            newitemID = insert("button");
            newitemElement = document.getElementById(newitemID);
            newitemElement.style.whiteSpace = "pre";
            break;
        case "plus":
            newitemID = insert("button");
            newitemElement = document.getElementById(newitemID);
            newitemElement.innerHTML = "";
            newitemElement.style.backgroundColor = "#fff";
            newitemElement.style.color = "#fff";
            newitemElement.style.border = "0";
            newitemElement.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 20 20' version='1.1' xmlns='http://www.w3.org/2000/svg' fill='%23000000'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cg id='layer1'%3E%3Cpath d='M 9 3 L 9 10 L 2 10 L 2 11 L 9 11 L 9 18 L 10 18 L 10 11 L 17 11 L 17 10 L 10 10 L 10 3 L 9 3 z ' style='fill:%23222222; fill-opacity:1; stroke:none; stroke-width:0px;'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E\") ";
            rename(newitemID, "Plus");
            break;
        case "refresh":
            newitemID = insert("button");
            newitemElement = document.getElementById(newitemID);
            newitemElement.innerHTML = "";
            newitemElement.style.backgroundColor = "#fff";
            newitemElement.style.color = "#fff";
            newitemElement.style.border = "0";
            newitemElement.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg fill='%23000000' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M15.544 28.080c-0.002-0.006-0.008-0.010-0.012-0.015l-2.873-4.489c-0.204-0.335-0.646-0.454-0.992-0.266l-0.256 0.157c-0.344 0.188-0.337 0.673-0.133 1.008l1.841 2.857c-0.157-0.035-0.316-0.063-0.471-0.103-3.224-0.843-5.953-3.026-7.485-5.988-1.448-2.797-1.72-5.99-0.766-8.992s3.118-5.452 5.915-6.899c0.476-0.247 0.662-0.832 0.416-1.308-0.246-0.477-0.832-0.663-1.308-0.416-3.258 1.686-5.763 4.54-6.874 8.036s-0.794 7.215 0.892 10.473c1.786 3.448 4.963 5.989 8.72 6.973 0.043 0.011 0.087 0.017 0.13 0.028l-2.541 1.288c-0.344 0.189-0.458 0.613-0.254 0.948l0.098 0.256c0.205 0.335 0.557 0.454 0.9 0.266l4.651-2.381c0.006-0.004 0.012-0.003 0.018-0.007l0.312-0.171c0.172-0.095 0.287-0.249 0.332-0.422 0.047-0.172 0.025-0.364-0.076-0.531zM28.559 10.025c-1.783-3.447-4.862-5.988-8.618-6.972-0.267-0.070-0.541-0.124-0.814-0.179l2.494-1.265c0.344-0.189 0.549-0.614 0.345-0.949l-0.099-0.255c-0.205-0.336-0.648-0.454-0.991-0.267l-4.651 2.381c-0.006 0.003-0.012 0.002-0.018 0.006l-0.312 0.171c-0.173 0.095-0.287 0.249-0.332 0.422-0.047 0.172-0.025 0.364 0.077 0.53l0.185 0.304c0.003 0.006 0.008 0.010 0.012 0.016l2.873 4.489c0.203 0.335 0.646 0.454 0.991 0.266l0.226-0.157c0.344-0.188 0.366-0.673 0.163-1.008l-1.85-2.87c0.407 0.063 0.811 0.138 1.207 0.242 3.226 0.845 5.856 3.027 7.387 5.986 1.448 2.797 1.72 5.99 0.765 8.991s-3.020 5.451-5.818 6.901c-0.476 0.247-0.662 0.831-0.415 1.308 0.172 0.332 0.511 0.524 0.863 0.524 0.15 0 0.302-0.035 0.446-0.109 3.259-1.686 5.664-4.54 6.776-8.035 1.111-3.497 0.794-7.217-0.893-10.473z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E\") ";
            rename(newitemID, "Refresh");
            break;
        case "back":
            newitemID = insert("button");
            newitemElement = document.getElementById(newitemID);
            newitemElement.innerHTML = "";
            newitemElement.style.backgroundColor = "#fff";
            newitemElement.style.color = "#fff";
            newitemElement.style.border = "0";
            newitemElement.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' fill='%23000000'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath fill='%23000000' d='M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z'%3E%3C/path%3E%3Cpath fill='%23000000' d='m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E\") ";
            rename(newitemID, "Back");
            break;
        case "home":
            newitemID = insert("button");
            newitemElement = document.getElementById(newitemID);
            newitemElement.innerHTML = "";
            newitemElement.style.backgroundColor = "#fff";
            newitemElement.style.color = "#fff";
            newitemElement.style.border = "0";
            newitemElement.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg fill='%23000000' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M21.4498 10.275L11.9998 3.1875L2.5498 10.275L2.9998 11.625H3.7498V20.25H20.2498V11.625H20.9998L21.4498 10.275ZM5.2498 18.75V10.125L11.9998 5.0625L18.7498 10.125V18.75H14.9999V14.3333L14.2499 13.5833H9.74988L8.99988 14.3333V18.75H5.2498ZM10.4999 18.75H13.4999V15.0833H10.4999V18.75Z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E\") ";
            rename(newitemID, "Home");
            break;
        case "database":
            database = prompt("Enter database name, look at database manager if you don't remember.");
            table = prompt("Enter table name, look at database manager if you don't remember.");
            if (!database || !table)
                break;
            newitemID = insert("label");
            newitemElement = document.getElementById(newitemID);
            newitemElement.style.width = "420px";
            newitemElement.style.height = "256px";
            newitemElement.innerHTML = "<span style='display:flex; margin: 32px; flex: 1;'>\n\t<iframe src='/database/list/" + database + "/" + table + "' style='flex: 1;'></iframe>\n</span>";
            rename(newitemID, "Database");
            break;
    }
}