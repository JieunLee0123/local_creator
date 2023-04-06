import axios from "axios";

const axiosInst = axios.create({
    baseURL : 'https://www.k-startup.go.kr/web/module/getLocalCreatorList.ajax'
})

axiosInst.interceptors.request.use(
    (config) => {
        config.headers.authorization = 'token';
        config.headers['Access-Control-Allow-Origin'] = '*';  // CORS 설정(모든 리소스 허용)
        return config;
    }
)

export default axiosInst;