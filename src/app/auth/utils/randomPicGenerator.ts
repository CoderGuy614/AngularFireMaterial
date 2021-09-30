export function generateRandomPic() {
    function generateRandomNum(num: number){
        return Math.floor(Math.random() * num);   
    };
    let gender = generateRandomNum(2) === 1 ? 'men' : 'women';
    return `https://randomuser.me/api/portraits/${gender}/${generateRandomNum(30)}.jpg`
};