import { Args, Props, Command, Tags } from '../types'

export default class CMD implements Command {
    public props:Props = { name: 'tag', alias: ['tags', '태그']}
    public async execute(params: Args){
        if(!params.message.data.args) {
            params.embed.setTitle('태그 목록')
            params.embed.setDescription(tags.map(r=>'`'+r.name+'`'))
            return params.message.channel.send(params.embed)
        }
        const res = tags.find(r=> r.name === params.message.data.arg[0])
        if(res) return params.message.channel.send(res.text)
        else {
            params.embed.setTitle('태그 목록')
            params.embed.setDescription('`'+Object.keys(tags).join('` `')+'`')
            return params.message.channel.send(params.embed)
        }
    }
}

const tags:Tags[] = [
    {name: '주제', text: '해당 서버에 관련있는 이야기만 부탁드립니다!\n논란의 소지와 논란되는 주제도 삼가해주세요!\n(규칙-모든채팅채널-4,5)'},
    {name: '도배', text: '도배는 금지됩니다. 자제부탁드립니다!!!\n(규칙-모든채팅채널-9)'},
    {name: '욕설', text: '욕설 사용은 금지됩니다.\n(규칙-모든채팅채널-2)'},
    {name: '명령어', text: '명령어 사용은 금지됩니다.'},
    {name: '타프로젝트', text: '타프로젝트 언급은 금지됩니다.'},
    {name: '스쿨봇', text: '서비스종료되었습니다. 곧 원더봇에 추가될 예정입니다.'},
    {name: '돈보내기', text: '원더봇의 돈보내기는 기능은 어뷰징에 사용될 수 있어, 없으며, 제작 예정도 없습니다.'},
    {name: '주식변동', text: '주식 변동 로직은 공개 예정이 없습니다.\n모두 랜덤으로 변동됩니다.'},
    {name: '파크봇', text: '`#help`로 도움말을 확인하세요.'},
    {name: '원더봇', text: '`.도움`로 도움말을 확인하세요'}
]