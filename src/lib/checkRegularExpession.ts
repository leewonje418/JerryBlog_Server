import HttpError from "../error/httpError";

export const checkRegularExpession = async (email: string, pw: string) => {
    const emailExperssion: RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const pwExperssion: RegExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if(!emailExperssion.test(email)) {
        throw new HttpError(400, '이메일이 조건을 만족하지 않습니다.');
    }
    else if(!pwExperssion.test(pw)) {
        throw new HttpError(400, '비밀번호가 조건을 만족하지 않습니다.');
    }
    return;
}