const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const { json } = require('express')
const LinkedList = require('./word-linked-list');

const languageRouter = express.Router()
const jsonBodyParser = express.json()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    // get the top answer specified head in req.language
    try {
       const word = await LanguageService.getWordAtLanguageHead(
        req.app.get('db'),
        req.language.head,        
      )  
      res.json({
          nextWord: word[0].nextWord,
          totalScore: req.language.total_score,
          wordCorrectCount: word[0].wordCorrectCount,
          wordIncorrectCount: word[0].wordIncorrectCount,
          })
    } catch (error) {
      next(error)
    }    
  })

languageRouter
  .post('/guess', jsonBodyParser, async (req, res, next) => {
    const { guess } = req.body
    for (const field of ['guess'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })
    let linkedList = await LanguageService.setWordsToLinkedList(
      req.app.get('db'),
      req.language
    )
    console.log('in language router: ' + linkedList.head.value.translation)
    linkedList = await LanguageService.checkAnswer(req.language, linkedList, guess)    
    let nextTranslation = linkedList.head.value
    console.log('in Language Router after check answer: ' + linkedList.head.value.translation)

    // await LanguageService.updateDatabase(
    //   req.app.get('db'),
    //   req.language.id,
    //   linkedList,
    //   req.language.total_score
    // );

    res.json({
      nextWord: nextTranslation.original,
      wordCorrectCount: nextTranslation.correct_count,
      wordIncorrectCount: nextTranslation.incorrect_count,
      totalScore: req.language.total_score,
    })
     
    
  })

module.exports = languageRouter
