import { Request, Response } from "express"
import cheerio from 'cheerio'
import axios from 'axios'
import { Data } from  './../model/data'

export const getNewsData = async (req: Request, res: Response) => {
    const getdata = await Data.find().select("title")

   return res.status(200).json({
        total: getdata.length,
        data: getdata
    })
}

export const getNews = async (req: Request, res: Response) => {
    const newsData = await Data.findById(req.params.id)

    if (!newsData) {
       return res.send("this batch of news does not exist")
    }

   return res.status(200).json({
        batch: newsData
    })
}

export const postNews = (req: Request, res: Response) => {
    const base_url = 'https://www.bbc.com/news'

    interface dataInterface {
        id?: number,
        title: string,
        url: string
    }

    axios
    .get(base_url)
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html)

            let articles: { title: string, url?: string }[] = [];

            $('div.gs-c-promo-body').each((i, elem) => {
                const title = $(elem).find('h3').text().trim();
                const url = $(elem).find('a').attr('href');
                // const description = $(elem).find('gs-c-promo-summary').text().trim();

                const article = {title, url};
                
                articles.push(article)
            })

           const xee = async () => { 
            await Data.create({
                article: articles
            })

          return  res.status(200).json({
                msg: "success"
            })
        }     
        
        return xee()

        }
        else {
            console.log(`Error: ${response.status}`)
        }
    })
    .catch((error) => console.log(error.message))

}