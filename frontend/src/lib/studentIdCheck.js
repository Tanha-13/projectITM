export function studentIdCheck(studentId, middlePart){
    const middleIndex = Math.floor(studentId.length / 2) - Math.floor(middlePart.length / 2);
    return studentId.substring(middleIndex, middleIndex + middlePart.length) === middlePart;
}