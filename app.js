const rp = require('request-promise'),
    cheerio = require('cheerio');


let options = {
    uri: 'http://g1.globo.com/',
    transform: function (body) {
        return cheerio.load(body);
    }
}

let noticias = [];
rp(options)
    .then( ($) => {
//         let link_noticias = [];
        const link_noticias = $('div.bastian-feed-item').map((key, el) => 
                                        $(el).find('div.feed-post.type-basico > div.feed-post-body > div.feed-text-wrapper > a.feed-post-link').attr('href');

        });

        link_noticias.map(link => {
            let link_op;
            if (link) {
                link_op = {
                    uri: link,
                    transform: (body) => {
                        return cheerio.load(body);
                    }
                };
            rp(link_op)
                .then( ($) => {
                    let subTitle = $('main').find('div > h2.content-head__subtitle').text()
                    let title = $('main').find('div > h1.content-head__title').text();
                    let paragraph = $('main').find('div.mc-column.content-text.active-extra-styles > p').text();
                
                    noticias.push({
                        title: title,
                        subTitle: subTitle,
                        paragraphs: paragraph
                    });
                });
            } 
        });
    })
    .catch((err) => {

    });

    
