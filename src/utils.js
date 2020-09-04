require("dotenv").config();

const LOCAL={
    ENDPOINT:process.env.REACT_APP_API_LOCAL,
}

const PRODUCTION={
    ENPOINT:'none'
}

let API;
if(process.env.NODE_ENV === "development"){
        API=LOCAL
}
else{
    API=PRODUCTION
}

export default API;


