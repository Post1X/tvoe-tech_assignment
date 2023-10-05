import News from "../schemas/NewsSchema";
import Comments from "../schemas/CommentSchema";
import Reactions from "../schemas/ReactionsSchema";
import Saved from "../schemas/SavedNews";
import Ads from "../schemas/AdsSchema";
import getCurrencies from "../utilites/getcurrencies";


class NewsController {
    static mainPage = async (req, res, next) => {
        try {
            const {categoryId} = req.query;
            let news;
            if (categoryId) {
                news = await News.find(
                    {categoryId: categoryId},
                ).populate('categoryId');
            }
            if (!categoryId) {
                news = await News.find().populate('categoryId');
            }
            const modifiedComments = await Promise.all(news.map(async post => {
                const commentsCount = await Comments.count({
                    postId: post._id
                });
                const reactionArray = [];
                reactionArray.push(await Reactions.find({
                    postId: post._id
                }))
                const modifiedReactionArray = await Promise.all(
                    reactionArray[0].map(async item => {
                        const reactionCount = await Reactions.count({
                            reaction: item.reaction,
                        });
                        return {
                            reaction: item.reaction,
                            count: reactionCount,
                        };
                    })
                );
                const saveCount = await Saved.count({
                    postId: post._id
                })
                const reactions = modifiedReactionArray.reduce((unique, item) => {
                    if (!unique.some((u) => u.reaction === item.reaction)) {
                        unique.push(item);
                    }
                    return unique;
                }, []);
                return {
                    post,
                    commentCount: commentsCount,
                    reactions: reactions,
                    saveCount: saveCount
                }
            }))
            res.status(200).json(
                modifiedComments
            )
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static getAd = async (req, res, next) => {
        try {
            const ad = await Ads.findOne({
                isRelevant: true
            })
            res.status(200).json(
                ad
            )
        } catch (e) {
            e.status = 401;
            next();
        }
    }
    //
    static getCurrencies = async (req, res, next) => {
        try {
            // const currencies = await getCurrencies('BTC, USD');
            // const usd = await getCurrencies('USD', 'RUB')
            res.status(200).json({
                USD: 96.34,
                EURO: 104.61,
                BTC: 25.725
            })
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

export default NewsController;
