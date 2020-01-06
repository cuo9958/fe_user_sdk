import axios from 'axios';
import querystring from 'querystring';

export async function post(url: string, data?: querystring.ParsedUrlQueryInput) {
    const res_data = await axios(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify(data)
    });
    if (res_data.status !== 200) {
        throw new Error('登录失败');
    }
    const res = res_data.data;
    if (res.code === 1) return res.data;
    throw new Error(res.msg);
}

export async function get(url: string, data?: querystring.ParsedUrlQueryInput) {
    const res_data = await axios(url + '?' + querystring.stringify(data), {
        method: 'GET'
    });
    if (res_data.status !== 200) {
        throw new Error('登录失败');
    }
    const res = res_data.data;
    if (res.code === 1) return res.data;
    throw new Error(res.msg);
}
