//static expand(array, count = 1) {
//  let result = array;
//  for (let i = 0; i < count; ++i) {
//    array = _.clone(result);
//    array.forEach((cell) => {
//      result = _.union(result, Room.expandCell(cell));
//    });
//    //console.log('---');
//    //console.log(result.length);
//    //result = _.uniq(result);
//    //console.log(result.length);
//  }
//  return result;
//}
//
//static expandCell(cell) {
//  let array = [];
//  cell.cells.forEach((cell1, key) => {
//    let d = Direction.fromString(key);
//    let cell2 = cell1.cells.get(d.right());
//    array.push(cell1);
//    if (cell2) {
//      array.push(cell2);
//    }
//  });
//  return array;
//}
