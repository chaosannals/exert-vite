import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import QRCode from 'qrcode';

// mock 是依托在 vite devServer 上的，路径和代理要避免冲突。
export default [{
    url: '/mock/rxdemo/random-image.png',
    method: 'get',
    response: () => {
        return {
            link: Random.image('400x400', '#4488dd', '#FF', 'png', 'tttt'),
            data: Random.dataImage('400x400'),
        };
    },
}, {
    url: '/mock/rxdemo/qrcode.png',
    method: 'get',
    rawResponse: async (req: any, res: any) => {
        let reqbody = '';
        await new Promise((resolve) => {
            req.on('data', (chunk: string) => {
                reqbody += chunk
            })
            req.on('end', () => resolve(undefined))
        });

        QRCode.toBuffer('tttt', {
            version: 10,
            errorCorrectionLevel: 'H',
        }, (error, b) => {
            if (error) {

            } else {
                res.setHeader('Content-Type', 'image/png');
                res.statusCode = 200;
                res.end(b);
            }
        });
    },
}] as MockMethod[];