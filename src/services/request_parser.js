export function parseRequest(identity, request) {
    var type;
    var subType;
    var data = request.data;
    
    switch(request.type) {
      case "name":
        type = "Name";
        subType = "is";
        break;
      case "sex":
        type = "Sex";
        subType = "is";
        break;
      case "age":
        type = "Age"
        switch(request.subType) {
          case "equalOrGreater":
            subType = ">=";
            break;
          case "lesser":
            subType = "<";
            break;
          case "equal":
            subType = "is";
            break;
        }
        break;
    }

    return { identity: identity, type: type, subType: subType, data: data};
}