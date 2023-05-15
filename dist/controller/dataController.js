"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNews = exports.getNews = exports.getNewsData = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
const data_1 = require("./../model/data");
const getNewsData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getdata = yield data_1.Data.find().select("title");
    return res.status(200).json({
        total: getdata.length,
        data: getdata
    });
});
exports.getNewsData = getNewsData;
const getNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newsData = yield data_1.Data.findById(req.params.id);
    if (!newsData) {
        return res.send("this batch of news does not exist");
    }
    return res.status(200).json({
        batch: newsData
    });
});
exports.getNews = getNews;
const postNews = (req, res) => {
    const base_url = 'https://www.bbc.com/news';
    axios_1.default
        .get(base_url)
        .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio_1.default.load(html);
            let articles = [];
            $('div.gs-c-promo-body').each((i, elem) => {
                const title = $(elem).find('h3').text().trim();
                const url = $(elem).find('a').attr('href');
                // const description = $(elem).find('gs-c-promo-summary').text().trim();
                const article = { title, url };
                articles.push(article);
            });
            const xee = () => __awaiter(void 0, void 0, void 0, function* () {
                yield data_1.Data.create({
                    article: articles
                });
                return res.status(200).json({
                    msg: "success"
                });
            });
            return xee();
        }
        else {
            console.log(`Error: ${response.status}`);
        }
    })
        .catch((error) => console.log(error.message));
};
exports.postNews = postNews;
