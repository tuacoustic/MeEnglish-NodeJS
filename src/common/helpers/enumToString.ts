export const EnumToString = (_enum: object) => {
    const r = [];
    for (const v in _enum) {
        r.push(v);
    }
    return r.join(", ");
}

export const ObjToArray = (obj: object) => {
    const r = [];
    for (const i in obj) {
        r.push(obj[i]);
    }
    return r;
}
