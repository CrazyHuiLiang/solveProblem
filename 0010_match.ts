#!/usr/bin/env ts-node

import assert from "assert";

enum TokenType {
    Char, // 普通字符
    Dot,        // .
    CharStar,   // 普通字符*
    DotStar,    // .*
}
interface RegToken {
    type: TokenType;
    typeName: string;
    value?: string;
}

interface StarMatch {
    type: TokenType.CharStar | TokenType.DotStar;
    ri: number;
    start: number;
    end: number;
}

function isMatch(s: string, p: string): boolean {
    const regParsed = parseRegStr(p);
    return match(s, regParsed);
};

function match(s: string, regParsed: RegToken[]): boolean {

    console.log(regParsed);
    const starMatchs: StarMatch[] = [];
    let i = 0;
    let ri = 0;
    
    // 匹配
    for (; ri < regParsed.length || i < s.length; ri++) {
        const r = regParsed[ri];

        switch (r.type) {
            case TokenType.Char: {
                console.log('Char', {ri, i});
                if (r.value === s[i]) {
                    i++;
                    console.log('char i++');
                } else {
                    // 回溯
                    if (!starMatchs.length) {
                        console.log('无可回溯');
                        return false;
                    }
                    if (starMatchs.length === 1) {
                        const match = starMatchs[0];
                        if (match.end <= match.start) {
                            console.log('无可回溯的范围');
                            return false;
                        }
                    }
                    const match = starMatchs[starMatchs.length - 1];
                    console.log('回溯1', match, {ri, i});
                    ri = match.ri;
                    i = --match.end;
                    console.log('回溯2', match, {ri, i});
                    if (starMatchs.length > 1 && match.end - match.start === 1) {
                        console.log('清理回溯节点', match, {ri, i});
                        starMatchs.pop();
                    }
                }
            } break;

            case TokenType.Dot: {
                console.log('Dot', r);
                i++;
            } break;

            case TokenType.CharStar: {
                const match: StarMatch = {
                    type: TokenType.CharStar,
                    ri: ri,
                    start: i-1,
                    end: i-1,
                };
                for (;i < s.length; i++) {
                    const c = s[i];
                    if (r.value === c) {
                        match.end++;
                    } else {
                        break;
                    }
                }
                // 保存 CharStar 的匹配
                if (match.start < match.end) {
                    starMatchs.push(match);
                }
                console.log('CharStar', match);
            } break;

            case TokenType.DotStar: {
                const match: StarMatch = {
                    type: TokenType.DotStar,
                    ri: ri,
                    start: i-1,
                    end: i-1,
                };
                console.log('DotStar', match);
                for (;i < s.length; i++) {
                    match.end++;
                }
                // 保存 DotStar 的匹配
                if (match.start < match.end) {
                    starMatchs.push(match);
                }
            } break;
        }
    }
    console.log('return', {i, ri});
    return i === s.length && ri === regParsed.length;
}


// 解析正则表达式字符串
function parseRegStr(p: string): RegToken[] {
    const tokens = [];
    for (const c of p) {
        if (c !== '.' && c !== '*') {
            tokens.push({
                type: TokenType.Char,
                typeName: TokenType[TokenType.Char],
                value: c,
            });
        } else if (c === '.') {
            tokens.push({
                type: TokenType.Dot,
                typeName: TokenType[TokenType.Char],
            });
        } else if (c === '*' && tokens.length) {
            const lastToken = tokens[tokens.length - 1];
            if (lastToken.type === TokenType.Char) {
                lastToken.type = TokenType.CharStar;
                lastToken.typeName = TokenType[TokenType.CharStar];
            } else if (lastToken.type === TokenType.Dot) {
                lastToken.type = TokenType.DotStar;
                lastToken.typeName = TokenType[TokenType.DotStar];
            } else {
                throw new Error('Parse pattern error.');
            }
        } else {
            throw new Error('Parse pattern error.');
        }
    }
    return tokens;
}









// 测试用例
assert.equal(isMatch('aaa', 'a*a'), true);
