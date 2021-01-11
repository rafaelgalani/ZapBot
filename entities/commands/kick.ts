import { ZapCommand } from "./command";
import { AdminRule, AllowBotArgumentRule, BotAdminRule, GroupOnlyRule, NArgumentsRule } from "../rules";
import { ArgsOperator } from "../rules/group/n-arguments";
import { getMemberNumber } from "../../utils";
export class KickCommand extends ZapCommand {
    
    protected getPatterns(){
        return ['kick', 'remover', 'ban', 'remove', ];
    }

    protected getRules(){
        return [ 
            new GroupOnlyRule().override('Grupo.'), 
            new AdminRule(), 
            new BotAdminRule(), 
            new NArgumentsRule(1, ArgsOperator.EQ), 
            new AllowBotArgumentRule(false), 
        ];
    }

    protected async runSpecificLogic() {
        const { client, groupId, mentionedJidList, args } = this.context;
        const memberNumber = getMemberNumber(args[0]);
        await client.removeParticipant(groupId, memberNumber);
        return await client.sendTextWithMentions(groupId, `Xauuu @${memberNumber.replace('@c.us', '')} xD`)
        /*for (let i = 0; i < mentionedJidList.length; i++) {
            await client.removeParticipant(groupId, mentionedJidList[i]) */
        //}
    }
}