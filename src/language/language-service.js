const { LinkedList, display } = require('./word-linked-list')

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },

  getWordAtLanguageHead(db, head) {
    return db
      .from('word')
      .select('original AS nextWord')        
      .select('correct_count AS wordCorrectCount')
      .select('incorrect_count AS wordIncorrectCount')     
      .where('id', head)               
  },
  
  async setWordsToLinkedList(db, language) { 
    let wordList = new LinkedList();      
    let data = await db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id: language.id });      
      // get word out of array where language.head = word id
      // loop through data array insert into wordList word.next while word.next != null
      let head = data.find(word => (word.id === language.head))
      wordList.insertFirst(head)      
      let current = data.find(word => word.id === head.next)
      // while (current) will stop before we get errors for next being undefined. 
      while (current) {
        // console.log(current) here will allow visualization of entire list
        console.log(current);
        current = data.find(word => (word.id === current.next));         
        wordList.insertLast(current)        
      }
      return wordList;         
  },

  /* need to test user response to head value if user response 
     matches translation: memory_value * 2 - shift the word's 
     index back by new memory value. */
  checkAnswer(db, language, linkedList, guess) {
    let isCorrect = false;
    const current = linkedList.head;
    let translation = current.value.translation;
    let totalScore = language.total_score;

    if (guess === translation) {
      isCorrect = true;
      current.value.correct_count++;
      current.value.memory_value *= 2;
      totalScore++;

    } else {
      current.value.incorrect_count++;
      current.value.memory_value = 1;
    }

    
    linkedList.remove(current.value);    
    linkedList.insertAt(current.value, current.value.memory_value + 1)
    return linkedList
  },

  // checkAnswer2(db, language)

  //update language head, update current value's correct/incorrect count, change where head points

  updateDatabase(db, language_id, wordsLL, totalScore) {
    // const newList = display(wordsLL);
    // console.log('newList.length: ' + newList.length)
    // for (let i = 0; i < newList.length; i++) {
    //   if (i + 1 === newList.length) {
    //     newList[i].next = null;
    //   } else {
    //     console.log('newList[i].next: ' + newList[i].id)
    //     newList[i].next = newList[i + 1].id;
    //   }
    // }
    console.log(wordsLL.map(word => console.log(word.value.id)))
      return db.transaction(async (trx) => {
        await Promise.all([
          // update language head and score
          await trx('language').where({id: language_id}).update({
            total_score: totalScore,
            head: wordsLL.head.value.id,
          }),
          ...newList.map((word) => {
            return trx('word')
            .where({ id: word.id})
            .update({...word})
          })
        ]);
      });
    }
};



/* Algorithm: if answer correct double memory value
   if answer incorrect reset value to 1. If answer correct
   move the word that many places back in the list. */

module.exports = LanguageService
