class Message{
    constructor(line){
        let nameFirstIndex = line.indexOf(' - ')
        let messageFirstIndex = line.indexOf(': ')
        this.date = line.substring(0,nameFirstIndex);
        this.author = line.substring(nameFirstIndex+3,messageFirstIndex)
        this.message = line.substring(messageFirstIndex+2)

        if(line.substring(nameFirstIndex).indexOf(":")<0){
            this.author = "N"
            this.message = line.substring(nameFirstIndex+3)
        }
    }
}

//Set title
var contactTitle = "Contact";
var contactArr = JSON.parse(localStorage.contacts)
for(x of contactArr)
    if(x!=localStorage.self){
        contactTitle = x;
        break;
    }
document.getElementById('title').innerText = contactTitle;


let raw = localStorage.raw;
raw = raw.split("\n");
var section = document.querySelector('section');
for(line of raw){
    let l = new Message(line);
    let time = l.date;
    let msg = removeTag(l.message);

    let author = l.author;

    if(msg=='Media omitted')
        msg = `<span style="color:red;font-size:0.7em;background-color:transparent">Media IMAGE</span>`

    if(author=='N'){
        section.innerHTML+=`<div class="notification">${msg}</div>`
    }
    else if(author == localStorage.self)
        section.innerHTML+=`
        <div class="right">
            <div class="msg">
                <p class="press">${msg}</p>
                <span>${time}</span>
            </div>
        </div>`;
    else
        section.innerHTML+=`
        <div class="left">
            <div class="msg">
                <p class="press">${msg}</p>
                <span>${time}</span>
            </div>
        </div>`;
}

function removeTag(txt){
    while(txt.indexOf('<')>=0||txt.indexOf('>')>=0){
        txt = txt.replace('<','')
        txt = txt.replace('>','')
    }
    return txt;
}