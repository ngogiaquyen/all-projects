export function splitBySpace(str) {
  return str.trim().split(/\s+/);
}

export function filterTips(type, data = []){
  return data.filter((value, index)=>value?.type_name === type);
}