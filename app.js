$(document).ready(function () {
    $('.js-example-basic-single').select2();
});

var prompts = [{
        prompt: 'I find it difficult to introduce myself to people',
        weight: -1,
        class: 'group0'
    },
    {
        prompt: 'I get so lost in my thoughts I ignore or forget my surroundings',
        weight: -1,
        class: 'group1'
    },
    {
        prompt: 'I do not usually initiate conversations',
        weight: -1,
        class: 'group2'
    },
    {
        prompt: 'I prefer not to engage with people who seem angry or upset',
        weight: -1,
        class: 'group3'
    },
    {
        prompt: 'I choose my friends carefully',
        weight: -1,
        class: 'group4'
    },
    {
        prompt: 'I find it difficult to tell stories about myself',
        weight: -1,
        class: 'group5'
    },
    {
        prompt: 'I am usually highly motivated and energetic',
        weight: 1,
        class: 'group6'
    },
    {
        prompt: 'I find it easy to walk up to a group of people and join in conversation',
        weight: 1,
        class: 'group7'
    },
    {
        prompt: 'Being adaptable is more important than being organized',
        weight: 1,
        class: 'group8'
    },
    {
        prompt: 'I care more about making sure no one gets upset than winning a debate',
        weight: 1,
        class: 'group9'
    },
    {
        prompt: 'I often do not feel I have to justify myself to people',
        weight: 1,
        class: 'group10'
    },
    {
        prompt: 'I would rather improvise than spend time coming up with a detailed plan',
        weight: 1,
        class: 'group11'
    }

]


var prompt_values = [{
        value: 'Strongly Agree',
        class: 'btn-default btn-strongly-agree',
        weight: 5
    },
    {
        value: 'Agree',
        class: 'btn-default btn-agree',
        weight: 3,
    },
    {
        value: 'Neutral',
        class: 'btn-default',
        weight: 0
    },
    {
        value: 'Disagree',
        class: 'btn-default btn-disagree',
        weight: -3
    },
    {
        value: 'Strongly Disagree',
        class: 'btn-default btn-strongly-disagree',
        weight: -5
    }
]


let currentTab = 0;

let arrayElements = [];

let theBunch = (array) => {
    let container = $('#quiz')[0];
    array.map((element, index) => {
        let diviPrompt = $("<div/>").attr('class', 'prompt').css('display', 'none').appendTo(container);
        $("<p/>").attr('class', 'text-[2.4rem] w-4/5 leading-none mb-12 font-bold').text(`${element.prompt}`).appendTo(diviPrompt);

        let divRowGroup = $('<div />').attr('class', 'inline-flex rounded-md shadow-sm').attr('class', `group-${index}`).appendTo(diviPrompt);

        prompt_values.forEach((valEl, indexEl) => {
            let buttonInside = $('<button />').attr('type', 'button').attr('class', 'py-2 px-4 text-sm font-medium text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:bg-violet-700 focus:text-slate-100 dark:bg-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white elButton').text(`${valEl.value}`).attr('value', `${valEl.weight}`).appendTo(divRowGroup);
        });

        let nextButton = $("<div/>").attr('class', 'flex flex-row').appendTo(diviPrompt);
        $('<button />').attr('type', 'button').attr('class', 'rounded-full mt-10 bg-black text-slate-100 p-4 uppercase  px-4 focus:bg-violet-700 active:bg-violet-700').text(`next page ${array.length - index}`).attr('id', `btn_${array.length - index}`).appendTo(nextButton)

        arrayElements.push(...diviPrompt);
    })
}

theBunch(prompts);

theShow(currentTab);


const results = {

    total: 0,

    get getTotal() {
        return this.total;
    },

    set changeTotal(newTotal) {
        this.total = newTotal;
    }
};




let constArr = [];

function theShow(n) {
    var x = document.getElementsByClassName("prompt");

    // if (currentTab <= x.length - 1 === true) {

    if (currentTab < x.length === true) {

        // console.log(currentTab >= x.length - 1);
        x[n].style.display = "block";

        let buttonToNext = document.getElementById(`btn_${arrayElements.length - n}`);

        let elButton = x[n].querySelectorAll('.elButton');
    
        buttonToNext.addEventListener('click', (event) => {
            nextPrev(1);
        });
    
        elButton.forEach((element) => {
            element.addEventListener('click', (event) => {
                $(event.target).addClass('active').siblings().removeClass('active');
            })
        })

        if (currentTab >= x.length - 1 === true) {
            buttonToNext.innerText = 'Submit';
        }
    } else if(currentTab === x.length === true) {
        console.log('this record');
    }

}


function nextPrev(n) {
    var x = document.getElementsByClassName("prompt");

    x[currentTab].style.display = "none";

    currentTab = currentTab + n;

    theShow(currentTab);

    let ActiveEl = document.querySelectorAll('.active');
    constArr.push(parseInt($(ActiveEl).val()));

    let btnSubmit = document.getElementById(`btn_${arrayElements.length - currentTab}`);

    var includeCondition;

    if (btnSubmit) {
        includeCondition = btnSubmit.innerText.includes("SUBMIT")
    }

    if (includeCondition === true) {

        $(btnSubmit).click((event) => {
            constArr.reduce((a, b) => a + b, 0);
            results.changeTotal = constArr.reduce((a, b) => a + b, 0);
            // let appendResult = $('.appendResult');
            if (results.getTotal < 20) {
                $('.appendResult').html(
                    `
                    <div class="w-full flex-row animate__animated animate__fadeInUp">
                    <div class="lg:text-center">
                      <p class="text-[6rem] text-indigo-600 font-semibold tracking-wide uppercase border-b-4 border-yellow-400 font-bold">${results.getTotal}</p>
                      <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">INTROVERT</h2>
                      <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">I'm going home!</p>
                      <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">		Introverts are tricky to understand, since it’s so easy for us to assume that introversion is the same as being shy, when, in fact, introverts are simply people who find it tiring to be around other people.</p>
                    </div>

                    <div class="mt-10">
                      <dl class="space-y-10 md:space-y-0">
                      <!-- <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10"> -->
                        <div class="relative">
                          <dt>
                            <p class="ml-16 text-lg leading-6 font-medium text-gray-900">More about it</p>
                          </dt>
                          <dd class="mt-2 ml-16 text-base text-gray-500">Introverted people are known for thinking things through before they speak, enjoying small, close groups of friends and one-on-one time, needing time alone to recharge, and being upset by unexpected changes or last-minute surprises. Introverts are not necessarily shy and may not even avoid social situations, but they will definitely need some time alone or just with close friends or family after spending time in a big crowd.</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                    `
                ); 
            } else {
                $('.appendResult').html(
                    `
                    <div class="w-full flex-row animate__animated animate__fadeInUp">
                    <div class="lg:text-center">
                      <p class="text-[6rem] text-indigo-600 font-semibold tracking-wide uppercase border-b-4 border-yellow-400 font-bold">${results.getTotal}</p>
                      <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Extrovert</h2>
                      <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Isn't this awesome</p>
                      <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">On the opposite side of the coin, people who are extroverted are energized by people. They usually enjoy spending time with others, as this is how they recharge from time spent alone focusing or working hard.</p>
                    </div>

                    <div class="mt-10">
                      <dl class="space-y-10 md:space-y-0">
                      <!-- <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10"> -->
                        <div class="relative">
                          <dt>
                            <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Competitive exchange rates</p>
                          </dt>
                          <dd class="mt-2 ml-16 text-base text-gray-500">When I am among people, I make eye contact, smile, maybe chat if there’s an opportunity (like being stuck in a long grocery store line). As an extrovert, that’s a small ‘ping’ of energy, a little positive moment in the day.</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                    `
                );
            }
        })
    }
}


// console.log(currentTab);