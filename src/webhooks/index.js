// const {dialogflow, SignIn, Suggestions} = require('actions-on-google');
const { conversation, Canvas } = require('@assistant/conversation');
const assistant = conversation({debug: true});
const CANVAS_URL = 'https://actions.o2o.kr/devsvr9/test/index.html'; //'../views/index.html';
const { sequelize } = require('../models');
const User = require('../models/user');

assistant.handle('welcome', conv => {
    if (!conv.device.capabilities.includes('INTERACTIVE_CANVAS')) {
        conv.add('Sorry, this device does not support Interactive Canvas!');
        conv.scene.next.name = 'actions.page.END_CONVERSATION';
        return;
    }
    conv.add('강원도 투어입니다.저는 여행을 함께할 범이 라고 해요. 무엇을 도와드릴까요?');
    conv.add(new Canvas({
        // Update this placeholder string with the URL for your canvas web app.
        url: CANVAS_URL,
        data: {
            command: 'welcome', //MAIN',
        }
    }));
})

assistant.handle('main', conv => {
    //TODO account link 추가
    conv.add('강원도에 대한 설명입니다. 화면을 통해 더 자세한 정보를 찾아보세요.');
    conv.add(new Canvas({
        data: {
            command: 'ABOUT_KANGWON'
            // spin: true,
        }
    }))
});
assistant.handle('level', conv => {
    conv.add('강원도에 대한 설명입니다. 화면을 통해 더 자세한 정보를 찾아보세요.');
    conv.add(new Canvas({
        data: {
            command: 'ABOUT_KANGWON'
            // spin: true,
        }
    }))
});
assistant.handle('difficulty', conv => {
    conv.add('강원도에 대한 설명입니다. 화면을 통해 더 자세한 정보를 찾아보세요.');
    conv.add(new Canvas({
        data: {
            command: 'ABOUT_KANGWON'
            // spin: true,
        }
    }))
});
assistant.handle('ingame', conv => {
    //TODO gen game board
    conv.add(new Canvas({
        data: {
            command: 'ABOUT_KANGWON'
            // spin: true,
        }
    }))
});

assistant.handle('about', async conv => {
    // const {payload} = conv.user.profile;
    // const name = payload ? ` ${payload.given_name}` : '';

    const user = await User.findOne({});
    console.log(`user >>> ${user}`);
    console.log(`user.email >>> ${user.user_email}`);

    conv.add('강원도에 대한 설명입니다. 화면을 통해 더 자세한 정보를 찾아보세요.');

    conv.add(new Canvas({
        url: CANVAS_URL,
        data: {
            command: 'ABOUT_KANGWON'
            // spin: true,
        }
    }))
});
assistant.handle('choose', async conv => {

    // conv.add(place + "의 대표음식에 관한 설명이에요.");
    conv.add(new Canvas({
        data: {
            command: 'main',
            level: 1,//user.getLevel(),
            myExp: 100,//user.getMyCurrentExp(),
            fullExp: 200,//user.getMyCurrentFullExp(),
            myHint: 300,//user.getMyHint(),
            myCoin: 400,//user.getMyCoin(),
            fullExp: 500,//user.getMyCurrentFullExp(),
        }
    }))
})
assistant.handle('locals', async conv => {

    const place = conv.intent.params.place? conv.intent.params.place.resolved : "없음";
    // const foodNm = conv.intent.params.place? conv.intent.params.place.resolved : "없음";
    console.log(`place >>> ${place}`);
    // console.log(`foodNm >>> ${foodNm}`);
    // conv.add(place + "의 대표음식인 " + foodNm + "에 관한 설명이에요, 맛이 궁금하다면 범이에게 " + foodNm + " 맛집을 물어 보세요");
    conv.add(place + "의 대표음식에 관한 설명이에요.");
    conv.add(new Canvas({
        data: {
            command: 'LOCAL_FOOD',
            region: place
        }
    }))
})

assistant.handle('fallback', (conv) => {
    conv.add(`I don't understand. You can change my color or pause spinning.`);
    conv.add(new Canvas());
});
  

assistant.handle('end', (conv) => {
    conv.add("애플을 종료합니다.");
});


module.exports = assistant;