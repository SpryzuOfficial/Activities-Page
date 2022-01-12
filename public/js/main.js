let refresh_btn = document.getElementById('refr-btn');
let sactivity_btn = document.getElementById('sact-btn');
let home_btn = document.getElementById('home-btn');
let submmit_btn = document.getElementById('sbt-btn');

let name_txt = document.getElementById('name-txt');
let description_txt = document.getElementById('desc-txt');
let email_txt = document.getElementById('email-txt');

let status_lb = document.getElementById('status-lb');

let activity_div = document.getElementById('act-div');
let form_div = document.getElementById('frm-div');

refresh_btn.addEventListener('click', () =>
{
    let act_name = document.getElementById('act_name');
    let act_desc = document.getElementById('act_desc');

    const url = (window.location.hostname.includes('localhost'))
                        ? 'http://localhost:8080/activity'
                        : '';

    fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then(response =>
            {
                act_name.innerHTML = response.name;
                act_desc.innerHTML = response.description;
            })
        .catch(console.warn);
});

sactivity_btn.addEventListener('click', () =>
{
    activity_div.style.display = "none";
    form_div.style.display = "grid";
});

home_btn.addEventListener('click', () =>
{
    activity_div.style.display = "";
    form_div.style.display = "none";
});

submmit_btn.addEventListener('click', () =>
{
    const data = {
        name: name_txt.value,
        description: description_txt.value,
        email: email_txt.value
    };

    status_lb.innerHTML = "";

    const url = (window.location.hostname.includes('localhost'))
                        ? 'http://localhost:8080/activity'
                        : '';
    
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' }
    })
        .then(resp => resp.json())
        .then(resp => 
            {
                if(!resp.sts)
                {
                    resp.errors.forEach((element) =>
                    {
                        status_lb.innerHTML += element.msg + " ";
                    });
                }
                else
                {
                    status_lb.innerHTML = "Activity uploaded";
                }
            });

    status_lb.style.opacity = "1";
});

function checkedSwitch()
{
    let box = document.getElementById('check');

    let texts = [name_txt,
                 description_txt,
                 email_txt];

    let buttons = [home_btn,
                    sactivity_btn,
                    refresh_btn,
                    submmit_btn];

    let divs = [activity_div,
                form_div];
    
    if(box.checked)
    {
        document.body.classList.remove('animation-ld');
        document.body.classList.add('animation-dl');

        divs.forEach((element) =>
        {
            element.style.backgroundColor = "rgb(180, 180, 180)";
            element.style.border = '4px solid rgb(160, 160, 160)';
            element.style.color = 'black';
        });
        
        buttons.forEach((element) =>
        {
            element.classList.remove('button-dark');
            element.classList.add('button-light');
        });

        texts.forEach((element) =>
        {
            element.style.backgroundColor = "rgb(180, 180, 180)";
            element.style.border = '4px solid rgb(160, 160, 160)';
            element.style.color = 'black';
        });
    }
    else
    {
        document.body.classList.remove('animation-dl');
        document.body.classList.add('animation-ld');

        divs.forEach((element) =>
        {
            element.style.backgroundColor = "rgb(60, 60, 60)";
            element.style.border = '4px solid white';
            element.style.color = '#ccc';
        });

        buttons.forEach((element) =>
        {
            element.classList.remove('button-light');
            element.classList.add('button-dark');
        });

        texts.forEach((element) =>
        {
            element.style.backgroundColor = "rgb(60, 60, 60)";
            element.style.border = '4px solid white';
            element.style.color = '#ccc';
        });
    }
}