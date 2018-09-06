import * as Limit from 'express-rate-limit'
import { ResDto } from '../dto/res.dto';

// 限流
export const limiter = new Limit({
  windowMs: 1000 * 60 * 2, // 2min
  max: 20,
  delayMs: 0, // 延迟
  handler: (req, res) => {
    res.format({
      json: () => {
        res.json(new ResDto({ data: '', code: 429, message: '请求频率过高' }));
      }
    });
  }
})
