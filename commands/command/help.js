const Discord = require("discord.js");

module.exports = {
    name: "help",
    aliases: ["도움말", "도움", "도와줘", "헬프"],
    run: async (client, message, args) => {
        message.author.send(`**디토봇 도움말**\n\n\n**디토봇 상태** 명령어\n\n\`\`\`js\n"디토야 핑" - 디토봇의 핑 정보를 알려드려요!\n"디토야 업타임" - 디토봇의 업타임을 알려드려요!\n"디토야 봇정보" - 디토봇의 정보를 알려드려요!\n"디토야 도움" - 디토봇의 도움말을 알려드려요!\n\`\`\`\n\n**디토봇 음악** 명령어 (beta)\n\`\`\`js\n"디토야 플레이 <URL 또는 내용>" - 디토봇이 음성 채널에 들어가 음악을 플레이해요!\n"디토야 나가" - 재생 목록을 초기화 시키지 않고 음성 채널에서 나가요!\n"디토야 스킵" - 현재 재생 중인 곡에서 다음 곡으로 스킵해요!\n"디토야 중지" - 현재 재생 중인 음악을 중지해요 (다시 재생하는 건 아직 없어요!)\n"디토야 목록" - 추가한 음악 목록을 알려드려요!\n"디토야 볼륨 <0~150>" - 현재 재생 중인 음악의 볼륨을 설정해요! (기본 100)\n"디토야 지금곡" - 지금 재생 중인 음악의 정보를 알려드려요!\n\`\`\`\n\n**디토봇 관리** 명령어\n\n\`\`\`js\n"디토야 삭제 <1~100>" - 디토봇이 메세지를 삭제해요! (메세지 관리 권한 필요)\n"디토야 추방 <멘션 또는 ID>" - 디토봇이 멘션(ID)된 사람을 추방해요!\n\`\`\`\n\n**디토봇 정보** 명령어\n\n\`\`\`js\n"디토야 내정보 <멘션 또는 ID>" - 멘션한 유저의 정보를 알려드려요! (없으면 사용자 정보)\n"디토야 서버 정보" - 사용자님의 서버의 정보를 알려드려요!\n"디토야 멜론차트" - 멜론차트를 불러와요!\n"디토야 실검" - 디토봇이 네이버 실검을 불러와요!\n\`\`\`\n\n**디토봇 관리자** 명령어 (디토봇 관리자만 쓸 수 있는 명령어예요!)\n\n\`\`\`js\n"디토야 eval <내용>" - JS 코드를 실행해요!\n"디토야 공지 <공지 내용>" - 공지사항을 송출해요!\n"디토야 종료" - 디토봇을 종료해요!\n\`\`\`\n\n**디토봇**은 많은(?) 기능이 있으니 연구(?)해 보시는 것도 추천드려요!(???)\n\n**디토봇**에 더 궁금한 점이 있다면 **ditto7890#8948** dm으로 문의를 하거나, 봇 개발자들의 소통방으로 와주세요! (https://discord.gg/JvHBVjF)`)
        message.channel.send(`<@${message.author.id}> **DM**을 봐주세요! (개인 메세지)`);
    }
}